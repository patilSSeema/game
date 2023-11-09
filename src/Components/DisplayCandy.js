import React from 'react'

const DisplayCandy = ({ colorBox, index, handleClick }) => {
  return (
    <div>
      <img
        className="box"
        src={colorBox}
        data-id={index}
        onClick={handleClick}
      />
    </div>
  );
};

export default DisplayCandy