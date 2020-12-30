import React from "react";

function PostList({ posts }) {
  return (
    <div>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </div>
  );
}

export default PostList;
