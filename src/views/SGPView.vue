<template>
<div>
    <!-- Menu -->
  

    <!-- Conteúdo principal -->
    <div class="main-content">
      <!-- Submenu Administrativo -->
      <div class="submenu-administrativo">
        <!-- ... (itens do submenu) ... -->
      </div>

      <!-- Conteúdo da View SGP -->
      <router-view></router-view>
    </div>
  </div>



</template>


<script>


export default {
    name: 'SGPViewComponent',

    components: {
    },
    data() {
        return {};
    },

        
methods: {

   


},

created() {
    this.$parent.submenuExpandido = true;
}

}
</script>

<style scoped>
/* Estilos para o submenu e conteúdo principal */
.main-content {
  display: flex;
  flex-direction: row;
}

.submenu-administrativo {
  background-color: #f0f0f0;
  width: 250px; /* Largura do submenu */
  height: 100vh; /* Altura total da tela */
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
}

/* Adicione os estilos conforme necessário para os itens do submenu e conteúdo principal */
</style>