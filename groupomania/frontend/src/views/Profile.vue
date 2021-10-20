<template>
  <b-container>
    <b-row>
      <b-col>
        <navbar />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <profil />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Profil from "../components/profil.vue";

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