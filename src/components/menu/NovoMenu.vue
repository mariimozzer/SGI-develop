<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-dark" style="color: white; ">
            <a class="navbar-brand" href="#">
            <img src="../../../public/img/logo-site.png" alt="Logo" style="width: 120px;">
             </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
             <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav mx-auto">
                    <button v-for="menu in menus" :key="menu.id" @mouseover="activateMenu(menu)"  class="btn menu-block text-white mb-2 mr-2" :class="{ 'active': menu.active }" :style="{ backgroundColor: botoes }"> 
                        <i :class="menu.icon" ></i> &nbsp; &nbsp;{{ menu.name }}
                    </button>
                </ul>
                <div class="icons">
                    <!-- <i class="fas fa-search"></i>
                         <i class="fas fa-cogs"></i>
                         <i class="fas fa-bell"></i> -->
                    <!-- <a href="/setores" class="fas fa-user"></a>
                        <i class="fas fa-user" url="/setores"></i> -->
                    <div class="navbar-nav ml-auto">
                        <b-nav-item-dropdown right>
                            <template v-slot:button-content><i style="color: white;" class="fa-solid fa-circle-user"></i>
                            <span class="username">&nbsp; Olá, {{ userName }}</span>
                            </template>
                            <b-dropdown-item style="color: black" href="/alterarSenha">
                            <span style="color: black;"><i class="fa-solid fa-user-gear"></i>&nbsp; Alterar Senha</span>
                           </b-dropdown-item>
                        <b-dropdown-item style="color: black" @click="logout">
                            <span style="color: black;"><i class="fa-solid fa-person-walking-arrow-right"></i>&nbsp; Logout</span>
                           </b-dropdown-item>
                         
                       </b-nav-item-dropdown>
                  </div>
                </div>
            </div>
        </nav>
    
        <div v-if="activeMenu && activeMenu.submenus" class="content" :style="{ backgroundColor: activeMenu.color} " @mouseleave="closeContent">
    <div v-if="activeMenu.submenus.length > 0" class="submenu-columns">
      <div v-for="(submenu) in activeMenu.submenus" :key="submenu.id" class="submenu-column">
        <h6> <i :class="submenu.icon"></i> &nbsp; {{ submenu.category }}</h6>
        <ul style="list-style-type: none;" >
             <li v-for="link in submenu.links" :key="link.id">
            <a style="cursor: pointer; color: black; text-decoration: none;" :href="link.url">{{ link.name }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
           
        <!-- <div v-if="showSidebar" class="sidebar">
            <ul>
                <li v-if="selectedLink" :key="selectedLink.id" style="text-align: center;">
                    <h6>{{ selectedLink.name }}</h6>
                      <br>
                 
                    <b-dropdown-item style="color: rgb(255, 255, 255)" href="/alterarSenha">
                            <span style="color: rgb(255, 255, 255);"><i class="fa-solid fa-user-gear"></i>&nbsp; Oções de Menu aqui</span>
                           </b-dropdown-item>
                </li>
            </ul>
        </div> -->
    </div>
</template>


<script>
import axios from 'axios';


export default {
    components: {},

    data() {
        return {
            deslogar: null,
            userName: null,
            botoes: '#343537',

            menus: [

                {
                    id: 1,
                    name: 'ADMINISTRATIVO',
                    icon: "fa-solid fa-briefcase",
                    active: false,
                    color: '#FFE2B7',
                    submenus: [{
                            id: 1,
                            category: 'Recursos Humanos',
                            icon: 'fa-solid fa-users',
                            links: [
                                { id: 1, name: 'SGP', url: '/SGP' },
                                { id: 2, name: 'Comunicados', url: '#' },
                            ],
                        },
                        {
                            id: 2,
                            category: 'Compras',
                            icon: 'fa-solid fa-cart-shopping',
                            links: [
                                { id: 3, name: 'Pedido', url: '#' },
                                { id: 4, name: 'Autorização', url: '#' },
                                { id: 5, name: 'Cotação', url: '#' },
                                { id: 6, name: 'Aprovação', url: '#' },
                            ],
                        },
                        {
                            id: 3,
                            category: 'Facilities',
                            icon: 'fa-solid fa-truck',
                            links: [
                                { id: 7, name: 'Acesso', url: '#' },
                                { id: 8, name: 'Recebimento Material', url: '#' },
                                { id: 9, name: 'NF +', url: '#' },
                            ],
                        },
                        {
                            id: 4,
                            category: 'Finanças',
                            icon: 'fa-solid fa-piggy-bank',
                            links: [
                                { id: 10, name: 'Pagamento', url: '#' },

                            ],
                        },
                    ],
                },

                {
                    id: 2,
                    name: 'FÁBRICA',
                    icon: 'fa-solid fa-tablet-screen-button',
                    active: false,
                    color: '#BBDEFB',
                    submenus: [{
                            id: 5,
                            category: 'Produção',
                            icon: 'fa-solid fa-industry',
                            links: [
                                { id: 11, name: 'Apontamento', url: '#' },
                                { id: 12, name: 'Agenda', url: '#' },
                                { id: 13, name: 'Chão de Fábrica', url: '#' },
                                { id: 14, name: 'Teste', url: '#' },
                                { id: 15, name: 'Injeção', url: '#' },


                            ],
                        },
                        {
                            id: 6,
                            category: 'Mecânica',
                            icon: 'fa-solid fa-wrench',
                            links: [

                            ],
                        },
                        {
                            id: 7,
                            category: 'Qualidade',
                            icon: 'fa-solid fa-clipboard-check',
                            links: [

                            ],
                        },
                    ],
                },
                {
                    id: 3,
                    name: 'GESTÃO',
                    icon: 'fa-solid fa-user-tie',
                    active: false,
                    color: '#D1C4E9',
                    submenus: [{
                            id: 8,
                            category: 'Gestão',
                            icon: 'fa-solid fa-chart-line',
                            links: [
                                { id: 16, name: 'Dashboard', url: '#' },
                                { id: 17, name: 'Chão de Fábrica', url: '#' },
                                { id: 18, name: 'Relatórios', url: '#' },
                            ],
                        },

                    ],
                },

                {
                    id: 4,
                    name: 'GERAL',
                    icon: "fa-solid fa-file-pen",
                    active: false,
                    color: '#C8E6C9',

                    submenus: [{
                            id: 9,
                            category: 'Geral',
                            icon: 'fa-solid fa-bullhorn',
                            links: [
                                { id: 19, name: 'Reuniões', url: '#' },
                                { id: 20, name: 'Comunicado', url: '#' },
                                { id: 21, name: 'Requisição', url: '#' },
                                { id: 22, name: 'Agenda veículo', url: '#' },
                                { id: 23, name: 'Agenda salas', url: '#' },
                                { id: 24, name: 'Chamados', url: '#' },

                            ],
                        },

                    ],
                },

                {
                    id: 5,
                    name: 'Configuração',
                    icon: 'fa-solid fa-screwdriver-wrench',
                    active: false,
                    color: '#FFCDD2',

                    submenus: [

                    ],
                },
            ],

            activeMenu: null,
            activeSubMenu: null,
            sideBarMenus: [],
            showSidebar: false,
            selectedLink: null
        };
    },
    methods: {

        // openSidebar(link) {
        //     this.showSidebar = true;
        //     this.selectedLink = link;
        // },

        activateMenu(menu) {
        
                this.activeMenu = menu;
                this.menus.forEach((m) => {
                    m.active = m === menu;
                });

                if (menu.submenus && menu.submenus.length > 0) {
                    this.activateSubMenu(menu.submenus[0]);

                
            } else {
                this.showSidebar = false;
                this.sideBarMenus = [];
            }
        },

        activateSubMenu(submenu) {
            if (submenu.category === 'SGP ') {
                console.log('oi')
                this.showSidebar = true;
                this.sideBarMenus = [
                    { id: 1, name: 'Adicionar', url: '/controle-de-pessoas/novo' },
                    { id: 2, name: 'Vincular', url: '#' },
                    { id: 3, name: 'Controle', url: '/setores' },
                ];

            } else {
                this.showSidebar = false;
                this.sideBarMenus = [];
            }
        },

        logout() {
            const token = localStorage.getItem('token')
            axios
                .post('http://192.168.0.6:8000/api/logout', {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(() => {
                    this.$router.push('/');
                    localStorage.removeItem('token')
                    localStorage.removeItem('userName')
                })
                .catch(error => {
                    console.error('Logout failed:', error);
                });
        },

        closeContent() {
            this.activeMenu = null;
        },
    },

    created() {
        this.userName = localStorage.getItem('userName')

    },


    computed: {
       
    }
};
</script>

<style>

.submenu-columns {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.submenu-column {
    width: 20%;
    box-sizing: border-box;
    margin-bottom: 20px;
}

.username {
    color: white;
    font-family: 'montserrat', sans-serif;
}

.navbar {
    padding: 100%;
    width: 100%;
    top: 0;
    cursor: pointer;
    height: 100px;
}

.container {
    padding-top: 70px;
    cursor: pointer;
}

.menu-block.active {
    background-color: #f8f9fa;
}

.menu-block {
    background-color: #6c757d;
}

.menu-block:hover {
    background-color: #f8f9fa;
}

.content {
    width: 100%;
    min-height: 200px;
    padding: 20px;
    box-sizing: border-box;
}

.submenu {
    background-color: inherit;
    padding: 10px;
    cursor: pointer;
}

.submenu h5 {
    /* font-size: 14px; */
    margin-bottom: 5px;
    color: #333;
}

.submenu-container {
    border: 2px solid;
    border-radius: 5px;
    margin-bottom: 10px;
}

.submenu ul {
    list-style: none;
    padding: 0;
}

.submenu li a {
    color: #333;
    text-decoration: none;
}

.icons {
    display: flex;
    align-items: center;
}

.icons a {
    margin-left: 10px;
    cursor: pointer;
    color: white
}

.sidebar {
    width: 250px;
    background-color: #333;
    color: #ffffff;
    height: 100%;
    position: fixed;
    top: 20;
    left: 0;
    padding-top: 20px;
}

.sidebar ul {
    list-style-type: none;
    padding: 0;
}

.sidebar li {
    padding: 0px;
}

.sidebar a {
    color: #ffffff;
    text-decoration: none;
}

.sidebar a:hover {
    text-decoration: underline;
}
</style>
