<template>
    <div id="app">
        <HeaderComponent> </HeaderComponent>
        <router-view/>
        <MenuComponent></MenuComponent>
        <FooterComponent></FooterComponent>
    </div>
</template>

<script>
import MenuComponent from "@/components/menu/MenuComponent.vue"
import FooterComponent from "@/components/footer/FooterComponent"
import HeaderComponent from "@/components/header/HeaderComponent.vue"


export default {
    components: {
        MenuComponent: MenuComponent,
        FooterComponent: FooterComponent,
        HeaderComponent: HeaderComponent,

    }
}
</script>

<style>

</style>
