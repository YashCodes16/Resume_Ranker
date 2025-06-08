from app import create_app

app = create_app()

if __name__ == '__main__':
    from config.config import Config
    app.run(host=Config.HOST,port=Config.PORT, debug=Config.DEBUG)