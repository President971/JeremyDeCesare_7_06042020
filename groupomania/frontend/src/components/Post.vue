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

      <v-card-actions>
        <v-row>
          <v-col>
            <v-btn @click="show = !show" color="red" class="mb-4">
              Lire l'Article
            </v-btn>
          </v-col>
        </v-row>

        <v-spacer></v-spacer>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text class="text-h5" bg-color ="red">
            {{ post.content }}
          </v-card-text>
          <v-row v-if="user.isAdmin">
            <v-col align="center" justify="end">
              <v-btn @click="deletePost(post.id)" color="red" class="mb-4">
                Supprimer l'article
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-expand-transition>
      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
           <h4 class="ml-4">Commentaires </h4> 
          <v-row v-if="user.isAdmin">
            <v-col align="center" justify="end">
              <v-btn @click="deleteAnswer(answer.id)" color="red" class="mb-4">
                Supprimer le Commentaire
              </v-btn>
            </v-col>
          </v-row>
            <b-row no-gutters>
              <b-col>
                <b-card-body>
                  <b-row align="center">
                    <b-col>
                      <h4 class="mt-4">Publier votre Commentaire !</h4>
                    </b-col>
                  </b-row>
                  <b-row class="m-auto mb-4">
                    <v-text-field
                      v-model="author"
                      :counter="30"
                      :rules="authorRules"
                      label="Votre Nom"
                      required
                    ></v-text-field>
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
                      <v-btn @click="newAnswer()" color="red">
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
      author: null,
      authorRules: [
        (v) => !!v || "Votre nom est requis",
        (v) => (v && v.length <= 30) || "Max 30 caractères",
      ],
      contentanswerRules: [
        (v) => !!v || "Commentaire requis",
        (v) => (v && v.length <= 256) || "Max 256 caractères",
      ],
      contentanswer: null,
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
      axios
        .delete(`http://localhost:3000/api/post/delete/${answerid}`, {
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
