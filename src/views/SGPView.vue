<template>
    <div>
        <div class="main-content">
            <div class="submenu-administrativo" style="text-align: center;">
                <br><br><br><br><br><br><br>
    
                <div class="categorias" style="background-color:#f0f0f0; height: 60px; ">
                    <br>
                    <a href="#" style="text-decoration: none; color: black;"><i class="fa-solid fa-network-wired"></i>&nbsp;Grupos</a>
                </div>
    
               <b-dropdown icon="diagram3" aria-hidden="true"  text="Pessoas  " block variant="colo" class="m-2 cor ">

                    <b-dropdown-item href="#">Action</b-dropdown-item>
                    <b-dropdown-item href="#">Another action</b-dropdown-item>
                    <b-dropdown-item href="#">Something else here</b-dropdown-item>
                </b-dropdown>
    
            
                <router-view></router-view>
    
            </div>
    
            <div class="submenu-administrativo1" style="text-align: center;">
    
    
                <br><br><br><br><br><br><br>
    
                <div class="categorias" style="background-color:var(--first-color); height: 60px; ">
                    <br>
                    <a href="#" style="text-decoration: none; color: rgb(255, 255, 255);">Grupos</a>
                </div>

                <b-dropdown text="Pessoas"  block variant="colo" class="m-2 cor2">
                    <b-dropdown-item href="#">Action</b-dropdown-item>
                    <b-dropdown-item href="#">Another action</b-dropdown-item>
                    <b-dropdown-item href="#">Something else here</b-dropdown-item>
                </b-dropdown>
            </div>
    
            <div class="submenu-administrativo2" style="text-align: center;">
    
                <br><br><br><br><br><br><br>
    
    <div class="categorias" style="background-color:#969696; height: 60px; ">
        <br>
        <a href="#" style="text-decoration: none; color: rgb(255, 255, 255); opacity: 1 ;">Grupos</a>
    </div>
    
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'SGPViewComponent',

    components: {},
    data() {
        return {
            dropdownOpen: false,
            showDropdown: false
        };
    },

    methods: {
        toggleDropdown() {
            console.log('toggleDropdown chamado');
            this.dropdownOpen = !this.dropdownOpen;
            console.log('dropdownOpen:', this.dropdownOpen);
        }

    },

    created() {
        this.$parent.submenuExpandido = true;
    }

}
</script>

<style scoped>
/* 
.main-content {
    display: flex;
    flex-direction: row;
} */

.cor {
    color: #f59f00;
}



.submenu-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #f9f9f9;
    min-width: 160px;
    display: none;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
}

.dropdown-item {
    padding: 10px;
    text-decoration: none;
    display: block;
}

.dropdown-item:hover {
    background-color: #f1f1f1;
}

.submenu-administrativo {
    background-color: #f0f0f0;
    width: 250px;
    height: 100vh;
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
    overflow-y: hidden;
    padding-top: 20px;
}

.submenu-administrativo :hover{
    background-color: #ee782a;
   
}

.submenu-administrativo1 {
    background-color: var(--first-color);
    width: 250px;
    height: 100vh;
    position: fixed;
    z-index: -1;
    top: 0;
    left: 300px;
    overflow-y: hidden;
    padding-top: 20px;
}

.submenu-administrativo2 {
    background-color: #969696;
    width: 250px;
    height: 100vh;
    position: fixed;
    z-index: -1;
    top: 0;
    left: 600px;
    overflow-y: hidden;
    padding-top: 20px;
}

.categorias:hover {
    transform: translateY(0.1px);
    box-shadow: 0 0 5px gray;
    cursor: pointer;
}

.sidenav a,
.dropdown-btn {
    padding: 6px 8px 6px 16px;
    text-decoration: none;
    font-size: 20px;
    color: #020202;
    display: block;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
    outline: none;
}

.sidenav a:hover,
.dropdown-btn:hover {
    color: #000a2b;
}

.active {
    background-color: green;
    color: white;
}

.dropdown-container {
    display: none;
    background-color: #262626;
    padding-left: 8px;
}

.fa-caret-down {
    float: right;
    padding-right: 8px;
}
</style>