<template>
  <v-row>
    <v-card persistent max-width="560">
      <v-img height="240" src="..\assets\icon-left-font.png"></v-img>
      <h1 class="card__title" v-if="mode == 'login'">Connexion</h1>
      <h1 class="card__title" v-else>Inscription</h1>
      <p class="card__subtitle" v-if="mode == 'login'">
        Tu n'as pas encore de compte ?
        <span class="card__action" @click="switchToCreateAccount()"
          >Créer un compte</span
        >
      </p>
      <p class="card__subtitle" v-else>
        Tu as déjà un compte ?
        <span class="card__action" @click="switchToLogin()">Se connecter</span>
      </p>
      <v-col>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="password"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
          <v-text-field
            v-model="name"
            :counter="20"
            :rules="nameRules"
            label="Nom d'utilisateur"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :counter="30"
            :rules="passwordRules"
            label="Mot de Passe"
            required
          ></v-text-field>
        </v-form>
      </v-col>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="register()">
          Inscription
        </v-btn>
        <v-btn color="green darken-1" text @click="connexion()">
          Connexion
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
    };
  },
  methods: {
    switchToCreateAccount: function () {
      this.mode = "create";
    },
    switchToLogin: function () {
      this.mode = "login";
    },
  },
};
</script>