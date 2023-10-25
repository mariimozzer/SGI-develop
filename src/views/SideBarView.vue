<template>
    <div class="sidebar-container">
        <!-- Sidebar Grupos -->
        <aside class="sidebar sidebar-grupos" style="text-align: center;">
            <br>
            <h3 class="sidebar-title">SGP</h3>
            <div class="category">
                <h5>Controle</h5>
                <div class="option" @click="handleOption('Grupos', 'Controle')">Grupos</div>
                <div class="option" @click="handleOption('Grupos', 'Controle')">Pessoas</div>
                <div class="option" @click="handleOption('Grupos', 'Controle')">Setores</div>
                <div class="option" @click="handleOption('Grupos', 'Controle')">Telas</div>
                <div class="option" @click="handleOption('Grupos', 'Controle')">Usuários</div>
    
            </div>
            <br>
            <div class="category">
                <h5>Vínculo</h5>
                <div class="option" @click="handleOption('Grupos', 'Vínculo')">Grupos</div>
                <div class="option" @click="handleOption('Grupos', 'Vínculo')">Telas</div>
    
            </div>
            <br>
            <div class="category" @click="toggleDropdown('Grupos')">
                <h5>Adicionar&nbsp; <i v-if="!showDropdown" class="fa-solid fa-chevron-down fa-2xs"></i><i v-if="showDropdown" class="fa-solid fa-angle-up fa-2xs"></i></h5>
                <div class="dropdown" v-if="showDropdown === 'Grupos'">
                    <div class="option" @click="handleOption('Grupos', 'Adicionar')">Grupos</div>
                    <div class="option" @click="handleOption('Grupos', 'Adicionar')">Pessoas</div>
                    <div class="option" @click="handleOption('Grupos', 'Adicionar')">Setores</div>
                    <div class="option" @click="handleOption('Grupos', 'Adicionar')">Telas</div>
                    <div class="option" @click="handleOption('Grupos', 'Adicionar')">Usuários</div>
    
                </div>
            </div>
        </aside>
    
    
        <div class="main-content">
            <div class="submenu-administrativo" style="text-align: center;">
    
                <br><br><br><br>
                <h3>SGP</h3>
                <br><br>
                <h5>Controle</h5>
                <div class="categorias" style="background-color:#f0f0f0;  ">
                    <a href="#" style="text-decoration: none; color: black;">Grupos</a>
                </div>
    
                <div class="categorias" style="background-color:#f0f0f0;  ">
                    <a href="#" style="text-decoration: none; color: black;">Pessoas</a>
                </div>
                <br>
                <div class="category" @click="toggleDropdown1('Grupos')">
                    <h5>Adicionar&nbsp; <i v-if="!showDropdown1" class="fa-solid fa-chevron-down fa-2xs"></i><i v-if="showDropdown1" class="fa-solid fa-angle-up fa-2xs"></i></h5>
                    <div class="dropdown" v-if="showDropdown1 === 'Grupos'">
                        <div class="option1" @click="handleOption('Grupos', 'Adicionar')">Grupos</div>
                        <div class="option1" @click="handleOption('Grupos', 'Adicionar')">Pessoas</div>
                        <div class="option1" @click="handleOption('Grupos', 'Adicionar')">Setores</div>
                        <div class="option1" @click="handleOption('Grupos', 'Adicionar')">Telas</div>
                        <div class="option1" @click="handleOption('Grupos', 'Adicionar')">Usuários</div>
    
                    </div>
                </div>
    
    
                <div class="submenu-administrativo1" style="text-align: center;">
    
                    <br><br><br><br>
                    <h3>SGP</h3>
                    <br><br>
                    <h5>Controle</h5>
                    <div class="categorias1"  >
                        <a href="#" style="text-decoration: none; color: rgb(255, 255, 255);">Grupos</a>
                    </div>
    
                    <div class="categorias1"   >
                        <a href="#" style="text-decoration: none; color: rgb(255, 255, 255);">Pessoas</a>
                    </div>
                    <br>
                    <div class="category1" @click="toggleDropdown2('Grupos')">
                        <h5>Adicionar&nbsp; <i v-if="!showDropdown2" class="fa-solid fa-chevron-down fa-2xs"></i><i v-if="showDropdown2" class="fa-solid fa-angle-up fa-2xs"></i></h5>
                        <div class="dropdown" v-if="showDropdown2 === 'Grupos'">
                            <div class="option2" @click="handleOption('Grupos', 'Adicionar')">Grupos</div>
                            <div class="option2" @click="handleOption('Grupos', 'Adicionar')">Pessoas</div>
                            <div class="option2" @click="handleOption('Grupos', 'Adicionar')">Setores</div>
                            <div class="option2" @click="handleOption('Grupos', 'Adicionar')">Telas</div>
                            <div class="option2" @click="handleOption('Grupos', 'Adicionar')">Usuários</div>
    
                        </div>
                    </div>
                </div>

    <div class="submenu-administrativo2" style="text-align: center;">
    
    <br><br><br><br>
    <h3>SGP</h3>
    <br><br>
    <h5>Controle</h5>
    <div class="categorias2"  >
        <a href="#" style="text-decoration: none; color: rgb(0, 0, 0);">Grupos</a>
    </div>

    <div class="categorias2"   >
        <a href="#" style="text-decoration: none; color: rgb(0, 0, 0);">Pessoas</a>
    </div>
    <br>
    <div class="category2" @click="toggleDropdown3('Grupos')">
        <h5>Adicionar&nbsp; <i v-if="!showDropdown3" class="fa-solid fa-chevron-down fa-2xs"></i><i v-if="showDropdown3" class="fa-solid fa-angle-up fa-2xs"></i></h5>
        <div class="dropdown" v-if="showDropdown3 === 'Grupos'">
            <div class="option3" @click="handleOption('Grupos', 'Adicionar')">Grupos</div>
            <div class="option3" @click="handleOption('Grupos', 'Adicionar')">Pessoas</div>
            <div class="option3" @click="handleOption('Grupos', 'Adicionar')">Setores</div>
            <div class="option3" @click="handleOption('Grupos', 'Adicionar')">Telas</div>
            <div class="option3" @click="handleOption('Grupos', 'Adicionar')">Usuários</div>

        </div>
    </div>
