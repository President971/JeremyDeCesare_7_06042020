<template>
  <b-container fluid>
    <b-row v-for="user in users" :key="user.id">
      <b-card no-body class="mx-auto bg mb-4" style="max-width: 760px">
        <b-row>
          <b-col>
            <b-card-img
              src="https://picsum.photos/400/400/?image=20"
              fluid
              alt="Image"
            ></b-card-img>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-card-body>
              <h1>{{ user.title }}</h1>
              <b-card-text>
                <p>{{ user.content }}</p>
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