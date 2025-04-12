import { write } from "./FarmerStructures.js";

const filePath = String.raw`C:\my\UE_modding\FModel\Output\Exports\Goat2\Content\Blueprints\GoatGear\Abilities\BP_GA_Builder.json`;
let assetsFile = String.raw`C:\my\UE_modding\customassets4.txt`;

write(filePath, assetsFile);

