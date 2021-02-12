import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

import React, { useContext, useState } from "react";
function Navbar() {
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <Menu pointing secondary size="huge" color="blue">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />

      <Menu.Menu position="right">
        <Menu.Item
          name="Login"
          active={activeItem === "Login"}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
        <Menu.Item
          name="SignUp"
          active={activeItem === "SignUp"}
          onClick={handleItemClick}
          as={Link}
          to="/signup"
        />
      </Menu.Menu>
    </Menu>
  );
}
export default Navbar;
