import Axios from 'axios'
import { ubahText } from '../Crypto';
import { globalText } from '../Text/GlobalText';
import { baseURL_R } from './BaseUrl';



const _Api = () => {
  let auth = sessionStorage.getItem(globalText.x_auth_access_token);

  const defaultOptions = {
    baseURL: baseURL_R,

    headers: {
      'Content-Type': 'application/json',
      'Authorization': auth && `Bearer ${ubahText(auth)}`
      // 'X-TOKEN' :auth,
      // 'X-CSRF-Token' : sessionStorage.getItem('tokencrsf')
    },
  };

  let instance = Axios.create(defaultOptions)
  instance.interceptors.request.use(function (config) {
    // const token =  auth ? auth : 'unAuthorization';
    // const token = 'Authorization';
    // config.headers.Authorization =  token;
    return config;
  });

  return instance;
};
export default _Api();
