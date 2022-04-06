<template>
  <delete-modal
    :is-open="isPopupOpen"
    @ok="popupConfirmed"
    @cancel="isPopupOpen = false"
  ></delete-modal>
  <div class="comment-wrapper">
    <div :class="[isYou ? adminComment : commentCard]">
      <div v-show="!isEditing" class="not-editing">
        <div class="counter-wrapper">
          <div class="counter">
            <img @click="rateUp" src="../assets/icon-plus.svg" alt="" />
            <span :class="{ redCounter: lessThanZero }">{{ rating }}</span>
            <img @click="rateDown" src="../assets/icon-minus.svg" alt="" />
          </div>
        </div>
        <div class="comment">
          <div v-if="isYou" class="data">
            <div class="head">
              <div class="profile">
                <img class="avatar" :src="avatar" alt="" />
                <span class="name">{{ name }}</span>
                <span class="bage">you</span>
              </div>
              <span class="date">{{ parsedDate }}</span>
            </div>
            <div class="edit-block">
              <div @click="openPopup" class="delete">
                <svg
                  class="delete-btn"
                  width="14"
                  height="13"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                    fill="#ED6368"
                  />
                </svg>

                <span class="icon-delete-desc">Delete</span>
              </div>
              <div @click="toggleEditinigMode" class="edit">
                <svg
                  class="edit-btn"
                  width="14"
                  height="13"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                    fill="#5357B6"
                  />
                </svg>

                <span class="icon-edit-desc">Edit</span>
              </div>
            </div>
          </div>
          <div v-if="!isYou" class="data">
            <div class="head">
              <div class="profile">
                <img class="avatar" :src="avatar" alt="" />
                <span class="name">{{ name }}</span>
              </div>
              <span class="date">{{ parsedDate }}</span>
            </div>
            <div class="reply">
              <svg
                class="reply-arrow"
                width="14"
                height="13"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                  fill="#5357B6"
                />
              </svg>

              <span @click="toggleReply">Reply</span>
            </div>
          </div>
          <span class="body">
            <span class="name-tag">{{ tagPart }}</span
            ><span>{{ textPart }}</span>
          </span>
        </div>
      </div>

      <!-- Editing start -->
      <div v-show="isEditing" class="editing">
        <div class="counter-wrapper">
          <div class="counter">
            <img @click="rateUp" src="../assets/icon-plus.svg" alt="" />
            <span :class="{ redCounter: lessThanZero }">{{ rating }}</span>
            <img @click="rateDown" src="../assets/icon-minus.svg" alt="" />
          </div>
        </div>
        <div class="comment">
          <div v-if="isYou" class="data">
            <div class="head">
              <div class="profile">
                <img class="avatar" :src="avatar" alt="" />
                <span class="name">{{ name }}</span>
                <span class="bage">you</span>
              </div>

              <span class="date">{{ parsedDate }}</span>
            </div>
            <div class="edit-block">
              <div class="delete">
                <svg
                  class="delete-btn"
                  width="14"
                  height="13"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                    fill="#ED6368"
                  />
                </svg>

                <span class="icon-delete-desc">Delete</span>
              </div>
              <div class="edit">
                <svg
                  class="edit-btn"
                  width="14"
                  height="13"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                    fill="#5357B6"
                  />
                </svg>

                <span class="icon-edit-desc" @click="toggleEditinigMode"
                  >Edit</span
                >
              </div>
            </div>
          </div>
          <textarea
            v-model="newText"
            class="area"
            @keyup.enter="update"
          ></textarea>
          <div class="buttons">
            <button @click="toggleEditinigMode" class="cancel-btn">
              CANCEL
            </button>
            <button @click="update" class="update-btn">UPDATE</button>
          </div>
        </div>
      </div>
      <!-- Editing end -->
    </div>
    <div class="answer">
      <div class="container">
        <comment-answer
          v-for="comment in commentAnswers"
          :key="comment.id"
          :id="comment.id"
          :date="comment.date"
          :body="comment.body"
          :userid="comment.user"
          :answers="comment.answers"
          :rating="comment.rating"
        ></comment-answer>
      </div>
      <reply-card
        @submit="toggleReply"
        :parentId="id"
        :userId="userid"
        ref="reply"
        v-show="replyIsActive"
      >
      </reply-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CommentAnswer from "./CommentAnswer.vue";
