export default function ({ $axios, app, redirect }, inject) {
    const api = $axios.create();
    api.setBaseURL(process.env.NODE_ENV !== 'production' ? 'http://localhost:8000' : 'http://193.187.173.78:8000')
    api.interceptors.response.use((response) => response, (error) => {
        app.$cookies.remove('token')
        redirect('/login')
    });
    inject('api', api)
}