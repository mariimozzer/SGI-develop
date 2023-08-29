
import api from './api';

// function obterTodosPayload(){

//     let retorno='{"name":"grupoTeste","email": "mariana@gmail.com", "password": "123", "grupo_id":"2"}';
//     let payload = [];
//     payload = JSON.parse(retorno);
//     return payload;
//     console.log(payload);
// }

function obterTodos(){
    return new Promise((resolve, reject) => {
        return api.get(`/usuario`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}


function obterPorId(id){
    return new Promise((resolve, reject) => {
        return api.get(`/grupo/${id}/usuarios`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

function cadastrar(usuario){
    return new Promise((resolve, reject) => {
        return api.post(`/register`,usuario)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}


function deletar(id){
    return new Promise((resolve, reject) => {
        return api.patch(`/usuario/${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}


export default {
    obterTodos,
    obterPorId,
    cadastrar,
    deletar
}





