import React from "react";
import ScoreItem from "./ScoreItem";

const ScoreBoard = ({ onUserSelect, scores }) => {
  return (
    <div className="ui card">
      <table className="ui celled table">
        <thead>
          <tr>
            <th>User</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((data, i) => (
            <ScoreItem
              key={"all" + i}
              onUserSelect={onUserSelect}
              user={data.username}
              date={data.date}
              score={data.score}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreBoard;
