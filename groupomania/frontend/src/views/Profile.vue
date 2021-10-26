<template>
  <b-container class="mb-10">
    <navbar />
    <b-row class="profil">
      <b-card
        img-src="https://placekitten.com/300/300"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem"
        class="mx-auto bg cardProfil"
      >
        <h1>Mon Profil</h1>
        <b-card-text>
          <p>Mon Nom : {{ user.username }}</p>
          <p>Mon Email : {{ user.email }}</p>
          <img />
        </b-card-text>
        <b-button @click="deleteAccount()" variant="danger">
          Supression du Compte
        </b-button>
      </b-card>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
import Navbar from "../components/Navbar.vue";
import { mapState } from "vuex";

export default {
  name: "User",
  components: {
    Navbar,
  },
  data() {
    return {
      retourAPI: "",
    };
  },
  mounted: function() {
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
    logout() {
      this.$store.commit("logout");
      this.$router.push("/");
    },
    deleteAccount() {
      axios
        .delete("http://localhost:3000/api/user/delete", {
          headers: {
            Authorization: "Bearer " + this.$store.state.user.token,
          },
        })
        .then(() => {
          console.log(this.$store.state.user.token);
          localStorage.clear();
          location.replace(location.origin + "/");
          this.$store.commit("setStatus", false);
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style>
.profil {
  background-image: url("~@/assets/icon.svg");
  background-size:45%;
  background-position: center;
}
.cardProfil {
  padding-top: 1rem;
}
</style>
