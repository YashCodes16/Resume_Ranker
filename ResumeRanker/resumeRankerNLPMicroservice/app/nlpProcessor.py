import spacy
from collections import Counter
import re


nlp = spacy.load("en_core_web_md")
EXPECTED_SECTIONS = {"education", "experience", "skills", "projects", "summary", "certifications"}

def preprocess(text):
    doc = nlp(text.lower())
    return set(token.lemma_ for token in doc if token.is_alpha and not token.is_stop)

def jaccard_similarity(set1, set2):
    intersection = set1 & set2
    union = set1 | set2
    return round(len(intersection) / len(union), 2), list(intersection)

def spacy_similarity(text1, text2):
    return round(nlp(text1).similarity(nlp(text2)) * 100, 2)

def extract_named_entities(text):
    doc = nlp(text)
    return [(ent.text, ent.label_) for ent in doc.ents]

def extract_keywords(text, top_n=10):
    doc = nlp(text.lower())
    words = [token.lemma_ for token in doc if token.is_alpha and not token.is_stop]
    return Counter(words).most_common(top_n)

def extract_dynamic_skills(jd_text):
    keywords = extract_keywords(jd_text, top_n=25)
    return set(word for word, _ in keywords)

def match_skills_from_jd(text, jd_text):
    resume_tokens = preprocess(text)
    jd_skills = extract_dynamic_skills(jd_text)
    matched_skills = list(resume_tokens & jd_skills)
    missing_skills = list(jd_skills - resume_tokens)
    return matched_skills, missing_skills, jd_skills

def analyze_resume(resume, jd_text):
    doc = nlp(resume)
    word_count = len([token for token in doc if token.is_alpha])

    top_keywords = extract_keywords(resume)
    named_entities = extract_named_entities(resume)
    matched_skills, missing_skills, extracted_skill_set = match_skills_from_jd(resume, jd_text)

    return {
        "wordCount": word_count,
        "topKeywords": top_keywords,
        "namedEntities": named_entities,
        "matchedSkills": matched_skills,
        "missingSkills": missing_skills,
        "extractedSkillSetFromJD": list(extracted_skill_set)
    }

def generate_summary(resume_analysis):
    matched = resume_analysis["matchedSkills"]
    missing = resume_analysis["missingSkills"]
    length = resume_analysis["wordCount"]

    if length < 150:
        summary = "The resume is quite short. Consider adding more projects or experiences."
    elif length > 800:
        summary = "The resume is a bit long. Try condensing less relevant details."
    else:
        summary = "Your resume is well-structured"

    if missing:
        summary += " but lacks few key skills from the JD."
    if matched:
        summary += " Add more quantifiable achievements."

    return summary

def calculate_section_scores(spacy_score, jaccard_score, resume_analysis):
    word_count = resume_analysis["wordCount"]
    matched_skills = resume_analysis["matchedSkills"]
    missing_skills = resume_analysis["missingSkills"]
    top_keywords = resume_analysis["topKeywords"]
    named_entities = resume_analysis["namedEntities"]

    tailoring = min(100, round(spacy_score * 1.2))
    content = 60 + min(40, len(matched_skills) * 5 - len(missing_skills) * 2) if matched_skills else 40
    format_score = 50 if word_count < 150 else 55 if word_count > 800 else 70
    entity_count = len(set(label for _, label in named_entities))
    keyword_count = len(top_keywords)
    sections_score = min(100, 60 + entity_count * 5 + keyword_count)
    style_score = 50

    return {
        "tailoring": tailoring,
        "content": content,
        "format": format_score,
        "sections": sections_score,
        "style": style_score
    }
