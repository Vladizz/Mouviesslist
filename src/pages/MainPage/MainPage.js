import React, { Component } from "react";
import "./MainPage.css";
import Header from "../../components/Header/Header";
import SearchBox from "../../components/SearchBox/SearchBox";
import Movies from "../../components/Movies/Movies";
import Favorites from "../../components/Favorites/Favorites";

class MainPage extends Component {
  state = {
    searchLine: "",
    movies: [],
    favorites: []
  };

  searchLineChangeHandler = e => {
    this.setState({ searchLine: e.target.value });
  };

  searchBoxSubmitHandler = e => {
    e.preventDefault();
  };

  setMovies = data => {
    this.setState({ movies: data });
  };

  onClickFunc = () => {
    fetch(`https://www.omdbapi.com/?s=${this.state.searchLine}&apikey=fe788e11`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setMovies(data.Search);
      })
      .catch(err => {
        console.log("no such movie found!");
        // const errorserver = null;
        // this.setMovies(errorserver);
        // this.state.searchLine = "";
        // console.log(this.state.searchLine);
        console.log(this.state.movies);
      });
  };

  addToFavorite = movie => {
    // if (movie != find) {

    // }
    // this.state.favorites.find((movie) => {
    //     movie = movie.item
    // })

    if (
      this.state.favorites.find(movieNew => movieNew.imdbID === movie.imdbID)
    ) {
      return;
    }

    // почему копируем?
    const newFav = [...this.state.favorites, movie];
    this.setState({
      favorites: newFav
    });
    console.log(newFav);
  };

  deleteFromFavorite = idx => {
    const newArr = [...this.state.favorites];
    newArr.splice(idx, 1);
    this.setState({
      favorites: newArr
    });
  };

  render() {
    return (
      <div className="main-page">
        <main className="main-page__content">
          <section className="main-page__main-section">
            <div className="main-page__search-box">
              <SearchBox
                searchLine={this.state.searchLine}
                onChangeProp={this.searchLineChangeHandler}
                onClickProp={this.onClickFunc}
              />
            </div>
            <div className="main-page__movies">
              <Movies
                moviesFromTop={this.state.movies}
                addtoFavProp={this.addToFavorite}
              />
            </div>
          </section>
          <aside className="main-page__favorites">
            <Favorites
              movies={this.state.favorites}
              deleteprop={this.deleteFromFavorite}
            />
          </aside>
        </main>
      </div>
    );
  }
}

export default MainPage;
