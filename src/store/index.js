import Vue from 'vue'
import Vuex from 'vuex';
import {getters} from './getters';
import {mutations} from './mutations';
import {actions} from './actions';

Vue.use(Vuex);

const store = {
  strict: true,
  state: {
    username: '',
    directweb: null
  },
  getters,
  mutations, actions,
}

export default new Vuex.Store(store);
