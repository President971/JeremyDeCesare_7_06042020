<template>
  <b-container fluid no-body>
    <b-row no-body class="overflow-hidden mx-auto bg" style="max-width: 760px">
      <v-card
        v-for="answer in allAnswers"
        :key="answer.postid"
        class="mx-auto bg mb-4"
        color="red darken-1"
        dark
        max-width="760"
      >
        <v-card-title>
          <v-icon large left>
            mdi-account
          </v-icon>
          <span class="text-h6 font-weight-light"> {{ user.username }} </span>
        </v-card-title>

        <v-card-text class="text-h5 font-weight-bold">
          {{ answer.content }}
        </v-card-text>
      </v-card>
      <b-card-body>
        <div class="mb-4">
          <h5>Mettre un commentaire</h5>
        </div>
        <b-row>
          <b-form-textarea
            id="input_text"
            v-model="content"
            placeholder="Ajouter un texte"
            rows="2"
            max-rows="3"
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
    </b-row>
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
      answer: "",
      allAnswers: [],
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/answer", {
        headers: {
          Authorization: "Bearer " + this.$store.state.user.token,
        },
      })
      .then((response) => {
        this.allAnswers = response.data;
      });
  },
  props: {
    postid: Number,
  },
  computed: {
    ...mapState(["user", "editOption"]),
  },
  methods: {
    newAnswer() {
      console.log(this.postid);
      const fd = new FormData();
      fd.append("content", this.content);
      fd.append("postId", this.postid);
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
