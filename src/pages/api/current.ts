/* eslint-disable no-console */
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import type { CurrentWeatherType } from '@/types';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CurrentWeatherType | { error: string }>,
) => {
  if (req.method === 'POST') {
    try {
      const current = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${req.body.q}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`,
      );

      return res.status(200).json(current.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return res.status(500).json({ error: 'Failed to fetch weather data' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
};

export default handler;
