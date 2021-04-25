
export default {
  LOGOFF(state) {
    state.accessToken = null;
    state.role = null;
    state.email = null;
  },
  SET_ACCESS_TOKEN(state, token) {
    state.accessToken = token;
  },
  SET_ROLE(state, role) {
    state.role = role;
  },
  SET_USER_EMAIL(state, email) {
    state.email = email;
  }
};
