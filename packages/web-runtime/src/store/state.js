export const state = {
  token: localStorage.getItem("jwt") || null,
  error: null,
  config: {
    providers: [],
    routes: [],
    pages: {}
  },
  runtimeDepsLoaded: false
};
