import React, { Component } from "react";
import "./UserRepositories.css";
import axios from "axios";

class UserRepositories extends Component {
  state = {
    repos: []
  };

  componentDidMount = () => {
    // SET TIMEOUT FOR BETTER USER EXPERIENCE
    setTimeout(() => {
      axios
        .get(`https://api.github.com/users/${this.props.username}/repos`)
        .then(res => {
          this.setState({ repos: res.data });
        });
    }, 1500);
  };

  render() {
    // MAP ALL REPOSITORIES TO VARIABLE FROM THE STATE
    const repositories = this.state.repos.reverse().map(repository => {
      return (
        <div className="repository" key={repository.id}>
          <div className="repository--name">
            <a href={repository.html_url}>{repository.name}</a>
          </div>
          <div className="repository--date">
            {repository.pushed_at.substr(0, 10)}
          </div>
        </div>
      );
    });

    return (
      <div>
        {/* CHECK IF STATE IS NOT EMPTY */}

        {this.state.repos.length > 0 ? (
          repositories
        ) : (
          // DISPLAY LOADING ANIMATION
          <div className="loading">
            <h1>Preparing data...</h1>
            <div className="dot dot1" />
            <div className="dot dot2" />
            <div className="dot dot3" />
          </div>
        )}
      </div>
    );
  }
}

export default UserRepositories;
