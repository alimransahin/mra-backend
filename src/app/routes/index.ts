import { Router } from "express";
import { PostRoutes } from "../modules/post/post.router";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UserRoutes } from "../modules/user/user.route";
import { VoteRoutes } from "../modules/Vote/vote.route";
import { CommentRoutes } from "../modules/Comment/comment.route";
import { ActivityRoutes } from "../modules/activity/activity.router";

const router = Router();
const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/post",
    route: PostRoutes,
  },
  {
    path: "/comment",
    route: CommentRoutes,
  },
  {
    path: "/vote",
    route: VoteRoutes,
  },
  {
    path: "/activity",
    route: ActivityRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
