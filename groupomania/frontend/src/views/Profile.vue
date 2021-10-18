<template>
  <div>
    <navbar/>
    <profil/>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Profil from '../components/profil.vue';

export default {
  name: "Profile",

  components: {
    Navbar,
    Profil,
  },
};
</script>

<style>
</style>