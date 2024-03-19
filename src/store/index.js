import {defineStore} from 'pinia';

export const useMainStore = defineStore('main', {
    state: () => ({
        user: {},
        token: '',
    }),
    getters: {},
    actions: {},
});
