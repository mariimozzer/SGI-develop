<template>
    <div class="home">
      <nav class="navbar navbar-expand-lg navbar-light bg-dark" style="color: white; text-align: center;">
        <a class="navbar-brand" href="#">
          <img src="https://roboflex.com.br/wp-content/uploads/2023/05/logotipo-roboflex.png" alt="Logo" style="width: 75%;">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-nav ml-auto">
          <b-nav-item-dropdown right>
            <template v-slot:button-content>
              <i style="color: white;" class="fa-solid fa-circle-user"></i>
              <span class="username">&nbsp; Olá, {{ userName }}</span>
            </template>
            <b-dropdown-item style="color: black" href="/alterarSenha">
              <span style="color: black;"><i class="fa-solid fa-user-gear"></i>&nbsp; Alterar Senha</span>
            </b-dropdown-item>
            <b-dropdown-item style="color: black" @click="logout">
              <span style="color: black;"><i class="fa-solid fa-right-from-bracket"></i>&nbsp; Logout</span>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </div>
      </nav>
    
      <div class="three-columns" style="justify-content: center; color: white; text-align: center;">
        <div class="column" id="column1" >
          
          <br><br>
          <img  src="../../public/img/admColorido.png" @click="Administrativo()" width="500px"><br><br>
          <h1>Administrativo</h1>

        </div>
        <div class="column" id="column2">
          <br><br>
          <img  src="../../public/img/fabricaColorido.png"  width="500px"><br><br>
          <h1>Fábrica</h1>

        </div>
        <div class="column" id="column3">
          <br><br>
          <img  src="../../public/img/gestaoColorido.png"  width="500px"><br><br>
          <h1>Gestão</h1>

        </div>
      </div>
    </div>
  </template>
<script> 
import axios from 'axios';

export default {
    name: "Home3Component",
    components: {

    },
methods: {
  
  Administrativo(){
    this.$router.push({ name: 'AdministrativoView' })

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

    }
}

</script>

  
  <style scoped>
.home{
  margin-left: 0;
}

  nav {
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 1000;
  }
  
  .three-columns {
      display: flex;
      width: 100vw;
      height: 100vh;
      justify-content: space-between center;
      align-items: center;

  }
  
  .column:hover {
    background-color: #000000;
      box-shadow: 0 0 1000px rgb(0, 0, 0);
      cursor: pointer;
      opacity: 0.3;
  }



  
  .column {
      flex: 1;
      height: 100%;
      margin: 0px; 
      
  }
  
  #column1 {
     border: 10px solid none;
      background-color: var(--first-color);
      background-repeat: no-repeat;

      /* opacity: 0.2; */

  }
  
  #column2 {
      border: 10px solid  none;
      background-color:#393D40;
      background-repeat: no-repeat;

      /* opacity: 0.2; */

  }
  
  #column3 {
      border: 10px solid none;
      background-color:#515558;
      background-repeat: no-repeat;
      /* opacity: 0.2; */
  }
  </style>