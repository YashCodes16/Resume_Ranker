from app import create_app
from waitress import serve
from config.config import Config

app = create_app()

if __name__ == '__main__':
    serve(
        app,
        host=Config.HOST,
        port=Config.PORT,
        threads=8  
    )
