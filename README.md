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

const { write } = require("./FarmerStructures.js");

const filePath = String.raw`C:\my\UE_modding\FModel\Output\Exports\Goat2\Content\Blueprints\GoatGear\Abilities\BP_GA_Builder.json`;
let assetsFile = String.raw`C:\my\UE_modding\dev\goat2scripts\uasset_json_mod\assetLists\farmer_structures_v3.txt`;

write(filePath, assetsFile);

```
