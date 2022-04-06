<template>
  <div @click="decorateTag" class="reply-card">
    <img class="avatar" src="../assets/avatars/image-juliusomo.png" alt="" />

    <textarea
      v-if="!hasParent"
      ref="firstLevelComment"
      placeholder="Add comment..."
      class="body"
      @keydown.enter="addNewComment"
    ></textarea>

    <div
      @click="setFocus"
      v-if="hasParent"
      ref="comment"
      contenteditable="false"
      class="body"
    >
      <div contentEditable="false" class="name-tag">
        {{ nameTag }}
      </div>
      <div
        @keydown.enter="addNewComment"
        ref="text"
        class="content"
        contenteditable="true"
      ></div>
    </div>
    <button @click="addNewComment">
      {{ btnText }}
    </button>
  </div>
</template>

<script>
export default {
  props: ["parentId", "userId"],
  data() {
    return {
      nameTag: "",
    };
  },
  computed: {
    btnText() {
      if (this.parentId != undefined) {
        return "REPLY";
      }
      return "SEND";
    },
    hasParent() {
      if (this.parentId != undefined) {
        return true;
      }
      return false;
    },
  },
  methods: {
    setFocus() {
      this.$refs.text.focus();
    },
    addNewComment() {
      if (this.parentId != undefined) {
        this.$store.dispatch("addComment", {
          parentId: this.parentId,
          comment: {
            id: Date.now(),
            user: "u4",
            body: this.$refs.comment.innerText,
            date: Date.now(),
            rating: 0,
            answers: [],
          },
        });

        this.$refs.text.innerText = "";
      } else {
        this.$store.dispatch("addComment", {
          parentId: this.parentId,
          comment: {
            id: Date.now(),
            user: "u4",
            body: this.$refs.firstLevelComment.value,
            date: Date.now(),
            rating: 0,
            answers: [],
          },
        });

        this.$refs.firstLevelComment.value = "";
      }
      this.observerAnswers();
      this.$emit("submit");
    },
    observerAnswers() {
      var ro = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const cr = entry.contentRect;

          if (cr.width < 520) {
            entry.target.querySelector(".not-editing").style.flexDirection =
              "column-reverse";
            entry.target.querySelector(".editing").style.flexDirection =
              "column-reverse";

            entry.target.querySelector(".counter").style.flexDirection =
              "row-reverse";

            entry.target.querySelector(
              ".editing .counter-wrapper"
            ).style.display = "none";
            entry.target.querySelector(".editing .edit-block").style.display =
              "none";

            entry.target.querySelector(".counter-wrapper").style.maxWidth =
              "88px";

            entry.target.querySelector(".counter-wrapper").style.height =
              "44px";

            entry.target.querySelector(".counter-wrapper").style.marginTop =
              "12px";

            entry.target
              .querySelector(".counter-wrapper")
              .appendChild(entry.target.querySelector(".edit-block"));
            entry.target;

            entry.target.querySelector(".counter-wrapper").style.display =
              "flex";

            entry.target.querySelector(
              ".counter-wrapper"
            ).style.justifyContent = "space-between";
            entry.target.querySelector(".counter-wrapper").style.maxWidth =
              "100%";
            entry.target.querySelector(".counter").style.width = "100px";
            entry.target.querySelector(".counter").style.height = "40px";
            entry.target.querySelector(".editing .comment").style.marginLeft =
              "0px";
            entry.target.querySelector(".comment").style.marginLeft = "0px";

            if (cr.width < 280) {
              entry.target.querySelector(".icon-delete-desc").style.display =
                "none";
              entry.target.querySelector(".icon-edit-desc").style.display =
                "none";
              entry.target.querySelector(".head").style.flexDirection =
                "column";

              entry.target.querySelector(".editing .head").style.flexDirection =
                "column";

              entry.target.querySelector(".head").style.alignItems =
                "flex-start";
              entry.target.querySelector(".editing .head").style.alignItems =
                "flex-start";

              entry.target.querySelector(".date").style.marginLeft = "48px";
              entry.target.querySelector(".editing .date").style.marginLeft =
                "48px";

              entry.target.querySelector(".editing .buttons").style.display =
                "block";

              entry.target.querySelector(".editing .cancel-btn").style.width =
                "100%";
              entry.target.querySelector(
                ".editing .cancel-btn"
              ).style.marginBottom = "8px";
              entry.target.querySelector(".editing .update-btn").style.width =
                "100%";
              entry.target.querySelector(".editing .area").style.margin =
                "0px 0px 8px 0px";

              entry.target.querySelector(".editing .comment").style.marginLeft =
                "0px";
            } else {
              entry.target.querySelector(".icon-delete-desc").style.display =
                "inline";
              entry.target.querySelector(".icon-edit-desc").style.display =
                "inline";

              entry.target.querySelector(".head").style.flexDirection = "row";
              entry.target.querySelector(".editing .head").style.flexDirection =
                "row";

              entry.target.querySelector(".head").style.alignItems = "center";
              entry.target.querySelector(".editing .head").style.alignItems =
                "center";

              entry.target.querySelector(".date").style.marginLeft = "16px";
              entry.target.querySelector(".editing .date").style.marginLeft =
                "16px";

              entry.target.querySelector(".editing .buttons").style.display =
                "flex";

              entry.target.querySelector(".editing .cancel-btn").style.width =
                "";
              entry.target.querySelector(
                ".editing .cancel-btn"
              ).style.marginBottom = "0px";
              entry.target.querySelector(".editing .update-btn").style.width =
                "";
            }
          } else {
            entry.target.querySelector(".not-editing").style.flexDirection =
              "row";
            entry.target.querySelector(".editing").style.flexDirection = "row";
            entry.target.querySelector(".counter").style.flexDirection =
              "column";

            entry.target.querySelector(".counter-wrapper").style.height =
              "100px";

            entry.target
              .querySelector(".data")
              .appendChild(entry.target.querySelector(".edit-block"));
            entry.target.querySelector(".counter-wrapper").style.display =
              "block";
            entry.target.querySelector(
              ".counter-wrapper"
            ).style.justifyContent = "";
            entry.target.querySelector(".counter-wrapper").style.maxWidth =
              "40px";
            entry.target.querySelector(".counter").style.width = "";
            entry.target.querySelector(".counter").style.height = "";

            entry.target.querySelector(".counter-wrapper").style.marginTop =
              "0px";

            entry.target.querySelector(".comment").style.marginLeft = "24px";
          }
        }
      });

      for (let comment of document.querySelectorAll(".admin-comment")) {
        ro.observe(comment);
      }
    },

    observerComments() {
      var ro = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const cr = entry.contentRect;

          if (cr.width < 520) {
            entry.target.querySelector(".not-editing").style.flexDirection =
              "column-reverse";

            entry.target.querySelector(".counter").style.flexDirection =
              "row-reverse";

            entry.target.querySelector(".counter-wrapper").style.maxWidth =
              "88px";

            entry.target.querySelector(".counter-wrapper").style.height =
              "44px";

            entry.target.querySelector(".counter-wrapper").style.marginTop =
              "12px";

            entry.target
              .querySelector(".counter-wrapper")
              .appendChild(entry.target.querySelector(".reply"));
            entry.target;

            entry.target.querySelector(".counter-wrapper").style.display =
              "flex";

            entry.target.querySelector(
              ".counter-wrapper"
            ).style.justifyContent = "space-between";
            entry.target.querySelector(".counter-wrapper").style.maxWidth =
              "100%";
            entry.target.querySelector(".counter").style.width = "100px";
            entry.target.querySelector(".counter").style.height = "40px";
            entry.target.querySelector(".comment").style.marginLeft = "0px";

            if (cr.width < 280) {
              entry.target.querySelector(".head").style.flexDirection =
                "column";

              entry.target.querySelector(".head").style.alignItems =
                "flex-start";

              entry.target.querySelector(".date").style.marginLeft = "48px";
            } else {
              entry.target.querySelector(".head").style.flexDirection = "row";

              entry.target.querySelector(".head").style.alignItems = "center";

              entry.target.querySelector(".date").style.marginLeft = "16px";
            }
          } else {
            entry.target.querySelector(".not-editing").style.flexDirection =
              "row";
            entry.target.querySelector(".counter").style.flexDirection =
              "column";

            entry.target.querySelector(".counter-wrapper").style.height =
              "100px";

            entry.target
              .querySelector(".data")
              .appendChild(entry.target.querySelector(".reply"));
            entry.target.querySelector(".counter-wrapper").style.display =
              "block";
            entry.target.querySelector(
              ".counter-wrapper"
            ).style.justifyContent = "";
            entry.target.querySelector(".counter-wrapper").style.maxWidth =
              "40px";
            entry.target.querySelector(".counter").style.width = "";
            entry.target.querySelector(".counter").style.height = "";

            entry.target.querySelector(".counter-wrapper").style.marginTop =
              "0px";

            entry.target.querySelector(".comment").style.marginLeft = "24px";
          }
        }
      });

      for (let comment of document.querySelectorAll(".comment-card")) {
        ro.observe(comment);
      }
    },

    observerReplyField() {
      var ro = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const cr = entry.contentRect;
          if (cr.width < 400) {
            entry.target.style.flexDirection = "column";
            entry.target.querySelector(".body").style.width = "100%";
            entry.target.querySelector("button").style.width = "100%";
          } else {
            entry.target.style.flexDirection = "row";
            entry.target.querySelector(".body").style.width = "";
            entry.target.querySelector("button").style.width = "";
          }
        }
      });

      for (let reply of document.querySelectorAll(".reply-card")) {
        ro.observe(reply);
      }
    },
  },
  mounted() {
    if (this.parentId != undefined) {
      let users = this.$store.state.users.users;

      let index = users.findIndex((user) => user.id == this.userId);

      this.nameTag = "@" + users[index].name + ", ";
    }
    this.observerAnswers(), this.observerComments(), this.observerReplyField();
  },
  updated() {
    this.setFocus();
    this.observerAnswers(), this.observerComments(), this.observerReplyField();
  },
};
</script>

<style scoped>
.name-tag {
  display: inline;
  font-weight: 500;
  color: rgba(84, 87, 182, 1);
}

.content {
  display: inline;
  outline: none;
}

.reply-card {
  width: 90%;
  display: flex;
  justify-content: flex-start;
  gap: 16px;
  align-items: flex-start;
  border-radius: 8px;
  padding: 24px;
  background-color: #fff;
  margin-top: -8px;
  margin-bottom: 18px;
}

img {
  width: 40px;
}

textarea {
  resize: none;
}

.body {
  flex-grow: 1;
  border: 1px solid #eaecf1;
  border-radius: 8px;

  min-height: 96px;
  outline: none;
  color: #324152;
  padding: 12px 24px;
}

button {
  margin-left: auto;
  background-color: #5457b6;
  color: #fff;
  font-weight: 500;
  outline: none;
  border: none;
  border-radius: 8px;
  padding: 12px 27px;
  cursor: pointer;
  transition: 0.2s;
}

button:hover {
  background: #c3c4ef;
}
</style>
