## Documentation : https://docs.google.com/document/d/16GLAutXz7J1Q1gHglgPdLKp8TMPIaygP0GmQmP8kXKc/edit?usp=sharing

To run this project , you need to do the following actions. It has a 3 layer arechitecture.
So, you need to execute these commands seperatly

# 1st layer

Html/css/js -- Frontend  
cd frontend  
npx serve .

hosted on : http://localhost:3000/

# 2nd layer

NodeJs/expressJs -- backend
cd backend  
npm i
nodemon

hosted on : http://localhost:8000/

# 3rd layer

Python -- Microservice

cd resumeRankerNLPMicroservice
python -m venv venv
source venv/bin/activate # (or venv\Scripts\activate on Windows)
pip install -r requirements.txt
python -m spacy download en_core_web_md
python run.py

OR
(I personally use but the above one is recommended)

cd resumeRankerNLPMicroservice
pip install -r requirements.txt
python -m spacy download en_core_web_md
python run.py

hosted on : http://localhost:5000/

Note: I have added .env file and config.py file in the ZIP becase It only contains PORT details.
And to work properly , the ports should be correct , as I am treating them all as spereate entities.
