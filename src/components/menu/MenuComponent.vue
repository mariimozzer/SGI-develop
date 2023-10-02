<template>
    <!-- <aside class="menu__container">
                                    <ul class="menu__lista">
                                        <li class="menu__itens">
                                
                                            <router-link to="/dashboard">Inicio</router-link>
                                        </li>
                                        <li class="menu__itens">
                                            <router-link to="/pessoa">Pessoas</router-link>
                                
                                        </li>
                                        <li class="menu__itens">
                                            <router-link to="/setores">Setores</router-link>
                                        </li>
                                        <li class="menu__itens">
                                            <router-link to="/grupo">Grupos</router-link>
                                        </li>
                                        <li class="menu__itens">
                                            <router-link to="/funcionalidade">Funcionalidades</router-link>
                                        </li>
                                        <li class="menu__itens">
                                            <router-link to="/">Sair</router-link>
                                        </li>
                                
                                    </ul>
                                </aside> -->
    
    
    <!-- <nav>
                                <img src="../../.././public/img/../logo32.png"/>
                                <div class="menu-item"><a href="/">Inicio</a></div>
                                <Dropdown title="Setor" :items="setores" /> 
                                <Dropdown title="Pessoa" :items="pessoas" /> 
                                <Dropdown title="Grupo" :items="grupos" /> 
                                <Dropdown title="Usuario" :items="usuarios" /> 
                                <Dropdown title="Funcionalidade" :items="funcionalidades" /> 
                              </nav> -->
    
    
    
    
    <!-- <nav>
                <div>
                    <b-dropdown id="dropdown-1" text="Setor" class="m-md-2">
                        <b-dropdown-item href="/setores">Controle de Setor </b-dropdown-item>
                        <b-dropdown-item href="/controle-de-setores/novo">Adicionar Setor </b-dropdown-item>
                    </b-dropdown>
                    <b-dropdown id="dropdown-2" style="background-color: black;" text="Pessoa" class="m-md-2">
                        <b-dropdown-item href="/pessoa">Controle de Pessoa </b-dropdown-item>
                        <b-dropdown-item href="/controle-de-pessoas/novo">Adicionar Pessoa </b-dropdown-item>
                    </b-dropdown>
                    <b-dropdown id="dropdown-3" text="Grupo" class="m-md-2">
                        <b-dropdown-item href="/grupo">Controle de Grupos </b-dropdown-item>
                        <b-dropdown-item href="/controle-de-grupo/novo">Adicionar Grupo </b-dropdown-item>
                        <b-dropdown-item href="/vinculo-de-grupo">Vinculo de Grupo </b-dropdown-item>
                    </b-dropdown>
                    <b-dropdown id="dropdown-4" text="Funcionalidade" class="m-md-2">
                        <b-dropdown-item href="/funcionalidade">Controle de Funcionalidade </b-dropdown-item>
                        <b-dropdown-item href="/funcionalidade/novo">Adicionar Funcinalidade </b-dropdown-item>
                        <b-dropdown-item href="/vinculo-de-funcionalidade">Vinculo de Funcionalidade </b-dropdown-item>
                    </b-dropdown>
                    <b-dropdown id="dropdown-5" text="Usuario" class="m-md-2">
                        <b-dropdown-item href="/usuario">Controle de Usuario </b-dropdown-item>
                        <b-dropdown-item href="/usuario/novo">Adicionar Usuario </b-dropdown-item>
                    </b-dropdown>
                </div>
             -->
    
    <!-- ---------------- -->
    
    
    <nav class="navbar navbar-expand-lg">
        <a class="navbar-brand" href="/dashboard">
                <img src="../../../public/img/logo-site.png">
            </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="/funcionalidade" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Telas
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item" href="/funcionalidade">Controle de Tela</a>
                        <a class="dropdown-item" href="/funcionalidade/novo">Adicionar Tela</a>
                        <a class="dropdown-item" href="/vinculo-de-funcionalidade">Vinculo de Telas</a>
    
                    </div>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="/grupo" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Grupo
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item" href="/grupo">Controle de Grupo</a>
                        <a class="dropdown-item" href="/controle-de-grupo/novo">Adicionar Grupo</a>
                        <a class="dropdown-item" href="/vinculo-de-grupo">Vinculo de Grupo</a>
                    </div>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="/pessoa" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Pessoa
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item" href="/pessoa">Controle de Pessoas</a>
                        <a class="dropdown-item" href="/controle-de-pessoas/novo">Adicionar Pessoas</a>
                    </div>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="/setores" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Setor
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item" href="/setores">Controle de Setor</a>
                        <a class="dropdown-item" href="/controle-de-setores/novo">Adicionar Setor</a>
                    </div>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="/usuario" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Usuário
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item" href="/usuario">Controle de Usuário</a>
                        <a class="dropdown-item" href="/usuario/novo">Adicionar Usuário</a>
    
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/">Sair</a>
                </li>
    
            </ul>
    
    
    
    
        </div>
    </nav>
</template>


<script>

export default {
    name: 'NavbarComponent',
    components: {
    },
    data() {
        return {
            
        }
    }
}
</script>

<style>
.navbar-toggler{
    color: white !important;
}


.nav-link {
    color: #ffffff !important
}

nav {
    display: flex;
    align-items: center;
    justify-content: center;
}

*/ nav .menu-item {
    color: #e00b0b;
    padding: 5px 10px;
    position: relative;
    text-align: center;
    border-bottom: 3px solid transparent;
    display: flex;
    transition: 0.4s;
}

nav .menu-item.active,
nav .menu-item:hover {
    color: #05162e;
    background-color: #40f51b;
    border-bottom-color: #fd0606;
}

nav .menu-item a {
    color: inherit;
    text-decoration: none;
}



</style>

