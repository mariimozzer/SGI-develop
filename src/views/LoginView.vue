<template>
    <div class="box-login">
    
        <div class="logo">
            <h1>Login</h1>
          
            
        </div>
    
        <Input label="E-mail" placeHolder="exemplo@exemplo.com"></Input>
    
        <Input label="Senha" placeHolder="123456" type="password"></Input>
    
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
    width: 300px;
    margin: auto;
    border: 1px solid #ddd;
    margin-top: 150px;
    padding: 30px;
    
}

.logo {
    text-align: center;
    color: var(--first-color);
    font-size: 22px;
} 
</style>