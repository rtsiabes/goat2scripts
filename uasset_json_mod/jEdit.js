/* 
Contains methods to modify export lists of UAssetGUI JSON files.
Main methods are 
    addAssetsToJsonFile
        To change most export lists, like adding meshes to the Farmer's Structures list.
    addAbilityToJsonFile
        To add abilities to gear that don't have abilities.
*/

var fs = require('fs');
const { execFile } = require('child_process');

function getDataArray(data, dataArrayName) {
    return data.Exports.map(e => e.Data.find((d) => d.Name == dataArrayName)).filter(d => d)[0];
}


function addAbility(data, asset) {
    const assetPath = asset.replace("Goat2/Content/", "/Game/").replace("Goat2/Plugins/GoatMultiverse/Content/", "/GoatMultiverse/");
    const assetName = asset.split("/").pop() + "_C";
    const defaultAssetName = "Default__" + assetName;
    const abilityName = assetName.replace("_C", "").replace("BP_GA_", "");
    
    if (!data.NameMap.includes(assetPath)) {
        // Append to NameMap
        data.NameMap = data.NameMap.concat([
            assetPath, assetName, defaultAssetName,
            "GameplayTagContainer",
            "GearAbility",
            "GearAbility." + abilityName, 
            "GearAbilityGameplayTags"
        ]);

        // Calculate new indexes
        const newImportIndex = data.Imports.length + 1; 
        const outerIndex = -newImportIndex;

        // Append to Imports
        data.Imports.push({
            "$type": "UAssetAPI.Import, UAssetAPI",
            "ObjectName": assetPath,
            "OuterIndex": 0,
            "ClassPackage": "/Script/CoreUObject",
            "ClassName": "Package",
            "PackageName": null,
            "bImportOptional": false,
        });
        data.Imports.push({
            "$type": "UAssetAPI.Import, UAssetAPI",
            "ObjectName": defaultAssetName,
            "OuterIndex": outerIndex,
            "ClassPackage": assetPath,
            "ClassName": assetName,
            "PackageName": null,
            "bImportOptional": false
        });
        data.Imports.push({ // the index of this must be abilityIndex, as this is referenced later
            "$type": "UAssetAPI.Import, UAssetAPI",
            "ObjectName": assetName,
            "OuterIndex": outerIndex,
            "ClassPackage": "/Script/Engine",
            "ClassName": "BlueprintGeneratedClass",
            "PackageName": null,
            "bImportOptional": false,
        });

        let abilityIndex = -data.Imports.length;
        // exports 
        data.Exports[1].Data.push({
            "$type": "UAssetAPI.PropertyTypes.Structs.StructPropertyData, UAssetAPI",
            "StructType": "GameplayTagContainer",
            "SerializeNone": true,
            "StructGUID": "{00000000-0000-0000-0000-000000000000}",
            "Name": "GearAbilityGameplayTags",
            "DuplicationIndex": 0,
            "IsZero": false,
            "Value": [
              {
                "$type": "UAssetAPI.PropertyTypes.Structs.GameplayTagContainerPropertyData, UAssetAPI",
                "Name": "GearAbilityGameplayTags",
                "DuplicationIndex": 0,
                "IsZero": false,
                "Value": [
                  "GearAbility." + abilityName
                ]
              }
            ]
        });
        data.Exports[1].Data.push({
            "$type": "UAssetAPI.PropertyTypes.Objects.ObjectPropertyData, UAssetAPI",
            "Name": "GearAbility",
            "DuplicationIndex": 0,
            "IsZero": false,
            "Value": abilityIndex
        });
    }
}

function addAbilityToJsonFile(jsonFile, abilityPath) {
    console.log("Adding ability to " + jsonFile);   
    let jsfile = fs.readFileSync(jsonFile);
    let data = JSON.parse(jsfile);
    
    addAbility(data, abilityPath);

    var newJson = JSON.stringify(data, null, 4);
    fs.writeFileSync(jsonFile, newJson);
    console.log("File updated successfully.");
}

function addAsset(data, asset, dataArrayName, importsClassName, getExportObject) {
    const assetPath = asset.replace("Goat2/Content/", "/Game/").replace("Goat2/Plugins/GoatMultiverse/Content/", "/GoatMultiverse/");
    const assetName = asset.split("/").pop(); 

    // Calculate new indexes
    const newImportIndex = data.Imports.length + 1;
    const outerIndex = -newImportIndex;

    if (!data.NameMap.includes(assetPath)) {
        // Append to NameMap
        data.NameMap = data.NameMap.concat([ assetPath, assetName ]);

        // Append to Imports
        data.Imports.push({
            "$type": "UAssetAPI.Import, UAssetAPI",
            "ObjectName": assetPath,
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
            "ClassName": importsClassName,
            "PackageName": null,
            "bImportOptional": false,
        });
    }

    // Add to target data array in Exports
    const dataArray = getDataArray(data, dataArrayName);
    if (dataArray && dataArray.Value) {
        dataArray.Value.push(getExportObject(outerIndex));
    }

    // Update Generations.NameCount
    if (data.Generations && data.Generations.length > 0) {
        data.Generations[0].NameCount = data.NameMap.length;
    }
}

function addMultipleAssets(json, assets, dataArrayName, importsClassName, getPushObject) {
    assets.forEach((asset) => addAsset(json, asset, dataArrayName, importsClassName, getPushObject));
    console.log("Assets added successfully!");
}

function clearDataArray(data, dataArrayName) {
    const dataArray = data.Exports[1].Data.find((e) => e.Name == dataArrayName);
    if (dataArray && dataArray.Value) {
        dataArray.Value = [];
    }
}

function assetsFromFile(assetsFile) {
    return fs.readFileSync(assetsFile).toString().split("\n").map((line) => line.trim()).filter((line) => line.length > 0).filter(line => !line.startsWith('#'));
}

/**
 * Add assets to a JSON file
 * @param {string} jsonFile The JSON file to update
 * @param {string[]} customAssets The assets to add. A list with values like "Goat2/Content/Characters/Player/BabyGoat/Meshes/Oiiae/MI_Oiiae_Grey"
 * @param {boolean} clearData Set to true to clear the data array before adding new assets.
 * @param {string} exportsArrayName The name of the target array in Exports to which assets will be added
 * @param {string} importsClassName The class name of the imports
 * @param {function} getExportObject A function that returns the object to push to the target data array in Exports. Takes an outerIndex.
 */
function addAssetsToJsonFile(jsonFile, customAssets, clearData, exportsArrayName, importsClassName, getExportObject) {
    console.log("Adding assets to " + jsonFile);   
    let jsfile = fs.readFileSync(jsonFile);
    let data = JSON.parse(jsfile);
    
    if (clearData) 
        clearDataArray(data, exportsArrayName);

    addMultipleAssets(data, customAssets, exportsArrayName, importsClassName, getExportObject);
    var newJson = JSON.stringify(data, null, 4);
    //console.log(newJson);
    fs.writeFileSync(jsonFile, newJson);
    console.log("File updated successfully.");
}

function runCmd(cmd, args, callback) {
    execFile(cmd, args, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        if (callback) callback();
    });
}



module.exports = {
    addAsset,
    addMultipleAssets,
    addAbility,
    addAbilityToJsonFile,
    clearDataArray,
    addAssetsToJsonFile,
    assetsFromFile,
    runCmd
};