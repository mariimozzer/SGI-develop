<template>
    <div class="admin-view">
        <div class="submenu-columns">
            <div v-for="submenu in geralSubmenu" :key="submenu.id" class="submenu-column" style="background-color: #C8E6C9;">
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
    name: "GeralComponent",
    data() {
        return {
            geralSubmenu: [{
                id: 8,
                category: 'Geral',
                icon: 'fa-solid fa-bullhorn',
                links: [
                    { id: 18, name: 'Agenda veículo', url: 'https://sites.google.com/roboflex.com.br/reservas/reservar-ve%C3%ADculo?authuser=0' },
                    { id: 19, name: 'Agenda salas', url: 'https://sites.google.com/roboflex.com.br/reservas/reservar-sala-de-reuni%C3%A3o?authuser=0', },
                    { id: 20, name: 'Chamados', url: '#' },
                    { id: 21, name: 'Comunicado', url: '#' },
                    { id: 22, name: 'Requisição', url: '#' },
                    { id: 23, name: 'Reuniões', url: '#' },
                ],
            }, ],
        };
    },

    created() {
        this.userName = localStorage.getItem('userName')

    },
};
</script>
  
<style scoped>
.admin-view {
    background-color: #C8E6C9;
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