<template>
    <div class="container">
    
        <div class="row">
            <div class="col-sm-12">
                <h2 class="titulo"> Vincular Funcionalidade </h2>
                <hr/>
                <br>
            </div>
        </div>
    
        <div class="row">
            <div class="col-sm-10">
                <div class="form-group">
    
                    <label> Selecione um grupo: </label>
                    <br>
    
                    <select class="form-control combo" v-model="grupoSelecionado" @change="handleGrupoSelecionadoChange">
                                                        <option value="" disabled> Selecione </option>  
                                                     <option v-for="item in grupos" :key="item.id" :value="item.id"> {{ item.nome }} </option></select>
                </div>
            </div>
            <hr>
            <div class="col-sm-10">
                <div class="form-group">
    
                    <label> Funcionalidades para adicionar: </label>
                    <tr>
                        <!-- <select class="combo" v-model="selectedFuncToAdd" @change="toggleGrupoToAdd(func.id)">
                    <option value="" disabled> Lista de Funcionalidades </option>
                    <option v-for="func in funcionalidadesParaAdicionar" :key="func.id">
                        {{ func.nome }}</option>
                    </select> -->
    
                        <ul>
                            <li v-for="func in funcionalidadesParaAdicionar" :key="func.id">
                                <label>
                                <input type="checkbox" :value="func.id" v-model="selectedFuncToAdd" @change="toggleGrupoToAdd(func.id)"/>
                                                                        ID: {{ func.id }} Nome: {{ func.nome }}          
                                                                        </label>
                            </li>
                        </ul>
    
    
    
                    </tr>
                    <Button :callback="adicionarFuncGrupo" value=" Adicionar Func Grupo"></Button> 
    
                </div>
            </div>
            <hr>
    
            <div class="col-sm-12">
                <div class="form-group">
                    <label v-if="grupoSelecionado"> Funcionalidade no grupo: </label>
                    <div>
    
                        <table class="table table-bordered">
    
                            <tr class="titulo-tabela" v-if="grupoSelecionado">
                                <td scope="col">Nome</td>
                                <td scope="col"></td>
                            </tr>
    
                            <tbody style="align-items: center ">
                                <tr v-for="item in funcGrupos" :key="item.id" :value="item.id">
                                    <td>{{ item.nome }}</td>
                                    <td style="width: 60px"><button @click="removerFuncionalidadeGrupo" type="button" class="btn btn-danger"><i class="fa fa-trash"></i></button></td>
                                </tr>
                            </tbody>
                        </table>
    
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import grupoService from '@/services/grupo-service';
import Button from '@/components/button/ButtonComponent.vue'
import Grupo from '@/models/Grupo'
import funcGrupoService from '@/services/func_grupo-service'
import Funcionalidade from '@/models/Funcionalidade';
import funcService from '@/services/funcionalidade-service'



export default {
    name: "VinculoDeFuncionalidade",
    components: {
        Button
    },

    data() {
        return {
            grupoSelecionado: '',
            grupos: [],
            funcGrupos: [],
            selectedGrupoToRemove: [],
            selectedFuncToRemove: [],
            selectedFuncToAdd: [],
            funcionalidades: []
        }
    },

    methods: {

        adicionarFuncGrupo() {
            let selectedFuncToAdd = this.selectedFuncToAdd.map(user => user);
            selectedFuncToAdd = parseFloat(selectedFuncToAdd)
            const grupoSelecionado = this.grupoSelecionado;
            if (!grupoSelecionado || selectedFuncToAdd.length === 0) {
                return;
            }



            funcGrupoService
                .cadastrar(selectedFuncToAdd, grupoSelecionado)
                .then(() => {
                    this.obterFuncionalidade(grupoSelecionado);
                    this.selectedFuncToAdd = [];
                })
                .catch(error => {
                    console.log(error);
                });

            console.log(selectedFuncToAdd)
            console.log(grupoSelecionado)
        },

        toggleGrupoToAdd(grupoId) {
            if (this.selectedFuncToAdd.includes(grupoId)) {
                this.selectedFuncToAdd = this.selectedFuncToAdd.filter(id => id !== grupoId);
            } else {
                this.selectedFuncToAdd.push(grupoId);
            }
        },

        toggleUserToRemove(funId) {
            if (this.selectedFuncToRemove.includes(funId)) {
                this.selectedFuncToRemove = this.selectedFuncToRemove.filter(id => id !== funId);
            } else {
                this.selectedFuncToRemove.push(funId);
            }
        },

        getAllfuncionalidades() {
            funcService.obterTodos()
                .then(response => {
                    this.funcionalidades = response.data.data.map((p) => new Funcionalidade(p));

                })
                .catch(error => {
                    console.log(error)
                })
        },


        removerFuncionalidadeGrupo() {
            let selectedFuncToRemove = this.selectedFuncToRemove.map(grupo => grupo);
            selectedFuncToRemove = parseFloat(selectedFuncToRemove)
            const grupoSelecionado = this.grupoSelecionado;
            if (!grupoSelecionado || selectedFuncToRemove.length === 0) {
                return;
            }

            console.log(selectedFuncToRemove)
            console.log(grupoSelecionado)


            funcGrupoService.deletar(selectedFuncToRemove, grupoSelecionado)
                .then(() => {
                    this.obterFuncionalidadesGrupo(grupoSelecionado);
                    this.selectedGrupoToRemove = [];
                })
                .catch(error => {
                    console.log(error);
                });
        },


        obterFuncionalidadesGrupo(id) {
            funcGrupoService.obterFuncionalidade(id)
                .then(response => {
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

    computed: {
        funcionalidadesParaAdicionar() {
            return this.funcionalidades.filter(grupo => !this.funcGrupos.some(funcGrupos => funcGrupos.id === grupo.id));
        }
    },

    mounted() {
        this.getAllGrupos();
        this.getAllfuncionalidades();
    }
}
</script>

<style scoped>
.titulo-tabela {
    font-weight: bold;
}

.table {
    width: 100%
}
</style>
