<template>
  <div>
    <!-- Répondre  -->
    <div>
      <b-card class="mb-3">
        <b-row>
          <b-form-textarea
            id="textarea"
            placeholder="Commentez"
            rows="1"
            max-rows="2"
            v-model="inputAnswer.content"
          ></b-form-textarea>
          <b-button class="mt-4" variant="danger" @click="createAnswer()">
            Poster
          </b-button>
        </b-row>
      </b-card>
    </div>

    <!-- Liste des réponses  -->
    <div>
      <div v-for="answer in answers" :key="answer.id">
        <p>{{ answer.content }}</p>
      </div>
    </div>
  </div>
</template>


<script >
import axios from "axios";
export default {
  name: "Answers",
  data() {
    return {
      answer: "",
      answers: [],
      inputAnswer: {
        content: "",
      },
      userId: "",
    };
  },
  mounted() {
    ///////////////////GET ANSWERS/////////////////////
    let url = "http://localhost:3000/api/answers/" + this.postId + "/display";
    let options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + this.$store.state.user.token,
      },
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.answers = data;
        console.log(this.answers);
      })
      .catch((error) => console.log(error));
  },
  methods: {
    createAnswer() {
      let answer = {
        content: this.inputAnswer.content,
      };
      console.log(answer);
      axios
        .post("http://localhost:3000/api/answer/new", {
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
    },
  },
};
</script>
<style>
</style>