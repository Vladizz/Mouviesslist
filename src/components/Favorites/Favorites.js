import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Favorites.css";

class Favorites extends Component {
  state = {
    title: "",
    serverIdForList: ""
  };

  setNameFavoriteList = e => {
    this.setState({
      title: e.target.value
    });
  };

  sendPostQuery = () => {
    fetch("https://acb-api.algoritmika.org/api/movies/list ", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        title: this.state.title,
        movies: this.props.movies.map(m => m.imdbID)
      })
    })
      .then(resp => resp.json())
      .then(da => {
        console.log(da);
        this.setState({ serverIdForList: da.id });
      });
  };

  render() {
    return (
      <div className="favorites">
        <p>Назовите свой список</p>
        <input
          value={this.state.title}
          className="favorites__name"
          onChange={this.setNameFavoriteList}
        />
        <ul className="favorites__list">
          {this.props.movies.map((item, idx) => {
            return (
              <li key={item.imdbID}>
                {item.Title} ({item.Year})
                <img
                  onClick={() => this.props.deleteprop(idx)}
                  src="#"
                  alt="Удалить"
                ></img>
              </li>
            );
          })}
        </ul>
        {this.state.serverIdForList ? (
          <Link to={`/list/${this.state.serverIdForList}`}>К списку</Link>
        ) : (
          <button
            type="button"
            className="favorites__save"
            onClick={this.sendPostQuery}
          >
            Сохранить список
          </button>
        )}
      </div>
    );
  }
}

export default Favorites;
