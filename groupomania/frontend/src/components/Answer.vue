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
          <b-button class="mt-4" variant="danger">
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
export default {
  name: "Answers",
  data() {
    return {
      answer: "",
      answers: [],
      inputAnswer: {
        content: "",
      },
    };
  },
};
</script>

<style>
</style>