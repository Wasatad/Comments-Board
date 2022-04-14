<template>
  <div v-if="isOpen" class="backdrop" @click="close">
    <div class="popup" @click.stop>
      <div class="h1">Delete comment</div>
      <div class="text">
        Are you sure you want to delete this comment? This will remove the
        comment and can’t be undone
      </div>
      <div class="buttons">
        <button class="cancel" @click="close">NO, CANCEL</button>
        <button class="confirm" @click="confirm">YES, DELETE</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  emits: {
    ok: null,
    close: null,
  },

  mounted() {
    document.addEventListener("keydown", this.handleKeydown);
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
  },

  methods: {
    handleKeydown(e) {
      if (this.isOpen && e.key === "Escape") {
        this.close();
      }
    },

    close() {
      this.$emit("cancel");
    },
    confirm() {
      this.$emit("ok");
    },
  },
};
</script>

<style scoped>
.popup {
  top: 50%;
  padding: 30px 30px 35px 30px;
  left: 50%;
  transform: translate(-50%, -100%);
  position: absolute;
  z-index: 101;
  background-color: white;
  border-radius: 10px;
  max-width: 400px;
  min-width: 270px;
}

.popup .h1 {
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  color: #324152;
  padding-bottom: 20px;
}

.popup .text {
  font-weight: 400;
  font-size: 16px;
  line-height: 142%;
  color: #324152;
  padding-bottom: 20px;
}

.buttons {
  display: flex;
  gap: 8px;
}

.buttons button {
  width: 50%;
  color: #fff;
  font-weight: 500;
  outline: none;
  border: none;
  border-radius: 8px;
}

@media (max-width: 790px) {
  .buttons {
    flex-direction: column;
  }

  .buttons button {
    width: 100%;
    color: #fff;
    font-weight: 500;
    outline: none;
    border: none;
    border-radius: 8px;
  }
}

.cancel {
  background-color: #67727e;

  height: 48px;
}

.confirm {
  background-color: #ed6468;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
}

html,
body {
  height: 100%;
  overflow: hidden;
}
</style>
