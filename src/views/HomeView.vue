<template>
    <div class="flex bg-[#0a1014]">
        <div class="fixed w-[420px] z-10">
            <Header />
            <FindFriendsView />
        </div>

        <div class="fixed ml-[420px] w-[calc(100vw-420px)] z-10">
            <MessageView v-if="!isEmpty(selectedUser)" />
            <WelcomeView v-else />
        </div>
    </div>
</template>

<script setup lang="ts">
import MessageView from '@/components/MessageView.vue';
import FindFriendsView from '@/components/FindFriendsView.vue';
import Header from '@/components/Header.vue';
import WelcomeView from '@/components/WelcomeView.vue';

import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { isEmpty } from 'lodash';

import { useUserStore } from '@/store/user-store';
import { useChatStore } from '@/store/chat-store';
const userStore = useUserStore();
const chatStore = useChatStore();
const { selectedUser } = storeToRefs(userStore);

onMounted(async () => {
    try {
        await userStore.getAllUsers();
        await chatStore.fetchUserChat();
        userStore.selectUser({});
    } catch (error) {
        console.log(error);
    }
})
</script>

<style lang="scss" scoped></style>
