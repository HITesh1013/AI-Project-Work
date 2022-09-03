from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

model = pickle.load(open('model/decision_tree_model.pkl', 'rb'))

app = Flask(__name__)
CORS(app, support_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'

stress_level = {0: "Stage 1: Flight", 1: "Stage 2: Damage Control", 2: "Stage 3: Recovery",
                3: "Stage 4: Adaption", 4: "Stage 5: Burnout"}

@app.route('/getStressInfo', methods=['POST'])
def json_example():
    data = request.form
    input_values = [[float(data["sr"]), float(data["rr"]), 
                     float(data["bt"]), float(data["lm"]),
                     float(data["bo"]), float(data["em"]),
                     float(data["sh"]), float(data["hr"])
                     ]]
    
    y_pred = model.predict(input_values)
    
    return jsonify({"result" : stress_level[y_pred[0]]})

if __name__ == '__main__':
    app.run(debug=True, port=5000)