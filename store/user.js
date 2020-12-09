export const state = () => ({
  name: undefined,
  avatar: undefined,
  logined: false,
});
export const mutations = {
  login(state, data) {
    state.name = data.data.name;
    state.avatar = data.data.avatar_url;
    state.logined = true;
  },
};

export const actions = {
  login(ctx) {
    this.$axios
      .$get(`/userInfo`)
      .then((data) => {
        ctx.commit("login", data);
        if (this.$router.currentRoute.fullPath === "/") {
          this.$router.push("/dashboard");
        }
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
        this.$router.push("/");
      });
  },
};
