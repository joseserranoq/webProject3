<template>
  <div>
    <h2>Crear formularios</h2>
    <form v-if="!currentForm && !isCreatingForm" @submit.prevent="createForm">
      <label>Nombre del Formulario:</label>
      <input v-model="formName" required />
      <button type="submit">Crear Formulario</button>
    </form>

    <div v-if="currentForm">
      <h3>Formulario Actual: {{ currentForm }}</h3>

      <form @submit.prevent="addOrUpdateQuestion">
        <label>Pregunta:</label>
        <div class="question-container" v-for="(question, index) in questions" :key="index">
          <input v-model="question.question" @blur="finishEditing(index)" @keyup.enter="finishEditing(index)" />
          <button type="button" @click="editQuestion(index)">Editar</button>
        </div>
        <div class="question-container">
          <input v-model="newQuestion.question" required />
          <button type="submit">Agregar Pregunta</button>
        </div>
      </form>
      <button @click="saveForm" v-if="questions.length > 0">Guardar Formulario</button>

    </div>
    <!-- Mostrar la lista de formularios guardados -->
    <div v-if="savedForms.length > 0 && !isCreatingForm">
      <h2>Formularios Guardados:</h2>
      <ul>
        <li v-for="(form, index) in savedForms" :key="index">
          {{ form.name }}
          <button @click="generateLink">Generar Enlace</button>
        </li>
        
      </ul>
      <!-- <button @click="printFormsToConsole">Imprimir Formularios en Consola</button> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formName: "",
      currentForm: null,
      newQuestion: {
        question: ""
      },
      questions: [],
      savedForms: [],
      editingIndex: null,
      isCreatingForm: false 
    };
  },
  methods: {
    createForm() {
      this.currentForm = this.formName;
      this.formName = "";
      this.isCreatingForm = true;
    },
    addOrUpdateQuestion() {
      if (this.editingIndex === null) {
        // Agregar nueva pregunta
        this.questions.push({ question: this.newQuestion.question });
      } else {
        // Actualizar pregunta existente
        this.$set(this.questions, this.editingIndex, { question: this.newQuestion.question });
        this.editingIndex = null;
      }
      this.newQuestion.question = "";
    },
    saveForm() {
      this.savedForms.push({
        name: this.currentForm,
        questions: [...this.questions]
      });
      this.currentForm = null;
      this.questions = [];
      this.isCreatingForm = false; 
    },
    printFormsToConsole() {
      console.log("Formularios Guardados:", this.savedForms);
    },
    finishEditing(index) {
      if (index !== undefined) {
        this.editingIndex = null;
      }
    },
    generateLink(){
      //
    }
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

button {
  background-color: rgb(66, 108, 245);
  color: #fff;
  font-weight: 700;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
}

button:hover {
  background-color: #3457b4;
}
form.login input[type="submit"] {
  background-color: rgb(66, 108, 245);
  color: #fff;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
}
</style>