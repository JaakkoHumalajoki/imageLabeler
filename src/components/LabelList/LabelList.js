import React from 'react';
import './LabelList.css';

const LabelList = ({ labels }) => {
  if (labels.length === 0) return <></>

  const parts = labels.map(label => <li key={label}>{label}</li>);
  return (
    <ul className="labels">
      {parts}
    </ul>
  );
}

export default LabelList;