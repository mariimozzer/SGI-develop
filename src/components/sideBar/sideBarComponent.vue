<template>
    <div>
        <div class="submenu-administrativo1" style="text-align: center;">
    
    <br><br><br><br><br>

    <h5>Controle</h5>
    <div class="categorias1" @click="teste()">
        <a style="text-decoration: none; color: rgb(255, 255, 255);">Grupos</a>
    </div>

    <div class="categorias1" @click="pessoas()">
        <a style="text-decoration: none; color: rgb(255, 255, 255);">Pessoas</a>
    </div>
    <div class="categorias1" @click="usuarios()">
        <a style="text-decoration: none; color: rgb(255, 255, 255);">Usuários</a>
    </div>
    <div class="categorias1" @click="setores()">
        <a style="text-decoration: none; color: rgb(255, 255, 255);">Setores</a>
    </div>
    <div class="categorias1" @click="funcionalidades()">
        <a style="text-decoration: none; color: rgb(255, 255, 255);">Telas</a>
    </div>
    <br>

    <h5>Vincular</h5>
    <div class="categorias1" @click="vinculoGrupos()">
        <a style="text-decoration: none; color: rgb(255, 255, 255);">Grupo</a>
    </div>
    <div class="categorias1" @click="vinculoTelas()">
        <a style="text-decoration: none; color: rgb(255, 255, 255);">Telas</a>
    </div>
    <br>
    <h5>Customização</h5>
    <div class="categorias1" @click="customizarSistema()">
        <a style="text-decoration: none; color: rgb(255, 255, 255);">Personalizar Sistema</a>
    </div>
    <br>

</div>

<br><br>
<table class="table table-hover">
<tbody>
    <tr v-for="item in menuPrincipal" :key="item.id">

    
    <div class="categorias1" @click="teste2(item.id)">
        <a style="text-decoration: none; color: rgb(255, 255, 255);">{{ item.nome }}</a>
    </div>
    </tr>
</tbody>
</table>


    </div>
   
</template>

<script>
import axios from 'axios'
import Menu from '@/models/Menu.js'

export default {
    data() {

        return {
            showDropdown2: null,
            menuPrincipal: '', 
            nome: ''


        }

    },

    methods: {

        teste2(id){
            axios.get(`http://192.168.0.6:8000/api/menu/estrutura/${id}`)
            .then(response => {
                this.menuPrincipal = response.data.data.map((p) => new Menu(p));
               
            })
         
            console.log('menu',this.menuPrincipal)
        },


        teste(){
            axios.get(`http://192.168.0.6:8000/api/menu/estrutura`)
            .then(response => {
                this.menuPrincipal = response.data.data.map((p) => new Menu(p));
               
            })
         
            console.log('menu',this.menuPrincipal)
        },


        toggleDropdown2(category) {
            if (this.showDropdown2 === category) {
                this.showDropdown2 = null;
            } else {
                this.showDropdown2 = category;
            }
        },

        grupos() {
            this.$router.push({ name: "ControleDeGrupo" })

        },

        pessoas() {
            this.$router.push({ name: "ControleDePessoas" })
        },

        usuarios() {
            this.$router.push({ name: "ControleDeUsuarios" })

        },

        setores() {
            this.$router.push({ name: "ControleDeSetores" })

        },
        funcionalidades() {
            this.$router.push({ name: "ControleDeFuncionalidade" })

        },
        vinculoGrupos() {
            this.$router.push({ name: "VincularGrupo" })

        },
        vinculoTelas() {
            this.$router.push({ name: "VincularFuncionalidade" })

        },
        customizarSistema() {
            this.$router.push({ name: "CustomizacaoSistema" })

        }



    }

}
</script>


<style scoped>
.category1 {
    margin-bottom: 10px;
    cursor: pointer;
}

.submenu-administrativo1 {
    background-color: #333;
    width: 300px;
    height: 100vh;
    position: fixed;
    /* z-index: -1; */
    top: 0;
    left: 0px;
    overflow-y: auto;
    /* scroll */
    padding: 20px;
    color: #f0f0f0;
}

/* @media only screen and (max-width: 768px) {
    .submenu-administrativo1 {
        width: 100%;
    }
} */

.option2 {
    padding: 5px;
    background-color: #444;
    border: 1px solid #555;
    margin-bottom: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.option2,
.dropdown .option2,
.categorias1 {
    width: 100%;
}

.dropdown {
    padding-left: 20px;
}

.dropdown .option2 {
    padding: 8px;
    background-color: #444;
    border: 1px solid #555;
    margin-bottom: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.dropdown .option2:hover {
    transform: translateY(0.1px);
    box-shadow: 0 0 10px var(--second-color);
    cursor: pointer;
}

.categorias1 {
    padding: 8px;
    background-color: #444;
    border: 1px solid #555;
    margin-bottom: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.categorias1:hover {
    transform: translateY(0.1px);
    box-shadow: 0 0 10px var(--second-color);
    cursor: pointer;
}
</style>
