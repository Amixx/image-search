import { createApi } from "unsplash-js";

const api = createApi({
    accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
});

export default api;