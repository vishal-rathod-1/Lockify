from flask import Flask
from routes.main import main_bp
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

# Register blueprints
app.register_blueprint(main_bp)

if __name__ == '__main__':
    app.run(debug=True)