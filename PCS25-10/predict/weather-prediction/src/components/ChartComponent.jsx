import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartComponent = ({ featuresData }) => {
  // Process data for the chart
  const chartData = [
    {
      feature: 'Temperature',
      max: featuresData.maxValues.temperature,
      min: featuresData.temperatureExtremes.min,
      extremeMax: featuresData.temperatureExtremes.max
    },
    { feature: 'Humidity', value: featuresData.maxValues.humidity },
    { feature: 'Rain', value: featuresData.maxValues.rain },
    { feature: 'Cloud Cover', value: featuresData.maxValues.cloudCover },
    { feature: 'Wind Speed', value: featuresData.maxValues.windSpeed },
  ];

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload) {
      const getUnit = () => {
        switch (label) {
          case 'Temperature': return '°C';
          case 'Humidity': return '%';
          case 'Rain': return 'mm';
          case 'Cloud Cover': return '%';
          case 'Wind Speed': return 'm/s';
          default: return '';
        }
      };

      return (
        <div className="custom-tooltip bg-white p-3 border rounded shadow-sm">
          <h6 className="text-success">{label}</h6>
          {payload.map((entry, index) => (
            <p key={index} className="mb-0">
              {entry.name}: {entry.value}{getUnit()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card mt-4 border-success ">
      <div className="card-body ">
        <h3 className="card-title mb-4">Features Visualization</h3>
        <div style={{ height: '400px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="feature"
                tick={{ fill: '#333' }}
              />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />

              {/* Main values bar */}
              <Bar
                dataKey="value"
                name="Maximum Values"
                fill="#8884d8"
                radius={[4, 4, 0, 0]}
              />

              {/* Temperature specific bars */}
              <Bar
                dataKey="max"
                name="Temperature (Max)"
                fill="#82ca9d"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="min"
                name="Temperature (Min)"
                fill="#ffc658"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="extremeMax"
                name="Extreme Max"
                fill="#ff7300"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;