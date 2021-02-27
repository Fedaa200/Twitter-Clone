import React from "react";
import { Button, Checkbox, Form, Grid, Container } from "semantic-ui-react";
import twitter from "./logo/tw.png";
import "../App.css";
export default function SignUp() {
  return (
    <div className="signUPForm">
      <Grid>
        <Form onValidate>
          <img
            src={twitter}
            width="120px"
            style={{ margin: "-35px 100px 20px 100px" }}
          />
          <Form.Field className="field">
            <b>
              <label>Username</label>
            </b>
            <input placeholder="username.." className="input" />
          </Form.Field>
          <Form.Field className="field">
            <b>
              <label>Email</label>
            </b>
            <input placeholder="email.." className="input" />
          </Form.Field>
          <Form.Field className="field">
            <b>
              <label>Password</label>
            </b>
            <input placeholder="password.." className="input" />
          </Form.Field>
          <Form.Field className="field">
            <b>
              <label>Confirm Password</label>
            </b>
            <input placeholder="confirmPassword..." className="input" />
          </Form.Field>
          <div className="button">
            <Button type="submit" content="Sign Up" primary />
          </div>
        </Form>
      </Grid>
    </div>
  );
}
