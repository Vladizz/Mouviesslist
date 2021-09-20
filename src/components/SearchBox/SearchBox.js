import React, { Component } from "react";
import "./SearchBox.css";

class SearchBox extends Component {
  searchBoxSubmitHandler = e => {
    e.preventDefault();
    this.props.onClickProp();
  };

  render() {
    return (
      <div className="search-box">
        <form
          className="search-box__form"
          onSubmit={this.searchBoxSubmitHandler}
        >
          <label className="search-box__form-label">
            Искать фильм по названию:
            <input
              value={this.props.searchLine}
              type="text"
              className="search-box__form-input"
              placeholder="Например, Matrix"
              onChange={this.props.onChangeProp}
            />
          </label>
          <button
            type="submit"
            className="search-box__form-submit"
            disabled={!this.props.searchLine}
          >
            Искать
          </button>
        </form>
      </div>
    );
  }
}

export default SearchBox;
