import React, { Component } from "react";
import "./Header.css";

class Header extends Component {
  render() {
    return (
      <header className="header">
        <h1 className="header__title">
          Mouviek <span className="moto">Create your own film list</span>
        </h1>
      </header>
    );
  }
}

export default Header;
