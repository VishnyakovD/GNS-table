<template>
<div>
    <div class="header">
     <div class="header-menu"><router-link class="button style2"  to="/home">Back</router-link></div>
    </div>

    <div class="detail-page" v-if="detail">
        <div>
            <div>
                <h3>Id</h3>
                <h2>{{detail.id}}</h2>
            </div>
            <div>
                <h3>Name</h3>
                <h2>{{detail.name}}</h2>
            </div>
        </div>

        <div>
            <div>            
                <h3>Location</h3>
                <h2>{{detail.location}}</h2>
            </div>
            <div>
                <h3>Currency</h3>
                <h2>{{detail.currency}}</h2>
            </div>  
        </div>            

    </div>
</div>

</template>



<script>
export default {
  data: () => {
    return { detail: null };
  },
  created() {
    let id = this.$route.params.id;
    let result = this.$store.getters.rows.filter(elem => {
      if (id === elem.id) {
        this.detail = elem;
        return;
      }
    });
  }
};
</script>
