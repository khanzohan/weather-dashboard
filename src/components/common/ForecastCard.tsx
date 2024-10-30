import { format } from 'date-fns';
import Image from 'next/image';

import type { ForecastWeatherForecast } from '@/types';

interface ForecastCardProps {
  searchLoading: boolean;
  forecast: ForecastWeatherForecast;
}

const ForecastCard = (props: ForecastCardProps) => {
  const getColor = () => {
    switch (props.forecast.weather[0]?.description) {
      case 'broken clouds':
        return 'bg-gray-500';
      case 'scattered clouds':
        return 'bg-gray-400';
      case 'clear sky':
        return 'bg-blue-400';
      case 'overcast clouds':
        return 'bg-gray-300';
      case 'few clouds':
        return 'bg-blue-300';
      default:
        return 'bg-primary-azureBlue';
    }
  };

  return (
    <div className="h-full p-2 text-center">
      <div
        className={`grid items-center justify-center gap-2 rounded-xl ${getColor()} bg-gradient-to-r py-4 text-white ${props.searchLoading ? 'animate-pulse' : ''}`}
      >
        <div className="flex justify-center">
          {props.searchLoading && (
            <div className="size-8 animate-pulse rounded-full bg-gray-300" />
          )}
          {!props.searchLoading && (
            <Image
              src={`http://openweathermap.org/img/wn/${props.forecast.weather[0]?.icon}@2x.png`}
              alt={props.forecast.weather[0]?.description || 'weather'}
              width={50}
              height={50}
            />
          )}
        </div>

        <div>
          {props.searchLoading ? (
            <div className="h-4 w-24 animate-pulse rounded-xl bg-gray-300" />
          ) : (
            <span>{format(new Date(props.forecast.dt * 1000), 'hh:mm a')}</span>
          )}
        </div>

        <div className="mt-2">
          {props.searchLoading ? (
            <div className="h-4 w-24 animate-pulse rounded-xl bg-gray-300" />
          ) : (
            <span>humi: {props.forecast.main.humidity}%</span>
          )}
        </div>

        <div>
          {props.searchLoading ? (
            <div className="h-4 w-24 animate-pulse rounded-xl bg-gray-300" />
          ) : (
            <span>temp: {Math.round(props.forecast.main.temp)}°C</span>
          )}
        </div>

        <div>
          {props.searchLoading ? (
            <div className="h-4 w-24 animate-pulse rounded-xl bg-gray-300" />
          ) : (
            <span>max: {Math.round(props.forecast.main.temp_max)}°C</span>
          )}
        </div>

        <div>
          {props.searchLoading ? (
            <div className="h-4 w-24 animate-pulse rounded-xl bg-gray-300" />
          ) : (
            <span>min: {Math.round(props.forecast.main.temp_min)}°C</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;