</div>
    
                <router-view></router-view>
    
            </div>
        </div>
    
    
    
    
    
       
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            showDropdown: null,
            showDropdown1: null,
            showDropdown2: null,
            showDropdown3: null


        };
    },
    methods: {
        //   handleOption(category, option) {
        //     alert(`Você clicou em ${option} na categoria ${category}`);
        //   },
        toggleDropdown(category) {
            if (this.showDropdown === category) {
                this.showDropdown = null;
            } else {
                this.showDropdown = category;
            }
        },

        toggleDropdown1(category) {
            if (this.showDropdown1 === category) {
                this.showDropdown1 = null;
            } else {
                this.showDropdown1 = category;
            }
        },

        toggleDropdown2(category) {
            if (this.showDropdown2 === category) {
                this.showDropdown2 = null;
            } else {
                this.showDropdown2 = category;
            }
        },

        toggleDropdown3(category) {
            if (this.showDropdown3 === category) {
                this.showDropdown3 = null;
            } else {
                this.showDropdown3 = category;
            }
        }
    }
};
</script>
  
<style scoped>
.submenu-administrativo {
    background-color: #f0f0f0;
    width: 300px;
    height: 100vh;
    position: fixed;
    z-index: -1;
    top: 0;
    left: 350px;
    overflow-y: hidden;
    padding: 20px;
}

.submenu-administrativo1 {
    background-color: #333;
    width: 300px;
    height: 100vh;
    position: fixed;
    z-index: -1;
    top: 0;
    left: 700px;
    overflow-y: hidden;
    padding: 20px;
    color: #f0f0f0;
}

.submenu-administrativo2 {
    background-color: #f0f0f0;
    width: 300px;
    height: 100vh;
    position: fixed;
    z-index: -1;
    top: 0;
    left: 1100px;
    overflow-y: hidden;
    padding: 20px;
    color: #000000;
}


/* .submenu-administrativo :hover{
    background-color: #ee782a;
   
} */

.categorias {
    padding: 8px;
    background-color: #ffffff;
    border: 1px solid #d3d0d0;
    margin-bottom: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.categorias:hover {
    transform: translateY(0.1px);
    box-shadow: 0 0 5px gray;
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


.categorias2 {
    padding: 8px;
    background-color: #F0F0F0;
    border: 1px solid #555;
    margin-bottom: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.categorias2:hover {
    transform: translateY(0.1px);
    box-shadow: 0 0 10px var(--second-color);
    cursor: pointer;
}
.sidebar-container {
    display: flex;
}

.sidebar {
    width: 300px;
    padding: 20px;
    border: 8px;
    background-color: #333;
    color: #fff;
    margin-bottom: 20px;
    overflow-y: scroll;
}

.sidebar-title {
    margin-bottom: 50px;
}

.category {
    margin-bottom: 10px;
    cursor: pointer;
}
.category1 {
    margin-bottom: 10px;
    cursor: pointer;
}

.category2 {
    margin-bottom: 10px;
    cursor: pointer;
}

/* h3 {
    margin-bottom: 20px;
  } */

.option {
    padding: 5px;
    background-color: #444;
    border: 1px solid #d3d0d0;
    margin-bottom: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.option1 {
    padding: 5px;
    background-color: #ffffff;
    border: 1px solid #fff;
    margin-bottom: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.option2 {
    padding: 5px;
    background-color: #444;
    border: 1px solid #555;
    margin-bottom: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.option3 {
    padding: 5px;
    background-color: #F0F0F0;
    border: 1px solid #555;
    margin-bottom: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}
.option3:hover{
    border: 2px solid #ff9900;
}
.option1:hover {
    background-color: var(--second-color);
}

.option:hover {
    background-color: #a09d9d;
}

.option2:hover {
    background-color: var(--second-color);
}

.dropdown {
    padding-left: 20px;
}

.dropdown .option {
    padding: 8px;
    background-color: #444;
    border: 1px solid #555;
    margin-bottom: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.dropdown .option:hover {
    background-color: #a09d9d;
}
</style>