def generate_recommendations(resume_analysis, format_issues):
    recommendations = []

    matched_skills = resume_analysis.get("matchedSkills", [])
    missing_skills = resume_analysis.get("missingSkills", [])
    word_count = resume_analysis.get("wordCount", 0)
    top_keywords = [kw[0] for kw in resume_analysis.get("topKeywords", [])]
    named_entities = [ent[1] for ent in resume_analysis.get("namedEntities", [])]

    # 1. Skill Suggestions
    if missing_skills:
        top_missing = ", ".join(missing_skills[:3])
        recommendations.append(f"Add missing skills: {top_missing.title()}")

    if not matched_skills:
        recommendations.append("Match skills from the job description by aligning resume terminology")

    # 2. Resume Length
    if word_count < 150:
        recommendations.append("Expand your resume with more experience, skills, or projects")
    elif word_count > 800:
        recommendations.append("Condense resume by removing less relevant details")

    # 3. Formatting Issues
    for issue in format_issues:
        if "font" in issue.lower():
            recommendations.append("Address mixed font formatting issues")
        if "summary" in issue.lower():
            recommendations.append("Add a professional summary section")
        if "section" in issue.lower():
            recommendations.append("Ensure sections like Education, Experience, and Skills are clearly labeled")

    # 4. Keyword Quality / Metrics
    metric_keywords = {"increased", "reduced", "led", "managed", "developed", "improved", "achieved"}
    if not any(word in top_keywords for word in metric_keywords):
        recommendations.append("Include more quantifiable achievements and action verbs")

    # 5. Technical Presence
    technical_indicators = {"python", "nlp", "engineer", "tensorflow", "sql", "java"}
    if not any(tech in top_keywords for tech in technical_indicators):
        recommendations.append("Highlight technical experience or tools more prominently")

    # 6. Named Entity Richness
    unique_entities = set(named_entities)
    if len(unique_entities) < 3:
        recommendations.append("Add more details with names, organizations, dates, or locations to enrich your content")

    return recommendations

def get_format_issues(resume_text):
    issues = []

    lines = resume_text.strip().lower().split("\n")
    has_summary = any("summary" in line or "objective" in line for line in lines[:10])
    if not has_summary:
        issues.append("Missing summary section")

    bullet_chars = {"-", "*", "•", "+"}
    bullets_used = set(line.strip()[0] for line in lines if line.strip() and line.strip()[0] in bullet_chars)
    if len(bullets_used) > 1:
        issues.append("Inconsistent bullet styles used")

    found_sections = set()
    for line in lines:
        for section in EXPECTED_SECTIONS:
            if section in line:
                found_sections.add(section)
    missing_sections = EXPECTED_SECTIONS - found_sections
    if len(missing_sections) >= 2:
        issues.append("Missing multiple key sections: " + ", ".join(list(missing_sections)[:3]))

    issues.append("Mixed fonts detected")

    lines = resume_text.strip().lower().split("\n")

 
    tabular_lines = [line for line in lines if re.search(r"\s{2,}", line)]  
    if len(tabular_lines) > 10:
        issues.append("Uses table or column formatting")

    if re.search(r"[^\x00-\x7F]", resume_text):
        issues.append("Contains non-ASCII or special symbols")


    if "image" in resume_text.lower() or "photo" in resume_text.lower():
        issues.append("May contain images or photos (not recommended)")

    long_sentences = sum(1 for line in lines if len(line.split()) > 30)
    if long_sentences > 5:
        issues.append("Too many long sentences - reduce verbosity")

    return issues


def process_resume_and_jd(resume_text, jd_text):
    r_tokens = preprocess(resume_text)
    jd_tokens = preprocess(jd_text)

    jaccard_score, matched_keywords = jaccard_similarity(r_tokens, jd_tokens)
    spacy_score = spacy_similarity(resume_text, jd_text)
    resume_analysis = analyze_resume(resume_text, jd_text)
    section_scores = calculate_section_scores(spacy_score, jaccard_score, resume_analysis)
    issues = get_format_issues(resume_text)
    recommendations = generate_recommendations(resume_analysis,issues)
    total = len(resume_analysis["matchedSkills"]) + len(resume_analysis["missingSkills"])

    if total > 0:
        matchScore = round((len(resume_analysis["matchedSkills"]) / total) * 100)
    else:
        matchScore = 0 

    critical_issues = [
        "uses table",
        "contains non-ascii",
        "image",
        "mixed fonts",
        ]

    is_compatible = not any(
        any(c in issue.lower() for c in critical_issues) for issue in issues
    )


    return {
        "matchScore": matchScore,
        "spacyScore": spacy_score,
        "jaccardScore": jaccard_score,
        "sectionScores": section_scores,
        "matchedSkills": resume_analysis["matchedSkills"],
        "missingSkills": resume_analysis["missingSkills"],
        "extractedSkillsFromJD": resume_analysis["extractedSkillSetFromJD"],
        "topKeywords": resume_analysis["topKeywords"],
        "recommendations" : recommendations,
        "wordCount": resume_analysis["wordCount"],
        "summaryText": generate_summary(resume_analysis),
        "atsCompatible": is_compatible,
        "formatIssues": issues
    }


