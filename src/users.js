export default {
  state() {
    return {
      users: [
        {
          id: "u1",
          name: "amyrobson",
          photo: require("@/assets/avatars/image-amyrobson.png"),
          comments: ["c1"],
          isActive: false,
        },
        {
          id: "u2",
          name: "maxblagun",
          photo: require("@/assets/avatars/image-maxblagun.png"),
          comments: ["c2"],
          isActive: false,
        },
        {
          id: "u3",
          name: "ramsesmiron",
          photo: require("@/assets/avatars/image-ramsesmiron.png"),
          comments: ["c3"],
          isActive: false,
        },
        {
          id: "u4",
          name: "juliusomo",
          photo: require("@/assets/avatars/image-juliusomo.png"),
          comments: ["c4"],
          isActive: true,
        },
      ],
    };
  },
  getters: {
    allUsers(state) {
      return state.users;
    },
  },
};
