<template>
  <b-container fluid>
    <b-row v-for="user in users" :key="user">
      <b-card no-body class="overflow-hidden" style="max-width: 760px">
        <b-row no-gutters>
          <b-col md="6">
            <b-card-img
              src="https://picsum.photos/400/400/?image=20"
              alt="Image"
              class="rounded-0"
            ></b-card-img>
          </b-col>
          <b-col md="6">
            <b-card-body>
              <h1> {{ user.title }} </h1>
              <b-card-text>
                <p> {{ user.content }} </p>
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </b-row>
  </b-container>
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