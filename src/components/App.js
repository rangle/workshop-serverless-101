import "./App.css";
import React from "react";
import serverless from "../apis/serverless";
import ScoreBoard from "./ScoreBoard";
import ScorePanel from "./ScorePanel";

const MYNAME = "Rangle Rex";

class App extends React.Component {
  state = { allscores: [], selectedUser: MYNAME, myscores: [] };

  async componentDidMount() {
    await Promise.all([
      this.fetchAllScores(),
      this.fetchMyScores(this.state.selectedUser)
    ]);
  }

  onSubmit = async score => {
    await serverless.post("", {
      name: MYNAME,
      score: score
    });

    await Promise.all([
      this.fetchAllScores(),
      this.fetchMyScores(this.state.selectedUser)
    ]);
  };

  onUserSelect = async user => {
    this.setState({ selectedUser: user });
    this.fetchMyScores(user);
  };

  fetchAllScores = async () => {
    const response = await serverless.get("/all");

    this.setState({ allscores: response.data });
  };

  fetchMyScores = async user => {
    const response = await serverless.get("/me", {
      params: {
        username: user
      }
    });

    this.setState({ myscores: response.data });
  };

  render() {
    return (
      <div className="App">
        <div className="Welcome">Welcome to Serverless!</div>
        <div
          onClick={() => this.onUserSelect(MYNAME)}
          className="user-item Name"
        >
          {MYNAME}
        </div>
        <br />
        <div className="ui container">
          <ScorePanel onSubmit={this.onSubmit} />
          <div className="ui grid">
            <div className="ui row">
              <div className="eight wide column">
                <h3 align="left">Top Scores:</h3>
                <ScoreBoard
                  onUserSelect={this.onUserSelect}
                  scores={this.state.allscores}
                />
              </div>
              <div className="eight wide column">
                <h3 align="left">My Scores:</h3>
                <ScoreBoard
                  onUserSelect={this.onUserSelect}
                  scores={this.state.myscores}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
