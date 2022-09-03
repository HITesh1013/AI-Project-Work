import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

le = pickle.load(open('model/label_enccoder.pkl', 'rb'))
logreg = pickle.load(open('model/logreg_model.pkl', 'rb'))

app = Flask(__name__)
CORS(app, support_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/getDiseaseInfo', methods=['POST'])
def json_example():
    symptoms = request.form['symptoms']
    input_values = np.array([int(i) for i in list(symptoms)]).reshape(1,131)
    y_pred = logreg.predict(input_values)
    
    prediction = le.inverse_transform(y_pred)
    
    return jsonify({"result" :prediction[0]})

if __name__ == '__main__':
    app.run(debug=True, port=5000)