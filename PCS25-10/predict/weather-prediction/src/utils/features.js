// export const processFeatures = (weatherData) => {
//     console.log('[features.js] Raw API data received:', weatherData);
  
//     if (!weatherData?.hourly) {
//       console.error('[features.js] Missing hourly data in API response');
//       return null;
//     }
  
//     console.log('[features.js] Available hourly parameters:', 
//       Object.keys(weatherData.hourly).filter(k => k !== 'time')
//     );
  
//     const { 
//       temperature_2m: temperatures,
//       relative_humidity_2m: humidities,
//       rain: rains,
//       cloud_cover_low: cloudCovers,
//       wind_speed_10m: windSpeeds,
//       time: timestamps
//     } = weatherData.hourly;
  
//     console.log('[features.js] First 3 temperature values:', temperatures?.slice(0, 3));
//     console.log('[features.js] First 3 humidity values:', humidities?.slice(0, 3));
//     console.log('[features.js] First 3 rain values:', rains?.slice(0, 3));
  
//     const getMax = (arr, name) => {
//       const filtered = arr?.filter(value => typeof value === 'number') || [];
//       console.log(`[features.js] Processing ${name}:`, {
//         rawLength: arr?.length,
//         validNumbers: filtered.length,
//         min: Math.min(...filtered),
//         max: Math.max(...filtered)
//       });
//       return filtered.length > 0 ? Math.max(...filtered) : null;
//     };
  
//     const getMin = (arr, name) => {
//       const filtered = arr?.filter(value => typeof value === 'number') || [];
//       return filtered.length > 0 ? Math.min(...filtered) : null;
//     };
  
//     const processedData = {
//       temperatureExtremes: {
//         max: getMax(temperatures, 'temperature'),
//         min: getMin(temperatures, 'temperature')
//       },
//       maxValues: {
//         humidity: getMax(humidities, 'humidity'),
//         rain: getMax(rains, 'rain'),
//         cloudCover: getMax(cloudCovers, 'cloudCover'),
//         windSpeed: getMax(windSpeeds, 'windSpeed')
//       },
//       timeSeries: {
//         timestamps,
//         temperatures,
//         humidities,
//         rains,
//         cloudCovers,
//         windSpeeds
//       },
//       rawData: weatherData.hourly
//     };
  
//     console.log('[features.js] Final processed data:', processedData);
//     return processedData;
//   };









export const processFeatures = (weatherData) => {
  console.log('[features.js] Raw API data received:', weatherData);

  if (!weatherData?.hourly) {
    console.error('[features.js] Missing hourly data in API response');
    return null;
  }

  console.log(
    '[features.js] Available hourly parameters:',
    Object.keys(weatherData.hourly).filter(k => k !== 'time')
  );

  const { 
    temperature_2m: temperatures,
    relative_humidity_2m: humidities,
    rain: rains,
    cloud_cover_low: cloudCovers,
    wind_speed_10m: windSpeeds,
    time: timestamps
  } = weatherData.hourly;

  console.log('[features.js] First 3 temperature values:', temperatures?.slice(0, 3));
  console.log('[features.js] First 3 humidity values:', humidities?.slice(0, 3));
  console.log('[features.js] First 3 rain values:', rains?.slice(0, 3));

  const getMax = (arr, name) => {
    const filtered = arr?.filter(value => typeof value === 'number') || [];
    console.log(`[features.js] Processing ${name}:`, {
      rawLength: arr?.length,
      validNumbers: filtered.length,
      min: Math.min(...filtered),
      max: Math.max(...filtered)
    });
    return filtered.length > 0 ? Math.max(...filtered) : null;
  };

  const getMin = (arr, name) => {
    const filtered = arr?.filter(value => typeof value === 'number') || [];
    return filtered.length > 0 ? Math.min(...filtered) : null;
  };

  // New function to calculate the sum of an array
  const getSum = (arr, name) => {
    const filtered = arr?.filter(value => typeof value === 'number') || [];
    const sum = filtered.reduce((acc, val) => acc + val, 0);
    console.log(`[features.js] Sum of ${name}:`, sum);
    return sum;
  };

  const processedData = {
    temperatureExtremes: {
      max: getMax(temperatures, 'temperature'),
      min: getMin(temperatures, 'temperature')
    },
    maxValues: {
      humidity: getMax(humidities, 'humidity'),
      rain: getMax(rains, 'rain'),
      cloudCover: getMax(cloudCovers, 'cloudCover'),
      windSpeed: getMax(windSpeeds, 'windSpeed')
    },
    // Added sum of rain array
    sumValues: {
      rain: getSum(rains, 'rain')
    },
    timeSeries: {
      timestamps,
      temperatures,
      humidities,
      rains,
      cloudCovers,
      windSpeeds
    },
    rawData: weatherData.hourly
  };

  console.log('[features.js] Final processed data:', processedData);
  return processedData;
};
