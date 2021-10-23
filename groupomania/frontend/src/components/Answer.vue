<template>
  <div>
    <!-- Répondre  -->
    <div class="blocanswer">
      <b-card class="mb-3">
        <b-row>
          <b-form-textarea
            id="textarea"
            placeholder="Commentez"
            rows="1"
            max-rows="2"
          ></b-form-textarea>
          <b-button class="mt-4" variant="danger" @click="createAnswer()">
            Poster
          </b-button>
        </b-row>
      </b-card>
    </div>

    <!-- Liste des réponses  -->
    <div>
      <div v-for="answer in answers" :key="answer.id" class="blocanswers">
        <p>{{ answer.content }}</p>
      </div>
    </div>
  </div>
</template>


<script >
export default {
  name: "Answer",
  data() {
    return {
      answer: "",
      answers: [],
    };
  },
  //Passer des données aux composants enfants avec les props//
  props: {
    messageId: Number,
    messageUserId: Number,
  },
  mounted() {
    ///////////////////GET ANSWERS/////////////////////
    let url =
      "http://localhost:3000/api/answers/" + this.messageId + "/display";
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
    ///////////////////CREATE ANSWER/////////////////////
    createAnswer() {
      let inputContent = {
        content: this.content,
        messageId: this.messageId,
      };
      let url = "http://localhost:3000/api/answers/new";
      let options = {
        method: "POST",
        body: JSON.stringify(inputContent),
        headers: {
          Authorization: "Bearer " + this.$store.state.user.token,
          "Content-Type": "application/json",
        },
      };
      fetch(url, options)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.ok) {
            this.content = {};
          } else {
            alert("Commentaire envoyé 🖅");
          }
        })
        .then(window.location.reload())
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style>
</style>