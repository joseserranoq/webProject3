<template>
  <div>
    <form v-if="!currentForm && !isCreatingForm" @submit.prevent="createForm">
      <label>Nombre del Formulario:</label>
      <input v-model="formName" required />
      <button class="button" type="submit">Crear Formulario</button>
    </form>

    <div v-if="currentForm">
      <h3>Formulario Actual: {{ currentForm }}</h3>
      <label for="list">Selecciona un item:</label>
      <select id="list" v-model="selectedItem">
        <option v-for="item in list" :key="item">{{ item }}</option>
      </select>
      <p>Has seleccionado: {{ selectedItem }}</p>
      <!-- Cadena de texto/ numeros -->
      <form v-if="selectedItem == 'Cadena Texto'" @submit.prevent="addOrUpdateQuestion">
        <label>Pregunta:</label>
        <div class="question-container" v-for="(question, index) in questions" :key="index">
          <input v-model="question.question" @blur="finishEditing(index)" @keyup.enter="finishEditing(index)" />
        </div>
        <div class="question-container">
          <input v-model="newQuestion.question" required />
          <button type="submit">Agregar Pregunta</button>
        </div>
      </form>
      <!-- Seleccio Unica -->
      <form v-if="selectedItem == 'Valor numerico'" @submit.prevent="addOrUpdateQuestion">
        <label>Pregunta:</label>
        <div class="question-container" v-for="(question, index) in questions" :key="index">
          <input v-model="question.question" @blur="finishEditing(index)" @keyup.enter="finishEditing(index)" />
        </div>
        <div class="question-container">
          <input v-model="newQuestion.question" required />
          <button type="submit">Agregar Pregunta</button>
        </div>
      </form>
      <form v-if="selectedItem === 'Comboboxes'" @submit.prevent="addOrUpdateCombobox">
        <div>
          <h2>Comboboxes</h2>
        </div>
        <div class="question-container" v-for="(question, index) in questions" :key="index">
          <label>Pregunta:</label>
          <input v-model="question.question" @blur="finishEditing(index)" @keyup.enter="finishEditing(index)" />
          <label>Respuestas (separadas por comas):</label>
          <input v-model="question.answers" required />
        </div>
        <div class="question-container">
          <label>Pregunta:</label>
          <input v-model="newQuestion.question" required />
          <label>Respuestas (separadas por comas):</label>
          <input v-model="newQuestion.answers" required />
          <button type="submit">Agregar Pregunta</button>
        </div>
      </form>
      <form v-if="selectedItem == 'Tablas Editables'" @submit.prevent="addOrUpdateTable">
        <div>
          <h2>Tablas Editables</h2>
          <label>Nombre de la Tabla:</label>
          <input v-model="newTable.question" required />
        </div>
        <div>
          <label>Columnas (separadas por comas):</label>
          <input v-model="newTable.columns" required />
        </div>
        <button type="submit">Agregar Tabla</button>
      </form>
      <form v-if="selectedItem == 'Registro Documentos'" @submit.prevent="addOrUpdateQuestion">
        <label>Pregunta:</label>
        <div class="question-container" v-for="(question, index) in questions" :key="index">
          <input v-model="question.question" @blur="finishEditing(index)" @keyup.enter="finishEditing(index)" />
        </div>
        <div class="question-container">
          <input v-model="newQuestion.question" required />
          <button type="submit">Agregar Pregunta</button>
        </div>
      </form>

      <button @click="saveForm">Guardar Formulario</button>
      

    </div>
    <div v-if="savedForms.length > 0 && !isCreatingForm">
      <h2>Formularios Guardados:</h2>
      <ul>
        <li v-for="(form, index) in savedForms" :key="index">
          {{ form.name }}
          <!-- <button class="button" @click="generateLink">Generar Enlace</button> -->
        </li>

      </ul>
      <button @click="printFormsToConsole">Imprimir Formularios en Consola</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formName: "",
      currentForm: null,
      mostrarMenu: false,
      list: ['Cadena Texto', 'Comboboxes', 'Valor numerico', 'Registro Documentos', 'Tablas Editables'],
      selectedItem: '',
      newQuestion: {
        question: "",
        answers: ""
      },
      generatedlink: "",
      formId: "",
      questions: [],
      savedForms: [],
      editingIndex: null,
      isCreatingForm: false,
      questionTypes: {
        'Cadena Texto': [],
        'Valor numerico': [],
        'Comboboxes': [],
        'Tablas Editables': [],
        'Registro Documentos': [],
      },
      newTable: {
        question: "",
        columns: "",
      },
    };
  },
  methods: {
    createForm() {
      this.currentForm = this.formName;
      this.formName = "";
      this.isCreatingForm = true;
    },

    obtenerIdFormularioDesdeURL(url) {
      // Encuentra la posición del ID en la URL
      var inicioId = url.indexOf("/forms/d/") + 9;
      var finId = url.indexOf("/edit");
      var idFormulario = url.substring(inicioId, finId);
      return idFormulario;
    },

    addOrUpdateTable() {
      const tableData = {
        question: this.newTable.question,
        columns: this.newTable.columns.split(',').map(column => column.trim()),
      };

      this.questionTypes[this.selectedItem].push(tableData);
      this.newTable.question = "";
      this.newTable.columns = "";
    },
    addOrUpdateQuestion() {
      const questionData = { question: this.newQuestion.question };

      if (this.editingIndex === null) {
        this.questionTypes[this.selectedItem].push(questionData);
      } else {
        this.$set(this.questionTypes[this.selectedItem], this.editingIndex, questionData);
        this.editingIndex = null;
      }

      this.newQuestion.question = "";
    },

    printFormsToConsole() {
      console.log("Formularios Guardados:", this.savedForms);
    },
    finishEditing(index) {
      if (index !== undefined) {
        this.editingIndex = null;
      }
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
    generateLink() {
  return new Promise((resolve) => {
    const formToSave = {
      name: this.currentForm,
      questions: [],
    };

    for (const type in this.questionTypes) {
      formToSave.questions = formToSave.questions.concat(
        this.questionTypes[type].map(question => ({
          type: type,
          question: question.question,
          answers: question.answers || [],
        }))
      );
    }

    fetch('https://script.google.com/macros/s/AKfycbwzLfy0aiQDSjS-_nepm38mLB5AC-jQmElAjyLUJYNdt078HpWu_TBtvAbmAY0Q4J2L/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `formName=${encodeURIComponent(this.currentForm)}&questions=${encodeURIComponent(JSON.stringify(formToSave.questions))}`,
    })
      .then(response => response.text())
        .then(data => {
          console.log('Formulario creado:', data);
          this.generateLink = this.obtenerUrl(data);
          this.editableLink = this.obtenerUrl2(data);

          this.formId = this.obtenerIdFormularioDesdeURL(this.editableLink);
          console.log(this.generateLink )
          console.log(this.editableLink)
          console.log(this.formId)
          this.sendFormToServer(this.generateLink,this.formId);
          resolve(); // Resuelve la promesa aquí
          
        })
        .catch(error => {
          console.error('Error al crear el formulario:', error);
        });
      });
    },

    sendFormToServer(generatedlink,formId) {
      const apiUrl = 'http://localhost:8081/form-maker/api/';
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: localStorage.getItem('emailVar'),
          formId: this.currentForm,
          url: generatedlink, 
          register_url: formId
        }),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        console.log('Formulario creado:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    },
    saveForm() {
      alert("Guardando"); 
      this.generateLink().then(() => {
      this.currentForm = null;
      this.isCreatingForm = false;
      this.newQuestion = { question: "", answers: "" };
      this.newTable = { question: "", columns: "" };
      alert("Formulario guardado"); 
      }).catch(error => {
        console.error('Error al crear el formulario:', error);
        alert("Error al guardar el formulario");
      });
    },
    addOrUpdateCombobox() {
      const questionData = {
        question: this.newQuestion.question,
        answers: this.newQuestion.answers.split(',').map(answer => answer.trim()),
      };

      if (this.editingIndex === null) {
        this.questionTypes[this.selectedItem].push(questionData);
      } else {
        this.$set(this.questionTypes[this.selectedItem], this.editingIndex, questionData);
        this.editingIndex = null;
      }

      this.newQuestion.question = "";
      this.newQuestion.answers = "";
    },

  }
};
</script>

<style scoped>
.forms {
  display: flex;
  min-height: 100vh;
}

form {
  flex: 1 1 0%;
  padding: 8rem 1rem 1rem;
}

h2 {
  font-size: 2rem;
  text-transform: uppercase;
  margin-bottom: 2rem;
}

h3 {
  color: white;
  background-color: rgb(48, 38, 121);
  padding-top: 10px;
  padding-bottom: 10px;
}

.question-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f4f4f4;
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

input {
  appearance: none;
  border: none;
  outline: none;
  border-bottom: 2px solid #000;
  /* background: black; */
  display: block;
  flex: 1;
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
}

input:focus {
  opacity: 1;
}

.question-container {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
}

button {
  background-color: rgb(48, 38, 121);
  color: #fff;
  font-weight: 700;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
  margin-left: 5px;
}

button:hover {
  background-color: rgb(18, 13, 51);
  color: white;

}

.button:hover {
  background-color: #0e0732;
}

form.login input[type="submit"] {
  background-color: rgb(48, 38, 121);
  color: #fff;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
}
</style>