import axios from 'axios'

const HTTP = axios.create({
  //baseURL: 'https://localhost:44333',
  baseURL: 'https://api.mvcsistemas.com.br',
  headers: {
    'Authorization': 'Bearer ' + sessionStorage.getItem("TokenJWT")
  }
})

HTTP.interceptors.request.use((config) => {
    
  return config;
}, (error) => {
  
  return Promise.reject(error);
});



HTTP.interceptors.response.use(function (response) {
 
 
  return response;
}, function (error) {

  if (401 === error.response.status) {
    //sessionStorage.clear();
    //alert("Sessão expirou. Faça o login novamente")
    //window.location = '/NaoAutorizado';
    alert("Sem permissão para acessar.")
    
  } else if(400 === error.response.status){
    //console.log(error.response)
  }else if(403 === error.response.status){
    alert("Sem permissão para acessar.")
  }
  else {
    //console.log(error.response.toJSON());
    //return Promise.reject(error);
  }
 
  
  return Promise.reject(error);
});

export default HTTP;