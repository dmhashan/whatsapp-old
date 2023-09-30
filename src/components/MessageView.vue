<template>
    <div class="h-[100vh]">
        <div class="w-full bg">
            <div class="border-l border-green-500 w-full">
                <div class="
                        bg-[#F0F0F0] 
                        fixed 
                        z-10 
                        min-w-[calc(100vw-420px)] 
                        flex 
                        justify-between 
                        items-center 
                        px-2 
                        py-2
                    ">
                    <div class="flex items-center">
                        <img class="rounded-full ml-1 w-10" src="https://random.imagecdn.app/100/100" alt="">
                        <div class="text-gray-900 ml-4">
                            {{ selectedUser.name }}
                        </div>
                    </div>

                    <div class="flex items-center justify-center">
                        <MagnifyIcon class="mr-6" fillColor="#515151" />
                        <DotsVerticalIcon class="mr-6" fillColor="#515151" />
                    </div>
                </div>
            </div>

            <div id="MessagesSection" class="
                pt-20 
                pb-8 
                z-[-1]
                h-[calc(100vh-65px)]
                w-[calc(100vw-420px)]
                overflow-auto
                fixed
                touch-auto
            ">
                <div v-for="chat in chats" class="px-20 text-sm">
                    <div>
                        <div v-if="chat.senderId == currentUser.id" class="flex justify-end space-x-1 w-[calc(100%-50px)] float-right">
                            <div class="inline-block bg-green-200 p-2 rounded-md my-1">
                                {{ chat.message }}
                            </div>
                        </div>
                        <div v-else class="flex w-[calc(100%-50px)]">
                            <div class="inline-block bg-white p-2 rounded-md my-1">
                                {{ chat.message }}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="w-[calc(100vw-420px)] p-2.5 z-10 bg-[#F0F0F0] fixed bottom-0">
                <div class="flex items-center justify-center">
                    <EmoticonExcitedOutlineIcon :size="27" fillColor="#515151" class="mx-1.5" />
                    <PaperclipIcon :size="27" fillColor="#515151" class="mx-1.5 mr-3" />
                    <input v-model="messageRef" class="
                        mr-1
                        shadow
                        apperance-none
                        rounded-lg
                        w-full
                        py-3
                        px-4
                        text-gray-700
                        leading-tight
                        focus:outline-none 
                        focus:shadow-outline
                    " autocomplete="off" type="text" placeholder="Message">
                    <button @click="sendMessage" class="ml-3 p-2 w-12 flex items-center justify-center">
                        <SendIcon fillColor="#515151" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import DotsVerticalIcon from 'vue-material-design-icons/DotsVertical.vue';
import MagnifyIcon from 'vue-material-design-icons/Magnify.vue';
import EmoticonExcitedOutlineIcon from 'vue-material-design-icons/EmoticonExcitedOutline.vue';
import PaperclipIcon from 'vue-material-design-icons/Paperclip.vue';
import SendIcon from 'vue-material-design-icons/Send.vue';
import moment from 'moment';
import { useUserStore } from '@/store/user-store';
import { useChatStore } from '@/store/chat-store';
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/firebase-init'
import {
    setDoc,
    doc,
    getDocs,
    collection,
    query,
    where,
    limit
} from 'firebase/firestore';

let messageRef = ref('')
const userStore = useUserStore();
const chatStore = useChatStore();
const { selectedUser, currentUser } = storeToRefs(userStore);
const { userChats } = storeToRefs(chatStore);

const sendMessage = async () => {
    if (isEmpty(messageRef.value)) return;

    try {
        const id = uuidv4();
        const message = messageRef.value.slice();
        const createdAt = moment().unix();
        const receiverId = selectedUser.value.id;
        const senderId = currentUser.value.id;

        messageRef.value = '';

        await setDoc(doc(db, "chats", id), { id, senderId, receiverId, message, createdAt });
    } catch (error) {
        alert('Unknown error');
        throw error;
    }
}

const chats = computed(() => chatStore.userChats.filter(chat => chat.senderId == selectedUser.value.id || chat.receiverId == selectedUser.value.id));
</script>

<style>
.bg {
    background: url('@/assets/bg.jpg') no-repeat fixed;
    background-size: cover;
    width: 100%;
    height: 100%;
    position: fixed;
}
</style>