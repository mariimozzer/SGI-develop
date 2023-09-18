<template>
    <div class="box-login">
    
        <div>
            <img class="logo" src="../../public/img/logo-preta.png">
            <br>
            <br>
            <h2 style="text-align: center;">Login</h2>
            <br>
    
        </div>
    
        <input type="text" placeHolder="roboflex@roboflex.com.br" v-model="email" class="form-control">
        <input type="password" placeHolder="123456" v-model="password" class="form-control">
        <br>
    
        <div class="form-check" @submit.prevent="login">
    
            <p v-if="errors.length">
                <ul>
                    <li v-for="error in errors" :key="error">{{ error }}</li>
                </ul>
            </p>
    
            <input class="form-check-input" type="radio" id="roboflex" value="roboflex" v-model="local">
            <label class="form-check-label" for="roboflex"> Roboflex </label>
            <br>
            <input class="form-check-input" type="radio" id="zontec" value="zontec" v-model="local">
            <label class="form-check-label" for="zontec"> Zontec </label>
    
        </div>
        <br>

        <Button value="Entrar" :callback="login"></Button>
    </div>
</template>

<script>
import Button from '../components/button/ButtonComponent.vue';
import axios from 'axios';

export default {
    name: "LoginComponent",

    components: {
        Button
    },

    data() {
        return {
            local: '',
            errors: [],
            email: '',
            password: '',
            token: ''
        }
    },

    mounted() {
        if (localStorage.local) {
            this.local = localStorage.local
        }
    },

    watch: {
        local(newLocal) {
            localStorage.local = newLocal;
        }
    },

    methods: {
        async login() {
        try {
          const response = await axios.post('http://192.168.0.6:8000/api/login', {
            email: this.email,
            password: this.password,    
          });
  
          this.token = response.data.token;
  
          //Armazena token no local storage
          localStorage.setItem('token', this.token);
  
          axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
  
          this.$router.push({ name: 'Dashboard' });
        } catch (error) {
          this.errors = [error.response.data.message];
        }
      }
    }
}
</script>

<style scoped>

.box-login {
    width: 350px;
    margin: auto;
    border: 1px solid #ddd;
    margin-top: 150px;
    padding: 30px;
    border-radius: 20px;
}

.logo {
    text-align: center;
    background-image: url(../../public/img/logo-preta.png);
    color: var(--first-color);
    padding: 100;
    font-size: 22px;
}
</style>