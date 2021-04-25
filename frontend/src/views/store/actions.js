export default {
  LOGOFF({ commit, state }) {
    state.accessToken = null;
    state.role = null;
    state.email = null;
    commit("SET_ACCESS_TOKEN", null);
    commit("SET_USER_EMAIL", null);
    commit("SET_ROLE", null);
  },
  SET_ACCESS_TOKEN({ commit }, token) {
    commit("SET_ACCESS_TOKEN", token)
  },
  SET_ROLE({ commit }, role) {
    commit("SET_ROLE", role)
  },
  SET_USER_EMAIL({ commit }, email) {
    commit("SET_USER_EMAIL", email)
  }
}