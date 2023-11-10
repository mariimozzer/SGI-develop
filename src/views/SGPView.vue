<template>
    <div class="container">
        <div class="row">
    <SideBarComponent></SideBarComponent>
    
    <div class="col-sm-12"> 
        <!-- <img src="../../public/img/sgp-logo.png"> -->

    </div>

    </div>
    </div>
</template>

<script>
 import SideBarComponent from '@/components/sideBar/sideBarComponent.vue'

 export default {
     name: "SGPViewComponent",

     components: {
         SideBarComponent
     },


     data() {
         return {

         }
     }


 }
</script>

<style scoped>

</style>