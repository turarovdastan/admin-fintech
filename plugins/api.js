export default function ({ $axios }, inject) {
    const api = $axios.create();
    api.setBaseURL('http://localhost:8000')
    inject('api', api)
}