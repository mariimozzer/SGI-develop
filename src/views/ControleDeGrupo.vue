<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h2 class="titulo"> Gerenciamento de Grupo </h2>
                <hr>
            </div>
        </div>
        <div class="row sub-container">
            <div class="col-sm-2">
                <Button :callback="adicionarGrupo" value=" Adicionar Grupo"></Button>
            </div>
            <div>
                <Button :callback="vincularGrupo" value=" Vincular Grupo"></Button>
            </div>
        </div>
    
        <div class="row">
            <div class="col-sm-16">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome </th>
                        </tr>
                    </thead>
                    <tbody>
    
                        <tr v-for="item in grupos" :key="item.id">
    
                            <td>{{ item.id }}</td>
                            <td>{{ item.nome }}</td>
                            <td class="icon-tabela">
                                <i @click="editarGrupo(item)" class="fa fa-edit icones-tabela"></i> |
                                <i @click="excluirGrupo(item)" class="fa fa-trash icones-tabela"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

  
<script>
import Button from '../components/button/ButtonComponent.vue'
import grupoService from '@/services/grupo-service'
import Grupo from '@/models/Grupo'
import conversorDeData from '../utils/conversor-data'


export default {
    name: "ControleDeGrupo",
    components: {
        Button
    },
    filters: {
        data(data) {
            return conversorDeData.dataConversor(data);
        }
    },
    data() {
        return {

            grupos: [],
            info: null

        };
    },

    methods: {

        getAll() {
            grupoService.obterTodos()
                .then((response) => {
                    this.grupos = response.data.data.map((p) => new Grupo(p));
                    // this.grupos = payload.map((p) => new Grupo(p));
                })
                .catch(error => {
                    console.log(error)
                })
        },
        vincularGrupo() {
            this.$router.push({ name: "VincularGrupo" })
        },

        adicionarGrupo() {
            this.$router.push({ name: "AdicionarGrupo" })

        },

        editarGrupo(grupo) {
            this.$router.push({ name: "EditarGrupo", params: { id: grupo.id } })
        },

        excluirGrupo(grupo) {
            if (confirm(`Deseja excluir" ${grupo.id} - ${grupo.nome}"`)) {

                grupoService.deletar(grupo.id)
                    .then(() => {
                        let indice = this.grupos.findIndex(p => p.id == grupo.id);
                        this.grupos.splice(indice, 1);

                        setTimeout(() => {
                            alert("Grupo excluido com sucesso!");
                        }, 500);

                    })
                    .catch(error => {
                        console.log(error);
                    });

            }

        },
    },

    mounted() {
        this.getAll()


    }

};
</script>

<style scoped>
.icon-tabela {
    margin: 5px;
    cursor: pointer;
    color: dimgray;
}
</style>