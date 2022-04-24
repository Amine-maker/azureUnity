param (
  $azureAppName
)

$resourceGroup = "teste_group"

$appName = $azureAppName



az webapp start --name $appName --resource-group $resourceGroup
az webapp browse --name $appName --resource-group $resourceGroup


Timeout 10

az webapp stop --name $appName --resource-group $resourceGroup
