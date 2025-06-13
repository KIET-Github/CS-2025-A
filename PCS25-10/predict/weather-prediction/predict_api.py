# predict_api.py
from flask import Flask, request, jsonify
from gradio_client import Client

app = Flask(__name__)

# Initialize clients for both models
MODEL1_CLIENT = Client("anubhavK/flood_logistic_regression_model1")
MODEL2_CLIENT = Client("anubhavK/flood_neural_network_model_2")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    print("Received payload:", data)  # Debug log
    # Extract data from the request payload
    model_choice = data.get('model', '1')
    month = data.get('month')
    max_temp = data.get('max_temp')
    min_temp = data.get('min_temp')
    rainfall = data.get('rainfall')
    relative_humidity = data.get('relative_humidity')
    wind_speed = data.get('wind_speed')
    cloud_coverage = data.get('cloud_coverage')
    latitude = data.get('latitude')
    longitude = data.get('longitude')

    # Choose the correct client based on model selection
    client = MODEL1_CLIENT if model_choice == "2" else MODEL1_CLIENT

    try:
        result = client.predict(
            month=month,
            max_temp=max_temp,
            min_temp=min_temp,
            rainfall=rainfall,
            relative_humidity=relative_humidity,
            wind_speed=wind_speed,
            cloud_coverage=cloud_coverage,
            latitude=latitude,
            longitude=longitude,
            api_name="/predict"
        )
        return jsonify({"prediction": result})
    except Exception as e:
        # Print the error to the console for debugging
        print("Error in /predict:", e)
        return jsonify({"error": str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True)
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)

