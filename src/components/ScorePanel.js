import React from "react";

class ScorePanel extends React.Component {
  state = { score: "0" };

  onFormSubmit = event => {
    const score = this.lookupScore();

    if (score > this.state.score) {

      if (score >= 2000) {
        alert("Seriously! Did you cheat?");
      }

      this.setState({ score });
      this.props.onSubmit(score);
    }
  };

  lookupScore = () => {
    return (
      window.Runner.instance_ &&
      window.Runner.instance_.distanceMeter.getActualDistance(
        Math.ceil(window.Runner.instance_.distanceRan)
      )
    );
  };

  render() {
    return (
      <div className="ui segment">
        <h3>
          <font color="black">{"High Score: " + this.state.score}</font>
        </h3>
        <div className="button">
          <input
            className="ui primary button"
            onClick={this.onFormSubmit}
            type="submit"
            value={"Submit Score"}
          />
        </div>
      </div>
    );
  }
}

export default ScorePanel;
