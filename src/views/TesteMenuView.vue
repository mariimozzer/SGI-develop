<template>
    <div style="text-align: center; margin-left: 50px;">
      <br /><br /><br /><br /><br /><br />
  
      <!-- Home -->
      <div>
        <h5>Home</h5>
        <div v-for="item in home" :key="item.id">
          <a style="text-decoration: none; color: rgb(0, 0, 0);">{{ item.nome }}</a>
        </div>
      </div>
  
      <!-- Estrutura -->
      <div>
        <h5>Estrutura </h5>
        <div v-for="item in estrutura" :key="item.id">
          <a style="text-decoration: none; color: rgb(0, 0, 0);">{{ item.nome }}</a>
  
          <h5>Estrutura Filhos</h5>
          <!-- Filhos da Estrutura -->
          <div v-if="item.filho.length > 0">
            <div v-for="filho in item.filho" :key="filho.id">
              <a style="text-decoration: none; color: rgb(0, 0, 0);">{{ filho.nome }}</a>
  
              <h5>Estrutura Filhos dos filhos</h5>

              <!-- Filhos do Filho -->
              <div v-if="filho.filho.length > 0">
                <div v-for="neto in filho.filho" :key="neto.id">
                  <a style="text-decoration: none; color: rgb(0, 0, 0);">{{ neto.nome }}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import Menu from '@/models/Menu.js'
  
  export default {
    name: "TesteMenuView",
  
    data() {
      return {
        home: '',
        estrutura: '',
        estruturaCortada: ''
      }
    },
  
    methods: {
      getAllHome() {
        axios.get(`http://192.168.0.6:8000/api/menu/home`)
          .then(response => {
            this.home = response.data.data.map((p) => new Menu(p));
          })
      },
  
      getAllEstrutura() {
        axios.get(`http://192.168.0.6:8000/api/menu/estrutura`)
          .then(response => {
            this.estrutura = response.data.data.map((p) => new Menu(p));
          })
      }
    },
  
    mounted() {
      this.getAllHome()
      this.getAllEstrutura()
    }
  }
  </script>
  
  <style>
  </style>
  