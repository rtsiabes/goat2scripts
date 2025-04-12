const { write } = require("./FarmerStructures.js");

const filePath = String.raw`C:\my\UE_modding\FModel\Output\Exports\Goat2\Content\Blueprints\GoatGear\Abilities\BP_GA_Builder.json`;
let assetsFile = String.raw`C:\my\UE_modding\dev\goat2scripts\uasset_json_mod\assetLists\farmer_structures_v3.txt`;

write(filePath, assetsFile);

