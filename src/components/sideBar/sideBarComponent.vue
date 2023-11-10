<template>
    <div class="submenu-administrativo1" style="text-align: center;">
    
        <br><br><br><br><br>

        <h5>Controle</h5>
        <div class="categorias1" @click="grupos()">
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


        <!-- <div class="category1" @click="toggleDropdown2('Grupos')">
            <h5>Adicionar&nbsp; <i v-if="!showDropdown2" class="fa-solid fa-chevron-down fa-2xs"></i><i v-if="showDropdown2" class="fa-solid fa-angle-up fa-2xs"></i></h5>
            <div class="dropdown" v-if="showDropdown2 === 'Grupos'">
                <div class="option2" @click="handleOption('adicionarGrupo')">Grupos</div>
                <div class="option2" @click="handleOption('Grupos', 'Adicionar')">Pessoas</div>
                <div class="option2" @click="handleOption('Grupos', 'Adicionar')">Setores</div>
                <div class="option2" @click="handleOption('Grupos', 'Adicionar')">Telas</div>
                <div class="option2" @click="handleOption('Grupos', 'Adicionar')">Usuários</div>
    
            </div>
        </div> -->
    </div>
</template>

<script>
export default {
    data() {

        return {
            showDropdown2: null,

        }

    },

    methods: {
        toggleDropdown2(category) {
            if (this.showDropdown2 === category) {
                this.showDropdown2 = null;
            } else {
                this.showDropdown2 = category;
            }
        },

        grupos(){
            this.$router.push({name: "ControleDeGrupo"})

        },

        pessoas(){
            this.$router.push({name: "ControleDePessoas"})
        },

        usuarios(){
            this.$router.push({name: "ControleDeUsuarios"})

        },

        setores(){
            this.$router.push({name: "ControleDeSetores"})

        },
        funcionalidades(){
            this.$router.push({name: "ControleDeFuncionalidade"})

        },
        vinculoGrupos(){
            this.$router.push({name: "VincularGrupo"})

        },
        vinculoTelas(){
            this.$router.push({name: "VincularFuncionalidade"})

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
    overflow-y: hidden;
    padding: 20px;
    color: #f0f0f0;
}

.option2 {
    padding: 5px;
    background-color: #444;
    border: 1px solid #555;
    margin-bottom: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
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
