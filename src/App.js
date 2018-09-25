import React, { Component } from "react";
import "./App.css";
import SearchForm from "./components/SearchForm/SearchForm";
import UserProfile from "./components/UserProfile/UserProfile";
import UserRepositories from "./components/UserRepositories/UserRepositories";
import axios from "axios";

class App extends Component {
  state = {
    user: null,
    repos: null
  };

  getUser = async e => {
    e.preventDefault();
    const user = e.target.elements.username.value;
    console.log(user);

    this.setState({
      user: null
    });

    if (user) {
      await axios.get(`https://api.github.com/users/${user}`).then(res => {
        console.log("res");
        console.log(res);
        this.setState({ user: res.data });
      });
      console.log(this.state);
    } else {
      this.setState({
        user: null
      });
    }
  };

  render() {
    return (
      <div>
        <header className="App-header">
          <h1>Github api fetch using axios</h1>
        </header>
        <div className="App">
          <SearchForm getUser={this.getUser} />

          {this.state.user ? (
            <div>
              <UserProfile data={this.state.user} />
              <UserRepositories username={this.state.user.login} />
            </div>
          ) : (
            <p>Enter a username</p>
          )}
        </div>
      </div>
    );
  }
}

export default App;
