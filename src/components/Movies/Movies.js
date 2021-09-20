import React, { Component } from "react";
import MovieItem from "../MovieItem/MovieItem";
import "./Movies.css";

class Movies extends Component {
  render() {
    if (this.props.moviesFromTop === undefined) {
      // alert("no such movie found!");
      return (
        <>
          <p>Sorry, not found movie with this title </p>
        </>
      );
    }

    return (
      <ul className="movies">
        {this.props.moviesFromTop.map(movie => (
          <li className="movies__item" key={movie.imdbID}>
            <MovieItem
              {...movie}
              addtoFavPropLittle={() => this.props.addtoFavProp(movie)}
            />
          </li>
        ))}
      </ul>
    );
  }
}

export default Movies;
