import api from './api';

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


export default {

    obterFuncionalidade,
    obterGrupos
  
}