import axios from "axios";

const api_base_url = `http://localhost:1337/api`;
export const makeRequest = async (endpoint: string, data?: any, token?: string): Promise<any | null> => {
    try {
        const response = await axios.post(`${api_base_url}${endpoint}`, data);
        return Promise.resolve(response.data);
    } catch (error: any) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          console.log(error.config);
          return null;
    }
}