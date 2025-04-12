const { addAssetsToJsonFile } = require('./utils');


let dataArrayName = "ListOfPizzaMeshes";
let importsClassName = "StaticMesh";

function getPushObject(outerIndex) {
    return {
        "$type": "UAssetAPI.PropertyTypes.Objects.ObjectPropertyData, UAssetAPI",
              "Name": "0",
              "DuplicationIndex": 0,
              "IsZero": false,
              "Value": outerIndex - 1
    }
}


const filePath = String.raw`C:\my\UE_modding\FModel\Output\Exports\Goat2\Content\Blueprints\GoatGear\HelperClasses\BP_PizzaSlice.json`;
let assets = [
    '/Game/Custom/Meshes/mariobox'
]
addAssetsToJsonFile(filePath, assets, false, dataArrayName, importsClassName, getPushObject);



