import React, { Component } from "react";
import Post from "../../components/Post/Post";
import "./PostWithContent.css";
import MainContext from "../../contexts/MainContext";
import { findPost } from "../../services/posts-helpers";

export default class PostWithContent extends Component {
  static contextType = MainContext;

  render() {
    const params = this.props.match.params.postId;
    let posts = this.context.posts;
    let post;

    if (params) {
      post = posts ? findPost(posts, parseInt(params)) : {};
    }

    return this.context.posts.length ? (
      <section className="PostWithContent">
        <Post
          id={post.id}
          name={post.post_name}
          modified={post.modified}
          history={this.props.history}
          visibility={post.visibility}
          avatar={post.avatar}
        />
        <div className="PostWithContent__content">
          {post.content.split(/\n \r|\n/).map((para, i) => (
            <p className="PostWithContent__content" key={i}>{para}</p>
          ))}
        </div>
      </section>
    ) : ( "" );
  }
}

PostWithContent.defaultProps = {
  post: {
    content: ""
  }
};
