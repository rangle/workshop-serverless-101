import "./App.css";
import React from "react";
import serverless from "../apis/serverless";
import ScoreBoard from "./ScoreBoard";
import ScorePanel from "./ScorePanel";

class App extends React.Component {
  state = { allscores: [], selectedUser: "Rangle Rex", myscores: [] };

  componentDidMount() {
    this.fetchAllScores();
    this.fetchMyScores();
  }

  onSubmit = async score => {
    await serverless.post("/trex-scoreboard", {
      name: this.state.selectedUser,
      score: score
    });

    this.fetchAllScores();
    this.fetchMyScores();
  };

  fetchAllScores = async () => {
    const response = await serverless.get("/trex-scoreboard/all");

    this.setState({ allscores: response.data });
  };

  fetchMyScores = async () => {
    const response = await serverless.get("/trex-scoreboard/me", {
      params: {
        username: this.state.selectedUser
      }
    });

    this.setState({ myscores: response.data });
  };

  render() {
    return (
      <div className="App">
        <div className="Welcome">Welcome to Serverless!</div>
        <div className="Name">{this.state.selectedUser}</div>
        <br />
        <div className="ui container">
          <ScorePanel onSubmit={this.onSubmit} />
          <div className="ui grid">
            <div className="ui row">
              <div className="eight wide column">
                <h3 align="left">Top Scores:</h3>
                <ScoreBoard scores={this.state.allscores} />
              </div>
              <div className="eight wide column">
                <h3 align="left">My Scores:</h3>
                <ScoreBoard scores={this.state.myscores} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
