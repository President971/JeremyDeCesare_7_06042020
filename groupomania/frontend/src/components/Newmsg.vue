<template>
  <div class="row">
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
            <h1> Mon Message </h1>
            <div>
              <b-form-textarea
                id="textarea"
                v-model="text"
                placeholder="Ecrivez quelques choses..."
                rows="3"
                max-rows="6"
              ></b-form-textarea>
              <pre class="mt-3 mb-0">{{ text }}</pre>
            </div>
            <div>
              <!-- Styled -->
              <b-form-file
                v-model="file1"
                :state="Boolean(file1)"
                placeholder="Choisissez une fichier ou déposer le ici..."
                drop-placeholder="Drop file here..."
              ></b-form-file>
            </div>
              <b-button variant="danger"> Poster </b-button>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Newmsg",
};
</script>