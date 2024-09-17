import pandas as pd
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.linear_model import LinearRegression
from typing import NamedTuple
from sklearn.preprocessing import PolynomialFeatures

# NOTE: When you update this dto, don't forget to update the corresponding
#       dto in Fyama/backend/ml/medical.ipynb
class MedicalModelDto(NamedTuple):
    model: GradientBoostingRegressor


# NOTE: When you update this dto, don't forget to update the corresponding
#       dto in Fyama/backend/ml/general.ipynb
class GeneralModelDto(NamedTuple):
    regions: pd.Series
    poly: PolynomialFeatures
    model: LinearRegression
