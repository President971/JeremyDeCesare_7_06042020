<template>
  <b-container fluid>
    <b-card no-body class="overflow-hidden" style="max-width: 760px">
      <b-row no-gutters>
        <b-col md="5">
          <b-card-img
            src="https://picsum.photos/400/400/?image=20"
            alt="Image"
            class="rounded-0"
          ></b-card-img>
        </b-col>
        <b-col md="7">
          <b-card-body>
            <b-row>
              <h1>Mon Message</h1>
            </b-row>
            <b-row>
              <b-form-textarea
                id="textarea"
                v-model="text"
                placeholder="Ecrivez quelques choses..."
                rows="3"
                max-rows="6"
              ></b-form-textarea>
              <pre class="mt-3 mb-0">{{ text }}</pre>
            </b-row>
            <b-row>
              <!-- Styled -->
              <b-form-file
                v-model="file1"
                :state="Boolean(file1)"
                placeholder="Choisissez une fichier ou déposer le ici..."
                drop-placeholder="Drop file here..."
              ></b-form-file>
            </b-row>
            <b-row>
              <b-button @click="poster()" variant="danger"> Poster </b-button>
            </b-row>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </b-container>
</template>

<script>
export default {
  name: "Newmsg",
  methods: {
    poster: function () {
    const baseURI = "http://localhost:8080";
    this.$http.post(baseURI + "/api/messages/new",{
      title: 'test50',
      content: 'teest50',
    })
    },
  },
};
</script>