import postService from "../services/postService.js";
import userRepository from "../repositories/userRepository.js";

class PostController {
  async getAll(req, res) {
    try {
      const posts = await postService.getPosts();
      res.render("posts", { posts });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async newForm(req, res) {
    try {
      const users = await userRepository.findAll();
      res.render("postForm", { post: null, users });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const { userId } = req.body;
      await postService.createPost(userId, req.body);
      res.redirect("/posts");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async editForm(req, res) {
    try {
      const { id } = req.params;
      const post = await postService.getPostById(id);
      if (!post) return res.status(404).send("Post no encontrado");
      res.render("postForm", { post, users: [] });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      await postService.updatePost(id, req.body);
      res.redirect("/posts");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await postService.deletePost(id);
      res.redirect("/posts");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new PostController();
