<template>
  <div>
    <navbar/>
    <discussion/>
  </div>
</template>

<script>
import Discussion from '../components/Discussion.vue';
import Navbar from '../components/Navbar.vue';

export default {
  name: "Home",

  components: {
    Navbar,
    Discussion
  },
};
</script>

<style>
</style>