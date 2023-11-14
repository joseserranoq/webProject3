<template>
    <div id="body">
      <h2>MIS RESPUESTAS</h2>
      <div id="body-formulario" v-if="data.length>0">
        <div  v-for="item in data" :key="item.nombre" class="contenido-formulario">
          <p>{{ item.nombre }}</p>
          <button @click="seleccionarFormulario(item.url)" style="font-weight: bold;">Seleccionar</button>
        </div>
    </div>
        <div id="body-formulario" v-else>
            <div class="contenido-formulario">
                <h1>No se han obtenido respuestas</h1>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        { nombre: "Fabricio", url: "formD" },
        { nombre: "Jose", url: "formD2" },
        { nombre: "Javier", url: "formD3" }
      ]
    };
  },
  methods: {
    seleccionarFormulario(item) {
        window.location = item
    }
  } 
};
</script>

  <style scoped>

    #body h2{
        text-align: center;
        margin: 20px 0; 
    }

    #body-formulario {
    width: 60%;
    padding: 20px;
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 2px 2px 3px 3px black;
    border-radius: 15px;
    }

    .contenido-formulario {
    display: flex;
    justify-content: space-between; 
    align-items: center;
    padding: 10px; 
    border: 1px solid #ccc;
        border-radius: 5px;
    }

    .contenido-formulario p {
    margin: 0;
    flex: 1;
    }

    .contenido-formulario button {
    padding: 10px 20px; 
    border: none;
    background-color: #007bff; 
    color: white; 
    border-radius: 5px; 
    cursor: pointer; 
    }

    /* Ajustes responsivos para pantallas más pequeñas */
    @media (max-width: 768px) {
    .contenido-formulario {
        flex-direction: column; 
        text-align: center; 
    }

    .contenido-formulario button {
        width: 100%; 
        margin-top: 10px; 
    }
    }
    
  </style>