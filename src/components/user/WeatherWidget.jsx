import React from 'react';
import { FaSun, FaCloud, FaCloudRain, FaSnowflake, FaThermometerHalf, FaEye, FaWind } from 'react-icons/fa';

const WeatherWidget = () => {
  // Mock weather data (in a real app, this would come from a weather API)
  const weather = {
    temperature: 72,
    condition: 'sunny',
    humidity: 65,
    windSpeed: 8,
    uvIndex: 6,
    petSafetyLevel: 'good',
    recommendations: [
      'Perfect weather for dog walks!',
      'Great time for outdoor play',
      'Remember to bring water'
    ]
  };

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'sunny': return FaSun;
      case 'cloudy': return FaCloud;
      case 'rainy': return FaCloudRain;
      case 'snowy': return FaSnowflake;
      default: return FaSun;
    }
  };

  const getWeatherColor = (condition) => {
    switch (condition) {
      case 'sunny': return 'from-yellow-400 to-orange-500';
      case 'cloudy': return 'from-gray-400 to-gray-500';
      case 'rainy': return 'from-blue-400 to-blue-600';
      case 'snowy': return 'from-blue-200 to-blue-400';
      default: return 'from-yellow-400 to-orange-500';
    }
  };

  const getSafetyColor = (level) => {
    switch (level) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const WeatherIcon = getWeatherIcon(weather.condition);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-pink-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Pet Weather</h2>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getSafetyColor(weather.petSafetyLevel)}`}>
          {weather.petSafetyLevel.toUpperCase()} FOR PETS
        </span>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className={`bg-gradient-to-br ${getWeatherColor(weather.condition)} rounded-full p-4`}>
          <WeatherIcon className="text-white text-2xl" />
        </div>
        
        <div>
          <div className="text-3xl font-bold text-gray-800">{weather.temperature}°F</div>
          <div className="text-sm text-gray-600 capitalize">{weather.condition}</div>
        </div>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center">
          <FaEye className="text-blue-500 mx-auto mb-1" />
          <div className="text-xs text-gray-500">Humidity</div>
          <div className="text-sm font-semibold text-gray-800">{weather.humidity}%</div>
        </div>
        <div className="text-center">
          <FaWind className="text-green-500 mx-auto mb-1" />
          <div className="text-xs text-gray-500">Wind</div>
          <div className="text-sm font-semibold text-gray-800">{weather.windSpeed} mph</div>
        </div>
        <div className="text-center">
          <FaThermometerHalf className="text-orange-500 mx-auto mb-1" />
          <div className="text-xs text-gray-500">UV Index</div>
          <div className="text-sm font-semibold text-gray-800">{weather.uvIndex}</div>
        </div>
      </div>

      {/* Pet Care Recommendations */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-3 border border-pink-100">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">Today's Pet Care Tips</h3>
        <ul className="space-y-1">
          {weather.recommendations.map((tip, index) => (
            <li key={index} className="text-xs text-gray-600 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-pink-400 rounded-full"></div>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WeatherWidget;