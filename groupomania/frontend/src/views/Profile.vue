<template>
  <v-container>
    <v-row>
      <v-col>
        <navbar />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <profil />
      </v-col>
    </v-row>
  </v-container>
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