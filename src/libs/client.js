import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: '85nbvkhgwi',
  apiKey: process.env.API_KEY,
});