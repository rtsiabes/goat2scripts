var fs = require('fs');

const filePath = String.raw`C:\my\UE_modding\FModel\Output\Exports\Goat2\Content\Blueprints\GoatGear\Abilities\BP_GA_HardHat.json`;
let jsfile = fs.readFileSync(filePath);
let data = JSON.parse(jsfile);
let assetsFile = String.raw`C:\my\UE_modding\meshesToSpawn.txt`;


let customAssets = fs.readFileSync(assetsFile).toString().split("\n").map((line) => line.trim()).filter((line) => line.length > 0).filter(line => !line.startsWith('#'));

/**
 * Adds a single asset to the JSON object.
 * @param {object} data - The parsed JSON object.
 * @param {string} asset - The asset to add (e.g., "Goat2/Content/Props/General/Meshes/SM_BrickWall_3x").
 */
function addAsset(data, asset) {
    const transformedPath = asset.replace("Goat2/Content/", "/Game/");
    const assetName = asset.split("/").pop(); // Extracts "SM_BrickWall_3x"

    if (!data.NameMap.includes(transformedPath)) {
        // Append to NameMap
        data.NameMap.push(transformedPath);
        data.NameMap.push(assetName);
    }

    // Calculate new indexes
    const newImportIndex = data.Imports.length + 1;
    const outerIndex = -newImportIndex;

    // Append to Imports
    data.Imports.push({
        "$type": "UAssetAPI.Import, UAssetAPI",
        "ObjectName": transformedPath,
        "OuterIndex": 0,
        "ClassPackage": "/Script/CoreUObject",
        "ClassName": "Package",
        "PackageName": null,
        "bImportOptional": false,
    });
    data.Imports.push({
        "$type": "UAssetAPI.Import, UAssetAPI",
        "ObjectName": assetName,
        "OuterIndex": outerIndex,
        "ClassPackage": "/Script/Engine",
        "ClassName": "StaticMesh",
        "PackageName": null,
        "bImportOptional": false,
    });

    // Add to MeshesToDrop
    const meshesToDrop = data.Exports[1].Data.find((e) => e.Name == "MeshesToDrop");
    if (meshesToDrop && meshesToDrop.Value) {
        meshesToDrop.Value.push({
            "$type": "UAssetAPI.PropertyTypes.Structs.StructPropertyData, UAssetAPI",
            "StructType": "WeightedElement_StaticMesh",
            "SerializeNone": true,
            "StructGUID": "{00000000-0000-0000-0000-000000000000}",
            "Name": "MeshesToDrop",
            "DuplicationIndex": 0,
            "IsZero": false,
            "Value": [
              {
                "$type": "UAssetAPI.PropertyTypes.Objects.ObjectPropertyData, UAssetAPI",
                "Name": "Mesh",
                "DuplicationIndex": 0,
                "IsZero": false,
                "Value": outerIndex - 1, // Refers to the ObjectName in Imports
              },
              {
                "$type": "UAssetAPI.PropertyTypes.Objects.IntPropertyData, UAssetAPI",
                "Name": "Weight",
                "DuplicationIndex": 0,
                "IsZero": false,
                "Value": 1
              }
            ]
          });
    }

    // Update Generations.NameCount
    if (data.Generations && data.Generations.length > 0) {
        data.Generations[0].NameCount = data.NameMap.length;
    }
}

/**
 * Adds multiple assets to the JSON file by delegating to addAsset.
 * @param {string} json - The JSON data
 * @param {string[]} assets - An array of assets to add.
 */
function addMultipleAssets(json, assets) {
    assets.forEach((asset) => addAsset(json, asset));
    
    // log new values
    // last two NameMap values
    console.log(json.NameMap.slice(-2));
    // last two Imports values
    console.log(json.Imports.slice(-2));
    // last Structures value
    console.log(json.Exports[1].Data.find((e) => e.Name == "MeshesToDrop").Value.slice(-1));
    // first Generations.NameCount value
    console.log(json.Generations[0].NameCount);

    // Write the updated JSON back to the file
    console.log("Assets added successfully!");
}

function clearStructures(data) {
    const structures = data.Exports[1].Data.find((e) => e.Name == "Structures");
    if (structures && structures.Value) {
        structures.Value = [];
    }
}

//clearStructures(data);
addMultipleAssets(data, customAssets);
var newJson = JSON.stringify(data, null, 4);
//console.log(newJson);
fs.writeFileSync(filePath, newJson);
console.log("File updated successfully!");