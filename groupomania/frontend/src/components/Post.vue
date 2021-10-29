<template>
  <v-container fluid>
    <v-card class="mx-auto  mb-4" max-width="760">
      <img
        v-if="post.attachement"
        :src="post.attachement"
        alt="Card image"
        img-left
        class="p-3"
        style="max-width: 760px; width: 100%"
      />

      <v-card-title>
        {{ post.title }}
      </v-card-title>

      <v-card-subtitle> écrit par {{ post.author }} </v-card-subtitle>
      <v-divider></v-divider>

      <v-card-text class="text-h5" bg-color="red">
        {{ post.content }}
      </v-card-text>
      <v-row>
        <v-col align="center" justify="end">
          <v-btn @click="show = !show" color="#ffd7d7" class="mb-4">
            Poster un commentaire
          </v-btn>
        </v-col>
      </v-row>
      <v-row v-if="user.isAdmin">
        <v-col align="center" justify="end">
          <v-btn @click="deletePost(post.id)" color="red" class="mb-4">
            Supprimer l'article
          </v-btn>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row v-if="post.answers.length > 0">
        <h4 class="ml-4">Commentaires</h4>
        <v-card class="mx-auto mb-4" color="#ffd7d7"  max-width="400" v-for="answer in post.answers" :key="answer.id">
          <v-card-title>
            <span class="text-h6 font-weight-light">{{ answer.author}} </span>
          </v-card-title>
          <v-card-text class="text-h5 font-weight-bold">
            {{ answer.content }}
          </v-card-text>
          <v-row v-if="user.isAdmin">
            <v-col align="center" justify="end">
              <v-btn @click="deleteAnswer(answer.id)" color="red" class="mb-4">
                Supprimer le Commentaire
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-row>
      <v-expand-transition>
        <div v-show="show">
          <b-row no-gutters>
            <b-col>
              <b-card-body>
                <b-row align="center">
                  <b-col>
                    <h4 class="mt-4">Publier votre Commentaire !</h4>
                  </b-col>
                </b-row>
                <b-row class="m-auto">
                  <v-textarea
                    outlined
                    :counter="256"
                    :rules="contentanswerRules"
                    v-model="contentanswer"
                    name="input-7-4"
                    label="Ecrivez votre commentaire"
                  ></v-textarea>
                </b-row>
                <b-row>
                  <b-col align="center" justify="end" class="mt-4">
                    <v-btn @click="newAnswer()" color="#ffd7d7">
                      Publier
                    </v-btn>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-col>
          </b-row>
        </div>
      </v-expand-transition>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  data() {
    return {
      allPosts: [],
      allAnswers: [],
      answer: "",
      content: null,
      msgError: "",
      show: false,
      contentanswerRules: [
        (v) => !!v || "Commentaire requis",
        (v) => (v && v.length <= 256) || "Max 256 caractères",
      ],
      contentanswer: null,
    };
  },
  props: {
    post: Object,
  },
  computed: {
    ...mapState(["user", "editOption"]),
  },
  methods: {
    newAnswer() {
      const fd = new FormData();
      fd.append("content", this.contentanswer);
      fd.append("postId", this.post.id);
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
    deletePost(postid) {
      axios
        .delete(`http://localhost:3000/api/post/delete/${postid}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.user.token,
          },
        })
        .then(() => {
          window.location.reload();
        })
        .catch((error) => console.log(error));
    },
    deleteAnswer(answerid) {
       console.log(answerid + 1);
      axios
        .delete(`http://localhost:3000/api/answer/delete/${answerid}`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.user.token,
          },
        })
        .then(() => {
          window.location.reload();
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style>
.input-text {
  width: 100%;
}
</style>
