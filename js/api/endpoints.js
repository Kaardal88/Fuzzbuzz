export const BASE_URL = "https://v2.api.noroff.dev/";
export const ENDPOINTS = {
  register: "auth/register",
  login: "auth/login",
  getPosts: "social/posts",
  /* getPostsByTag: "social/posts?_tag=", */
  getSinglePost: "social/posts/{id}",
  getPersonalPosts: "social/profiles",
  createPost: "social/posts",
  updatePost: "social/posts/",
  deletePost: "social/posts/{id}",
  searchPosts: "social/posts/search?q=",
  createApiKey: "auth/create-api-key",
  nbaTeams: "nba-teams",
  getJokes: "jokes",
};

/* export const myTag = "myPersonalStuff"; */
