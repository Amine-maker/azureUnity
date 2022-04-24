import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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

  useEffect(() => {
    if (play) {
      launchScript(gameData)
        .then((res) => {
          console.log(res);
          setPlay(false);
        })
        .catch((err) => {
          setError(true);
        });
    }
  });

  const HandleClick = () => {
    setPlay(true);
  };

  return (
    <div className="blur">
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
