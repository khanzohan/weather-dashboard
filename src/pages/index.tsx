/* eslint-disable no-nested-ternary */
/* eslint-disable no-plusplus */
/* eslint-disable no-alert */
/* eslint-disable no-console */

import axios from 'axios';
import { addDays, format, isSameDay } from 'date-fns';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

import ForecastCard from '@/components/common/ForecastCard';
import Meta from '@/components/common/Meta';
import SearchIcon from '@/components/common/SearchIcon';
import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { RootState } from '@/store';
import { pushForecastCache } from '@/store/slices/cacheSlice';
import type { CurrentWeatherType } from '@/types';

const Dashboard = () => {
  const [fiveDays, setFiveDays] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>('New York');
  const [debouncedFilter, setDebouncedFilter] = useState<string>('New York');
  const [current, setCurrent] = useState<CurrentWeatherType | null>(null);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const cache = useSelector((state: RootState) => state.cache);

  const fetchCurrent = async () => {
    if (!debouncedFilter) return;

    setSearchLoading(true);

    try {
      const currentResponse = await axios.post('/api/current', {
        q: debouncedFilter,
      });

      setCurrent(currentResponse.data);
    } catch (err) {
      toast.error('No matches. Please try again.');
      console.error('Error fetching weather data:', err);
    } finally {
      setSearchLoading(false);
    }
  };

  const fetchForecast = async () => {
    if (!debouncedFilter) return;

    setSearchLoading(true);

    try {
      const forecastResponse = await axios.post('/api/forecast', {
        q: debouncedFilter,
      });

      if (forecastResponse.status === 200)
        dispatch(
          pushForecastCache({
            data: forecastResponse.data,
            filter: debouncedFilter,
          }),
        );
    } catch (err) {
      toast.error('No matches. Please try again.');
      console.error('Error fetching weather data:', err);
    } finally {
      setSearchLoading(false);
    }
  };

  // I attempted to find an API that provides historical weather data, but it requires a paid API key.
  // const fetchHistory = async () => {
  //   if (!debouncedFilter) return;

  //   setSearchLoading(true);

  //   try {
  //     const historyResponse = await axios.post('/api/history', {
  //       q: debouncedFilter,
  //     });

  //     if (historyResponse.status === 200)
  //       dispatch(
  //         pushForecastCache({
  //           data: historyResponse.data,
  //           filter: debouncedFilter,
  //         }),
  //       );
  //   } catch (err) {
  //     toast.error('No matches. Please try again.');
  //     console.error('Error fetching weather data:', err);
  //   } finally {
  //     setSearchLoading(false);
  //   }
  // };

  // Effect to calculate next 5 days & Fetch forecast data by default
  useEffect(() => {
    const temp = [];
    for (let i = 0; i <= 5; i++) {
      temp.push(format(addDays(new Date(), i), 'yyyy-MM-dd'));
    }
    setFiveDays(temp);

    // Fetch forecast data by default
    if (cache.forecastCache?.every((fore) => fore.filter !== debouncedFilter))
      fetchForecast();
  }, []);

  // Effect to handle debouncing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilter(filter);
      setSearchLoading(false);
    }, 800);

    return () => {
      clearTimeout(handler);
    };
  }, [filter]);

  useEffect(() => {
    fetchCurrent();
    // fetchHistory();

    const forecastCondition =
      cache.forecastCache.every((fore) => fore.filter !== debouncedFilter) ||
      cache.forecastCache.some(
        (fore) =>
          fore.filter === debouncedFilter &&
          fore.data.list[0] &&
          fore.data.list[0].dt * 1000 < new Date().getTime(),
      );

    if (forecastCondition) fetchForecast();
  }, [debouncedFilter]);

  return (
    <div className="scrollbar-thin flex min-h-screen justify-center bg-[url(/assets/img/sky5.png)] bg-cover px-8">
      <Meta />

      <div className="my-24 size-full max-w-[1650px] rounded-3xl border-4 border-white px-2 py-8 md:px-16">
        <div className="flex flex-wrap items-center justify-around rounded-2xl bg-gray-600 py-2 2xl:justify-between 2xl:px-16">
          <div className="flex items-center gap-4 text-xl font-semibold text-white">
            <img src="/assets/img/icon.png" alt="icon" width={40} />
            <span>Weather Dashboard</span>
          </div>
          <div className="flex">
            <div className="relative">
              <SearchIcon />
              <Input
                type="search"
                id="default-search"
                className="max-w-64 rounded-xl border bg-white p-2 ps-8"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Search"
                required
              />
            </div>
          </div>
        </div>

        <div className="grid 2xl:px-16">
          <div className="mt-8 grid gap-8 2xl:grid-cols-2">
            <div className="rounded-3xl border-2 border-white bg-[#ffffff33] text-white shadow-fullShadow backdrop-blur-md">
              <div className="grid justify-between gap-4 p-8 xl:grid-cols-2">
                {searchLoading ? (
                  <div className="animate-pulse">
                    <div className="flex justify-between">
                      <div className="h-8 w-36 rounded-full bg-gray-300" />
                      <div className="h-8 w-36 rounded-full bg-gray-300" />
                    </div>
                    <div className="mt-4 h-36 w-full rounded-3xl bg-gray-300" />
                  </div>
                ) : (
                  current && (
                    <div className="grid max-w-96 text-center">
                      <div className="flex flex-wrap items-end justify-between px-2">
                        <div className="text-2xl text-blue-400">
                          {current.name}
                        </div>
                        <div>
                          <span>Humidity:</span>
                          <span className="pl-2 text-blue-400">
                            {current?.main.humidity}%
                          </span>
                        </div>
                      </div>
                      <div className="text-6xl font-extralight md:text-9xl">
                        {Math.round(current.main.temp)}°C
                      </div>
                    </div>
                  )
                )}
                {searchLoading ? (
                  <div className="animate-pulse">
                    <div className="mt-2 h-4 rounded-3xl bg-gray-300" />
                    <div className="mt-2 h-4 rounded-3xl bg-gray-300" />
                    <div className="mt-2 h-4 rounded-3xl bg-gray-300" />
                    <div className="mt-2 h-4 rounded-3xl bg-gray-300" />
                    <div className="mt-2 h-4 rounded-3xl bg-gray-300" />
                    <div className="mt-2 h-4 rounded-3xl bg-gray-300" />
                    <div className="mt-2 h-4 rounded-3xl bg-gray-300" />
                  </div>
                ) : (
                  <div className="min-w-24">
                    <div>
                      <span>Maximum:</span>
                      <span className="pl-2 text-blue-400">
                        {current && Math.round(current?.main.temp_max)}°C
                      </span>
                    </div>
                    <div>
                      <span>Minimum:</span>
                      <span className="pl-2 text-blue-400">
                        {current && Math.round(current.main.temp_min)}°C
                      </span>
                    </div>
                    <div>
                      <span>Description:</span>
                      <span className="pl-2 text-blue-400">
                        {current?.weather[0]?.description}
                      </span>
                    </div>
                    <div>
                      <span>Pressure:</span>
                      <span className="pl-2 text-blue-400">
                        {current?.main.pressure}hpa
                      </span>
                    </div>
                    <div>
                      <span>Grand Level:</span>
                      <span className="pl-2 text-blue-400">
                        {current?.main.grnd_level}hpa
                      </span>
                    </div>
                    <div>
                      <span>Sea Level:</span>
                      <span className="pl-2 text-blue-400">
                        {current?.main.sea_level}hpa
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-full rounded-3xl border-2 border-white bg-[#ffffff33] p-4 text-white shadow-fullShadow backdrop-blur-md">
              <Tabs defaultValue="forecast" className="w-full">
                <TabsList className="grid w-full grid-cols-2 rounded-full bg-gray-600">
                  <TabsTrigger className="rounded-full" value="history">
                    Past 1 year
                  </TabsTrigger>
                  <TabsTrigger className="rounded-full" value="forecast">
                    Next 5 days
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="history">
                  I attempted to find an API that provides historical weather
                  data, but it requires a paid API key.
                </TabsContent>
                <TabsContent className="grid gap-4" value="forecast">
                  {fiveDays.map((day, dayIndex) => (
                    <div key={dayIndex}>
                      {cache.forecastCache?.some(
                        (fore) => fore.filter === debouncedFilter,
                      ) && (
                        <div className="px-4">
                          {format(day, 'MMM dd, yyyy, eeee')}
                        </div>
                      )}
                      <div
                        className={`grid grid-cols-1 rounded-xl md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 ${dayIndex === 0 ? 'justify-end' : dayIndex === 5 ? 'justify-start' : 'justify-between'}`}
                      >
                        {cache.forecastCache
                          ?.find((fore) => fore.filter === debouncedFilter)
                          ?.data.list?.filter((item) =>
                            isSameDay(
                              new Date(item.dt * 1000),
                              addDays(new Date(day), 1),
                            ),
                          )
                          .map((item, itemIndex) => (
                            <ForecastCard
                              forecast={item}
                              searchLoading={searchLoading}
                              key={itemIndex}
                            />
                          ))}
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        <Toaster />
      </div>
    </div>
  );
};

export default Dashboard;
