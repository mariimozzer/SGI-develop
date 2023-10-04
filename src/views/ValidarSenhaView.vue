<template>
<div class="container">

        <FlashMessage></FlashMessage>
    <FlashErrorMessage></FlashErrorMessage>

 

    <div class="box-login">

        <h3 class="titulo"> Validar Senha </h3>
        <hr>
        <br>
        <b-input-group class="mb-2">

            <b-input-group-prepend is-text>
                <b-icon icon="shield-lock"></b-icon>
            </b-input-group-prepend>
            <b-form-input type="number"  :disabled="codigoValido" v-model="codigo" placeholder="Digite o código do email"></b-form-input>
        </b-input-group>
    
        <b-button v-if="!codigoValido" @click="validarCodigo" class="b-button">
            <b-icon icon="check-circle-fill" aria-hidden="true"></b-icon>
            &nbsp; Verificar
        </b-button>

        <div v-if="codigoValido" >


     
        <br>
        <br>
        <b-input-group class="mb-2">
            <b-input-group-prepend is-text>
                <b-icon icon="lock-fill"></b-icon>
            </b-input-group-prepend>
            <b-form-input type="password" v-model="new_password" placeholder="Senha"></b-form-input>
        </b-input-group>
    
        <b-input-group class="mb-2">
            <b-input-group-prepend is-text>
                <b-icon icon="lock-fill"></b-icon>
            </b-input-group-prepend>
            <b-form-input type="password" v-model="new_password_confirmation" placeholder="Repita a Senha"></b-form-input>
        </b-input-group>
    
        <b-button @click="resetarSenha" class="b-button">
            <b-icon icon="check-circle-fill" aria-hidden="true"></b-icon>
            &nbsp; Resetar Senha
        </b-button>
    </div>
    
    </div>
</div>
</template>

<script>
import axios from 'axios';
import FlashMessage from '@/components/flashMessage/FlashOKComponent.vue';
import FlashErrorMessage from '@/components/flashMessage/FlashErrorComponent.vue';
import { mapMutations } from 'vuex'


export default {
    name: "ValidarSenhaComponent",

    components: {
        FlashMessage,
        FlashErrorMessage
    },
    data() {
        return {
            codigo: '',
            new_password: '',
            new_password_confirmation: '',
            erroCodigo: false,
            codigoValido: false,
            timerCount: '50',
            timerEnabled: false,
            disabled: false

        }

        
    },

    watch: {

        timerEnabled(value){
            if (value) {
                    setTimeout(() => {
                        this.timerCount--;
                    }, 1000);
                }
        },


        timerCount: {
            handler(value){
                if (value > 0 && this.timerEnabled) {
                        setTimeout(() => {
                            this.timerCount--;
                        }, 1000);
                    }
            },
            immediate: true
        }
    },

    methods: {
        validarCodigo() {
            axios.post('http://192.168.0.6:8000/api/validar-codigo', { codigo: this.codigo })
            .then(response => {
                if (response.data === 0) {
                    this.erroCodigo = true;
                    this.$store.commit('setFlashMessageError', 'Código inválido!')
                    this.codigo = ''



                } else if (response.data === 1) {
                    this.$store.commit('setFlashMessage', 'Código verificado!')
                
                    this.erroCodigo = false;
                    this.codigoValido = true;

                }
            })
            .catch(error => {
                console.error(error);
            });
        },


    
        resetarSenha() {
            if (this.new_password === this.new_password_confirmation) {
                axios.post('http://192.168.0.6:8000/api/redefinir-senha', { 
                    codigo: this.codigo, 
                    new_password: this.new_password, 
                    new_password_confirmation: this.new_password_confirmation 
                })
                .then(response => {
                    this.$store.commit('setFlashMessage','Senha resetada com sucesso!');
                    this.codigo = ''
                    this.new_password = ''
                    this.new_password_confirmation = ''

                    console.log(response)
                    })
                .catch(error => {
                    console.error('Erro ao redefinir a senha:', error);
                });
            }

            else 
            {
                this.$store.commit('setFlashMessageError', 'As senhas não conferem!')

            }
        }, 

        ...mapMutations(['setFlashMessage']),

        ...mapMutations(['setFlashMessageError'])

    }
}
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center; 
    flex-direction: column;
}



.box-login {
    width: 350px;
    margin: auto;
    border: 1px solid #ddd;
    margin-top: 30px;
    padding: 30px;
    border-radius: 20px;
}

.blink{
    animation: blinker 1.5s linear infinite;
}

.box-flash {
    width: 350px;
    margin: auto;
  
    padding: 30px;
  
}



@keyframes blinker {
            50% {
                opacity: 0;
            }
        }
</style>