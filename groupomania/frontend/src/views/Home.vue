<template>
  <div>
    <navbar />
    <discussion />
    <hello-world />
  </div>
</template>

<script>
import HelloWorld from "../components/HelloWorld";
import Navbar from "../components/Navbar";
import Discussion from "../components/Discussion";


export default {
  name: "Home",

  components: {
    HelloWorld,
    Navbar,
    Discussion
  },
};
</script>

<style>

div {
image: url(/assets/icon.png);
}
</style>