import ReplyCard from "./ReplyCard.vue";
import DeleteModal from "./DeleteModal.vue";

export default {
  props: ["body", "userid", "id", "date", "answers", "rating"],
  components: {
    CommentAnswer,
    ReplyCard,
    DeleteModal,
  },
  data() {
    return {
      replyIsActive: false,
      commentCard: "comment-card",
      adminComment: "admin-comment",
      isPopupOpen: false,
      isEditing: false,
      newText: this.body,
      textPart: "",
      tagPart: "",
      counter: 0,
      lessThanZero: false,
    };
  },
  computed: {
    ...mapGetters(["allUsers", "allComments"]),

    name() {
      let user = this.allUsers.find((user) => user.id == this.userid);
      return user.name;
    },
    avatar() {
      let user = this.allUsers.find((user) => user.id == this.userid);
      return user.photo;
    },
    commentDate() {
      return this.date;
    },
    commentAnswers() {
      return this.answers;
    },
    isYou() {
      if (this.userid == "u4") {
        return true;
      } else {
        return false;
      }
    },
    parsedDate() {
      if (Date.now() - this.date <= 86400000) {
        return "today";
      } else if (Date.now() - this.date <= 172800000) {
        return "yesterday";
      } else if (Date.now() - this.date <= 259200000) {
        let weekDay = new Date(this.date).getDay();

        if (weekDay == 0) {
          return "Sun.";
        } else if (weekDay == 1) {
          return "Mon.";
        } else if (weekDay == 2) {
          return "Tues.";
        } else if (weekDay == 3) {
          return "Wed.";
        } else if (weekDay == 4) {
          return "Thu.";
        } else if (weekDay == 5) {
          return "Fri.";
        } else {
          return "Sat.";
        }
      } else if (Date.now() - this.date <= 345600000) {
        let weekDay = new Date(this.date).getDay();

        if (weekDay == 0) {
          return "Sun.";
        } else if (weekDay == 1) {
          return "Mon.";
        } else if (weekDay == 2) {
          return "Tues.";
        } else if (weekDay == 3) {
          return "Wed.";
        } else if (weekDay == 4) {
          return "Thu.";
        } else if (weekDay == 5) {
          return "Fri.";
        } else {
          return "Sat.";
        }
      } else if (Date.now() - this.date <= 432000000) {
        let weekDay = new Date(this.date).getDay();

        if (weekDay == 0) {
          return "Sun.";
        } else if (weekDay == 1) {
          return "Mon.";
        } else if (weekDay == 2) {
          return "Tues.";
        } else if (weekDay == 3) {
          return "Wed.";
        } else if (weekDay == 4) {
          return "Thu.";
        } else if (weekDay == 5) {
          return "Fri.";
        } else {
          return "Sat.";
        }
      } else if (Date.now() - this.date <= 518400000) {
        let weekDay = new Date(this.date).getDay();

        if (weekDay == 0) {
          return "Sun.";
        } else if (weekDay == 1) {
          return "Mon.";
        } else if (weekDay == 2) {
          return "Tues.";
        } else if (weekDay == 3) {
          return "Wed.";
        } else if (weekDay == 4) {
          return "Thu.";
        } else if (weekDay == 5) {
          return "Fri.";
        } else {
          return "Sat.";
        }
      } else if (Date.now() - this.date <= 604800000) {
        return "1 week ago";
      } else if (Date.now() - this.date <= 1209600000) {
        return "2 weeks ago";
      } else if (Date.now() - this.date <= 1814400000) {
        return "3 weeks ago";
      } else if (Date.now() - this.date <= 2419200000) {
        return "4 weeks ago";
      } else if (Date.now() - this.date <= 2678400000) {
        return "1 month ago";
      } else {
        let newDate = new Date(this.date);
        let day = newDate.getDate();
        if (day < 10) {
          day = "0" + day;
        }
        let month = newDate.getMonth() + 1;
        if (month < 10) {
          month = "0" + month;
        }
        let year = newDate.getFullYear();
        return day + "." + month + "." + year;
      }
    },
  },
  methods: {
    toggleReply() {
      this.replyIsActive = !this.replyIsActive;
    },
    toggleEditinigMode() {
      this.isEditing = !this.isEditing;
    },
    rateUp() {
      if (this.counter < 1 && !this.isYou) {
        this.$store.dispatch("rateUp", this.id);
        this.counter++;
      }
    },
    rateDown() {
      if (this.counter > -1 && !this.isYou) {
        this.$store.dispatch("rateDown", this.id);
        this.counter--;
      }
    },
    openPopup() {
      this.isPopupOpen = true;
    },
    popupConfirmed() {
      this.isPopupOpen = false;
      this.$store.dispatch("deleteComment", this.id);
    },
    update() {
      this.$store.dispatch("updateText", { text: this.newText, id: this.id });
      this.toggleEditinigMode();

      let fullText = this.newText;
      let index = fullText.indexOf(",");

      let tagPart = fullText.substr(0, index);
      this.tagPart = tagPart;
      let textPart = fullText.substr(index + 1);
      this.textPart = textPart;
    },
    checkRating() {
      if (this.rating < 0) {
        this.lessThanZero = true;
      } else {
        this.lessThanZero = false;
      }
    },
  },
  mounted() {
    let fullText = this.body;
    let index = fullText.indexOf(",");

    let tagPart = fullText.substr(0, index);
    this.tagPart = tagPart;
    let textPart = fullText.substr(index + 1);
    this.textPart = textPart;
    this.checkRating();
  },
  updated() {
    this.checkRating();
  },
};
</script>

