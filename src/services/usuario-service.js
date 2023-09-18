
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

function atualizar(usuario){
    return new Promise((resolve, reject) => {
        return api.put(`/usuario/${usuario.id}`, usuario)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}



function obterPorId(id){
    return new Promise((resolve, reject) => {
        return api.get(`/usuario/${id}`)
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
        return api.delete(`/usuario/${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}


export default {
    obterTodos,
    obterPorId,
    cadastrar,
    deletar,
    atualizar
}





