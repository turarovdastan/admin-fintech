export default function ({ $axios }, inject) {
    const api = $axios.create();
    api.setBaseURL('http://192.168.0.100:8000')
    inject('api', api)
}