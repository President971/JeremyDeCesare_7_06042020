<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card
          class="mx-auto bg mb-4 pt-4"
          style="max-width: 760px"
        >
          <v-row>
            <img
              v-if="post.attachement"
              :src="post.attachement"
              alt="Card image"
              img-left
              class="mb-3"
            />
          </v-row>
          <v-card class="mx-auto bg mb-4 my-8" color="red" dark max-width="760">
            <v-row>
              <v-card-title>
                <v-icon large left>
                  mdi-account
                </v-icon>
                <span class="text-h6 font-weight-light">
                  {{ this.user.username}}
                </span>
              </v-card-title>
            </v-row>
            <v-row>
              <v-col>
                <v-card-text class="text-h4 font-bold">
                  <span class="white--text"> {{ post.content }} </span>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row v-if="user.isAdmin">
              <v-col align="center" justify="end">
                <v-btn @click="deletePost(post.id)"> Supprimer </v-btn>
              </v-col>
            </v-row>
          </v-card>
          <v-row
            no-body
            class="overflow-hidden mx-auto bg"
            style="max-width: 760px"
          >
            <v-card
              class="mx-auto bg mb-4"
              color="#ffd7d7"
              dark
              max-width="760"
            >
              <v-card-title>
                <v-icon large left>
                  mdi-account
                </v-icon>
                <span class="text-h6 font-weight-light black--text">
                </span>
              </v-card-title>

              <v-card-text class="text-h4 ">
                <span class="black--text"> {{ answer.content }} </span>
              </v-card-text>
              <v-row v-if="user.isAdmin">
                <v-col align="center" justify="end">
                  <v-btn @click="deleteAnswer(answer.id)"> Supprimer </v-btn>
                </v-col>
              </v-row>
            </v-card>
            <v-card>
              <div class="mb-4"></div>
              <v-row>
                <v-textarea
                  outlined
                  v-model="content"
                  label="Ecrivez votre commentaire"
                ></v-textarea>
              </v-row>
              <v-row>
                <!-- Styled -->
                <v-col>
                  <v-btn @click="newAnswer()" color="red">
                    Poster
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  data() {
    return {
      allPosts: [],
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
    post: Object, 
  },
  computed: {
    ...mapState(["user", "editOption"]),
  },
  methods: {
    newAnswer() {
      const fd = new FormData();
      fd.append("content", this.content);
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
