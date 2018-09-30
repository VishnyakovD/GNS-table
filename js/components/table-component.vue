<template id="table-component">
<div>
    <div class="header">
     <div class="header-label">Search</div>
     <div class="header-search"><input v-model="searchQuery" v-on:input="search"></div>  
    </div>
    <table class="table-results">
        <tr v-bind:class='sortClass'>
            <th v-on:click="sortBy('name')">Name
                <span>▲</span>
            </th>
            <th v-on:click="sortBy('location')">Location
                <span>▲</span>
            </th>
            <th class="right-align" v-on:click="sortBy('currency')">Currency
                <span>▲</span>
            </th>
            <th></th>
        </tr>
        <tr v-bind:key="item.id" v-for="item in rows">
            <td v-on:click="editCell('name',item)">
                <div v-if="item.name !== editElem.name">{{item.name}}</div>
                <div v-else-if="editType === 'name'">
                   <edit-cell></edit-cell>
                </div>
            </td>
            <td v-on:click="editCell('location',item)">
                <div v-if="item.location !== editElem.location">{{item.location}}</div>
                <div v-else-if="editType === 'location'">
                   <edit-cell></edit-cell>
                </div>
            </td>
            <td v-on:click="editCell('currency',item)">
                <div v-if="item.currency !== editElem.currency">{{item.currency}}</div>
                <div v-else-if="editType === 'currency'">
                   <edit-cell></edit-cell>
                </div>
            </td>
            <td>
                <router-link class="button" :to="{name:'Detail', params:{id:item.id}}">Detail</router-link>
            </td>
        </tr>
        <tfoot>
            <tr>
                <td></td>
                <td></td>
                <td>Total: {{sum}}</td>
                <td></td>
            </tr>
        </tfoot>

    </table>
</div>

</template>


<script>
import EditCellComponent from "../components/edit-cell.vue";

export default {
  data: () => {
    return {
      searchQuery: "",
      rows: [],
      editElem: { id: "", name: "", location: "", currency: "" },
      editType: ""
    };
  },
  computed: {
    sum() {
      this.rows = this.$store.getters.rows;
      return this.$store.getters.sum;
    },
    sortClass() {
      return this.$store.getters.sortBy + " " + this.$store.getters.sortType;
    }
  },
  watch: {
    rows: function() {
      this.rows = this.$store.getters.rows;
    }
  },
  methods: {
    sortBy(value) {
      this.$store.dispatch("setSortBy", value);
      return this.$store.getters.sortRows;
    },
    search() {
      this.$store.dispatch("search", this.searchQuery);
    },
    editCell(type, element) {
      this.editType = type;
      this.editElem = { id: "", name: "", location: "", currency: "" };
      this.editElem.id = element.id;

      if (type === "name") {
        this.editElem.name = element.name;
      }
      if (type === "location") {
        this.editElem.location = element.location;
      }
      if (type === "currency") {
        this.editElem.currency = element.currency;
      }

      console.log(type);
    }
  },
  components: { "edit-cell": EditCellComponent }
};
</script>