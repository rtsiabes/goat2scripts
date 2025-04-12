# goat2scripts

Scripts to modify export lists of UAssetGUI JSON files of Goat Simulator.

Example uses:
- Changing most export lists, like adding meshes to the Farmer's Structures list of his build ability.
- Adding abilities to gear without abilities.
- Changing the material instance of a character fur blueprint.

## Requirements 
Nodejs

## Usage

1. Locate the uasset to modify with FModel.
2. Use UassetGUI to save it as JSON
3. Configure a script and call addAssetsToJsonFile (or addAbilityToJsonFile) and run it.

Scripts starting with 'Add' come preconfigured, use those. For exmaple, AddFarmerStructures.js:

```javascript
// AddFarmerStructures.js

var fs = require('fs');
const { addAssetsToJsonFile } = require('./jEdit');

// Main config
// Set the path to the json file and the file with the farmer's structure list
const jsonFile = String.raw`C:\my\UE_modding\FModel\Output\Exports\Goat2\Content\Blueprints\GoatGear\Abilities\BP_GA_Builder.json`;
let assetsFile = String.raw`C:\my\UE_modding\scripts\uasset_json_mod\assetLists\farmer_structures_v3.txt`;

// Other configuration, this doesn't change.
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

// Run
let assets =  fs.readFileSync(assetsFile).toString().split("\n").map((line) => line.trim()).filter((line) => line.length > 0).filter(line => !line.startsWith('#'));
addAssetsToJsonFile(jsonFile, assets, true, dataArrayName, importsClassName, getPushObject);
```
