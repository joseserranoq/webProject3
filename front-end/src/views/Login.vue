<template>
    <main class="login">
        <section class="forms">
            <div id="register" v-if="isVisible">
                <form class="register" @submit.prevent="register">
                    <h2>Register</h2>
                    <input type="email" placeholder="Email address" v-model="register_form.email" />
                    <input type="password" placeholder="Password" v-model="register_form.password" />
                    <input type="submit" value="Register" />
                </form>
                <button class="button-login" @click="formsVisible">Login</button>
            </div>
            <div id="login" v-if="!isVisible">
                <form class="login" @submit.prevent="login">
                    <h2>Login</h2>
                    <input type="email" placeholder="Email address" v-model="login_form.email" />
                    <input type="password" placeholder="Password" v-model="login_form.password" />
                    <input type="submit" value="Login" />
                </form>
                <button class="button-register" @click="formsVisible">Register</button>
            </div>
        </section>
    </main>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
    name: "LoginTemplate",
    setup() {
        const login_form = ref({});
        const register_form = ref({});
        const store = useStore();
        const isVisible = ref(false);

        const login = () => {
            store.dispatch('login', login_form.value);
            
            //             //genera el usuario en data.json, realiza un post a la api
            // console.log(login_form.value);
            // const data = {
            //     email: login_form.value.email,
            //     password: login_form.value.password,
            //     //forms: []
            // }
            // fetch('http://localhost:8080/login/api', {
            //     method: 'POST',
            //     body: JSON.stringify(data),
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // })
            
            
            //agrega el email al localStorage para posteriormente ser usado para consultar
            localStorage.emailVar = login_form.value.email;
        }

        const register = () => {
            store.dispatch('register', register_form.value);
            //genera el usuario en data.json, realiza un post a la api
            console.log(login_form.value);
            const data = {
                email: login_form.value.email,
                password: login_form.value.password,
                //forms: []
            }
            fetch('http://localhost:8081/login/api', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }

        const formsVisible = () => {
            isVisible.value = !isVisible.value;
            console.log(isVisible.value)
        }

        return {
            isVisible,
            login_form,
            register_form,
            login,
            register,
            formsVisible
        }
    }
}
</script>

<style>
* {
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif ;
}
.forms {
    display: flex;
    min-height: 100vh;
}

#register {
    width: 100%;
    background-image: linear-gradient(to bottom right,
            rgb(48, 38, 121) 0%,
            rgb(13, 11, 61) 100%);
}
#login {
    width: 100%;
}
form {
    flex: 1 1 0%;
    padding: 8rem 1rem 1rem;
}

form.register {
    color: #FFF; 
}

h2 {
    font-size: 2rem;
    text-transform: uppercase;
    margin-bottom: 2rem;
}

.button-login,.button-register {
    font-size: small;
    text-transform: uppercase;
    padding: 5px;
    border-radius: 10px;
}
.button-register {
    background-color: rgb(48, 38, 121);
    color: white;
}
input {
    appearance: none;
    border: none;
    outline: none;
    background: none;

    display: block;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    font-size: 1.5rem;
    margin-bottom: 2rem;
    padding: 0.5rem 0rem;
}

input:not([type="submit"]) {
    opacity: 0.8;
    transition: 0.4s;
}

input:focus:not([type="submit"]) {
    opacity: 1;
}

input::placeholder {
    color: inherit;
}

form.register input:not([type="submit"]) {
    color: #FFF;
    border-bottom: 2px solid #FFF;
}

form.login input:not([type="submit"]) {
    color: #2c3e50;
    border-bottom: 2px solid #2c3e50;
}

form.login input[type="submit"] {
    background-color: rgb(48, 38, 121);
    color: #FFF;
    font-weight: 700;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    cursor: pointer;
    text-transform: uppercase;
}

form.register input[type="submit"] {
    background-color: #FFF;
    color: rgb(48, 38, 121);
    font-weight: 700;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    cursor: pointer;
    text-transform: uppercase;
}
</style>