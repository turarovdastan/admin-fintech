export default function ({ $axios }, inject) {
    const api = $axios.create();
    api.setBaseURL(process.env.NODE_ENV !== 'production' ? 'http://localhost:8000' : 'http://193.187.173.78:8000')
    inject('api', api)
}