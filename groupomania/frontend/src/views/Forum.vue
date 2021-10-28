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
    <b-row align="center" class="my-10">
      <h1>Dernières Publications</h1>
    </b-row>
    <v-row v-for="post in allPosts" :key="post.id">
      <post :post="post" />
    </v-row>
    <footerside />
  </v-container>
</template>

<script>
import axios from "axios";
import Navbar from "../components/Navbar";
import Newmsg from "../components/Newmsg";
import Post from "../components/Post";
import { mapState } from "vuex";
import Footerside from "../components/Footerside";

export default {
  components: {
    Navbar,
    Newmsg,
    Post,
    Footerside,
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
  created() {
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
