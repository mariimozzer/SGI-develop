import PessoaView from "@/views/PessoaView"
import FuncionalidadeView from "@/views/FuncionalidadeView"
import GrupoView from "@/views/GrupoView"
import VinculoDeGrupo from "@/views/VinculoDeGrupo"
import SetorView from "@/views/SetorView"
import HomeView from "@/views/HomeView"
import ControleDePessoas from "@/views/ControleDePessoas"
import ControleDeSetores from "@/views/ControleDeSetores"
import ControleDeGrupo from "@/views/ControleDeGrupo"
import ControleDeFuncionalidade from "@/views/ControleDeFuncionalidade"
import LoginView from "@/views/LoginView"
import ControleDeUsuarios from "@/views/ControleDeUsuarios"
import UsuarioView from "@/views/UsuarioView"
import VinculoDeFuncionalidade from "@/views/VinculoDeFuncionalidade"
import VinculoGrupo from "@/views/VinculoGrupo"
import VinculoFuncionalidade from "@/views/VinculoFuncionalidade"
import AlterarSenhaView from "@/views/AlterarSenhaView"
import EsqueceuSenhaView from "@/views/EsqueceuSenhaView"
import ValidarSenhaView from "@/views/ValidarSenhaView"
import VisualizarView from "@/views/VisualizarView"
import AdministrativoView from "@/views/AdministrativoView"
import FabricaView from "@/views/FabricaView"
import GestaoView from "@/views/GestaoView"
import GeralView from "@/views/GeralView"
import ConfiguracaoView from "@/views/ConfiguracaoView"



import Login2View from "@/views/Login2View"
import SideBarView from "@/views/SideBarView"
import Home2View from "@/views/Home2View"


const routes = [

 
  {
    path: '/home2', 
    name: 'Home2View',
    component: Home2View,
    meta: {
      hideMenu: true
    }  
  },

  {
    path: '/2', 
    name: 'Login2View',
    component: Login2View,
    meta: {
      hideMenu: true
    }
    
  },

  {
    path: '/sideBarView',
    name: 'SideBarView',
    component: SideBarView
  },
 

  {
    path: '/AdministrativoView', 
    name: 'AdministrativoView',
    component: AdministrativoView,
    
  },

  {
    path: '/FabricaView', 
    name: 'FabricaView',
    component: FabricaView,
 
  },

  {
    path: '/GestaoView', 
    name: 'GestaoView',
    component: GestaoView,


},

{
  path: '/GeralView', 
  name: 'GeralView',
  component: GeralView,


},
{
  path: '/ConfiguracaoView', 
  name: 'ConfiguracaoView',
  component: ConfiguracaoView,


},

  {
    path: '/visualizarView', 
    name: 'VisualizarView',
    component: VisualizarView,
    
  },

  {
    path: '/validarSenha', 
    name: 'ValidarSenha',
    component: ValidarSenhaView,
    meta: {
      hideMenu: true
    }
    
  },

  {
    path: '/esqueceuSenha', 
    name: 'EsqueceuSenha',
    component: EsqueceuSenhaView,
    meta: {
      hideMenu: true
    }
  },

  {
    path: '/alterarSenha/', 
    name: 'AlterarSenha',
    component: AlterarSenhaView,
    props: true 
  },
  
  {
    path: '/home',
    name: 'HomeView',
    component: HomeView,
    meta:{
      hideMenu:true
    }

  },
  {
    path: '/',
    name: 'login',
    component: LoginView,
    meta: {
      hideMenu: true
    }
  },
  {
    path: '/pessoa',
    name: 'ControleDePessoas',
    component: ControleDePessoas,
    title: 'Pessoa'  ,
    meta: {requiresAuth: true}
  },
  {
    path: '/controle-de-pessoas/novo',
    name: 'AdicionarPessoa',
    component: PessoaView,
    title: 'Adicionar Pessoa'   
  },
  {
    path: '/controle-de-pessoas/editar',
    name: 'EditarPessoa',
    component: PessoaView,
    title: 'Editar Pessoa'   
  },
  {
    path: '/controle-de-pessoas/excluir',
    name: 'ExcluirPessoa',
    component: PessoaView,
    title: 'Excluir Pessoa'   
  },
  {
    path: '/setores',
    name: 'ControleDeSetores',
    component: ControleDeSetores,
    title: 'Setor'   
  },
  {
    path: '/controle-de-setores/novo',
    name: 'AdicionarSetor',
    component: SetorView,
    title: 'Adicionar Setor'   
  },
  {
    path: '/controle-de-setores/editar',
    name: 'EditarSetor',
    component: SetorView,
    title: 'Editar Setor'   
  },
  {
    path: '/controle-de-setores/excluir',
    name: 'ExcluirSetor',
    component: SetorView,
    title: 'Excluir Setor'   
  },
  {
    path: '/grupo',
    name: 'ControleDeGrupo',
    component: ControleDeGrupo,
    title: 'Grupos'
    
  },
  {
    path: '/controle-de-grupo/novo',
    name: 'AdicionarGrupo',
    component: GrupoView,
    title: 'Adicionar Grupo'
    
  },
  {
    path: '/controle-de-grupo/editar',
    name: 'EditarGrupo',
    component: GrupoView,
    title: 'Editar Grupo'
    
  },
  {
    path: '/controle-de-grupo/excluir',
    name: 'ExcluirGrupo',
    component: GrupoView,
    title: 'Excluir Grupo'
    
  },
  {
    path: '/teste',
    name: 'testeGrupo',
    component: VinculoDeGrupo,
    title: 'Vincular Grupo'
    
  },
  {
    path: '/vinculo-de-grupo',
    name: 'VincularGrupo',
    component: VinculoGrupo,
    title: 'Vincular Grupo'
    
  },
  {
    path: '/testeste',
    name: 'testeteste',
    component: VinculoDeFuncionalidade,
    title: 'Vincular Funcionalidade'
    
  },
  {
    path: '/vinculo-de-funcionalidade',
    name: 'VincularFuncionalidade',
    component: VinculoFuncionalidade,
    title: 'Vincular Funcionalidade'
    
  },
  {
    path: '/funcionalidade',
    name: 'ControleDeFuncionalidade',
    component: ControleDeFuncionalidade,
    title: 'Funcionalidade'  
  },
  {
    path: '/funcionalidade/novo',
    name: 'AdicionarFuncionalidade',
    component: FuncionalidadeView,
    title: 'Adicionar Funcionalidade'  
  },
  {
    path: '/funcionalidade/editar',
    name: 'EditarFuncionalidade',
    component: FuncionalidadeView,
    title: 'Editar Funcionalidade'  
  },
  {
    path: '/funcionalidade/excluir',
    name: 'ExcluirFuncionalidade',
    component: FuncionalidadeView,
    title: 'Excluir Funcionalidade'  
  },
  {
    path: '/usuario',
    name: 'ControleDeUsuarios',
    component: ControleDeUsuarios,
    title: 'Usuario'  
  },
  {
    path: '/usuario/novo',
    name: 'AdicionarUsuario',
    component: UsuarioView,
    title: 'Adicionar Usuario'  
  },
  {
    path: '/usuario/editar',
    name: 'EditarUsuario',
    component: UsuarioView,
    title: 'Editar Usuario'  
  },
  {
    path: '/usuario/excluir',
    name: 'ExcluirUsuario',
    component: UsuarioView,
    title: 'Excluir Usuario'  
  },

];



export default routes


