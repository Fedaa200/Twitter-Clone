import React, { useState } from "react";
import gql from "graphql-tag";
import { Grid, Image } from "semantic-ui-react";
//we use useQuery to fetch the post from the database
import { useQuery } from "@apollo/react-hooks";
import PostBody from "../components/PostBody";
function Home() {
  const {
    loading,
    data: { getPosts: posts },
  } = useQuery(FETCH_POSTS_QUERY);

  return (
    <Grid columns={3} divided>
      <Grid.Row className="title">
        <h1>Twitter</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading Posts....</h1>
        ) : (
          posts &&
          posts.map((post) => (
            <Grid.Column
              key={post.id}
              style={{ padding: "20px 20px 20px 20px" }}
            >
              <PostBody post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}
//What the data you want to fetch from the database
const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      username
      createdAt
      likeCount
      commentCount
      likes {
        username
      }
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default Home;
