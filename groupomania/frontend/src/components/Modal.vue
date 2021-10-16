<template>
  <v-row>
    <v-card persistent max-width="560">
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
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="email" label="E-mail" required></v-text-field>
          <v-text-field
            v-model="password"
            label="Mot de Passe"
            required
          ></v-text-field>
        </v-form>
      </v-col>
      <v-col v-else>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="email" label="E-mail" required></v-text-field>
          <v-text-field
            v-model="nom"
            label="Nom d'utilisateur"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Mot de Passe"
            required
          ></v-text-field>
        </v-form>
      </v-col>

      <v-card-actions
        v-if="mode == 'login'"
      >
        <v-spacer></v-spacer>
        <v-btn
          @click="connexion()"
          color="green darken-1"
          text
          :class="{ 'button--disabled': !valitedFields }"
        >
          Connexion
        </v-btn>
      </v-card-actions>
      <v-card-actions v-else>
        <v-spacer></v-spacer>
        <v-btn
          @click="createAccount()"
          color="green darken-1"
          text
          :class="{ 'button--disabled': !valitedFields }"
        >
          Inscription
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-row>
</template>

<script>
export default {
  name: "Login",
  data: function () {
    return {
      mode: "login",
      email: "",
      nom: "",
      password: "",
    };
  },
  computed: {
    validatedFields: function () {
      if (this.mode == "create") {
        if (
          this.email != "" &&
          this.nom != "" &&
          this.password != ""
        ) {
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
  },
  methods: {
    switchToCreateAccount: function () {
      this.mode = "create";
    },
    switchToLogin: function () {
      this.mode = "login";
    },
    createAccount: function () {
      this.$store.dispatch('createAccount', {
        email: this.email,
        username: this.nom,
        password: this.password,
      })
    },
  }
};
</script>