<template>
  <form @submit.prevent="login" class="container">
    <FlashMessageError></FlashMessageError>
    <div class="box-login">
      <div style="text-align: center;">
        <img class="logo" src="../../public/img/tha3.png" width="150px"><br><br>        
      </div>

      <b-input-group class="mb-2">
        <b-input-group-prepend is-text>
          <b-icon icon="envelope-fill"></b-icon>
        </b-input-group-prepend>
        <b-form-input type="text" v-model="email" :state="validationState" @blur="emailTouched = true" placeholder="roboflex@roboflex.com.br" class="form-control" ref="emailInput"></b-form-input>
      </b-input-group>
      <b-input-group class="mb-2">
        <b-input-group-prepend is-text>
          <b-icon icon="lock-fill"></b-icon>
        </b-input-group-prepend>
        <b-form-input type="password" v-model="password" :state="validationState" @blur="passwordTouched = true" placeholder="12345678" class="form-control" ref="passwordInput"></b-form-input>
      </b-input-group>
      <br>

      <div class="form-check ">
        <input class="form-check-input" type="radio" id="roboflex" value="roboflex" v-model="local">
        <label class="form-check-label" for="roboflex"> Roboflex </label>
        <br>
        <input class="form-check-input" type="radio" id="zontec" value="zontec" v-model="local">
        <label class="form-check-label" for="zontec"> Zontec </label>
      </div>
      <br>

      <div style="text-align: center;"   v-if="!validationState && (
                                  (emailTouched && !email) ||
                                  (passwordTouched && !password)
                              )" class="text-danger">Por favor, preencha todos os campos.</div>

      <div class="col-sm-12 text-center">
        <Button class="botaoLogin" value="Entrar">
          <i v-if="loading" class="fas fa-spinner fa-spin"></i> &nbsp;
          <span v-if="!loading">Entrar</span>
          <span v-if="loading">Processando...</span>
        </Button>
      </div>

      <div class="col-sm-12" style="text-align: center; font-size: 15px;">
        <a href="/esqueceuSenha" style="color: rgb(0, 0, 0);">Esqueceu sua senha ?</a>
      </div>
    </div>
  </form>
</template>

<script>
import Button from '../components/button/ButtonComponent.vue';
import FlashMessageError from '@/components/flashMessage/FlashErrorComponent.vue'
import axios from 'axios';
import { mapMutations } from 'vuex';

export default {
  name: "LoginComponent",

  components: {
    Button,
    FlashMessageError
  },

  data() {
    return {
      local: '',
      errors: [],
      email: '',
      password: '',
      token: '',
      id: '',
      menuUrl: '',
      loading: false,
      user: null,
      emailTouched: false,
      passwordTouched: false,
      validationState: null
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

    login() {

      this.loading = true

      if (!this.email) {
        this.validationState = false;
        this.emailTouched = true;
        this.$nextTick(() => {
          this.$refs.emailInput.focus();
        });

        this.loading = false;
        return;
      }

      if (!this.password) {
        this.validationState = false;
        this.passwordTouched = true;
        this.$nextTick(() => {
          this.$refs.passwordInput.focus();
        });

        this.loading = false;
        return;
      }

      this.validationState = true;

      axios.post('http://192.168.0.6:8000/api/login', {
        email: this.email,
        password: this.password,
      }).then(
        res => {
          this.id = res.data.user.id
          this.user = res.data.user.name
          localStorage.setItem('userName', this.user)

          localStorage.setItem('token', res.data.token)
          this.$router.push({ name: "Home2View" })

          this.menuUrl = `http://192.168.0.6:8000/api/menu/usuario/${this.id}`
          
          /*eslint-disable */
          axios.get(this.menuUrl).then(menuResponse => {
            const menuOptions = menuResponse.data
          })

          this.loading = false

        }
      ).catch(
        err => {
          this.$store.commit('setFlashMessageError', 'O E-mail ou a senha estão incorretos!')
          setTimeout(() => {
            this.$store.commit('clearFlashMessageError');
          }, 10000)
          this.email = ''
          this.password = ''
          console.log(err)
        }
      )
    },

    ...mapMutations(['setFlashMessageError'])
  }
}
</script>

<style scoped>
.botaoLogin {
  border: 1px solid;
  border-radius: 20px;
  width: 70%;
}

.box-login {
  max-width: 80%; 
  margin: auto;
  border: 2px solid #ddd;
  margin-top: 10px;
  padding: 30px;
  border-radius: 20px;
}

.logo {
  text-align: center;
  /* background-image: url(../../public/img/logo-preta.png); */
  color: var(--first-color);
  padding: 100;
  font-size: 22px;
}

.container {
  
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-direction: column;
}

@media (max-width: 768px) {

  .box-login {
    max-width: 50%; 
    margin: auto;
    border: 1px solid #ddd;
    margin-top: 10px;
    padding: 30px;
    border-radius: 20px;
  }
  .logo {
    font-size: 18px;
  }
}

@media (max-width: 576px) {
  .box-login {
    max-width: 90%; 
    margin: auto;
    border: 1px solid #ddd;
    margin-top: 10px;
    padding: 30px;
    border-radius: 20px;
  }
  .logo {
    font-size: 16px;
  }
}
</style>
