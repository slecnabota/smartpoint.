export default class RestApi {
    auth = {
        broadcast: () => $app.api.post(["auth/broadcast"]),
        info: () => $app.api.get(["auth/info"]),
        login: (login, password) => $app.api.post(["auth/login"]).data({login, password}),
        password: (old, password) => $app.api.patch(["auth/password"]).data({old, password}),
        recoverPassword: (data) => $app.api.patch(["auth/password-recover"]).data(data),
        editProfile: (data) => $app.api.patch(['auth/edit']).data(data),
        pincode: (pincode) => $app.api.patch(["auth/pincode"]).data({pincode}),
        avatar: (avatar) => $app.api.patch(["auth/avatar"]).data({avatar}),
        register: (data) => $app.api.post(["auth/register"]).data(data),
        delete: (userId) => $app.api.patch(["auth/delete"]).data(userId),
        reset: (username) => $app.api.post(["auth/username"]).data(username),
        checkIsLoginAvailable: (data) => $app.api.post(['auth/check-login']).data(data),
        checkRecoverAvailable: (data) => $app.api.post(['auth/check-recover']).data(data),
        sendCode: (data) => $app.api.post(['auth/send-code']).data(data),
        checkCode: (data) => $app.api.post(['auth/check-code']).data(data),
    };

    store = {
        products: {
            get: (id) => $app.api.get(['store/products*', id,]),
            order: (data) => $app.api.post(['store/orders',]).data(data),
            edit: (id, data) => $app.api.patch(['store/products*', id]).data(data),
        },
        conference: {
            get: (id) => $app.api.get(['store/conferences*', id,]),
            order: (data) => $app.api.post(['store/conferences/orders',]).data(data),
            busy: (id) => $app.api.post(['store/conferences*/busy-time', id,]),
        },
        coworking: {
            tariffs: () => $app.api.get(['store/coworking/tariffs',]),
            order: (data) => $app.api.post(['store/coworking/orders',]).data(data),
        },
        order: {
            get: (id) => $app.api.get(['store/my/orders*', id,]),
            edit: (id, data) => $app.api.patch(['store/my/orders*', id,]).data(data),
            confirm: (orderId) => $app.api.post(['store/orders/pay',]).data({orderId,}),
        },
    };


    services = {
        info: () => $app.api.get(["services/info"]),
        categories: () => $app.api.get(["services/categories"]),
    };

    comments = {
        get: (id) => $app.api.get(['comments*', id]),
    };

    booking = {
        // info: () => $app.api.get(["bookings/info"]),
        // dates: (productId) => $app.api.post(["booking/dates"]).data({ productId }),
        // hours: (productId, date) =>
        //   $app.api.post(["booking/hours"]).data({ productId, date }),
        conference: (conferenceId, paymentMethod, amount, startedAt, endedAt) =>
            $app.api
                .post(["store/conferences/orders"])
                .data({conferenceId, paymentMethod, amount, startedAt, endedAt}),
        order: (productId, paymentMethod, amount, startedAt, endedAt) =>
            $app.api
                .post(["store/order"])
                .data({productId, paymentMethod, amount, startedAt, endedAt}),
        paymentInfo: (id) => $app.api.get(['store/orders*/payment-info', id,]),
    };

    information = {
        info: () => $app.api.get(["information/info"]),
    };

    orders = {
        getMy: (id = '') => $app.api.get(['store/my/orders*', id]),
        createComment: (orderId, data) => $app.api.post(['store/my/orders*/comment', orderId,]).data(data),
    };

    products = {
        get: (id = "") => $app.api.get(["store/products*", id]),
    };
    conferences = {
        get: (id = "") => $app.api.get(["store/conferences*", id]),
    };

    faqs = {
        get: (id = '') => $app.api.get(['faqs*', id]),
    };

    files = {
        create: (data) => {
            const formData = new FormData()
            $n.each(data, (value, name) => {
                formData.append(name, value)
            })
            return $app.api.post(['files',]).data(formData).config({headers: {'Content-Type': 'multipart/form-data',},})
        },
    }
}
