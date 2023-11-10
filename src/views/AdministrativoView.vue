<template>
    <div class="admin-view">
        <div class="submenu-columns">
            <div v-for="submenu in adminSubmenu" :key="submenu.id" class="submenu-column" style="background-color:  #3b373b;">
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
    name: "AdministrativoComponent",
    data() {
        return {
            adminSubmenu: [{
                    id: 1,
                    category: 'Recursos Humanos',
                    icon: 'fa-solid fa-users',
                    links: [
                        { id: 1, name: 'SGP ', url: '/SGP' },

                    ],
                },


                {
                    id: 2,
                    category: 'Compras',
                    icon: 'fa-solid fa-cart-shopping',
                    links: [
                        { id: 2, name: 'Aprovação', url: '#' },
                        { id: 3, name: 'Autorização', url: '#' },
                        { id: 4, name: 'Cotação', url: '#' },
                        { id: 5, name: 'Pedido', url: 'http://192.168.0.5/sgi/admin/?page=solicitar_requisicao' },

                    ],
                },
                {
                    id: 3,
                    category: 'Facilities',
                    icon: 'fa-solid fa-truck',
                    links: [
                        { id: 6, name: 'Acesso', url: '#' },
                        { id: 7, name: 'NF +', url: '#' },
                        { id: 8, name: 'Recebimento Material', url: '#' },

                    ],
                },
                {
                    id: 4,
                    category: 'Finanças',
                    icon: 'fa-solid fa-sack-dollar',
                    links: [
                        { id: 9, name: 'Pagamento', url: '#' },

                    ],
                },
                {
                    id: 9,
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
    background-color: #3b373b;
    padding: 20px;
    margin-left: 0;
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
    color: white
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
    color: rgb(255, 255, 255);
    text-decoration: none;
}

a:hover {
    color: rgb(129, 127, 127);
}
</style>
  