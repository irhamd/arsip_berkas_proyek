
const fbase = window.location.host.split(':')[0];
const local = "localhost"
const s77 = "172.16.0.77"

export const baseURL_R_file =
        fbase == local ? process.env.REACT_APP_BASE_FILE :
        fbase == s77 ? process.env.REACT_APP_BASE_FILE_77 
        : process.env.REACT_APP_BASE_URL_FILE_PUBLIC

export const baseURL_R =
        fbase == local ? process.env.REACT_APP_BASE_URL :
        fbase == s77 ? process.env.REACT_APP_BASE_URL_77 
        : process.env.REACT_APP_BASE_URL_PUBLIC

export const baseURL_http =
        fbase == local ? process.env.REACT_APP_BASE_HTTP :
        fbase == s77 ? process.env.REACT_APP_BASE_HTTP_77 
        : process.env.REACT_APP_BASE_URL_PUBLIC_HTTP

