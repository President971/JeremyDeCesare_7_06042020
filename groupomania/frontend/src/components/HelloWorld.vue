<template>
  <v-row>
    <v-dialog v-model="dialog" persistent max-width="560">
      <v-card>
        <v-img
          height="240"
          src="..\assets\icon-left-font.png"
        ></v-img>
        <v-col>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="name"
              :counter="20"
              :rules="nameRules"
              label="Nom"
              required
            ></v-text-field>
            <v-text-field
              v-model="name"
              :counter="20"
              :rules="prRules"
              label="Prénom"
              required
            ></v-text-field>

            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
          </v-form>
        </v-col>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Inscription
          </v-btn>
          <v-btn color="green darken-1" text @click="dialog = false">
            Connexion
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    dialog: true,
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Nom requis",
      (v) =>
        (v && v.length <= 20) ||
        "Votre nom doit avoir au maximum 20 caracteres",
    ],
    prRules: [
      (v) => !!v || "Prénom requis",
      (v) =>
        (v && v.length <= 20) ||
        "Votre prénom doit avoir au maximum 20 caracteres",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail requis",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
  }),
};
</script>