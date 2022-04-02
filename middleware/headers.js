export default function ({ req, store }) {
    const loggedUser = getUserFromLocalStorage()
    if (loggedUser) {
        Axios.defaults.headers.common['authorization'] = `Bearer ${loggedUser}}`
    }
}