<template>
    <div class="box-login">
    
        <div >
            <img class="logo" src="../../public/img/logo-preta.png">
            <br> 
            <br>
            <h2 style="text-align: center;">Login</h2>
          <br>
            
        </div>
    
        <input type="text" placeHolder="roboflex@roboflex.com.br" class="form-control">
        <input type="password"    placeHolder="123456" class="form-control">
        <br>
        <Button value="Entrar" :callback="login"></Button>
    </div>
</template>

<script>
import Button from '../components/button/ButtonComponent.vue';

export default {
    name: "LoginComponent",

    components: {
        Button
    },

    data() {
        return {

        }
    },

    methods: {
        login() {
            this.$router.push({ name: 'Dashboard' })
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
    
}

.logo {
    text-align: center;
    background-image: url(../../public/img/logo-preta.png);
    color: var(--first-color);
    padding: 100;
    font-size: 22px;
} 
</style>