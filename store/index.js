export const state = () => ({
    token: null
  })
  
export const mutations = {
    setToken(state, token) {
        state.token = token;
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
    async signIn({ commit, state  }, body) {
        const Headers = {
            headers: {
              Authorization: 'Bearer ' + state.token
            }
        }
        const data = await this.$api.post('/auth/verify', {...body, token: state.token}, Headers)
        if(data.data.status){
            commit('setToken', data.data.payload.token)
            return true
        }
        return false
    }
}

export const getters = {
    token:s=>s.token,
}

