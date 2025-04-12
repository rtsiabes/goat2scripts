const { addAssetsToJsonFile } = require('./jEdit');


let dataArrayName = "BodyMaterials";
let importsClassName = "MaterialInstanceConstant";

function getPushObject(outerIndex) {
    return {
        "$type": "UAssetAPI.PropertyTypes.Structs.StructPropertyData, UAssetAPI",
        "StructType": "MatElement",
        "SerializeNone": true,
        "StructGUID": "{00000000-0000-0000-0000-000000000000}",
        "Name": "BodyMaterials",
        "DuplicationIndex": 0,
        "IsZero": false,
        "Value": [
            {
                "$type": "UAssetAPI.PropertyTypes.Objects.ObjectPropertyData, UAssetAPI",
                "Name": "MatIns",
                "DuplicationIndex": 0,
                "IsZero": false,
                "Value": outerIndex - 1
            },
            {
                "$type": "UAssetAPI.PropertyTypes.Objects.IntPropertyData, UAssetAPI",
                "Name": "Index",
                "DuplicationIndex": 0,
                "IsZero": false,
                "Value": -1
            }
        ]
    }
}

///////////////
// Oiiae

// const filePaths = [
//     // String.raw`C:\my\UE_modding\FModel\Output\Exports\Goat2\Plugins\GoatMultiverse\Content\Blueprints\GoatGear\Gear\Fur\BabyGoat\Styles\BP_Gear_Fur_BabyGoat_Style_Color_Grey.json`,
//     // String.raw`C:\my\UE_modding\FModel\Output\Exports\Goat2\Plugins\GoatMultiverse\Content\Blueprints\GoatGear\Gear\Fur\BabyGoat\Styles\BP_Gear_Fur_BabyGoat_Style_Color_Orange.json`,
//     // String.raw`C:\my\UE_modding\FModel\Output\Exports\Goat2\Plugins\GoatMultiverse\Content\Blueprints\GoatGear\Gear\Fur\BabyGoat\Styles\BP_Gear_Fur_BabyGoat_Style_Color_Pink.json`,
//     // String.raw`C:\my\UE_modding\FModel\Output\Exports\Goat2\Plugins\GoatMultiverse\Content\Blueprints\GoatGear\Gear\Fur\BabyGoat\Styles\BP_Gear_Fur_BabyGoat_Style_Color_Purple.json`,
//     // String.raw`C:\my\UE_modding\FModel\Output\Exports\Goat2\Plugins\GoatMultiverse\Content\Blueprints\GoatGear\Gear\Fur\BabyGoat\Styles\BP_Gear_Fur_BabyGoat_Style_Color_Yellow.json`,
//     // String.raw`C:\my\UE_modding\FModel\Output\Exports\Goat2\Plugins\GoatMultiverse\Content\Blueprints\GoatGear\Gear\Fur\BabyGoat\Styles\BP_Gear_Fur_BabyGoat_Style_Color_Red.json`,
//     // String.raw`C:\my\UE_modding\FModel\Output\Exports\Goat2\Plugins\GoatMultiverse\Content\Blueprints\GoatGear\Gear\Fur\BabyGoat\Styles\BP_Gear_Fur_BabyGoat_Style_Color_Black.json`,
//     // String.raw`C:\my\UE_modding\FModel\Output\Exports\Goat2\Plugins\GoatMultiverse\Content\Blueprints\GoatGear\Gear\Fur\BabyGoat\Styles\BP_Gear_Fur_BabyGoat_Style_Color_Blue.json`,
//     // String.raw`C:\my\UE_modding\FModel\Output\Exports\Goat2\Plugins\GoatMultiverse\Content\Blueprints\GoatGear\Gear\Fur\BabyGoat\Styles\BP_Gear_Fur_BabyGoat_Style_Color_Brown.json`,
//     // String.raw`C:\my\UE_modding\FModel\Output\Exports\Goat2\Plugins\GoatMultiverse\Content\Blueprints\GoatGear\Gear\Fur\BabyGoat\Styles\BP_Gear_Fur_BabyGoat_Style_Color_Cyan.json`,
//     // String.raw`C:\my\UE_modding\FModel\Output\Exports\Goat2\Plugins\GoatMultiverse\Content\Blueprints\GoatGear\Gear\Fur\BabyGoat\Styles\BP_Gear_Fur_BabyGoat_Style_Color_White.json`,
//     // String.raw`C:\my\UE_modding\FModel\Output\Exports\Goat2\Plugins\GoatMultiverse\Content\Blueprints\GoatGear\Gear\Fur\BabyGoat\Styles\BP_Gear_Fur_BabyGoat_Style_Color_Green.json`
//     String.raw`C:\my\UE_modding\FModel\Output\Exports\Goat2\Plugins\GoatMultiverse\Content\Blueprints\GoatGear\Gear\Fur\BabyGoat\BP_Gear_Fur_BabyGoat_GoatPattern.json`,
// ];

// for (let i = 0; i < filePaths.length; i++) {
//     let color = filePaths[i].split('_').pop().split('.').shift();
//     let colorAsset = `Goat2/Plugins/GoatMultiverse/Content/Characters/Player/BabyGoat/Meshes/Oiiae/MI_Oiiae_${color}`;
//     addAssetsToJsonFile(filePaths[i], [colorAsset], true, dataArrayName, importsClassName, getPushObject);
// }

///////////////
// Wenda

const filePaths2 = [
    String.raw`C:\my\UE_modding\FModel\Output\Exports\Goat2\Plugins\GoatMultiverse\Content\Blueprints\GoatGear\Gear\Fur\Reinfaus\BP_Gear_Fur_Reinfaus_Silver.json`,
    String.raw`C:\my\UE_modding\FModel\Output\Exports\Goat2\Plugins\GoatMultiverse\Content\Blueprints\GoatGear\Gear\Fur\Reinfaus\BP_Gear_Fur_Reinfaus_Bronze.json`,
    String.raw`C:\my\UE_modding\FModel\Output\Exports\Goat2\Plugins\GoatMultiverse\Content\Blueprints\GoatGear\Gear\Fur\Reinfaus\BP_Gear_Fur_Reinfaus_Gold.json`,
    String.raw`C:\my\UE_modding\FModel\Output\Exports\Goat2\Plugins\GoatMultiverse\Content\Blueprints\GoatGear\Gear\Fur\Reinfaus\BP_Gear_Fur_Reinfaus_Kawaii.json`,
    String.raw`C:\my\UE_modding\FModel\Output\Exports\Goat2\Plugins\GoatMultiverse\Content\Blueprints\GoatGear\Gear\Fur\Reinfaus\BP_Gear_Fur_Reinfaus_Rainbow.json`
];

for (let i = 0; i < filePaths2.length; i++) {
    let color = filePaths2[i].split('_').pop().split('.').shift();
    let colorAsset = `Goat2/Plugins/GoatMultiverse/Content/Characters/Player/Reinfaus/Meshes/Wenda/MI_Wenda_${color}`;
    addAssetsToJsonFile(filePaths2[i], [colorAsset], true, dataArrayName, importsClassName, getPushObject);
}
