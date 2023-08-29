<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h2 class="titulo"> Gerenciamento de Setores </h2>
                <hr>
            </div>
        </div>
        <div class="row sub-container">
            <div class="col-sm-2">
                <Button :callback="adicionarSetor" value=" Adicionar "></Button>
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
    
                        <tr v-for="item in setores" :key="item.id">
    
                            <td>{{ item.id }}</td>
                            <td>{{ item.nome }}</td>
                            <td class="icon-tabela">
                                <i @click="editarSetor(item)" class="fa fa-edit icones-tabela"></i> |
                                <i @click="excluirSetor(item)" class="fa fa-trash icones-tabela"></i>
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
import setorService from '@/services/setor-service'
import Setores from '@/models/Setor'
import conversorDeData from '../utils/conversor-data'

export default {
    name: "ControleDeSetores",
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

            setores: [],
            info: null

        };
    },

    methods: {

        getAll() {
            setorService.obterTodos()
                .then((response) => {
                    this.setores = response.data.map((p) => new Setores(p));
                    //console.log(this.setores)
                })
                .catch(error => {
                    console.log(error)
                })
        },

        adicionarSetor() {
            this.$router.push({ name: "AdicionarSetor" })

        },

        editarSetor(setor) {
            this.$router.push({ name: "EditarSetor", params: { id: setor.id } })
        },

        excluirSetor(setor) {
            if (confirm(`Deseja excluir" ${setor.id} - ${setor.nome}"`)) {

                setorService.deletar(setor.id)
                    .then(() => {
                        let indice = this.setores.findIndex(p => p.id == setor.id);
                        this.setores.splice(indice, 1);

                        setTimeout(() => {
                            alert("Setor excluido com sucesso!");
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