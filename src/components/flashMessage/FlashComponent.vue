<template>
    <div v-if="flashMessage" class="flash-message">
        <p>{{ flashMessage }}</p>
    </div>
</template>
  
<script>
export default {
  computed: {
  flashMessage() {
    const nomePessoa = this.$store.state.nomePessoa
    return nomePessoa ?  `Usuário de ${nomePessoa} criado com sucesso! \n E-mail com informações de login foi enviado!` : this.$store.state.flashMessage;
    // return this.$store.state.flashMessage;
  },
},
methods: {
  clearFlashMessage() {
      if (this.flashMessage) {
        setTimeout(() => {
          this.$store.commit('clearFlashMessage');
        }, 3000);
      }
    },
  },

watch: {
  flashMessage() {
   this.clearFlashMessage();
  }
}
}

</script>
  
<style scoped>
.flash-message {
    background-color: #d5f0b7;
    padding: 10px;
    border: 1px solid #96e07f;
}
</style>