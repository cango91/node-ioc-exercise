<template>
    <h1>Login</h1>
    <form @submit.prevent="login">
        <input type="text" v-model="credentials.username" placeholder="Username">
        <input type="password" v-model="credentials.password" placeholder="Password">
        <button type="submit">Login</button>
    </form>
</template>

<script>
import api from '@/services/api';
export default {
    data() {
        return {
            credentials: {
                username: '',
                password: '',
            }
        }
    },
    emits: ['loggedIn'],
    methods: {
        async login() {
            try {
                const response = await api.login(this.credentials);
                if(response.token){
                    localStorage.setItem('token', response.token);
                    this.$emit('loggedIn', response.token);
                    this.$router.push('/tasks');
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
}
</script>

<style>
form {
  max-width: 420px;
  margin: 30px auto;
  background: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}
label {
  color: #aaa;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input,
select {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}
input[type="checkbox"] {
  display: inline-block;
  width: 16px;
  margin: 0 10px 0 0;
  position: relative;
  top: 2px;
}

button{
    background: #0b6dff;
    border: 0;
    padding: 10px 20px;
    margin-top: 20px;
    color: white;
    border-radius: 20px;
}
button:hover{
    cursor: pointer;
}
.submit{
    text-align: center;
}
.error{
    color: #ff0062;
    font-size: 0.8rem;
    margin-top: 10px;
    font-weight: bold;
}
</style>