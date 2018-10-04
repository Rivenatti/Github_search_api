import React, { Component } from "react";
import "./App.css";
import SearchForm from "./components/SearchForm/SearchForm";
import UserProfile from "./components/UserProfile/UserProfile";
import UserRepositories from "./components/UserRepositories/UserRepositories";
import axios from "axios";

class App extends Component {
  state = {
    user: null,
    error: null
  };

  getUser = async e => {
    e.preventDefault();

    const user = e.target.elements.username.value;

    e.target.elements.username.value = "";

    // RESET STATE AFTER CLICKING THE BUTTON
    this.setState({
      user: null
    });

    // IF USER EXISTS SET THE STATE
    if (user) {
      await axios.get(`https://api.github.com/users/${user}`).then(
        res => {
          this.setState({ user: res.data });
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

          {this.state.user ? (
            <div>
              <UserProfile data={this.state.user} />
              <UserRepositories username={this.state.user.login} />
            </div>
          ) : this.state.error ? (
            <p className="error">{this.state.error}</p>
          ) : (
            <p>Enter a username</p>
          )}
        </div>
      </div>
    );
  }
}

export default App;
