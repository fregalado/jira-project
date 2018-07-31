import React from 'react';

const issueItem = (props) => (
  <div>
      <li>
          {props.assignee}, <br/> histórias: {props.stories}, pontos: {props.storyPoints}, {props.timespent/60} min, {props.timeestimate*60} min,  dificuldade: {(1-(props.stories/props.storyPoints)).toFixed(2)}
      </li>
  </div>
);

export default issueItem;