export default {
  state() {
    return {
      comments: [
        {
          id: "c1",
          user: "u1",
          body: "Impressive! Though it seems the drag feature could be improved.But overall it looks incredible. You`ve nailed the design and the responsiveness at various breakpoints works really well.",
          date: 1647112788000,
          rating: 5,
          answers: [],
        },
        {
          id: "c2",
          user: "u2",
          body: "Woah! your project looks awesome! How long have you been coding for? I`m still new, but think I want to dive into Vue as well soon. Perhaps you can give me an insight on where I can learn Vue? Thanks!",
          date: 1647371988000,
          rating: 0,
          answers: [
            {
              id: "c3",
              user: "u3",
              body: "@maxblagun, If you`re still new, I`d recommend focusing on the fundamentals of HTML, CSS, and JS before considering Vue. It`s very tempting to jump ahead but lay a solid foundation first.",
              date: 1647631188000,
              rating: -1,
              answers: [
                {
                  id: "c4",
                  user: "u2",
                  body: "@ramsesmiron, Yeah! Thanks for advice!",
                  date: 1647890388000,
                  rating: 5,
                  answers: [],
                },
              ],
            },
            {
              id: "c5",
              user: "u1",
              body: "@maxblagun, I am interesting too :)",
              date: 1647976788000,
              rating: 4,
              answers: [],
            },
          ],
        },
      ],
      counter: 0,
    };
  },
  getters: {
    allComments(state) {
      return state.comments;
    },
  },

  mutations: {
    saveNewComment(state, value) {
      if (value.parentId === undefined) {
        state.comments.push(value.comment);
      }
      let queue = [state.comments],
        found = false;

      while (!found && queue.length) {
        let o = queue.shift();

        found = Object.keys(o).some(function (k) {
          if (o[k] === value.parentId) {
            o.answers.push(value.comment);
            return true;
          } else if (o[k] !== null && typeof o[k] === "object") queue.push(o[k]);
        });
      }
      return found;
    },
    rateUp(state, id) {
      let queue = [state.comments],
        found = false;

      while (!found && queue.length) {
        let o = queue.shift();

        found = Object.keys(o).some(function (k) {
          if (o[k] === id) {
            o.rating += 1;
            return true;
          } else if (o[k] !== null && typeof o[k] === "object") queue.push(o[k]);
        });
      }
      return found;
    },
    rateDown(state, id) {
      let queue = [state.comments],
        found = false;

      while (!found && queue.length) {
        let o = queue.shift();

        found = Object.keys(o).some(function (k) {
          if (o[k] === id) {
            o.rating -= 1;
            return true;
          } else if (o[k] !== null && typeof o[k] === "object") queue.push(o[k]);
        });
      }
      return found;
    },
    deleteComment(state, id) {
      for (let comment of state.comments) {
        if (comment.id === id) {
          let index = state.comments.findIndex((comment) => comment.id === id);
          state.comments.splice(index, 1);
        }
      }
      let queue = [state.comments];

      let found = false;
      while (!found && queue.length) {
        let o = queue.shift();
        found = Object.keys(o).some(function (k) {
          if (o[k].id === id) {
            let index = o.findIndex((item) => item.id === id);
            o.splice(index, 1);

            return true;
          } else if (o[k] !== null && typeof o[k] === "object") queue.push(o[k]);
        });
      }
      return found;
    },
    updateText(state, payload) {
      let queue = [state.comments],
        found = false;
      while (!found && queue.length) {
        let o = queue.shift();
        found = Object.keys(o).some(function (k) {
          if (o[k].id === payload.id) {
            o[k].body = payload.text;

            return true;
          } else if (o[k] !== null && typeof o[k] === "object") queue.push(o[k]);
        });
      }
      return found;
    },
  },
  actions: {
    addComment(context, value) {
      context.commit("saveNewComment", value);
    },
    rateUp(context, id) {
      context.commit("rateUp", id);
    },
    rateDown(context, id) {
      context.commit("rateDown", id);
    },
    deleteComment(context, id) {
      context.commit("deleteComment", id);
    },
    updateText(context, payload) {
      context.commit("updateText", payload);
    },
  },
};
