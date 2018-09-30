<template id="edit-cell">
    <div class="edit-cell">
        <input v-if="$parent.editType==='name'"
         v-model="value"
          v-bind:class="{error:isValid==false}"
           v-on:input="validate">
        <input v-if="$parent.editType==='location'"
         v-model="value"
          v-bind:class="{error:isValid==false}"
           v-on:input="validate">
        <input class="right-align"
         v-if="$parent.editType==='currency'"
          v-model="value"
           v-bind:class="{error:isValid==false}"
            v-on:input="validate">
        <span class="button style1"
         v-on:click.stop="save()"
          v-bind:class="{error:isValid==false}">ok</span>
    </div>
</template>

<script>
export default {
  name: "edit-cell",
  data: () => {
    return {
      value: "",
      isValid: true
    };
  },
  created() {
    this.value = this.$parent.editElem[this.$parent.editType];
  },
  methods: {
    save() {
      if (this.isValid === false) return;

      this.$store.dispatch("saveEditItem", {
        id: this.$parent.editElem.id,
        type: this.$parent.editType,
        value: this.value
      });
      this.$parent.editType = "";
      this.$parent.editElem = { id: "", name: "", location: "", currency: "" };
    },
    validate() {
      this.isValid = true;
      if (this.value === "") {
        this.isValid = false;
      }
      if (this.$parent.editType == "currency" && !Number(this.value)) {
        this.isValid = false;
      }
    }
  }
};
</script>

