<template>
    <div class="bg-[#F0F0F0] w-full flex justify-between items-center px-3 py-2">
        <img class="rounded-full ml-1 w-10" src="https://random.imagecdn.app/100/100" alt="">
        <div class="flex items-center justify-center">
            <AccountGroupIcon fillColor="#515151" class="mr-6" />
            <Popover class="relative">
                <PopoverButton>
                    <DotsVerticalIcon />
                </PopoverButton>
                <transition enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95">
                    <PopoverPanel class="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
                        <div
                            class="px-6 absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div class="py-4">
                                <a @click="logout" href="#">Logout</a>
                            </div>
                        </div>
                    </PopoverPanel>
                </transition>
            </Popover>
        </div>
    </div>
</template>

<script setup>
import AccountGroupIcon from 'vue-material-design-icons/AccountGroup.vue';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';

import DotsVerticalIcon from 'vue-material-design-icons/DotsVertical.vue';
import { useUserStore } from '@/store/user-store';

const userStore = useUserStore();
const logout = async () => await userStore.logout();
</script>