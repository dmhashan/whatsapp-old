import { defineStore } from 'pinia'
import { isEmpty } from 'lodash'
import { db } from '@/firebase-init'
import router from '@/router'
import { v4 as uuidv4 } from 'uuid';
import sha256 from 'crypto-js/sha256';
import {
    setDoc,
    doc,
    getDocs,
    collection,
    query,
    where,
    limit,
    onSnapshot
} from 'firebase/firestore';

export type User = {
    id: string;
    email: string;
    password?: string;
    name: string;
};

export const useUserStore = defineStore('user', {
    state: () => ({
        /** @type {User} */
        currentUser: {},

        /** @type {User[]} */
        users: Array<User>(),

        /** @type {User} */
        selectedUser: {},
    }),
    actions: {
        async register(name: string, email: string, password: string) {
            try {
                const usersCollection = collection(db, "users");
                const usersQuery = query(usersCollection,
                    where("email", "==", email),
                    limit(1)
                );
                const usersDocs = await getDocs(usersQuery);

                if (!usersDocs.empty) {
                    alert('Email is Already Registered');
                    return;
                }

                const id = uuidv4();
                const hashPassword = sha256(password).toString();

                await setDoc(doc(db, "users", id), { id, name, email, password: hashPassword });

                router.push({ path: '/auth' });
            } catch (error) {
                alert('Unknown error');
            }
        },

        async login(email: string, password: string) {
            try {
                const usersCollection = collection(db, "users");
                const hashPassword = sha256(password).toString();

                const usersQuery = query(usersCollection,
                    where("email", "==", email),
                    where("password", "==", hashPassword),
                    limit(1)
                );

                const usersDocs = await getDocs(usersQuery);

                if (!usersDocs.empty) {
                    const result = usersDocs.docs.map(user => user.data());
                    const currentUser: User = result[0];
                    delete currentUser.password;

                    this.currentUser = currentUser;
                    localStorage.setItem("current-user", JSON.stringify(currentUser));
                    router.push({ path: '/' });
                } else {
                    alert('Invalid credentials');
                }
            } catch (error) {
                alert('Unknown error');
            }
        },

        async logout() {
            this.currentUser = {};
            localStorage.removeItem("current-user");
            router.push({ path: 'auth' });
        },

        async fetchCurrentUser() {
            const currentUserString = localStorage.getItem("current-user");

            if (currentUserString && !isEmpty(currentUserString)) {
                const currentUser = JSON.parse(currentUserString);
                this.currentUser = currentUser;
                router.push({ path: '/' });
            } else {
                this.currentUser = {};
                router.push({ path: '/auth' });
            }
        },

        async getAllUsers() {
            try {
                const userQuery = query(
                    collection(db, "users")
                );
                onSnapshot(userQuery, (querySnapshot) => {
                    this.users = [];
                    querySnapshot.forEach(doc => {
                        const data = doc.data();
                        this.users.push(data);
                    })
                })
            } catch (error) {
                console.log(error);
            }
        },

        selectUser(user: User) {
            this.selectedUser = user;
        }
    },
    persist: true
})