
import { useState } from 'react';
import { Calendar, ChevronDown } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const FormContainer = ({ onSubmit, loading, selectedCoords }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedModel, setSelectedModel] = useState('1');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCoords) return;
    onSubmit({ startDate, endDate, model: selectedModel });
  };

  return (
    <div className="container mt-4">
      <div className="card border-primary">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3 align-items-center">
              {/* Date Range */}
              <div className="col-md-6">
                <div className="input-group">
                  <span className="input-group-text bg-primary text-white">
                    <Calendar className="me-2" />
                    Date Range
                  </span>
                  <input
                    type="date"
                    className="form-control"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    disabled={loading}
                  />
                  <span className="input-group-text">to</span>
                  <input
                    type="date"
                    className="form-control"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Model Selection */}
              <div className="col-md-3">
                <div className="input-group">
                  <span className="input-group-text bg-primary text-white">
                    <ChevronDown className="me-2" />
                    Model
                  </span>
                  <select
                    className="form-select"
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    disabled={loading}
                  >
                    <option value="1">Model 1</option>
                    <option value="2">Model 2</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="col-md-3">
                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2"
                  disabled={!selectedCoords || !startDate || !endDate || loading}
                >
                  {loading ? (
                    <>
                      <span 
                        className="spinner-border spinner-border-sm me-2" 
                        aria-hidden="true"
                      ></span>
                      Processing...
                    </>
                  ) : (
                    'Generate Forecast'
                  )}
                </button>
              </div>
            </div>

            {/* Validation Message */}
            {!selectedCoords && (
              <div className="text-center mt-3 text-danger">
                <small>Please select a location on the map first</small>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormContainer;





