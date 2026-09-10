import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware";
import { validation } from "../../middleware/validation.middleware";
import * as postValidation from "./post.validation";
import { postServices } from "./post.service";

const router = Router();

export const routes = {
  base: "/posts",
  createPost: "/create-post",
  ShowpostsById: "/show-sposts/:id",
  homePage: "/",
};

router.post(
  routes.createPost,
  authMiddleware,
  validation(postValidation.postValidation),
  async (req, res) => {
    const userId = req.user._id;
    const body = req.body as postValidation.createPostData;
    const { data } = await postServices.createPost({ ...body, userId });
    return res.status(200).json(data);
  },
);

router.post(
  routes.ShowpostsById,
  authMiddleware,
  validation(postValidation.getPostsByIdValidation),
  async (req, res) => {
    const user = req.user;
    const id = req.params.id as string;
    const { data } = await postServices.getPostsByUser({
      userId: id,
      user,
    });
    return res.status(200).json(data);
  },
);

router.get(routes.homePage, authMiddleware, async (req, res) => {
  const user = req.user;
  const { data } = await postServices.homePagePosts({ user });
  return res.status(200).json(data);
});
export default router;
