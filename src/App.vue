<template>
  <comments-board></comments-board>
</template>

<script>
import CommentsBoard from "./components/CommentsBoard.vue";

export default {
  name: "App",
  components: {
    CommentsBoard,
  },
  data() {
    return {
      comments: this.$store.state.comments.comments,
    };
  },
  methods: {},
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap");

*,
*::before,
*::after {
  box-sizing: border-box;
}

ul[class],
ol[class] {
  padding: 0;
}

body,
h1,
h2,
h3,
h4,
p,
ul[class],
ol[class],
li,
figure,
figcaption,
blockquote,
dl,
dd {
  margin: 0;
}

body {
  margin-top: 40px;
  background-color: #f5f6fa;

  -webkit-font-smoothing: antialiased;

  min-height: 100vh;
  scroll-behavior: smooth;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
  font-family: "Rubik", sans-serif;
}

ul[class],
ol[class] {
  list-style: none;
}

a:not([class]) {
  text-decoration-skip-ink: auto;
}

img {
  max-width: 100%;
  display: block;
}

input,
button,
textarea,
select {
  font: inherit;
}
</style>
