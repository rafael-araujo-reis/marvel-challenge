import axios from "axios";
import md5 from "md5";

const ts = Math.floor(Date.now());
const publicKey = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY;
const privateKey = process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY;
const hash = md5(ts + privateKey + publicKey);

export const api = axios.create({
  baseURL: 'http://gateway.marvel.com/v1/public/',
  params: {
    ts,
    apikey: publicKey,
    hash
  }
});

export default api;