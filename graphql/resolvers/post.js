const Post = require("../../database/Post");
const checkAuth = require("../../util/chech.auth");
const AnthenticationError = require("apollo-server");

module.exports = {
  Query: {
    async getPosts() {
      try {
        //sort({ createdAt: -1 }) : we use  to add the new post in the first of array not in the end
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createPost(_, { body }, context) {
      //we use the context to get the users
      const user = checkAuth(context);
      console.log(user);
      const newPost = new Post({
        body,
        user: user.indexOf,
        username: user.username,
        createdAt: new Date().toISOString(),
      });
      const post = await newPost.save();
      return post;
    },

    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);
      try {
        const post = await Post.findById(postId);
        //chech if the user is the same user who created the post
        if (user.username === post.username) {
          await post.delete();
          return "Post Deleted";
        } else {
          throw new AnthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
