<template>
  <b-container fluid>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="/home">Groupomania</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item right>
            <b-col>
              <b-item @click="profile()"> Profil </b-item>
            </b-col>
            <b-col>
              <b-item @click="logout()"> Sign Out </b-item>
            </b-col> 
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
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
      this.$router.push("/profile")
    }
  },
};
</script>