<template>
  <b-container fluid>
    <b-card
      v-for="post in allPosts"
      :key="post.id"
      no-body
      class="mx-auto bg mb-4"
      style="max-width: 760px"
    >
      <img v-if="post.attachement"
        :src="post.attachement"
        alt="Card image"
        img-left
        class="mb-3"
      />
      <b-card-text>
        <p>{{ post.content }}</p>
      </b-card-text>
      <hr />
      <b-card class="mb-3">
        <b-card-text>
          <p></p>
        </b-card-text>
        <b-row>
          <b-form-textarea
            id="textarea"
            placeholder="Commentez"
            rows="1"
            max-rows="2"
          ></b-form-textarea>
          <b-button class="mt-4" variant="danger"> Poster </b-button>
        </b-row>
      </b-card>
    </b-card>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
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
        console.log("post", response.data);
        this.allPosts = response.data;
      })  
  },
};
</script>