<template>
    <div v-if="flashMessageError" class="flash-message" style="text-align: center;">
      
        <p style="color: rgb(255, 255, 255);">{{ flashMessageError }}</p>
    </div>
</template>
  
<script>
export default {
computed: {
    flashMessageError() {
        return this.$store.state.flashMessageError
    }
},



methods: {
  clearFlashMessageError() {
      if (this.flashMessageError) {
        setTimeout(() => {
          this.$store.commit('clearFlashMessageError');
        }, 3000);
      }
    },
  },

watch: {
  flashMessageError() {
   this.clearFlashMessageError();
  }
}
}

</script>
  
<style scoped>
.flash-message {
    background-color: #d15757;
    width: 300px;
    padding: 10px;
    border: 1px solid #eb1a1a;
    border-radius: 5px;
}
</style>