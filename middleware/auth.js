export default function ({ app, redirect, route, store }) {
    if (!app.$cookies.get('token') && route.path !== '/login/code') {
      return redirect('/login')
    }
    if(app.$cookies.get('token')) store.commit('setToken', app.$cookies.get('token'));
  }