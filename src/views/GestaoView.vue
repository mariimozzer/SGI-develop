<template>
    <div class="admin-view">
      <div class="submenu-columns">
        <div v-for="submenu in managementSubmenu" :key="submenu.id" class="submenu-column" style="background-color: #8794A3;">
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
    data() {
      return {
        managementSubmenu: [
          {
            id: 8,
            category: 'Gestão',
            icon: 'fa-solid fa-circle-nodes',
            links: [
              { id: 15, name: 'Chão de Fábrica', url: '#' },
              { id: 16, name: 'Dashboard', url: '#' },
              { id: 17, name: 'Relatórios', url: '#' },
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
    background-color: #8794A3;
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