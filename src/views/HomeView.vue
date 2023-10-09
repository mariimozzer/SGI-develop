<template>
    <div style="text-align: center;">
        <br>
    <h4>Olá {{ nome }},</h4>
    <h4>Seja bem vindo ao SGI 2.0</h4>
    </div>
</template>

<script>

export default {
    name: 'HomeComponent',


    data() {
        return {
            nome: null
        }
    },


    mounted() {
        this.nome = localStorage.getItem('userName')

    }
  

}
</script>

<style>

</style>

