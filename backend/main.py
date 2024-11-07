from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np

# Load the pre-trained model
model = joblib.load('best_model.pkl')

# Initialize FastAPI app
app = FastAPI()


# Define input data structure
class PredictionInput(BaseModel):
    age: int
    sex: int
    cp: int
    trestbps: float
    chol: float
    fbs: int
    restecg: int
    thalach: float
    exang: int
    oldpeak: float
    slope: int
    ca: int
    thal: int


@app.post("/")
async def home():
    return {"message": "Welcome to the Heart Disease Prediction API"}


# Prediction route
@app.post("/predict")
async def predict(input_data: PredictionInput):
    # Convert input to model format
    input_list = [[
        input_data.age, input_data.sex, input_data.cp, input_data.trestbps,
        input_data.chol, input_data.fbs, input_data.restecg, input_data.thalach,
        input_data.exang, input_data.oldpeak, input_data.slope, input_data.ca, input_data.thal
    ]]

    try:
        # Make prediction
        prediction = model.predict(np.array(input_list))
        result = "Presence of heart disease" if prediction[0] == 1 else "No heart disease"
        return {"prediction": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Run with: uvicorn main:app --reload
