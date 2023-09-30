<template>
    <div>
        <div id="Search" class="bg-white w-full px-2 border-b shadow-sm">
            <div class="px-1 m-2 bg-[#F0F0F0] flex items-center justify-center rounded-md">
                <MagnifyIcon fillColor="#515151" :size="18" class="ml-2" />
                <input v-model="searchRef" class="
                        ml-5
                        apperance-none
                        w-full
                        bg-[#F0F0F0]
                        py-1.5
                        px-2.5
                        text-gray-700
                        leading-tight
                        focus:outline-none 
                        focus:shadow-outline
                        placeholder:text-sm
                        placeholder:text-gray-500
                    " autocomplete="off" type="text" placeholder="Start a new chat">
            </div>
        </div>
        <div id="FindFriends" class="h-[calc(100vh-110px)]">
            <div v-for="user in users" :key="user">
                <div @click="userStore.selectUser(user)" class="flex w-full p-4 items-center cursor-pointer">
                    <img class="rounded-full mr-4 w-12" src="https://random.imagecdn.app/100/100">
                    <div class="w-full">
                        <div class="flex justify-between items-center">
                            <div class="text-[15px] text-gray-600">{{ user.name }}</div>
                        </div>
                        <div class="flex items-center">
                            <div class="text-[15px] text-gray-500">Hi, I'm using WhatsApp!</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useUserStore } from "@/store/user-store";
import { storeToRefs } from "pinia";
import MagnifyIcon from 'vue-material-design-icons/Magnify.vue';

let searchRef = ref('')
const userStore = useUserStore()
const { currentUser } = storeToRefs(userStore)

const createNewChat = (user) => {
    userDataForChat.value = []
    userDataForChat.value.push({
        id: '',
        sub1: sub.value,
        sub2: user.sub,
        firstName: user.firstName,
        picture: user.picture,
    })
}

const users = computed(() => userStore.users
    .filter(user => user.id !== currentUser.value.id)
    .filter(user => {
        if (searchRef.value == '') return true;

        var regexPattern = new RegExp(searchRef.value + '.+$', 'i');
        return user.name.search(regexPattern) != -1;
    })
);
</script>

<style lang="scss" scoped></style>