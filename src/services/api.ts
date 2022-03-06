import axios from "axios";
import md5 from "md5";

const ts = Math.floor(Date.now());
const publicKey = 'e805fe9719d145ceca74a945af62118b';
const privateKey = 'f6b59c078e44feba8bd7ead221ac82a8bb5f36a1';
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