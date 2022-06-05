import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import AccessTimeTwoToneIcon from "@mui/icons-material/AccessTimeTwoTone";
import styled from "@emotion/styled";
import img from "../assets/images/0b447c2fb9c964785f97fb41cf76b619.jpg";
import { launchScript } from "../api/api";

const Typo = styled.p`
  color: rgb(255 255 255 / 87%);
  padding: 5px 0 0 0;
  font-size: 1.1em;
  line-height: 1;
  display: block;
`;

const GameItem = (props) => {
  const { gameData } = props;
  const [play, setPlay] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    if (play) {
      launchScript(gameData)
        .then((res) => {
          console.log(res);
          setPlay(false);
        })
        .catch((err) => {
          setPlay(false);
          setError(true);
        });
    }
  });

  const HandleClick = () => {
    setPlay(true);
    setOpen(true);
  };

  return (
    <div className="blur">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Veuillez patientez
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Le jeu va etre lancé dans une nouvelle fenêtre
          </Typography>
        </Box>
      </Modal>
      <Card
        variant="outlined"
        sx={{
          fontFamily: "hongaria",
          borderRadius: "15px",
          backgroundColor: "#040266",
          boxShadow: "5px 4px 40px 0px #2f343cde",
        }}
      >
        <CardMedia component="img" height="250" image={img} alt="" />
        <CardContent sx={{ color: "rgb(255 255 255 / 87%)" }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", fontFamily: "hongaria" }}
            gutterBottom
          >
            {gameData.name}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typo sx={{ mb: 3 }}>{gameData.editor}</Typo>
            <Typo>
              <AccessTimeTwoToneIcon
                sx={{ position: "relative", left: "-3px", top: "6px" }}
              />
              {Math.floor(gameData.playTime / 60)} minutes
            </Typo>
          </Box>

          <Typo sx={{ mb: 3 }}>{gameData.description}</Typo>

          <Typo sx={{ display: "block" }}>Type : {gameData.type}</Typo>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            onClick={HandleClick}
            className="login100-form-btn"
            disabled={play}
          >
            {play ? "En cours" : "Jouer"}
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default GameItem;
