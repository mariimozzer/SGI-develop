<template>
    <div id="app">
        <!-- <HeaderComponent> </HeaderComponent> -->
        <header>
            <MenuComponent v-if="!$route.meta.hideMenu"></MenuComponent>
    
        </header>
    
        <div class="container mt-2">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <router-view/>
                </div>
            </div>
        </div>
           
            <FooterComponent></FooterComponent>
        </div>
      
  
</template>

<script>
import MenuComponent from "@/components/menu/MenuComponent.vue"
import FooterComponent from "@/components/footer/FooterComponent"

 
// import HeaderComponent from "@/components/header/HeaderComponent.vue"


export default {
    components: {
        MenuComponent: MenuComponent,
        FooterComponent: FooterComponent,
        // HeaderComponent: HeaderComponent,

    }
}
</script>

<style>
.b-button{
   
      width: 100%;
      background-color: var(--second-color) !important;
      color: rgb(255, 255, 255) !important;
      padding: 10px !important;
      margin: 6px 0 !important;
      border: none !important;
      border-radius: 4px !important;
      cursor: pointer;
      
  
  
}

.b-button:hover {
    background-color: #FBBF77 !important;
}



.table{
  text-align: center;
}

.btn-primary {
    background-color: var(--second-color) !important;
    border: var(--second-color) !important;
}

.btn-primary:hover {
    background-color: #FBBF77 !important;
}

.btn-default {
    border: #343537 !important;
}

.btn-default:hover {
    border: #343537 !important;
}

:root {
    --first-color: #343537;
    --second-color: #F89E31;
}

.titulo {
    text-align: center;
    color: var(--first-color);
}
/* 
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
} */

body {
    font-family: 'montserrat', sans-serif;
    /* background-color:  #343537 !important; */

}

header {
    width: 100vw;
    background-color: var(--first-color);
    padding: 2px;
}

thead {
    text-align: center;
}
</style>
