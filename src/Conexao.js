import axios from 'axios'
const HTTP = axios.create({
  baseURL: 'https://localhost:44333/',
  headers: {
    'Authorization': 'Bearer ' + sessionStorage.getItem("TokenJWT")
  }
})

HTTP.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
 
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  //console.log(error.response);
  if (401 === error.response.status) {
      
    //sessionStorage.clear();
    //alert("Sessão expirou. Faça o login novamente")
    window.location = '/NaoAutorizado';
    
  } else if(400 === error.response.status){
    console.log(error.response)
  }
  else {
    //console.log(error.response.toJSON());
    //return Promise.reject(error);
  }
 
  
  return Promise.reject(error);
});

export default HTTP;