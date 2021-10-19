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
        <p>Mon Nom : {{ user.username }}</p>
        <p>Mon Email : {{ user.email }}</p>
        <p>Ma Bio :</p>
        <b-row>
          <div>
            <b-form-input v-model="bio"></b-form-input>
          </div>
        </b-row>
        <img />
      </b-card-text>

      <b-button @click="logout()" variant="danger"> Déconnexion </b-button>
      <b-button @click="deleteProfil()" variant=""> delete </b-button>
      <b-button @click="updateProfil()" variant="primary">
        Mise a jour
      </b-button>
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
      bio: "",
    };
  },
  mounted: function () {
    console.log(this.$store.state.user);
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/");
      return;
    }
    this.$store.dispatch("getUserInfos");
    this.bio = this.$store.state.userInfos.bio;
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
    updateProfil() {
      let updateUserInfos = {
        username: this.user.username,
        email: this.user.email,
        bio: this.bio,
      };
      console.log(updateUserInfos);
      this.$store.dispatch("updateUserInfos", updateUserInfos);
    },
    deleteProfil() {
      this.$store.dispatch("deleteUser");
      this.logout();
    },
  },
};
</script>

<style scoped>
</style>>