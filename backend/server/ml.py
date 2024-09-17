from functools import cache
from typing import TypedDict
import joblib
import pandas as pd
from ml.dto import GeneralModelDto, MedicalModelDto


class GeneralPredictionRequestDto(TypedDict):
    age: int
    sex: bool
    weight: int
    height: int
    children: int
    smoker: bool


class MedicalPredictionRequestDto(TypedDict):
    age: int
    diabetes: bool
    blood_pressure_problems: bool
    any_transplants: bool
    any_chronic_diseases: bool
    height: int
    weight: int
    known_allergies: bool
    history_of_cancer_in_family: bool
    number_of_major_surgeries: int


MODELS_FOLDER = "ml/models"



@cache
def load_general_model() -> GeneralModelDto:
    return joblib.load(f"{MODELS_FOLDER}/general.pkl")


@cache
def load_medical_model() -> MedicalModelDto:
    return joblib.load(f"{MODELS_FOLDER}/medical.pkl")


def predict_general(data: GeneralPredictionRequestDto) -> float:
    dto = load_general_model()
    bmi = data["weight"] / (data["height"] / 100) ** 2
    feature_values = [
        data["age"],
        1 if data["sex"] else 0,
        bmi,
        data["children"],
        1 if data["smoker"] else 0,
    ]
    feature_names = ["age", "sex", "bmi", "children", "smoker"]
    x = pd.DataFrame(data=[feature_values], columns=feature_names)
    x_poly = dto.poly.transform(x)
    prediction = dto.model.predict(x_poly)
    usd_to_ksh = 129.04
    price = prediction[0] * usd_to_ksh
    return price

def predict_medical(data: MedicalPredictionRequestDto) -> float:
    dto = load_medical_model()
    bmi = data["weight"] / (data["height"] / 100) ** 2
    feature_values = [
        data["age"],
        1 if data["diabetes"] else 0,
        1 if data["blood_pressure_problems"] else 0,
        1 if data["any_transplants"] else 0,
        1 if data["any_chronic_diseases"] else 0,
        data["height"],
        data["weight"],
        1 if data["known_allergies"] else 0,
        1 if data["history_of_cancer_in_family"] else 0,
        data["number_of_major_surgeries"],
        bmi,
    ]
    feature_names = [
        "Age",
        "Diabetes",
        "BloodPressureProblems",
        "AnyTransplants",
        "AnyChronicDiseases",
        "Height",
        "Weight",
        "KnownAllergies",
        "HistoryOfCancerInFamily",
        "NumberOfMajorSurgeries",
        "Bmi",
    ]
    x = pd.DataFrame(data=[feature_values], columns=feature_names)
    prediction = dto.model.predict(x)
    inr_to_ksh = 1.54
    price = prediction[0] * inr_to_ksh
    return price


def test_predict_general() -> None:
    data: GeneralPredictionRequestDto = {
        "age": 30,
        "sex": True,
        "weight": 60,
        "height": 160,
        "children": 0,
        "smoker": False,
    }
    predict_general(data)


def test_predict_medical() -> None:
    data: MedicalPredictionRequestDto  = {
        "age": 30,
        "diabetes": False,
        "blood_pressure_problems": False,
        "any_transplants": False,
        "any_chronic_diseases": False,
        "height": 160,
        "weight": 60,
        "known_allergies": False,
        "history_of_cancer_in_family": False,
        "number_of_major_surgeries": 0,
    }
    predict_medical(data)
