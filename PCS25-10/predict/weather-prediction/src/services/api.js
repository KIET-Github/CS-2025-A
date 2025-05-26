export const fetchWeatherFeatures = async (lat, lon, startDate, endDate) => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,rain,cloud_cover_low,wind_speed_10m&start_date=${startDate}&end_date=${endDate}`
      );
      return await response.json();
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  };



  