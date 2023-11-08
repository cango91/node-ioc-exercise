<template>
    <h1>Signup</h1>
    <form @submit.prevent="login">
        <input type="text" v-model="user.username" placeholder="Username">
        <input type="password" v-model="user.password" placeholder="Password">
        <input type="password" v-model="confirmPassword" placeholder="Re-type password">
        <button type="submit" @click="handleSubmit" :disabled="!eneableSubmit">Signup</button>
    </form>
</template>

<script>
import api from '@/services/api';
export default {
    data() {
        return {
            user: {
                username: '',
                password: ''
            },
            confirmPassword: ''
        }
    },
    methods: {
        handleSubmit() {
            api.register(this.user)
                .catch(console.error)
                .then(res => {
                    if (res.token) {
                        localStorage.setItem('token', res.token);
                        this.$emit('loggedIn', res.token);
                        this.$router.push('/tasks');
                    }
                });
        }
    },
    computed: {
        eneableSubmit() {
            return this.user.username
                && this.user.username.trim() !== ''
                && this.user.password
                && this.user.password.trim() !== ''
                && this.user.password === this.confirmPassword
        }
    }
}
</script>

<style scoped>
button[disabled] {
    background-color: grey;
    cursor: not-allowed;
}
</style>