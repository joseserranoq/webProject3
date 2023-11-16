<template>
  <div id="body">
    <h2>MIS FORMULARIOS</h2>
    <div v-if="data.length > 0">
      <div v-for="item in data" :key="item.formId" class="contenido-formulario">
        <p>{{ item.nombre }}</p>
        <button @click="obtenerRespuestas(item.register_url)">Ver respuestas</button>
        <button @click="mostrarUrl(item.url)" style="font-weight: bold;">Mostrar Url</button>
        <button @click="seleccionarFormulario(item.url)" style="font-weight: bold;">Responder</button>
      </div>
    </div>
    <div v-else>
      <div class="contenido-formulario">
        <h1>No se han realizado formularios</h1>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      data: []
    };
  },
  mounted() {
    this.cargarFormularios();
  },
  methods: {
    cargarFormularios() {
  axios.get('http://localhost:8081/form-maker/api/')
    .then(response => {
      const todosLosFormularios = [];
      response.data.msg.forEach(usuario => {
        usuario.forms.forEach(formulario => {
          todosLosFormularios.push({
            nombre: formulario.formId, // Asegúrate de que 'nombre' exista en tu estructura de datos
            url: formulario.url,
            register_url: formulario.register_url
          });
        });
      });
      this.data = todosLosFormularios;
    })
    .catch(error => {
      console.error('Error al cargar los formularios:', error);
    });
}
,
  seleccionarFormulario(url) {
    window.open(url, '_blank');
  },
  mostrarUrl(url){
    alert(url)
  },
  obtenerIdFormularioDesdeURL(url) {
      // Encuentra la posición del ID en la URL
      var inicioId = url.indexOf("/forms/d/") + 9;
      var finId = url.indexOf("/edit");
      var idFormulario = url.substring(inicioId, finId);
      return idFormulario;
    },
    obtenerUrl(url) {
      // Encuentra la posición del ID en la URL
      var inicioId = url.indexOf("blicado: ") + 9;
      var idFormulario = url.substring(inicioId);

      return idFormulario;
    },
    obtenerUrl2(url) {
      var inicioId = url.indexOf("ditable: ") + 9;
      var finId = url.indexOf("Enlace del formulario");
      var idFormulario = url.substring(inicioId, finId);  
      return idFormulario;
    },
  obtenerRespuestas(id) {
      console.log(id);
      fetch('https://script.google.com/macros/s/AKfycbwzLfy0aiQDSjS-_nepm38mLB5AC-jQmElAjyLUJYNdt078HpWu_TBtvAbmAY0Q4J2L/exec?formId=' + id)
        .then(response => response.text())
        .then(data => {
          console.log('Respuesta del servidor:', data);
        })
        .catch(error => {
          console.error('Error al obtener respuestas:', error);
        });
    },
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

    .contenido-formulario h1{
      margin-left: auto;
      margin-right: auto;
    }
    .contenido-formulario button {
    padding: 10px 20px; 
    border: none;
    background-color: #007bff; 
    color: white; 
    border-radius: 5px; 
    cursor: pointer; 
    margin-right: 20px;
    margin-left: 10px;
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