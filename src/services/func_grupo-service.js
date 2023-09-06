import api from './api';

function cadastrar(funcId, grupoId) {
    const payload = {
        idFunc: funcId,
      idGrupo: grupoId
    };
  
    return new Promise((resolve, reject) => {
      return api.post(`/funcionalidade/grupo`, payload)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

//Lista Grupos de uma funcionalidade
function obterFuncionalidade(id){
    return new Promise((resolve, reject) => {
        return api.get(`/grupo/${id}/funcionalidades`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

//Lista Grupos em que uma funcionalidade está
function obterGrupos(id){
    return new Promise((resolve, reject) => {
        return api.get(`/funcionalidade/${id}/grupos`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}


function deletar(funcId, grupoId){
    const payload = {
      idFunc: funcId,
        idGrupo: grupoId
    };
  
    return new Promise((resolve, reject) => {
      return api.delete(`/func/grupo`, payload)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }


  function deletarTeste(funcId, grupoId) {
    const payload = {
      idFunc: funcId,
      idGrupo: grupoId
    };
    
    const apiUrl = `/func/grupo`; 
    // console.log('API URL:', apiUrl);
    // console.log('Payload:', payload);
  
    return new Promise((resolve, reject) => {
      return api.delete(apiUrl, { data: payload })
        .then(response => {
          // console.log('API Response:', response.data); 
          resolve(response);
        })
        .catch(error => {
          console.error('API Error:', error); 
          reject(error);
        });
    });
  }

export default {

    obterFuncionalidade,
    obterGrupos,
    deletar,
    deletarTeste,
    cadastrar
  
}