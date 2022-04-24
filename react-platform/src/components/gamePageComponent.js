import { React } from "react";
import GameItem from "./gameItemComponent";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Games } from "../utils/data";
import Header from "./headerComponent";
import styled from "@emotion/styled";
import SportsEsportsTwoToneIcon from "@mui/icons-material/SportsEsportsTwoTone";
const TopText = styled.h2`
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const GameBox = styled.span`
  border-radius: 50%;
  background: #6675df;
  width: 70px;
  height: 70px;
  display: flex;
  position: relative;
`;

const GamePageComponent = () => {
  return (
    <section className="colorAll">
      <Header />
      <Box
        sx={{
          m: "20px",
          p: 1,
          background: "#87878752",
          borderRadius: "20px",
          color: "rgb(255 255 255 / 87%)",
        }}
      >
        <TopText>
          <GameBox>
            <SportsEsportsTwoToneIcon
              sx={{ position: "absolute", left: "24%", top: "24%" }}
              fontSize="large"
            />
          </GameBox>
          Ma liste de jeux
        </TopText>
        <Grid container spacing={2}>
          {Games.map((game) => {
            return (
              <Grid key={game.id} item md={4} sx={{ m: 2 }}>
                <GameItem key={game.id} gameData={game}></GameItem>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </section>
  );
};

export default GamePageComponent;
