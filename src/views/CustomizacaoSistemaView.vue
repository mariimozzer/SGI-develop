<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <br> <br> <br>
                <h3 class="titulo">Customizar Sistema</h3>
                <hr>
            </div>
            <label for="font-family">Escolha a Fonte:</label>
            <select v-model="selectedFont" @change="updatePreview">
                      <option value="Arial">Arial</option>
                      <option value="Helvetica">Helvetica</option>
                      <option value="Times New Roman">Times New Roman</option>
                    </select>
    
            <label for="font-size">Escolha o Tamanho da Fonte:</label>
            <select v-model="selectedFontSize" @change="updatePreview">
                      <option value="14px">Pequeno</option>
                      <option value="16px">Médio</option>
                      <option value="18px">Grande</option>
                    </select>
    
            <label for="color">Escolha a Cor de Fundo:</label>
            <select v-model="selectedColor" @change="updatePreview">
                      <option value="#ffffff">Claro</option>
                      <option value="#f0f0f0">Médio</option>
                      <option value="#333333">Escuro</option>
                    </select>
    
    
    
            <div class="preview-container">
                <h2>Preview</h2>
                <p>Este é um exemplo de texto para visualizar as preferências selecionadas.</p>
            </div>
        </div>
    </div>
</template>


<script src="https://cdn.jsdelivr.net/npm/vue@2">

</script>

<script>
export default {
    name: "CustomSistema",

    data() {
        return {
            selectedFont: 'Arial',
            selectedFontSize: '16px',
            selectedColor: '#ffffff'
        }
    },

    methods: {
        updatePreview() {
            document.documentElement.style.setProperty('--font-family', this.selectedFont);
            document.documentElement.style.setProperty('--font-size', this.selectedFontSize);
            document.documentElement.style.setProperty('--background-color', this.selectedColor);

            const textColor = this.selectedColor === '#ffffff' ? '#333333' : '#ffffff';
            document.documentElement.style.setProperty('--text-color', textColor);
        }

    }
}
</script>

<style scoped>
.preview-container {
    margin: 20px;
    padding: 20px;
    border: 1px solid #ccc;
}
</style>
