<template>
  <b-container fluid>
    <b-card no-body class="overflow-hidden mx-auto bg" style="max-width: 760px">
      <b-row no-gutters>
        <b-col>
          <b-card-body>
            <div class="mb-4">
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
                <b-button @click="newAnswer()" variant="danger" class="mt-4">
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
  name: "Answers",
  data() {
    return {
      content: null,
      msgError: "",
    };
  },
  props: {},
  computed: {
    ...mapState(["user", "editOption"]),
  },
  methods: {
    newAnswer() {
      const fd = new FormData();
      fd.append("content", this.content);
      if (fd.get("content") == "null") {
        let msgReturn = document.getElementById("msgReturnAPI");
        msgReturn.classList.add("text-danger");
        this.msgError = "Rien à publier";
      } else {
        axios
          .post("http://localhost:3000/api/answer/create", fd, {
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
  },
};
</script>

<style>
.input-text {
  width: 100%;
}
</style>