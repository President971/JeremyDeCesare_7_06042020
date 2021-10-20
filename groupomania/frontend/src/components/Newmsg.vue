<template>
  <b-container fluid>
    <b-card no-body class="overflow-hidden mx-auto bg" style="max-width: 760px">
      <b-row no-gutters>
        <b-col>
          <b-card-body>
            <h2>Exprimez-vous</h2>
            <b-row>
              <b-col>
                <h5>Titre :</h5>
              </b-col>
              <b-col cols="10">
                <b-input
                  v-model="title"
                  id="textarea"
                  placeholder="Ajouter un titre"
                  rows="1"
                  max-rows="1"
                ></b-input>
              </b-col>
              <b-form-textarea
                id="textarea"
                v-model="content"
                placeholder="Ajouter un texte"
                rows="4"
                max-rows="6"
              ></b-form-textarea>
            </b-row>
            <b-row>
              <!-- Styled -->
              <b-col>
                <b-form-file
                  v-model="attachment"
                  class="mt-4"
                  plain
                ></b-form-file>
              </b-col>
              <b-col>
                <b-button @click="newMessage()" class="mt-4"> Poster </b-button>
              </b-col>
            </b-row>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </b-container>
</template>

<script>
export default {
  name: "Newmsg",
  data() {
    return {
      title: "",
      content: "",
      attachment: null,
    };
  },
  mounted: function () {
    console.log(this.$store.state.user);
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/");
      return;
    }
  },
  methods: {
    newMessage() {
      console.log(this.content);
      let newMessage = {
        title: this.title,
        content: this.content,
        attachment: this.attachment,
      };
      const baseURI = "http://localhost:8080";
      this.$http.post(baseURI + "/api/messages/new", newMessage);
      console.log(newMessage);
    },
  },
};
</script>