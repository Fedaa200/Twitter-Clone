const Post = require("../../database/Post");
const checkAuth = require("../../util/chech.auth");
const { AnthenticationError, UserInputError } = require("apollo-server");

module.exports = {
  Mutation: {
    async createComment(_, { postId, body }, context) {
      const { username } = checkAuth(context);
      //make some valid
      if (body.trim() === "") {
        throw new UserInputError("Empty comment", {
          error: {
            body: "Comment body must not empty",
          },
        });
      }
      const post = await Post.findById(postId);
      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });
        //save the like
        await post.save();
        return post;
      } else throw new UserInputError("Post not found");
    },
    async deleteComment(_, { postId, commentId }, context) {
      const { username } = checkAuth(context);
      const post = await Post.findById(postId);
      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentId);
        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
        //   throw new AnthenticationError("Action is not allwo");
        }
      } else {
        throw new UserInputError("Post not found");
      }
    },
  },
};
