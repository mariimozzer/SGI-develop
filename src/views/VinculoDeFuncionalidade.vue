<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h2 class="titulo"> Vincular Funcionalidade </h2>
                <hr>
            </div>
            <div>
                <label>Selecione um grupo: </label>
                <select class="combo" v-model="grupoSelecionado" @change="handleGrupoSelecionadoChange">
                        <option value="" disabled>Selecione o grupo</option>
                        <option v-for="item in grupos" :key="item.id" :value="item.id">(ID: {{item.id}} Nome: {{ item.nome }})</option></select>
            </div>
        <div> 
            <select>
                <option v-for="item in funcGrupos" :key="item.id" :value="item.id">Nome{{ item.nome }}</option>
            </select>
        </div>
        </div>
    </div>
</template>

<script>
import grupoService from '@/services/grupo-service';
import Grupo from '@/models/Grupo'
import funcGrupoService from '@/services/func_grupo-service'


export default {
    name: "VinculoDeFuncionalidade",
    components: {

    },

    data() {
        return {
            grupoSelecionado: '',
            grupos: [],
            funcGrupos: []

        }
    },

    methods: {

        obterFuncionalidadesGrupo(id) {
            funcGrupoService.obterFuncionalidade(id)
                .then(response => {
                    console.log(this.funcGrupos = response.data)
                    return this.funcGrupos = response.data;
                })
                .catch(error => {
                    console.log(error)
                })
        },


        getAllGrupos() {
            grupoService.obterTodos()
                .then((response) => {
                    this.grupos = response.data.data.map((p) => new Grupo(p));
                })
                .catch(error => {
                    console.log(error)
                })
        },

        handleGrupoSelecionadoChange() {
            if (this.grupoSelecionado) {
                this.obterFuncionalidadesGrupo(this.grupoSelecionado);
            }
        }

    },

    mounted() {
        this.getAllGrupos();
    }
}
</script>
