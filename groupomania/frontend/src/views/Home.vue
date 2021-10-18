<template>
  <div>
    <navbar/>
    <newmsg/>
    <discussion/>
  </div>
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

<style>
</style>