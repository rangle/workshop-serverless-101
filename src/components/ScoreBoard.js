import React from "react";
import ScoreItem from "./ScoreItem";

const listItems = scores => {
  return  scores.map((data, i) => (
    <ScoreItem key={'all'+i} user={data.username} date={data.date} score={data.score} />
  ));
};

const ScoreBoard = ({ scores }) => {
  return (
    <div className="ui card">
      <table className="ui celled table">
        <thead>
          <tr>
            <th>User</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>{listItems(scores)}</tbody>
      </table>
    </div>
  );
};

export default ScoreBoard;
