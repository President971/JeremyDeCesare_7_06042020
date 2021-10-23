<template>
  <v-container>
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
    <v-row>
      <v-col>
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
          <v-col cols="12" md="6">
           <answer />
          </v-col>
        </b-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import Navbar from "../components/Navbar";
import Newmsg from "../components/Newmsg";
import Answer from "../components/Answer"

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
</style>
