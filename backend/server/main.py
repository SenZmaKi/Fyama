from typing import TypedDict
from flask import Flask, request, jsonify
from server.ml import (
    GeneralPredictionRequestDto,
    MedicalPredictionRequestDto,
    predict_general,
    predict_medical,
)


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


class ResponseDto(TypedDict):
    data: list[PredictionsDto]


@app.route("/api/predict", methods=["POST"])
def predict():
    req_json: RequestDto | None = request.json
    if not req_json:
        return jsonify({"error": "Predicion input is required"}), 400
    try:
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
    except (KeyError, ValueError) as e:
        if isinstance(e, KeyError):
            return jsonify({"error": f"Missing key: {e.args[0]}"}), 400
        if isinstance(e, ValueError):
            return jsonify({"error": f"Invalid value: {e.args[0]}"}), 400

    res: ResponseDto = {"data": res_data}
    return jsonify(res), 200
