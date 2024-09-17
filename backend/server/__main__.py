import os
from server.main import app
from server.ml import GeneralModelDto, MedicalModelDto  # noqa: F401, joblib requires these classes during unpickling

app.run(
    port=int(os.getenv("FLASK_PORT", 5000)), debug=bool(os.getenv("FLASK_DEBUG", True))
)
