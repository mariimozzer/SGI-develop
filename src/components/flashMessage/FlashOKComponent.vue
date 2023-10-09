<template>
    <div v-if="flashMessage" class="flash-message" style="text-align: center;">
      
        <p style="color: rgb(0, 0, 0);">{{ flashMessage }}</p>
    </div>
</template>
  
<script>
export default {
  computed: {
  flashMessage() {
    return this.$store.state.flashMessage;
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
    border-radius: 5px;
}
</style>