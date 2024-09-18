from typing import TypedDict, cast
from flask import Flask, request, jsonify
from server.ml import (
    GeneralPredictionRequestDto,
    MedicalPredictionRequestDto,
    predict_general,
    predict_medical,
    general_prediction_request_json_schema,
    medical_prediction_request_json_schema,
)
import jsonschema


app = Flask(__name__)


class DataDto(TypedDict):
    general: GeneralPredictionRequestDto
    medical: MedicalPredictionRequestDto


class RequestDto(TypedDict):
    input: list[DataDto]


class GeneralPredictionResponseDto(TypedDict):
    prediction: float
    input: GeneralPredictionRequestDto


class MedicalPredictionResponseDto(TypedDict):
    prediction: float
    input: MedicalPredictionRequestDto


class PredictionsDto(TypedDict):
    general: GeneralPredictionResponseDto
    medical: MedicalPredictionResponseDto


request_json_schema = {
    "type": "object",
    "properties": {
        "input": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "general": general_prediction_request_json_schema,
                    "medical": medical_prediction_request_json_schema,
                },
                "required": ["general", "medical"],
            },
        }
    },
}


class ResponseDto(TypedDict):
    data: list[PredictionsDto]


@app.errorhandler(Exception)
def handle_exception(e):
    """Return JSON instead of HTML for HTTP errors."""
    return jsonify({"error": f"{e.name}: {e.description}"}), e.code


@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        req_json: RequestDto | None = request.json
        try:
            jsonschema.validate(req_json, request_json_schema)
        except jsonschema.ValidationError as e:
            field_path = ".".join(map(str, e.path))
            error_message = f"Field: '{field_path}'\n Error: {e.message}"
            return jsonify({"error": error_message}), 400
        req_json = cast(RequestDto, req_json)
        res_data: list[PredictionsDto] = [
            {
                "general": {
                    "prediction": predict_general(data["general"]),
                    "input": data["general"],
                },
                "medical": {
                    "prediction": predict_medical(data["medical"]),
                    "input": data["medical"],
                },
            }
            for data in req_json["input"]
        ]

        res: ResponseDto = {"data": res_data}
        return jsonify(res), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
