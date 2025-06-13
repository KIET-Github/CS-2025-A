import React, { useState, useEffect } from 'react';

const PredictionComponent = ({ formData, featuresData, selectedCoords }) => {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!formData || !featuresData || !selectedCoords) return;

    const makePrediction = async () => {
      setLoading(true);
      setError('');

      // Extract month from startDate (assuming startDate is provided in YYYY-MM-DD format)
      const month = new Date(formData.startDate).getMonth() + 1;
      //Math.round((percentage * 8) / 100)
      // Prepare payload using the features for the chart component
      const payload = {
        model: formData.model, // "1" or "2"
        month: month,
        max_temp: featuresData.temperatureExtremes.max,
        min_temp: featuresData.temperatureExtremes.min,
        rainfall: featuresData.sumValues.rain,
        relative_humidity: featuresData.maxValues.humidity,
        wind_speed: featuresData.maxValues.windSpeed,
        cloud_coverage: featuresData.maxValues.cloudCover,//(featuresData.maxValues.cloudCover * 8) / 100, //
        latitude: selectedCoords.lat,
        longitude: selectedCoords.lng,
      };
      console.log("Payload being sent:", payload);
      try {
        const response = await fetch('/api/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          setPrediction(data.prediction);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch prediction');
      } finally {
        setLoading(false);
      }
    };

    makePrediction();
  }, [formData, featuresData, selectedCoords]);


  let numericPrediction = NaN;
  if (prediction) {
    const numericPredictionMatch = prediction.match(/(\d+(\.\d+)?)/);
    numericPrediction = numericPredictionMatch ? parseFloat(numericPredictionMatch[0]) : NaN;
    console.log("Extracted numeric prediction:", numericPrediction);
  }

  return (
    <div className="card mt-4 border-info">
      <div className="card-body">
        <h3 className="card-title mb-4">Model Prediction</h3>
        {loading && <p>Loading prediction...</p>}
        {error && <p className="text-danger">{error}</p>}
        {prediction && (
          <div>

            <p>
              <strong>Prediction:</strong>
              {/*isNaN(numericPrediction) ? 'N/A' : (numericPrediction / 2)*/}
              {prediction}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionComponent;
