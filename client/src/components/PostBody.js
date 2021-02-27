import React from "react";
import { Card, Image, Button, Icon, Label } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
export default function PostBody({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
  function likePosts() {
    console.log("Like posts");
  }
  function commentOnPost() {
    console.log("Comment on posts");
  }
  return (
    //   flude
    <Card>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content>
        <Button as="div" labelPosition="right" basic onClick={likePosts}>
          <Button color="blue">
            <Icon name="heart" />
          </Button>
          <Label basic color="blue" pointing="left">
            {likeCount}
          </Label>
        </Button>

        <Button as="div" labelPosition="right" basic onClick={commentOnPost}>
          <Button color="blue">
            <Icon name="comments" />
          </Button>
          <Label basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  );
}
