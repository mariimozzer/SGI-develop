<template>
     <div id="app">

<header>

<div class="menu">
    <!-- <MenuComponent v-if="!$route.meta.hideMenu"></MenuComponent>  -->
    <NovoMenu v-if="!$route.meta.hideMenu"></NovoMenu>
</div>
</header>
<br>
<br>
<br>
<div >
<router-view />
</div>

<FooterComponent class="footer"></FooterComponent>

</div>
</template>

<script>
import FooterComponent from "@/components/footer/FooterComponent"
import NovoMenu from "@/components/menu/NovoMenu.vue"

export default {
    components: {
        FooterComponent: FooterComponent,
        NovoMenu: NovoMenu

    }
}
</script>

<style>

.footer{
    position: absolute;
}

:root {
    --first-color: #343537;
    --second-color: #F89E31;
}

.b-button {
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

.table {
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

.titulo {
    text-align: center;
    color: var(--first-color);
    box-shadow: none;
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
    margin-top: 0;
    background-color: var(--first-color) ;
    padding: 0px;
}

thead {
    text-align: center;
}

.menu {
    position: absolute;
    z-index: 1;
    width: 100%;
}

.router {
    position: absolute;
    z-index: -1;
    width: 100%;
}



</style>