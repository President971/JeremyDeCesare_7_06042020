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
            <b-row align="center">
              <b-col>
                <h5>
                  Bonjour <span style="color:red"> {{ user.username }} </span> !
                </h5>
                <h5>
                  Bienvenue sur votre réseau social
                  <span style="color:red"> Groupomania </span>
                </h5>
                <h4 class="mt-4">Publier votre Article !</h4>
              </b-col>
            </b-row>
            <b-row class="m-auto mb-8">
              <v-text-field
                v-model="title"
                :counter="100"
                :rules="titleRules"
                label="Votre Titre"
                required
              ></v-text-field>
            </b-row>
            <b-row class="m-auto">
              <v-textarea
                outlined
                :counter="1000"
                :rules="contentRules"
                v-model="content"
                name="input-7-4"
                label="Ecrivez votre message"
              ></v-textarea>
            </b-row>
            <b-row>
              <!-- Styled -->
              <b-col>
                <v-file-input
                  label="Votre image"
                  v-model="postImage"
                  prepend-icon="mdi-camera"
                ></v-file-input>
              </b-col>
              <b-col align="center" justify="end" class="mt-4">
                <v-btn @click="newMessage()" color="#ffd7d7">
                  Publier
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
      valid: true,
      title: null,
      titleRules: [
        (v) => !!v || "Votre Titre est requis",
        (v) => (v && v.length <= 100) || "Max 100 caractères",
      ],
      content: null,
      contentRules: [
        (v) => !!v || "Votre nom est requis",
        (v) => (v && v.length <= 1000) || "Max 1000 caractères",
      ],
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
      fd.append("author", this.author);
      fd.append("title", this.title);
      if (
        fd.get("inputFile") == "null" &&
        fd.get("content") == "null" &&
        fd.get("author") == "null" &&
        fd.get("title") == "null"
      ) {
        let msgReturn = document.getElementById("msgReturnAPI");
        msgReturn.classList.add("text-danger");
        this.msgError = "Rien à publier";
      } else {
        axios
          .post("http://localhost:3000/api/post/create", fd, {
            headers: {
              Authorization: "Bearer " + this.$store.state.user.token,
            },
          })
          .then((response) => {
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
