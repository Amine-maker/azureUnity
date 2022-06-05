var express = require("express");
var router = express.Router();
let play = false;

const shell = require("node-powershell");
const ps = new shell({ executionPolicy: "bypass", noProfile: true });

router.post("/play", function (req, res, next) {
  const gameData = req.body;
  if (!play) {
    play = true;
    ps.addCommand(
      `
      $resourceGroup = "teste_group"
      $appName = "${gameData.azureName}"
      $timeout = ${gameData.playTime}
      Write-Output $appName
      az webapp start --name $appName --resource-group $resourceGroup
      az webapp browse --name $appName --resource-group $resourceGroup
      Start-Sleep -s $timeout
      az webapp stop --name $appName --resource-group $resourceGroup`
    ),
      ps
        .invoke()
        .then((output) => {
          play = false; // fin du jeu
          res.send(output).status(200);
        })
        .catch((err) => {
          res.send(err).status(500);
          ps.dispose();
        });
  } else {
    console.log("jeu deja en cours ");
  }
});

module.exports = router;
