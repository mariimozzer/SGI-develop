<template>
    <div class="admin-view">
        <div class="submenu-columns">
            <div v-for="submenu in geralSubmenu" :key="submenu.id" class="submenu-column" style="background-color: #FFECB3;">
                <br>
                <h6><i :class="submenu.icon"></i> &nbsp; {{ submenu.category }}</h6>
                <ul>
                    <li v-for="link in submenu.links" :key="link.id">
                        <a :href="link.url">{{ link.name }}</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "ConfiguracaoComponent",
    data() {
        return {
            userName: null,


            geralSubmenu: [{
                    id: 10,
                    category: 'Grupos',
                    icon: 'fa-solid fa-network-wired',
                    links: [
                        { id: 24, name: 'Adicionar Grupo', url: '/controle-de-grupo/novo' },
                        { id: 25, name: 'Controle de Grupo', url: '/grupo' },
                        { id: 26, name: 'Vincular Grupo', url: '/vinculo-de-grupo' },
                    ],
                },

                {
                    id: 11,
                    category: 'Pessoas',
                    icon: 'fa-solid fa-user',
                    links: [
                        { id: 27, name: 'Adicionar Pessoa', url: '/controle-de-pessoas/novo' },
                        { id: 28, name: 'Controle de  Pessoas', url: '/pessoa' },
                    ],
                },

                {
                    id: 12,
                    category: 'Setores',
                    icon: 'fa-solid fa-shop',
                    links: [
                        { id: 29, name: 'Adicionar Setor', url: '/controle-de-setores/novo' },
                        { id: 30, name: 'Controle de  Setores', url: '/setores' },
                    ],
                },
                {
                    id: 13,
                    category: 'Telas',
                    icon: 'fa-solid fa-desktop',
                    links: [
                        { id: 31, name: 'Adicionar Tela', url: '/funcionalidade/novo' },
                        { id: 32, name: 'Controle de  Telas', url: '/funcionalidade' },
                        { id: 33, name: 'Vincular Telas', url: '/vinculo-de-funcionalidade' },

                    ],
                },
                {
                    id: 14,
                    category: 'Usuários',
                    icon: 'fa-solid fa-people-group',
                    links: [
                        { id: 34, name: 'Adicionar Usuário', url: '/usuario/novo' },
                        { id: 35, name: 'Controle de  Usuário', url: '/usuario' },
                    ],
                },


            ],
        };


    },

    created() {
        this.userName = localStorage.getItem('userName')

    },
};
</script>
  
<style scoped>
.admin-view {
    background-color: #FFECB3;
    padding: 20px;
}

.submenu-columns {
    display: flex;
    flex-wrap: wrap;
}

.submenu-column {
    width: 20%;
    box-sizing: border-box;
    margin-bottom: 20px;
    background-color: white;
    border-radius: 5px;
    padding: 10px;
}

h6 {
    margin: 0;
    font-size: 16px;
}

i {
    font-size: 20px;
    margin-right: 5px;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    margin: 5px 0;
}

a {
    color: black;
    text-decoration: none;
}

a:hover {
    color: rgb(129, 127, 127);
}
</style>