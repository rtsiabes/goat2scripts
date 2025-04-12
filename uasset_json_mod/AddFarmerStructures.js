var fs = require('fs');
const { addAssetsToJsonFile } = require('./utils');


let dataArrayName = "Structures";
let importsClassName = "StaticMesh";

function getPushObject(outerIndex) {
    return {
        "$type": "UAssetAPI.PropertyTypes.Objects.ObjectPropertyData, UAssetAPI",
        "Name": "0",
        "DuplicationIndex": 0,
        "IsZero": false,
        "Value": outerIndex - 1, // Refers to the ObjectName in Imports
    }
}


const filePath = String.raw`C:\my\UE_modding\FModel\Output\Exports\Goat2\Content\Blueprints\GoatGear\Abilities\BP_GA_Builder.json`;
let assetsFile = String.raw`C:\my\UE_modding\customassets4.txt`;
let assets =  fs.readFileSync(assetsFile).toString().split("\n").map((line) => line.trim()).filter((line) => line.length > 0).filter(line => !line.startsWith('#'));
addAssetsToJsonFile(filePath, assets, true, dataArrayName, importsClassName, getPushObject);
