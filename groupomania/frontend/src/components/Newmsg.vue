<template>
  <b-container fluid>
    <v-card
      elevation="10"
      class="overflow-hidden mx-auto bg"
      style="max-width: 760px"
    >
      <b-row no-gutters>
        <b-col>
          <b-card-body>
            <b-row class="mb-4">
              <b-col>
                <v-icon large color="red darken-2">
                  mdi-account
                </v-icon>
                <span> {{ user.username }} </span>
              </b-col>
            </b-row>
            <b-row  
          class="m-auto">
              <v-textarea
                outlined
                v-model="content"
                name="input-7-4"
                label="Ecrivez votre message"
              ></v-textarea>
            </b-row>
            <b-row>
              <!-- Styled -->
              <b-col>
                <v-file-input
                  label="File input"
                  v-model="postImage"
                  prepend-icon="mdi-camera"
                ></v-file-input>
              </b-col>
              <b-col align="center" justify="end">
                <v-btn @click="newMessage()" color="red">
                  Poster
                </v-btn>
              </b-col>
            </b-row>
          </b-card-body>
        </b-col>
      </b-row>
    </v-card>
  </b-container>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "CreatePost",
  data() {
    return {
      content: null,
      postImage: null,
      msgError: "",
    };
  },
  mounted: function() {
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/");
      return;
    }
  },
  computed: {
    ...mapState(["user", "editOption"]),
  },
  methods: {
    newMessage() {
      const fd = new FormData();
      fd.append("inputFile", this.postImage);
      fd.append("content", this.content);
      if (fd.get("inputFile") == "null" && fd.get("content") == "null") {
        let msgReturn = document.getElementById("msgReturnAPI");
        msgReturn.classList.add("text-danger");
        this.msgError = "Rien à publier";
        this.$store.dispatch("messageId", {
          messageId: this.postId,
        });
      } else {
        axios
          .post("http://localhost:3000/api/post/create", fd, {
            headers: {
              Authorization: "Bearer " + this.$store.state.user.token,
            },
          })
          .then((response) => {
            //Si retour positif de l'API reload de la page pour affichage du dernier post
            if (response) {
              window.location.reload();
            }
          })
          .catch((error) => (this.msgError = error));
      }
    },
    onFileChange(e) {
      console.log(e);
      this.postImage = e.target.files[0] || e.dataTransfer.files;
      console.log(this.postImage);
    },
  },
};
</script>

<style>
.input-text {
  width: 100%;
}
</style>
