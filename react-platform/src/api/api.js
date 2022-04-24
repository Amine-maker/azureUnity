import axios from "axios";
import CONSTANTES from "../utils/constantes";

export const launchScript = (gameData) => {
  return axios.post(`${CONSTANTES.apiUrl}/play`, gameData);
};
