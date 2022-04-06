<template>
  <section class="main">
    <comment-card
      v-for="comment in allComments"
      :key="comment.id"
      :id="comment.id"
      :date="comment.date"
      :body="comment.body"
      :userid="comment.user"
      :rating="comment.rating"
    ></comment-card>
    <reply-card></reply-card>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import CommentCard from "./CommentCard.vue";
import ReplyCard from "./ReplyCard.vue";

export default {
  components: {
    CommentCard,
    ReplyCard,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["allComments"]),
  },
  methods: {},
};
</script>

<style>
.main {
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 760px;
  padding: 0 15px;
  word-wrap: break-word;
}

.pop-up {
  position: absolute;
  top: -40px;
  height: 120vh;
  width: 100%;
  margin-top: 0;
  background-color: rgba(0, 0, 0, 1);
  opacity: 0.6;
  z-index: 2;
  overflow: hidden;
}
</style>
