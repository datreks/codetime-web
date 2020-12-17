export const state = () => ({
  name: undefined,
  avatar: undefined,
  logined: undefined,
  id: undefined,
});
export const mutations = {
  login(state, data) {
    state.name = data.data.name;
    state.avatar = data.data.avatar_url;
    state.id = data.data.user_id;
    localStorage.setItem("token", data.data.token);
    state.logined = true;
  },
  logout(state) {
    state.logined = false;
  },
};

export const actions = {
  login(ctx) {
    this.$axios
      .$get(`/userInfo`)
      .then((data) => {
        ctx.commit("login", data);
        this.$router.push("/dashboard");
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
        ctx.commit("logout");
        this.$router.push("/");
      });
  },
};
