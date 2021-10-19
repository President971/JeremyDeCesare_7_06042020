<template>
  <b-row>
    <b-card
      img-src="https://picsum.photos/600/300/?image=25"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem"
      class="mx-auto bg"
    >
      <h1>Mon Profil</h1>
      <b-card-text>
        <p>Mon Nom :</p>
        <p>Mon Email : {{ user.email }}</p>
        <P> Ma Bio : </P>

        <img :src="user.photo" />
      </b-card-text>

      <b-button @click="logout()" variant="danger"> Déconnexion </b-button>
    </b-card>
  </b-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Profil",
  data() {
    return {
      users: [],
    };
  },
  mounted: function () {
    console.log(this.$store.state.user);
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/");
      return;
    }
    this.$store.dispatch("getUserInfos");
  },
  computed: {
    ...mapState({
      user: "userInfos",
    }),
  },
  methods: {
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
</style>>