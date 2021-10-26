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
        <b-card
          v-for="post in allPosts"
          :key="post.id"
          class="mx-auto bg mb-4 pt-4"
          style="max-width: 760px"
        >
          <b-row>
            <img
              v-if="post.attachement"
              :src="post.attachement"
              alt="Card image"
              img-left
              class="mb-3"
            />
          </b-row>
          <v-card class="mx-auto bg mb-4 my-8" color="red" dark max-width="760">
            <b-row>
              <v-card-title>
                <v-icon large left>
                  mdi-account
                </v-icon>
                <span class="text-h6 font-weight-light">
                  USER
                </span>
              </v-card-title>
            </b-row>
            <b-row>
              <b-col>
                <v-card-text class="text-h4 font-bold">
                  <span class="white--text"> {{ post.content }} </span>
                </v-card-text>
              </b-col>
            </b-row>
            <v-row>
              <v-col align="center" justify="end">
                <v-btn @click="deletePost()"> Supprimer </v-btn>
              </v-col>
            </v-row>
          </v-card>
          <answer :postid="post.id" class="answer" />
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
  methods: {
    deletePost(postid) {
      axios
        .delete(`http://localhost:3000/api/post/delete${ postid }`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.user.token,
          },
        })
        .then(() => {
          window.location.reload();
        })
        .catch((error) => console.log(error));
    },
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
