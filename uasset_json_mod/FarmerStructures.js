import { addMultipleAssets } from "./jEdit.js";
import fs from 'fs';

function edit(data, customAssets) {
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

    addMultipleAssets(data, customAssets, dataArrayName, importsClassName, getPushObject);
}

function write(jsonFile, assetsFile) {
    let jsfile = fs.readFileSync(jsonFile);
    let data = JSON.parse(jsfile);
    let assets =  fs.readFileSync(assetsFile).toString().split("\n").map((line) => line.trim()).filter((line) => line.length > 0).filter(line => !line.startsWith('#'));
    edit(data, assets);
    fs.writeFileSync(jsonFile, JSON.stringify(data, null, 4));
    console.log("File updated successfully.");
}

export { edit, write };