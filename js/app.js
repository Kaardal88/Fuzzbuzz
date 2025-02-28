import { loginHandler } from "./events/loginHandler.js";
import { registerHandler } from "./events/registerHandler.js";
import { viewPostsHandler } from "./events/viewPostsHandler.js";
import { createPostHandler } from "./events/createPostHandler.js";
import { deletePostHandler } from "./events/deletePostHandler.js";
import { viewPersonalPostsHandler } from "./events/viewPersonalPostsHandler.js";
import { logoutListener } from "./events/logoutHandler.js";
import { viewSinglePostHandler } from "./events/viewSinglePostHandler.js";

function router() {
  const pathname = window.location.pathname;
  console.log("pathname", pathname);

  switch (pathname) {
    case "/":
    case "/index.html":
      loginHandler();
      break;
    case "/register/":
    case "/register/index.html":
      registerHandler();

      break;
    case "/feed/":
    case "/feed/index.html":
      viewPostsHandler();
      createPostHandler();
      deletePostHandler();

      break;
    case "/profile/":
    case "/profile/index.html":
      viewPersonalPostsHandler();
      viewSinglePostHandler();
      logoutListener();
      break;
    case "/postDetail/":
    case "/postDetail/index.html":
      viewSinglePostHandler();
      break;
    default:
      console.warn("No route matched for:", pathname);
  }
}

router();
