import React, { Component } from "react";
import "./UserRepositories.css";
import axios from "axios";

class UserRepositories extends Component {
  state = {
    repos: []
  };

  componentDidMount() {
    axios
      .get(`https://api.github.com/users/${this.props.username}/repos`)
      .then(res => {
        this.setState({ repos: res.data });
      });
  }

  render() {
    const repositories = this.state ? (
      this.state.repos.map(repository => {
        return (
          <div className="repository" key={repository.id}>
            <div className="repository--name">
              <a href={repository.html_url}>{repository.name}</a>
            </div>

            <div className="repository--date">{repository.pushed_at}</div>
          </div>
        );
      })
    ) : (
      <div>Data is loading</div>
    );

    return <div>{repositories}</div>;
  }
}

export default UserRepositories;
