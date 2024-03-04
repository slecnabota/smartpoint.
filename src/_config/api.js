export default class RestApi {
    /* eslint-disable */
    auth = {
        info: () => $app.api.get(['auth/info',]),
        login: (login, password) => $app.api.post(['auth/login',]).data({login, password,}),
        password: (old, password) => $app.api.patch(['auth/password',]).data({old, password,}),
        broadcast: () => $app.api.post(['auth/broadcast',]),
    }
    store = {
        product: () => $app.api.get(['store/products']),
        conference: () => $app.api.get(['store/conferences'])
    }
    // подключать апишки
}