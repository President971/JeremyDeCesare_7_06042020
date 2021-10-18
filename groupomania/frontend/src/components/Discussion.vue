<template>
  <div class="container">
        <div class="row" v-for="user in users" :key="user">

    </div>
    <div class="row"  v-for="user in users" :key="user">
      <b-card
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem"
        class="mb-2"
      >
      <h1> {{ user.title }}</h1>
        <b-card-text>
         {{user.content}}
        </b-card-text>

        <b-button href="#" variant="primary">Go somewhere</b-button>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Discussion",
  data() {
    return {
      users: [],
    };
  },
  mounted: function getMessages() {
    const baseURI = "http://localhost:8080";
    this.$http.get(baseURI + "/api/messages/").then((result) => {
      this.users = result.data;
    });
  },
};
</script>