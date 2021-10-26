<template >
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
    <b-row >
        <h1> Dernières Publication </h1>
    </b-row>
    <b-row>
      <b-col>
        <b-card
          v-for="post in allPosts"
          :key="post.id"
          no-body
          class="mx-auto bg mb-4"
          style="max-width: 760px"
        >
          <img
            v-if="post.attachement"
            :src="post.attachement"
            alt="Card image"
            img-left
            class="mb-3"
          />
          <b-card-text>
            <p>{{ post.content }}</p>
          </b-card-text>
          <answer :postid="post.id" />
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
import Navbar from "../components/Navbar";
import Newmsg from "../components/Newmsg";
import Answer from "../components/Answer";

export default {
  components: {
    Navbar,
    Newmsg,
    Answer,
  },
  name: "Discussion",
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
  background-image: url('~@/assets/icon.svg');
  background-position: center;
}
</style>
