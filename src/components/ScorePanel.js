import React from "react";

class ScorePanel extends React.Component {
  state = { score: "" };

  onFormSubmit = event => {
    event.preventDefault();

    if (this.state.score >= 2000) {
      alert("Seriously! Did you cheat?");
    }

    this.props.onSubmit(this.state.score);
    this.setState({ score: "" });
  };

  render() {
    return (
      <div className="ui segment">
        <form onSubmit={this.onFormSubmit} className="ui form">
          <div className="field">
            <label>Submit Score:</label>
            <input
              type="text"
              value={this.state.score}
              onChange={e => this.setState({ score: e.target.value })}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default ScorePanel;
