const ResultsComponent = ({ formData, featuresData, selectedCoords }) => {
  return (
    <div className="card mt-4 border-success">
      <div className="card-body">
        <h3 className="card-title mb-4">Features Information</h3>
        
        {/* Location Details */}
        <div className="mb-4">
          <h5 className="text-success">Location Information</h5>
          <p className="mb-1">
            Coordinates: {selectedCoords.lat.toFixed(4)}, {selectedCoords.lng.toFixed(4)}
          </p>
          <p>
            Date Range: {formData.startDate} to {formData.endDate}
          </p>
        </div>

        {/* Max Values */}
        <div className="mb-4">
          <h5 className="text-success">Maximum Values</h5>
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Temperature
              <span className="badge bg-primary rounded-pill">
                {featuresData.maxValues.temperature}°C
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Humidity
              <span className="badge bg-primary rounded-pill">
                {featuresData.maxValues.humidity}%
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Rain
              <span className="badge bg-primary rounded-pill">
                {featuresData.sumValues.rain}mm
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Cloud Cover Low
              <span className="badge bg-primary rounded-pill">
                {featuresData.maxValues.cloudCover}%
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Wind Speed
              <span className="badge bg-primary rounded-pill">
                {featuresData.maxValues.windSpeed}m/s
              </span>
            </li>
          </ul>
        </div>

        {/* Temperature Extremes */}
        <div className="mb-4">
          <h5 className="text-success">Temperature Extremes</h5>
          <div className="row">
            <div className="col-md-6">
              <div className="alert alert-info">
                Maximum Temperature: {featuresData.temperatureExtremes.max}°C
              </div>
            </div>
            <div className="col-md-6">
              <div className="alert alert-warning">
                Minimum Temperature: {featuresData.temperatureExtremes.min}°C
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsComponent;