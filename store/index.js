import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadUser: [],
      loadPage: 1,
      loadUserToken: ""
    },
    mutations: {
      setUser(state, user) {
        state.loadUser = user;
      },
      setLoadPage(state, loadPage) {
        state.loadPage = loadPage;
      },
      setUserToken(state, userToken) {
        state.loadUserToken = userToken;
      }
    },
    actions: {
      setUser(vuexContext, user) {
        vuexContext.commit("setUser", user);
      },
      setLoadPage(vuexContext, loadPage) {
        vuexContext.commit("setLoadPage", loadPage);
      },
      setUserToken(vuexContext, userToken) {
        vuexContext.commit("setUserToken", userToken);
      }
    },
    getters: {
      loadUser(state) {
        return state.loadUser;
      }
    }
  });
};

export default createStore;
