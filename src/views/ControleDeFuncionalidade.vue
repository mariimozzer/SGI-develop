<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h2 class="titulo"> Gerenciamento de Funcionalidades </h2>
                <hr>
            </div>
        </div>
        <div class="row sub-container">
            <div class="col-sm-2">
                <Button :callback="adicionarFuncionalidade" value=" Adicionar "></Button>
            </div>
        </div>
    
        <div class="row">
            <div class="col-sm-16">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>URL</th>
                            <th>Menu Principal</th>
                            <th>ID Sistema</th>
    
                        </tr>
                    </thead>
                    <tbody>
    
                        <tr v-for="item in funcionalidades" :key="item.id">
    
                            <td>{{ item.id }}</td>
                            <td>{{ item.nome }}</td>
                            <td>{{ item.url }}</td>
                            <td>{{ item.menu }}</td>
                            <td>{{ item.sistema_id }}</td>
                            <td class="icon-tabela">
                                <i @click="editarFuncionalidade(item)" class="fa fa-edit icones-tabela"></i> |
                                <i @click="excluirFuncionalidade(item)" class="fa fa-trash icones-tabela"></i>
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
import funcionalidadeService from '@/services/funcionalidade-service'
import Funcionalidade from '@/models/Funcionalidade'
import conversorDeData from '../utils/conversor-data'

export default {
    name: "ControleDeFuncionalidades",
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

            funcionalidades: [],
            info: null

        };
    },

    methods: {

        getAllFuncionalidades() {
            funcionalidadeService.obterTodos()
                .then((response) => {
                    this.funcionalidades = response.data.data.map((p) => new Funcionalidade(p));
                    //console.log(this.pessoas)
                })
                .catch(error => {
                    console.log(error)
                })
        },

        adicionarFuncionalidade() {
            this.$router.push({ name: "AdicionarFuncionalidade" })

        },

        editarFuncionalidade(funcionalidade) {
            this.$router.push({ name: "EditarFuncionalidade", params: { id: funcionalidade.id } })
        },

        excluirFuncionalidade(funcionalidade) {
            if (confirm(`Deseja excluir" ${funcionalidade.id} - ${funcionalidade.nome}"`)) {

                funcionalidadeService.deletar(funcionalidade.id)
                    .then(() => {
                        let indice = this.funcionalidades.findIndex(p => p.id == funcionalidade.id);
                        this.funcionalidades.splice(indice, 1);

                        setTimeout(() => {
                            alert("Funcionalidade excluida com sucesso!");
                        }, 500);

                    })
                    .catch(error => {
                        console.log(error);
                    });

            }

        },
    },

    mounted() {
        this.getAllFuncionalidades()


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