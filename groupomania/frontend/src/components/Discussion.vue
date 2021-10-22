<template>
  <b-container fluid>
    <b-card
      v-for="user in users"
      :key="user.id"
      no-body
      class="mx-auto bg mb-4"
      style="max-width: 760px"
    >
      <img
        src="https://placekitten.com/300/300"
        alt="Card image"
        img-left
        class="mb-3"
      />
      <b-card-text>
        <h2>{{ user.title }}</h2>
        <p>{{ user.content }}</p>
      </b-card-text>
      <b-row>
        <b-col>
          <b-icon icon="emoji-smile" scale="2" variant="success"></b-icon>
        </b-col>
        <b-col>
          <b-icon icon="emoji-frown" scale="2" variant="danger"></b-icon>
        </b-col>
      </b-row>
      <hr />
      <b-card class="mb-3">
        <b-card-text>
          <p>{{ user.content }}</p>
        </b-card-text>
        <b-row>
          <b-col>
            <b-icon icon="emoji-smile" scale="1" variant="success"></b-icon>
          </b-col>
          <b-col>
            <b-icon icon="emoji-frown" scale="1" variant="danger"></b-icon>
          </b-col>
        </b-row>
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
      users: [],
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/post", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then(response => {
        console.log("post", response.data);
        this.allPosts = response.data;
      })
      .catch(error => {
        console.log(error);
      }),
      this.$store.dispatch("getUserInfos");
  }
};
</script>