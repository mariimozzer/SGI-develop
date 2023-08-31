<template>
    <div class="container">
    
    
    
    
        <!--MODAL -->
        <!-- <section class="modal hidden">
                                        <div class="flex">
                                            <button class="btn-close">x</button>
                                        </div>
                                        <div>
                                            <h3>Selecione funcionalidades para adicionar</h3>
                                        </div>
                                
                                    </section>
                                    <div class="overlay hidden"></div> -->
        <!--END MODAL-->
    
        <div class="row">
            <div class="col-sm-12">
                <h2 class="titulo"> Vincular Funcionalidade </h2>
                <hr/>
                <br>
            </div>
        </div>
    
        <div class="row">
    
            <div class="col-sm-12">
                <div class="form-group">
    
                    <label>Selecione um grupo: </label>
    
                    <select class="combo" v-model="grupoSelecionado" @change="handleGrupoSelecionadoChange">
                                                                                                    <option value="" disabled>Selecione o grupo</option>
                                                                                                    <option v-for="item in grupos" :key="item.id" :value="item.id">{{ item.nome }}</option></select>
                </div>
            </div>
        </div>
    
        <div class="col-sm-12">
            <div class="form-group">
                <label>Funcionalidade no grupo: </label>
                <div>
                    <table class="table table-bordered">
                        <th>
                            <div>
                                <b-button class="btn btn-success btn-open" v-b-modal.modal-1 > + </b-button>
                                <b-modal id="modal-1" title="Adicionar Funcionalidade">
                                    <ul>
                                        <li v-for="grupo in funcionalidadesParaAdicionar" :key="grupo.id">
                                            <label> <input type="checkbox" :value="grupo.id" v-model="selectedFuncToAdd" @change="toggleGrupoToAdd(grupo.id)"/> ID: {{ grupo.id }} Grupo: {{ grupo.nome }}          
                                                                </label>

                                                                {{ selectedFuncToAdd }}

                                        </li>
                                    </ul>
                                    
                                </b-modal>
                            </div>
                        </th>

                        {{ selectedFuncToAdd }}
    
                        <tr v-for="item in funcGrupos" :key="item.id" :value="item.id">
                            <thead>
    
                                <tr>
                                    <!-- <th scope="col">ID</th> -->
                                    <th scope="col">Nome</th>
                                    <th scope="col">Delete</th>
                                </tr>
    
                            </thead>
                            <tbody>
                                <tr>
                                    <!-- <th scope="row">{{ item.id }}</th> -->
                                    <td>{{ item.nome }}</td>
                                    <td><button @click="removerFuncionalidadeGrupo" type="button" class="btn btn-danger"><i class="fa fa-trash"></i></button></td>
    
                                </tr>
    
                            </tbody>
                        </tr>
                    </table>
    
                </div>
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
            funcGrupos: [],
            selectedGrupoToRemove: [],
            selectedFuncToAdd: [],
            funcionalidades: []
        }
    },

    methods: {

        toggleGrupoToAdd(grupoId) {
            if (this.selectedFuncToAdd.includes(grupoId)) {
                this.selectedFuncToAdd = this.selectedFuncToAdd.filter(id => id !== grupoId);
            } else {
                this.selectedFuncToAdd.push(grupoId);
            }
        },



        removerFuncionalidadeGrupo() {
            let selectedGrupoToRemove = this.selectedGrupoToRemove.map(user => user);
            selectedGrupoToRemove = parseFloat(selectedGrupoToRemove)
            const grupoSelecionado = this.grupoSelecionado;
            if (!grupoSelecionado || selectedGrupoToRemove.length === 0) {
                return;
            }

            funcGrupoService.deletar(selectedGrupoToRemove, grupoSelecionado)
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
    }
}
</script>

<style scoped>
.table {
    width: 100%
}

th,
td {
    border: 0.5px solid black;
}
</style>
