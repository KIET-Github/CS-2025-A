
import { useState } from 'react';
import MapComponent from './components/MapComponent';
import FormContainer from './components/FormContainer';
import ChartComponent from './components/ChartComponent';
import PredictionComponent from './components/PredictionComponent';
import ResultsComponent from './components/ResultComponent';
import { fetchWeatherFeatures } from './services/api';
import { processFeatures } from './utils/features';
import './App.css';


const App = () => {
  const [selectedCoords, setSelectedCoords] = useState(null);
  const [formData, setFormData] = useState(null);
  const [featuresData, setFeaturesData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFormSubmit = async (formValues) => {
    if (!selectedCoords) {
      setError('Please select a location on the map');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const weatherData = await fetchWeatherFeatures(
        selectedCoords.lat,
        selectedCoords.lng,
        formValues.startDate,
        formValues.endDate
      );

      const processedData = processFeatures(weatherData);
      setFormData(formValues);
      setFeaturesData(processedData);
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 shadow-lg rounded-2xl mt-8">
     <p> <h1 className='text-5xl font-bold text-center mb-8 flex items-center justify-center gap-4'>🌦️</h1><h1 className="neon-clean text-5xl font-bold text-center mb-8 flex items-center justify-center gap-4"> Weather Forecast System
      </h1></p>
      
      {error && <div className="alert alert-error mb-4">{error}</div>}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <MapComponent 
            onCoordinateSelect={(lat, lng) => setSelectedCoords({ lat, lng })} 
          />
          <FormContainer 
            onSubmit={handleFormSubmit} 
            loading={loading} 
            selectedCoords={selectedCoords}
          />
        </div>
        
        {featuresData && (
          <div>
            <ResultsComponent 
              formData={formData}
              featuresData={featuresData}
              selectedCoords={selectedCoords}
            />
            {/* New ChartComponent added just below the ResultsComponent */}
            <ChartComponent featuresData={featuresData} />
            {/* PredictionComponent added below ChartComponent */}
            <PredictionComponent 
              formData={formData} 
              featuresData={featuresData} 
              selectedCoords={selectedCoords} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;







//                                                          ^
//                                                          |
//                                                          |
//                                                          |
//                                                      ^
                                            //PREVIOSULY BEST WORKING STAGE


