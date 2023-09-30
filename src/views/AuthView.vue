<template>
    <div class="bg flex items-center justify-center min-h-screen bg-gray-100">
        <div class="transition-all duration-500 ease-out px-8 py-8 text-left bg-white shadow-lg">
            <div class="flex items-center justify-center">
                <img src="@/assets/logo.svg" width="100" />
            </div>
            <div v-if="isLogin">
                <h3 class="text-2xl font-bold text-center my-8">Login</h3>
                <form @submit.prevent="loginHandler">
                    <div class="mt-4">
                        <div class="mt-4">
                            <div class="block" for="email">Email</div>
                            <input type="text" placeholder="Email" v-model="email"
                                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                        </div>
                        <div class="mt-4">
                            <div class="block">Password</div>
                            <input type="password" placeholder="Password" v-model="password"
                                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                        </div>
                        <div class="flex items-baseline justify-between">
                            <button
                                class="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Login</button>
                            <a @click="changeToSingUpModal" class="text-sm text-blue-600 hover:underline">Create Account</a>
                        </div>
                    </div>
                </form>
            </div>
            <div v-else>
                <h3 class="text-2xl font-bold text-center my-8">Create Account</h3>
                <form @submit.prevent="registerHandler">
                    <div class="mt-4">
                        <div class="mt-4">
                            <div class="block" for="email">Name</div>
                            <input type="text" placeholder="Name" v-model="name"
                                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                        </div>
                        <div class="mt-4">
                            <div class="block" for="email">Email</div>
                            <input type="text" placeholder="Email" v-model="email"
                                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                        </div>
                        <div class="mt-4">
                            <div class="block">Password</div>
                            <input type="password" placeholder="Password" v-model="password"
                                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                        </div>
                        <div class="flex items-baseline justify-between">
                            <button class="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Create
                                Account</button>
                            <a @click="changeToLoginModal" class="text-sm text-blue-600 hover:underline">Login</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/store/user-store'

const userStore = useUserStore();

const isLogin = ref(true);
const changeToLoginModal = () => isLogin.value = true;
const changeToSingUpModal = () => isLogin.value = false;

const name = ref('');
const email = ref('');
const password = ref('');

const loginHandler = () => email.value && password.value && userStore.login(email.value, password.value);
const registerHandler = () => name.value && email.value && password.value && userStore.register(name.value, email.value, password.value);
</script>

<style lang="scss" scoped>
.bg {
    background-image: url('@/assets/bg.jpg');
}
</style>
