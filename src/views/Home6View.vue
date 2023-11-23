<template>
    <div class="site-wrapper">
      <div class="pt-table desktop-768">
          <div class="overlay"></div>
  
          <div class="container">
            <div class="row">
              <div class="col-xs-12 col-md-offset-1 col-md-10 col-lg-offset-2 col-lg-8">
                <div class="page-title home text-center">
                  
                </div>
  
                <div class="hexagon-menu clear">
                  <div v-for="(item, index) in hexItems" :key="index" class="hexagon-item" @mouseover="focusHexagon(index)" @mouseleave="blurHexagon(index)">
                    <div class="hex-item">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <div class="hex-item">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <a class="hex-content">
                      <span class="hex-content-inner">
                        <span class="icon">
                          <i :class="item.iconClass"></i>
                        </span>
                        <span class="title">{{ item.title }}</span>
                      </span>
                      <svg viewBox="0 0 173.20508075688772 200" height="200" width="174" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z" fill="#1e2530"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
    
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        hexItems: [
          { iconClass: 'fa fa-universal-access', title: 'Bem-vindo' },
          { iconClass: 'fa fa-bullseye', title: 'Sobre' },
          { iconClass: 'fa fa-braille', title: 'Serviços' },
          { iconClass: 'fa fa-id-badge', title: 'Currículo' },
          { iconClass: 'fa fa-life-ring', title: 'Trabalhos' },
          { iconClass: 'fa fa-clipboard', title: 'Depoimentos' },
          { iconClass: 'fa fa-map-signs', title: 'Contato' },
        ],
        focusedIndex: null,
      };
    },
    methods: {
      focusHexagon(index) {
        this.focusedIndex = index;
      },
      blurHexagon() {
        this.focusedIndex = null;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos aqui */
  </style>
  