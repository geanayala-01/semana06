import postRepository from "../repositories/postRepository.js";
import userRepository from "../repositories/userRepository.js";

class PostService {
  async createPost(userId, postData) {
    const user = await userRepository.findById(userId);
    if (!user) throw new Error("Usuario no encontrado");

    const hashtags = this.#parseHashtags(postData.hashtags);

    return await postRepository.create({
      title: postData.title,
      content: postData.content,
      imageUrl: postData.imageUrl,
      hashtags,
      user: user._id,
    });
  }

  async getPosts() {
    return await postRepository.findAll();
  }

  async getPostById(postId) {
    return await postRepository.findById(postId);
  }

  async getPostsByUser(userId) {
    return await postRepository.findByUser(userId);
  }

  async updatePost(postId, postData) {
    const hashtags = this.#parseHashtags(postData.hashtags);

    return await postRepository.update(postId, {
      title: postData.title,
      content: postData.content,
      imageUrl: postData.imageUrl,
      hashtags,
    });
  }

  async deletePost(postId) {
    return await postRepository.delete(postId);
  }

  #parseHashtags(hashtagsInput) {
    if (Array.isArray(hashtagsInput)) return hashtagsInput;
    if (!hashtagsInput) return [];
    return hashtagsInput
      .split(",")
      .map((tag) => tag.trim().replace(/^#/, ""))
      .filter((tag) => tag.length > 0);
  }
}

export default new PostService();
