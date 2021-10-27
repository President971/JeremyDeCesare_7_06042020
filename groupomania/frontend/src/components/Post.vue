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
        Titre de l'article
      </v-card-title>

      <v-card-subtitle>
        Auteur de l'article
      </v-card-subtitle>

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

          <v-card-text class="text-h5">
            {{ post.content }}
          </v-card-text>
          <v-row v-if="user.isAdmin">
            <v-col align="center" justify="end">
              <v-btn @click="deletePost(post.id)" color="red" class="mb-4">
                Supprimer
              </v-btn>
            </v-col>
          </v-row>
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
      content: null,
      msgError: "",
      show: false,
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
    /* newAnswer() {
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
    }, */
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
    /* deleteAnswer(answerid) {
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
    },*/
  },
};
</script>

<style>
.input-text {
  width: 100%;
}
</style>
