import React from "react";
import PostContainer from "../containers/PostContainer";

function PostPage({ match }) {
  const id = parseInt(match.params.id, 10);
  return <PostContainer postId={id}></PostContainer>;
}

export default PostPage;
