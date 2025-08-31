from flask import Blueprint, request, jsonify, current_app
from .nlpProcessor import process_resume_and_jd

analyze_bp = Blueprint('analyze', __name__)

@analyze_bp.before_app_request
def log_request_info():
    current_app.logger.info(f"Incoming Request: {request.method} {request.url}")
    if request.is_json:
        current_app.logger.info(f"Request JSON: {request.get_json()}")


@analyze_bp.after_app_request
def log_response_info(response):
    current_app.logger.info(f"Response Status: {response.status}")
    current_app.logger.info(f"Response Data: {response.get_data(as_text=True)}")
    return response


@analyze_bp.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    resume = data.get("resumeText", "")
    jd = data.get("jobDescription", "")
    print(resume)
    result = process_resume_and_jd(resume, jd)
    return jsonify(result)

@analyze_bp.app_errorhandler(404)
def not_found_error(error):
    current_app.logger.warning(f"404 Error: {request.method} {request.url}")
    return jsonify({"error": "Route not found"}), 404