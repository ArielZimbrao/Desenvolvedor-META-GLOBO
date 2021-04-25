import mutations from './mutations'
import state from './state'
import getters from './getters'
import actions from './actions'
import createdPersistedState from "vuex-persistedstate";
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const vuex = {
    state,
    getters,
    actions,
    mutations,
}

if (process.env.NODE_ENV !== "development") vuex.plugins = [createdPersistedState()];
export default new Vuex.Store(vuex);
