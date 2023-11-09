import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import Stack from "react-bootstrap/Stack";
import History from "./History";

const Header = ({ moves }) => {
  const score = useSelector((state) => state.game.score);

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Candy Crush </Navbar.Brand>
          <Stack bg="dark" data-bs-theme="dark" direction="horizontal" gap={3}>
            <div className="p-2 ms-auto top">
              <Button variant="outline-success">Score: {score}</Button>
            </div>
            <div className="p-2 top">
              <Button variant="outline-warning"> Moves Left: {moves}</Button>
            </div>

            <History>History</History>
          </Stack>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
