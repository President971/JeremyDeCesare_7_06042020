<template>
  <b-container fluid>
    <b-card no-body class="overflow-hidden mx-auto bg" style="max-width: 760px">
      <b-row no-gutters>
        <b-col>
          <b-card-body>
            <div class="mb-4">
              <b-avatar variant="info"></b-avatar>
              <span> {{ user.username }} </span>
              <h3>Créer un post</h3>
            </div>
            <b-row>
              <b-form-textarea
                id="input_text"
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
                  v-model="postImage"
                  class="mt-4"
                  plain
                ></b-form-file>
              </b-col>
              <b-col>
                <b-button @click="newMessage()" variant="danger" class="mt-4">
                  Poster
                </b-button>
              </b-col>
            </b-row>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
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
  mounted: function () {
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