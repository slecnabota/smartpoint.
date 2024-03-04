import { defineStore } from 'pinia';
import coworkingImage from '@/assets/img/coworking.png';
import conferenceImage from '@/assets/img/conference.png';
import officeImage from '@/assets/img/office.png';
import lockerImage from '@/assets/img/lockerhall.png';

export const useMainStore = defineStore('main', {
    state: () => ({
        email: "example@gmail.com",
        formValues: {},
        formErrors: {},
        user: {},
        token: '',
        booking: [
            {
                name: 'coworking',
                to: 'coworking',
                image: coworkingImage,
                heading: 'Коворкинг',
                parent: 'booking'
            },
            {
                name: 'conference',
                to: 'conference',
                image: conferenceImage,
                heading: 'Конференц залы',
                parent: 'booking'
            },
            {
                name: 'office',
                to: 'office',
                image: officeImage,
                heading: 'Офис',
                parent: 'booking',
            },
            {
                name: 'lockerhall',
                to: 'lockerhall',
                image: lockerImage,
                heading: 'Шкафчики в зале',
                parent: 'booking'
            }
        ],
        services: [],
    }),
    getters: {
        userEmail: (state) => state.email,
        getUser: (state) => state.user,
        getToken: (state) => state.token,
        allBookings: (state) => state.booking,
        getBookingByName: (state) => (name) => {
            return state.booking.find(p => p.name === name);
        },
    },
    actions: {
        setEmail(email) {
            this.email = email;
            localStorage.setItem('email', email);
        },
        setValues({ formName, values }) {
            this.formValues = {
                ...this.formValues,
                [formName]: values,
            };
        },
        setErrors({ formName, errors }) {
            this.formErrors = {
                ...this.formErrors,
                [formName]: errors,
            };
        },
        login({ user, token }) {
            this.user = user;
            this.token = token;
            localStorage.setItem('auth', JSON.stringify({ user, token }));
        },
        logout() {
            this.user = {};
            this.token = '';
            localStorage.removeItem('auth');
        },
        setUser(user) {
            this.user = user;
            localStorage.setItem('auth', JSON.stringify({ user, token: this.token }));
        },
        initialiseStore() {
            const lsAuth = JSON.parse(localStorage.getItem('auth') || '{}');
            if (lsAuth.user && lsAuth.token) {
                this.user = lsAuth.user;
                this.token = lsAuth.token;
            }
            const email = localStorage.getItem('email');
            if (email) {
                this.email = email;
            }
        },
        addService(service) {
            this.services.push(service);
        },
        updateService(index, updatedService) {
            this.services[index] = updatedService;
        },
        removeService(index) {
            this.services.splice(index, 1);
        },
    },
});
