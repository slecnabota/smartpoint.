import each from 'lodash/each'
import {createRouter, createWebHistory} from 'vue-router';

export default () => ({
    /* eslint-disable */
    api: {
        servers: {
            default: $env('VITE_SERVER'),
        },
        then: (response) => {
            if (response?.data?.message) {
                // Vue.$toast.open({
                //   message: response.data.message,
                //   type: 'success',
                //   position: 'bottom-left',
                //   duration: 5 * 1000,
                // })
            }
            return response
        },
        catch: (error) => {
            let message = ''

            if (error.response?.status === 401) {
                $app.auth.logout()
            } else if (error.response?.status === 422) {
                const data = error.response?.data.data
                let errors = ''
                each(data, (item) => {
                    errors += item[0]
                })
                message = 'Ошибка: ' + error.response?.data.message + ', ' + errors
            } else {
                message = 'Ошибка: ' + (error.response?.data.message || 'Сервер недоступен')
            }

            // Vue.$toast.open({
            //   message,
            //   type: 'error',
            //   position: 'bottom-left',
            //   duration: 15 * 1000,
            // })
            throw error
        },
    },
    auth: {
        method: 'jwt',
        loginRoute: 'loginpage',
        authRoute: 'booking',
        apiAuth: (token) => {
            $app.api.config({
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
        },
    },
    router: {
        create(routes) {
            return createRouter({
                history: createWebHistory(import.meta.env.BASE_URL),
                routes,
            })
        }
    },
    date: {
        formats: {
            date: 'DD.MM.YYYY',
            time: 'HH:mm',
            datetime: 'DD.MM.YYYY HH:mm',
        },
        default: 'datetime',
    },
})
