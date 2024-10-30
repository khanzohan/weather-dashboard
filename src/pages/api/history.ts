/* eslint-disable no-plusplus */
/* eslint-disable no-console */
import axios from 'axios';
import { addMonths, format } from 'date-fns';
import type { NextApiRequest, NextApiResponse } from 'next';

import type { CurrentWeatherType } from '@/types';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CurrentWeatherType[]>,
) => {
  if (req.method === 'POST') {
    const history: any[] = [];

    // Fetch historical data for the past 5 months
    const fetchHistory = async () => {
      const promises = [];
      for (let i = 0; i < 5; i++) {
        promises.push(
          axios.get(
            `https://api.openweathermap.org/data/3.0/onecall/day_summary?q=${req.body.q}&date=${format(addMonths(new Date(), -i), 'yyyy-MM-dd')}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`,
          ),
        );
      }
      return Promise.all(promises);
    };

    try {
      const responses = await fetchHistory();
      responses.forEach((response) => {
        history.push(response.data);
      });

      return res.status(200).json(history);
    } catch (error) {
      console.error('Error fetching data:', error);
      return res.status(500).json(history);
    }
  }

  return res.status(405).json([]); // Method Not Allowed
};

export default handler;
