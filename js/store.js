import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import Resource1 from "vue-resource";
Vue.use(Resource1);

const store = new Vuex.Store({
  state: {
    rows: [],
    rowsOrigin: [],
    sum: 0,
    sortBy: "",
    sortType: "none" //'none','asc','desc'
  },
  getters: {
    rows(state) {
      return state.rows;
    },
    sortRows(state) {
      if (state.sortType === "asc") {
        switch (state.sortBy) {
          case "name":
            return state.rows.sort((a, b) => {
              let nameA = a.name.toLowerCase();
              let nameB = b.name.toLowerCase();

              if (nameA < nameB) return -1;
              if (nameA > nameB) return 1;
              return 0;
            });

          case "location":
            return state.rows.sort((a, b) => {
              let locationA = a.location.toLowerCase();
              let locationB = b.location.toLowerCase();

              if (locationA < locationB) return -1;
              if (locationA > locationB) return 1;
              return 0;
            });

          case "currency":
            return state.rows.sort((a, b) => {
              return a.currency - b.currency;
            });
        }
      }

      if (state.sortType === "desc") {
        switch (state.sortBy) {
          case "name":
            return state.rows.sort((a, b) => {
              let nameA = a.name.toLowerCase();
              let nameB = b.name.toLowerCase();

              if (nameB < nameA) return -1;
              if (nameB > nameA) return 1;
              return 0;
            });

          case "location":
            return state.rows.sort((a, b) => {
              let locationA = a.location.toLowerCase();
              let locationB = b.location.toLowerCase();

              if (locationB < locationA) return -1;
              if (locationB > locationA) return 1;
              return 0;
            });

          case "currency":
            return state.rows.sort((a, b) => {
              return b.currency - a.currency;
            });
        }
      }

      if (state.sortType === "none") {
        state.sortBy = "";
        return state.rows.sort((a, b) => {
          let idA = a.id.toLowerCase();
          let idB = b.id.toLowerCase();

          if (idA < idB) return -1;
          if (idA > idB) return 1;
          return 0;
        });
      }
    },
    sum(state) {
      let sum = 0;
      state.rows.forEach(element => (sum += element.currency));
      return sum;
    },
    sortBy(state) {
      return state.sortBy;
    },
    sortType(state) {
      return state.sortType;
    }
  },
  mutations: {
    set(state, { type, value }) {
      state[type] = value;
    }
  },
  actions: {
    loadRows({ commit }) {
      try {
        Vue.http
          .get("/data.bin")
          .then(
            response => {
              return response.json();
            },
            err => {
              console.log(err);
            }
          )
          .then(json => {
            let result = json.sort((a, b) => {
              let idA = a.id.toLowerCase();
              let idB = b.id.toLowerCase();

              if (idA < idB) return -1;
              if (idA > idB) return 1;
              return 0;
            });
            commit("set", { type: "rows", value: result });
            commit("set", { type: "rowsOrigin", value: result.slice() });
          });
      } catch (ex) {
        console.log(ex);
      }
    },
    setSortBy({ commit }, value) {
      switch (this.state.sortType) {
        case "none":
          commit("set", { type: "sortType", value: "asc" });
          break;

        case "asc":
          commit("set", { type: "sortType", value: "desc" });
          break;

        case "desc":
          commit("set", { type: "sortType", value: "none" });
          break;
      }
      commit("set", { type: "sortBy", value: value });
    },
    search({ commit }, query) {
      let rowsTmp = this.state.rowsOrigin.slice();
      rowsTmp = rowsTmp.filter(element => {
        if (
          element.name.indexOf(query) >= 0 ||
          element.location.indexOf(query) >= 0 ||
          element.currency.toString().indexOf(query) >= 0
        ) {
          return element;
        }
      });

      commit("set", { type: "rows", value: rowsTmp });
    },
    saveEditItem({ commit }, value) {
      this.state.rows.forEach(elemet => {
        if (elemet.id === value.id) {
          if (value.type === "name") {
            elemet.name = value.value;
          }
          if (value.type === "location") {
            elemet.location = value.value;
          }
          if (value.type === "currency") {
            elemet.currency = value.value;
          }
        }
      });
      this.state.rowsOrigin.forEach(elemet => {
        if (elemet.id === value.id) {
          if (value.type === "name") {
            elemet.name = value.value;
          }
          if (value.type === "location") {
            elemet.location = value.value;
          }
          if (value.type === "currency") {
            elemet.currency = value.value;
          }
        }
      });

      //commit('set', {type: 'rows', value: tmp1});
      //commit('set', {type: 'rowsOrigin', value: tmp2});
    }
  }
});

export default store;
