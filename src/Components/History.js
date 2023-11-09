import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useSelector } from "react-redux";

const History = ({ name, ...props }) => {
  const [show, setShow] = useState(false);
  const gamesWon = useSelector((state) => state.game.gamesWon);
  const gamesLost = useSelector((state) => state.game.gamesLost);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="primary" onClick={handleShow} className="me-2">
        History{name}
      </Button>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title >Game History</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <h6 className="game-statistics total-games">
            Total Games: {gamesWon + gamesLost}
          </h6>
          <p className="game-statistics won-games">Won Games: {gamesWon}</p>
          <p className="game-statistics lost-games">Lost Games: {gamesLost}</p>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default History;