<style>
.editing {
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: flex-start;
}

.editing .edit-block {
  pointer-events: none;
}

.editing .edit-btn path {
  fill: #c3c4ef;
}

.editing .edit {
  color: #c3c4ef;
}

.editing .delete-btn path {
  fill: #ffb8bb;
}

.editing .delete {
  color: #ffb8bb;
}

.editing .comment {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.area {
  flex-grow: 1;
  width: 100%;
  border-radius: 8px;
  border-color: #eaecf1;
  resize: none;
  min-height: 96px;
  outline: none;
  color: #324152;
  padding: 12px 24px;
  margin-bottom: 16px;
  margin-left: 16px;
}

.buttons {
  display: flex;
  gap: 8px;
}

button {
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

.cancel-btn {
  background-color: #d1d1d1;
}

.cancel-btn:hover {
  background-color: #b1b1b1;
}

.update-button {
  background-color: #5457b6;
}

button:hover {
  background: #c3c4ef;
}

.not-editing {
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: flex-start;
}

.answer {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  position: relative;
}

.bage {
  background-color: #5457b6;
  color: #fff;
  padding: 0 6px;
  border-radius: 4px;
  margin-left: 8px;
}

.edit-btn,
.delete-btn {
  height: 14px;
  width: auto;
}

.delete,
.edit {
  padding-top: 4px;
  margin-left: 24px;
}

.delete {
  color: #ed6468;
}

.edit-block {
  display: flex;
  font-weight: 500;
  color: #5457b6;
  align-items: center;

  cursor: pointer;
}

.edit:hover {
  color: #c3c4ef;
}
.edit:hover .edit-btn path {
  fill: #c3c4ef;
}

.delete:hover {
  color: #ffb8bb;
}
.delete:hover .delete-btn path {
  fill: #ffb8bb;
}

.edit-block span {
  margin-left: 8px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
}

.container::before {
  content: "";
  position: absolute;
  left: 32px;
  top: 0px;
  bottom: 18px;

  width: 2px;
  background-color: #eaecf1;
}

@media (max-width: 600px) {
  .container::before {
    left: 9px;
  }
}

.comment-answer {
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: flex-start;
  border-radius: 8px;
  padding: 24px;
  background-color: #fff;
  margin-bottom: 18px;
}

.name-tag {
  display: inline;
  font-weight: 500;
  color: rgba(84, 87, 182, 1);
}

.profile {
  display: flex;
  align-items: center;
}
</style>
