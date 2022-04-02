export default function ({ $axios }, inject) {
    const api = $axios.create();
    api.setBaseURL('http://193.187.173.78:8000')
    inject('api', api)
}