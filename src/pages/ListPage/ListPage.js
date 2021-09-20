import React, { Component } from "react";
import "./ListPage.css";

class ListPage extends Component {
  state = {
    name: "",
    movies: []
  };
  componentDidMount() {
    const id = this.props.match.params.id;

    fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`)
      .then(resp => resp.json())
      .then(da => {
        console.log(da);
        this.setState({ name: da.title });
        const mass = da.movies.map(movie => {
          return fetch(
            `https://www.omdbapi.com/?i=${movie}&apikey=fe788e11`
          ).then(res => res.json());
        });
        // console.log(Promise.all());
        return Promise.all(mass);
      })
      .then(data => {
        console.log(data);
        this.setState({ movies: data });
      });
  }

  render() {
    return (
      <div className="list-page">
        <h1 className="list-page__title">{this.state.name}</h1>
        <ul>
          {this.state.movies.map(item => {
            return (
              <li key={item.imdbID}>
                <a
                  href={`https://www.imdb.com/title/${item.imdbID}`}
                  target="_blank"
                >
                  <p>
                    {" "}
                    {item.Title} ({item.Year}){" "}
                  </p>
                  <img className="posterPic" src={`${item.Poster}`}></img>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ListPage;
