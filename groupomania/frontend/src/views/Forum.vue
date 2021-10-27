<template>
  <v-container id="forum" class="forum">
    <v-row>
      <v-col>
        <navbar />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <newmsg />
      </v-col>
    </v-row>
    <v-row align="center" class="my-10">
      <h1>Dernières Publications</h1>
    </v-row>
    <v-row v-for="post in allPosts" :key="post.id">
      <post :post="post" />
    </v-row>
    <footer />
  </v-container>
</template>

<script>
import axios from "axios";
import Navbar from "../components/Navbar";
import Newmsg from "../components/Newmsg";
import Post from "../components/Post";
import { mapState } from "vuex";
import Footer from "../components/Footer";

export default {
  components: {
    Navbar,
    Newmsg,
    Post,
    Footer,
  },
  name: "Forum",
  data() {
    return {
      allPosts: [],
    };
  },
  computed: {
    ...mapState(["user", "editOption"]),
  },
  mounted() {
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/");
      return;
    }
    axios
      .get("http://localhost:3000/api/post", {
        headers: {
          Authorization: "Bearer " + this.$store.state.user.token,
        },
      })
      .then((response) => {
        this.allPosts = response.data;
      });
  },
};
</script>

<style>
.forum {
  background-image: url("~@/assets/icon.svg");
  background-position: center;
}
.answer {
  padding-bottom: 2rem;
  margin-top: 2rem;
}
</style>
