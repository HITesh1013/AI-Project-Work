from flask import Flask, request, jsonify
from sklearn.preprocessing import OneHotEncoder
import numpy as np
from flask_cors import CORS
import pickle

property_type_encoder = pickle.load(open('model/property_type_model.pkl', 'rb'))
water_supply_encoder = pickle.load(open('model/water_supply_model.pkl', 'rb'))
scaler = pickle.load(open('model/scaling_model.pkl', 'rb'))
model = pickle.load(open('model/xgboost_model.pkl', 'rb'))

app = Flask(__name__)
CORS(app, support_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/getScore', methods=['POST'])
def json_example():
    input_values = request.form
    
    
    test_values = [int(input_values['Property_Area']), float(input_values['Number_of_Windows']), 
                   int(input_values['Number_of_Doors']), int(input_values['Furnishing']), 
                   float(input_values['Frequency_of_Powercuts']), int(input_values['Power_Backup']), 
                   float(input_values['Traffic_Density_Score']), int(input_values['Crime_Rate']), 
                   int(input_values['Dust_and_Noise']), 
                   float(input_values['Air_Quality_Index']), float(input_values['Neighborhood_Review'])]
    
    
    property_type = property_type_encoder.transform([[input_values['Property_Type']]]).toarray()[0]
    test_values = np.concatenate([test_values, property_type])
    
    water_supply = water_supply_encoder.transform([[input_values['Water_Supply']]]).toarray()[0]
    
    test_values = np.concatenate([test_values, water_supply])

    test_values = scaler.transform([test_values])
    
    y_pred = model.predict(test_values)
    y_pred = np.exp(y_pred)
    y_pred[y_pred>100] = 100.0
    y_pred = np.round(y_pred[0], 2)
    
    return jsonify({"result" : str(y_pred)})

if __name__ == '__main__':
    app.run(debug=True, port=5000)