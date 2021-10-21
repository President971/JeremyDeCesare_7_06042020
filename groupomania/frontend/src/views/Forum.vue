<template>
  <v-container  >
    <v-row>
      <v-col>
        <navbar />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <newmsg />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <discussion />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Discussion from '../components/Discussion.vue';
import Navbar from '../components/Navbar.vue';
import Newmsg from '../components/Newmsg.vue';

export default {
  name: "Home",

  components: {
    Navbar,
    Discussion,
    Newmsg
  },
};
</script>


<style lang="css" scoped>
.container {
  background-image: (url('~@/assets/icon.png')) ;
}

</style>
