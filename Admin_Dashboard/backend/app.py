# backend/app.py
from flask import Flask, request, jsonify
import pandas as pd
import os
from flask_cors import CORS 

app = Flask(__name__)

CORS(app)

DATASET_PATH = 'augmented_disease_symptoms_dataset_updated.csv'

def load_dataset():
    if os.path.exists(DATASET_PATH):
        return pd.read_csv(DATASET_PATH)
    return pd.DataFrame()

def save_dataset(df):
    df.to_csv(DATASET_PATH, index=False)

@app.route('/api/admin/add-disease', methods=['POST'])
def add_disease():
    data = request.get_json()
    disease = data.get('disease', '').strip().lower()
    symptoms = [s.strip().lower() for s in data.get('symptoms', []) if s.strip()]

    if not disease or not symptoms:
        return jsonify({"message": "Disease and symptoms are required."}), 400

    df = load_dataset()

    if not df.empty and disease in df['prognosis'].str.lower().values:
        return jsonify({"message": "Disease already exists!"}), 409

    # If dataset is empty, create from scratch
    if df.empty:
        all_cols = symptoms + ['prognosis']
        new_row = {col: 1 if col in symptoms else 0 for col in all_cols}
        new_row['prognosis'] = disease
        df = pd.DataFrame([new_row])
        save_dataset(df)
        return jsonify({"message": "Disease added successfully!"}), 200

    # Add missing symptom columns with 0 for all rows
    for symptom in symptoms:
        if symptom not in df.columns:
            df[symptom] = 0

    # Prepare new row with all 0s
    all_symptoms = [col for col in df.columns if col != 'prognosis']
    new_row = {sym: 1 if sym in symptoms else 0 for sym in all_symptoms}
    new_row['prognosis'] = disease

    df = pd.concat([df, pd.DataFrame([new_row])], ignore_index=True)
    save_dataset(df)

    return jsonify({"message": "Disease added successfully!"}), 200

if __name__ == '__main__':
    app.run(debug=True)
