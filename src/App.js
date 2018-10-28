import React, { Component } from "react";
import "./App.css";
import SearchForm from "./components/SearchForm/SearchForm";
import UserProfile from "./components/UserProfile/UserProfile";
import UserRepositories from "./components/UserRepositories/UserRepositories";
import axios from "axios";

class App extends Component {
  state = {
    user: null,
    error: null,
    nullUser: null
  };

  getUser = async e => {
    e.preventDefault();

    // RESET THE PREVIOUS STATE
    this.setState({
      user: null
    });

    // SET USERNAME
    const user = e.target.elements.username.value;

    // CLEAR INPUT VALUE
    e.target.elements.username.value = "";

    // IF USER EXISTS SET THE STATE, ELSE SET THE ERROR PROPERTY
    if (user) {
      await axios.get(`https://api.github.com/users/${user}`).then(
        res => {
          res.data.public_repos > 0
            ? this.setState({ user: res.data })
            : this.setState({
                error: "User has not updated any information yet."
              });
        },
        error => {
          this.setState({ error: "User has not been found. Try again." });
        }
      );
    }
  };

  render() {
    return (
      <div>
        <header className="App-header">
          <h1>Github search api</h1>
        </header>
        <div className="App">
          <SearchForm getUser={this.getUser} />

          {/* CHECK IS USERNAME HAS BEEN GIVEN */}
          {/* IF NOT, DISPLAY "ENTER A USERNAME"*/}
          {/* IF USER HAS NOT UPDATED ANY INFO YET, DISPLAY NULL USER ERROR */}

          {this.state.user ? (
            <div>
              <UserProfile data={this.state.user} />
              <UserRepositories username={this.state.user.login} />
            </div>
          ) : this.state.error ? (
            <p className="error">{this.state.error}</p>
          ) : this.state.nullUser ? (
            <p className="error">{this.state.nullUser}</p>
          ) : (
            <p>Enter a username</p>
          )}
        </div>
      </div>
    );
  }
}

export default App;
