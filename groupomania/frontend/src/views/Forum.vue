<template>
  <b-container id="forum" class="forum">
    <b-row>
      <b-col>
        <navbar />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <newmsg />
      </b-col>
    </b-row>
    <b-row align="center" class="my-10">
      <h1>Dernières Publications</h1>
    </b-row>
    <b-row>
      <b-col>
        <post/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Navbar from "../components/Navbar";
import Newmsg from "../components/Newmsg";
import Post from "../components/Post";

export default {
  components: {
    Navbar,
    Newmsg,
    Post,
  },
  name: "Forum",
  data() {
    return {
      allPosts: [],
    };
  },
  mounted() {
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/");
      return;
    }
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
