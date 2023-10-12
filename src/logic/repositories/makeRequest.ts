import axios from "axios";
import { API_BASE_URL } from "../../utils/constants";

// const api_base_url = API_BASE_URL.strapiUrl;
// export const headers =  {
//     Authorization: `Bearer ${localStorage.getItem('jwt')}`,
//   } 

export interface AuthParams {
  method: 'post' | 'get' | 'put' | 'delete',
  endpoint: string,
  data?: any | undefined,
  headers?: any
}
export const makeRequest = async (authParams: AuthParams): Promise<any | null> => {
  const {method, endpoint, data, headers} = authParams;
    try {
        const response = await axios({
          method,
          url: `${endpoint}`,
          data: data,
          headers: headers
        });
        return response.data;
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
          console.log('on return null');
          return null;
    }
}