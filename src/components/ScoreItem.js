import React from "react";
import faker from "faker";

const ScoreItem = ({ onUserSelect, user, date, score }) => {
  return (
    <tr>
      <td onClick={() => onUserSelect(user)} className="user-item">
        <h4 className="ui image header">
          <img alt="" src={faker.image.avatar()} className="ui rounded image" />
          <div className="content">
            {user}
            <div className="sub header">{date}</div>
          </div>
        </h4>
      </td>
      <td>{score}</td>
    </tr>
  );
};

export default ScoreItem;
