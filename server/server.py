from flask import Flask, request, jsonify
from flask_cors import CORS
import server.util as util

app = Flask(__name__)

# Cho phép tất cả các tên miền (Frontend Vercel) gửi request sang
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/get_location_names', methods=['GET'])
def get_location_names():
    if util.__data_columns is None:
        util.load_saved_artifacts()
    response = jsonify({
        'locations': util.get_location_names()
    })
    return response

@app.route('/predict_home_price', methods=['GET', 'POST'])
def predict_home_price():
    if util.__model is None:
        util.load_saved_artifacts()

    # Xử lý cả dạng form-data và JSON
    data = request.form if request.form else request.get_json(silent=True) or {}

    total_sqft = float(data.get('total_sqft', 1000))
    location = data.get('location', '')
    bhk = int(data.get('bhk', 2))
    bath = int(data.get('bath', 2))

    response = jsonify({
        'estimated_price': util.get_estimated_price(location, total_sqft, bhk, bath)
    })
    return response

if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    util.load_saved_artifacts()
    app.run()