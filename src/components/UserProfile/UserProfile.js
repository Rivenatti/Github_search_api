import React, { Component } from "react";
import "./UserProfile.css";

class UserProfile extends Component {
  state = {
    username: null,
    avatar: null,
    profileURL: null,
    publicRepos: null,
    followers: null,
    following: null
  };

  componentDidMount() {
    this.setState({
      username: this.props.data.login,
      avatar: this.props.data.avatar_url,
      profileURL: this.props.data.html_url,
      publicRepos: this.props.data.public_repos,
      followers: this.props.data.followers,
      following: this.props.data.following
    });
  }

  render() {
    const profile = this.state ? (
      <div className="user-profile">
        <div className="profile-card">
          <div className="left-side">
            <div className="avatar">
              <img src={this.state.avatar} alt="avatar" />
            </div>
          </div>
          <div className="right-side">
            <div className="username">{this.state.username}</div>
            <div className="repos">Repositories: {this.state.publicRepos}</div>
            <div className="followers">Followers: {this.state.followers}</div>
            <div className="following">Following: {this.state.following}</div>
            <div className="view-profile">
              <a href={this.state.profileURL} target="_blank">
                View Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div>Data is loading</div>
    );

    return <div>{profile}</div>;
  }
}

export default UserProfile;
