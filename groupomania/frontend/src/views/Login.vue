<template>
  <v-container class="login">
    <v-row>
      <v-card persistent max-width="560" class="mx-auto my-10 bg">
        <v-img height="240" src="..\assets\icon-left-font.png"></v-img>
        <h1 class="card__title" v-if="mode == 'login'">Connexion</h1>
        <h1 class="card__title" v-else>Inscription</h1>
        <p class="card__subtitle" v-if="mode == 'login'">
          Tu n'as pas encore de compte ?
          <a class="card__action" @click="switchToCreateAccount()"
            >Créer un compte</a
          >
        </p>
        <p class="card__subtitle" v-else>
          Tu as déjà un compte ?
          <a class="card__action" @click="switchToLogin()">Se connecter</a>
        </p>
        <v-col v-if="mode == 'login'">
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              type="password"
              v-model="password"
              :rules="passwordRules"
              label="Mot de Passe"
              required
            ></v-text-field>
          </v-form>
        </v-col>
        <v-col v-else>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              type="password"
              v-model="password"
              :rules="passwordRules"
              label="Mot de Passe"
              required
            ></v-text-field>
            <v-text-field
              v-model="username"
              :rules="usernameRules"
              label="Nom d'utilisateur"
              required
            ></v-text-field>
          </v-form>
        </v-col>

        <v-card-actions>
          <div
            class="form-row"
            v-if="mode == 'login' && status == 'error_login'"
          >
            Adresse mail et/ou mot de passe invalide
          </div>
          <div
            class="form-row"
            v-if="mode == 'create' && status == 'error_create'"
          >
            Adresse mail ou Nom d'utilisateur incorrect
          </div>

          <v-spacer></v-spacer>
          <v-btn
            @click="login()"
            class="button"
            :class="{ 'button--disabled': !validatedFields }"
            v-if="mode == 'login'"
          >
            Connexion
          </v-btn>
          <v-btn
            @click="createAccount()"
            class="button"
            :class="{ 'button--disabled': !validatedFields }"
            v-else
          >
            Créer mon compte
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Login",
  data: function() {
    return {
      mode: "login",
      valid: true,
      emailRules: [
        (v) => !!v || "E-mail requis ",
        (v) =>
          /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g.test(
            v
          ) || "E-mail doit être valide",
      ],
      email: "",
      username: "",
      usernameRules: [
        (v) => !!v || "Votre nom d'utilisateur est requis ",
        (v) =>
          /^(?!.*\.\.)(?!.*\.$)[^\W ][\w. ]{0,29}$/.test(v) ||
          "Nom d'utilisateur correct requis",
      ],
      password: "",
      passwordRules: [
        (v) => !!v || "Mot de passe requis ",
        (v) =>
          /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/.test(v) ||
          "le Mot de passe doit contenir 8 caractères dont au minimum une majuscule, une minuscule, un caractère numérique et un caractère spécial",
      ],
    };
  },
  computed: {
    validatedFields: function() {
      if (this.mode == "create") {
        if (this.email != "" && this.username != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.email != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      }
    },
    ...mapState(["status"]),
  },
  methods: {
    switchToCreateAccount: function() {
      this.mode = "create";
    },
    switchToLogin: function() {
      this.mode = "login";
    },
    login: function() {
      const self = this;
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password,
        })
        .then(
          function() {
            self.$router.push("/forum");
          },
          function(error) {
            console.log(error);
          }
        );
    },
    createAccount: function() {
      const self = this;
      this.$store
        .dispatch("createAccount", {
          email: this.email,
          username: this.username,
          password: this.password,
        })
        .then(
          function() {
            self.login();
          },
          function(error) {
            console.log(error);
          }
        );
    },
  },
};
</script>
<style></style>
