<template>


    <div class="admin-view">
      <div class="submenu-columns">
        <div v-for="submenu in factorySubmenu" :key="submenu.id" class="submenu-column" style="background-color: #656e77;">
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
    name: "FabricaComponent",
    data() {
        return {
            factorySubmenu: [{
                    id: 5,
                    category: 'Produção',
                    icon: 'fa-solid fa-industry',
                    links: [
                        { id: 10, name: 'Apontamento', url: '#' },
                        { id: 11, name: 'Agenda', url: '#' },
                        { id: 12, name: 'Chão de Fábrica', url: '#' },
                        { id: 13, name: 'Teste', url: '#' },
                        { id: 14, name: 'Injeção', url: '#' },
                    ],
                },
                {
                    id: 6,
                    category: 'Mecânica',
                    icon: 'fa-solid fa-wrench',
                    links: [],
                },
                {
                    id: 7,
                    category: 'Qualidade',
                    icon: 'fa-solid fa-clipboard-check',
                    links: [],
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
nav {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
}

.admin-view {
    background-color: #656e77;
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
    color: white;
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