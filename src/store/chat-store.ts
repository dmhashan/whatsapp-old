import { defineStore } from 'pinia'
import { db } from '@/firebase-init'
import {
    collection,
    query,
    where,
    onSnapshot,
    or,
    orderBy,
} from 'firebase/firestore';
import { useUserStore } from '@/store/user-store';
import { storeToRefs } from 'pinia';

export type Chat = {
    id: string;
    senderId: string;
    receiverId: string;
    message: string;
    createdAt: string;
};

export const useChatStore = defineStore('chat', {
    state: () => ({
        /** @type {Chat[]} */
        userChats: Array<Chat>(),
    }),
    actions: {
        async fetchUserChat() {
            try {
                const userChatsQuery = query(
                    collection(db, "chats"),
                    or(
                        where("senderId", "==", storeToRefs(useUserStore()).currentUser.value.id),
                        where("receiverId", "==", storeToRefs(useUserStore()).currentUser.value.id),
                    ),
                    orderBy("createdAt")
                );
                onSnapshot(userChatsQuery, (querySnapshot) => {
                    this.userChats = [];
                    querySnapshot.forEach(doc => {
                        const data = doc.data();
                        this.userChats.push(data);
                    })
                })
            } catch (error) {
                console.log(error);
            }
        },
    },
    persist: true
})