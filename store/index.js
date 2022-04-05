export const state = () => ({
    token: null,
    user: {},
  })
  
export const mutations = {
    setToken(state, token) {
        state.token = token;
    },
    setUser(state, user) {
        state.user = user
    }
}

export const actions = {
    async fetchToken({ commit }, body) {
        const data = await this.$api.post('/auth/otp', body)
        if(data.data.status){
            commit('setToken', data.data.payload.token)
            return true
        }
        return false
    },
    async signIn({ commit, state, app ,redirect  }, body) {
        const Headers = {
            headers: {
              Authorization: 'Bearer ' + state.token
            }
        }
        const data = await this.$api.post('/auth/verify', {...body, token: state.token}, Headers)
        if(data.data.status){
            if(data.data.payload.user.role === 1){
                commit('setToken', data.data.payload.token)
                commit('setUser', data.data.payload.user);
                window.$nuxt.$cookies.set('token', data.data.payload.token, {
                    path: '/',
                    maxAge: 60 * 60 * 24 * 7
                })
                return true
            }else {
                redirect('http://193.187.173.78:8081/');
                return false
            }
        }
        return false
    }
}

export const getters = {
    token:s=>s.token,
}

