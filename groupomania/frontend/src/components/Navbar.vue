<template>
  <b-container fluid>
    <b-row class="align-self-center">
      <b-navbar toggleable="lg" variant="faded" type="light" class="mx-auto bg">
        <b-col></b-col>
        <b-navbar-brand
          to="/Forum"
          img
          src="../assets/icon.png"
          class="mx-auto bg"
          ><img
            fluid
            src="../assets/icon-left-font.png"
            alt="Groupomania"
            height="480px"
            class="mx-auto bg"
          />
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-col>
            <b-navbar-nav class="mx-auto">
              <b-nav-item right>
                <b-col>
                  <span @click="profile()"> Profil </span>
                </b-col>
                <b-col>
                  <span @click="logout()"> Déconnexion </span>
                </b-col>
              </b-nav-item>
            </b-navbar-nav>
          </b-col>
        </b-collapse>
      </b-navbar>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/");
    },
    profile: function () {
      this.$router.push("/profile");
    },
  },
};
</script>