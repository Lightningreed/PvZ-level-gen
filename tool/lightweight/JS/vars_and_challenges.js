         // ui elements
         var myGroupBox;

         //data variables
         var userInput = {};
         var myGrid;
         var rails = [];
         var railCarts = [];
         var itemsObj = {};
         var spawnObj = [];
         var iPCount;
         var maxPCount;
         var spawnTimer = {};
         var a;//field
         var moldConfig = [];
         var c; //param o' box
         var zArr = [];
 
         //this one get a global flag for nest()
         var fireNest;
         var nestArr1 = [];
         var nestArr2 = [];
         var spawnGridNestArr = [];
         var zGridNestArr = [];
         var frostWindArr = [];
         var addFlagWave = []
 
         //functions
         var completeObjdata;
 
         //global scope to define when should createObj() run:
         var runCreateObj = {};
 
         // file object
         var challengeModules = {}, fileObj = {}, challengeModulesDefinition = [];
         var waveSmallArr = [], waveBigArr = [];
         //create sub box
         var subBox = document.createElement('fieldset');
         subBox.id = "mySubGroupBox";
         document.body.appendChild(subBox);
         hideSubBox();
         function onAliasSelect() {
             myGroupBox = document.getElementById("myGroupBox");
             chosen = document.getElementById("reee").selectedIndex;
             hideSubBox();
 
             switch (chosen) {
                 case 0:
                     handleEndangered();
                     break;
                 case 1:
                     handleModifyPlantCooldown();
                     break;
                 case 2:
                     handleSunBombs();
                     break;
                 case 3:
                     handleSpeedyZombie();
                     break;
                 case 4:
                     handleLootOverride();
                     break;
                 case 5:
                     handlePlank();
                     break;
                 case 6:
                     handleRails();
                     break;
                 case 7:
                     handlePotion();
                     break;
                 case 8:
                     handleIntPlants();
                     break;
                 case 9:
                     handleIntZombies();
                     break;
                 case 10:
                     handleGridItems();
                     break;
                 //break case 11 cuz not selectable
                 case 11:
                     handleSunProduced();
                     break;
                 case 12:
                     handleMaxPlants();
                     break;
                 case 13:
                     handleMaxPlantsLost();
                     break;
                 case 14:
                     handleMold(); //WHY THE FUCK AM I HERE ALREADY
                     break;
                 case 15:
                     handleWave();
                 default:
                 //hacker detected!!
             };
         }
 
 
         function handleEndangered() {
             myGrid = {
                 "className": "Endangered",
                 "data": [
                     { "name": "GridX", "id": "gridxID", "displayTxt": "Provide GridX: ", "type": "number", "min": "0", "max": "9" },
                     { "name": "GridY", "id": "gridyID", "displayTxt": "Provide GridY: ", "type": "number", "min": "0", "max": "9" },
                     { "name": "PlantType", "id": "plantType", "displayTxt": "Provide a plant's name (internal): ", "type": "text" }
                 ]
             };
             runCreateObj.toSubmit = true;
             createUI();
 
             //all var to create ed plants
             var ePlants = [], endangeredObj = {}, eAlias = ["ProtectThePlant"], ePlantsData = {};
             completeObjdata = function () {
                 runCreateObj.run = true;
                 ePlants.push(userInput)
                 function createObj() {
                     endangeredObj.aliases = eAlias;
                     endangeredObj.objclass = "ProtectThePlantChallengeProperties";
                     ePlantsData.MustProtectCount = ePlants.length;
                     ePlantsData.Plants = ePlants;
                     endangeredObj.objdata = ePlantsData;
                     console.log(JSON.stringify(endangeredObj))
                 }
                 completeObjdata.createObj = createObj;
             }
         }
 
         function handleModifyPlantCooldown() {
             myGrid = {
                 "className": "ModifyPlantCooldown",
                 "data": [
                     { "name": "CooldownMultiplier", "id": "cooldownMod", "displayTxt": "Cooldown multiplier (example x0.5, x2 [without the 'x']): ", "type": "number", "min": "", "max": "" },
                     { "name": "HomeworldToExcludeFromOverride", "id": "cooldownExclusion", "displayTxt": "Exclude a homeworld from CooldownMod: ", "type": "text" }
                 ]
             };
             createUI();
             completeObjdata = function () {
                 runCreateObj.run = false;
                 var cModObj = {}, cModAlias = ["CooldownMod"];
                 cModObj.aliases = cModAlias;
                 cModObj.objclass = "PlantCooldownModifierProperties";
                 cModObj.objdata = userInput;
                 console.log(JSON.stringify(cModObj));
             }
         }
 
         function handleSunBombs() {
             myGrid = {
                 "className": "SunBombs",
                 "data": [
                     { "name": "PlantBombExplosionRadius", "id": "pBombRadius", "displayTxt": "Range SunBombs will apply to plants: ", "type": "number", "min": "0", "max": "" },
                     { "name": "ZombieBombExplosionRadius", "id": "zBombRadius", "displayTxt": "Range SunBombs will apply to zombies: ", "type": "number", "min": "0", "max": "" },
                     { "name": "PlantDamage", "id": "sBombpDamage", "displayTxt": "How hurtful will the bomb be to plants? ", "type": "number", "min": "0", "max": "" },
                     { "name": "ZombieDamage", "id": "sBombzDamage", "displayTxt": "How hurtful will the bomb be to zombies? ", "type": "number", "min": "0", "max": "" }
                 ]
             };
             createUI();
             completeObjdata = function () {
                 runCreateObj.run = false;
                 var sBombsObj = {}, sBombsAlias = ["SunBombChallengeProperties"];
                 sBombsObj.aliases = sBombsAlias;
                 sBombsObj.objclass = "SunBombChallengeProperties";
                 sBombsObj.objdata = userInput;
                 console.log(JSON.stringify(sBombsObj));
             }
         }
 
         function handleSpeedyZombie() {
             myGrid = {
                 "className": "FasterZombies",
                 "data": [
                     { "name": "Speedy", "id": "speedChk", "displayTxt": "Will zombies in this level be faster than normal? (checked is true) ", "type": "checkbox" }
                 ]
             };
             createUI();
             completeObjdata = function () {
                 runCreateObj.run = false;
                 var speedyObj = {}, speedyAlias = ["SpeedyZombies"], speedyObjdata = {}
                 speedyObj.aliases = speedyAlias;
                 speedyObj.objclass = "SpeedyZombies";
                 var chkBox = document.getElementById("speedChk");
                /* if (chkBox.checked == true) {
                     speedyObjdata.Speedy = true;
                 }
                 else {
                     speedyObjdata.Speedy = false;
                 } */
                 speedyObj.objdata = speedyObjdata;
                 console.log(JSON.stringify(speedyObj))
             }
         }
 
         function handleLootOverride() {
             myGrid = {
                 "className": "LootOverride",
                 "data": [
                     { "name": "ZombieType", "id": "lootOverrideZType", "displayTxt": "Choose a zombie to override loot drop (internal): ", "type": "text" },
                     { "name": "LootOverride", "id": "lootToOverride", "displayTxt": "Override with which type of loot? ", "type": "text" }
                 ]
             }; runCreateObj.toSubmit = true;
             createUI();
             var lootOverrideArray = [], lootOverrideAlias = ["LootOverride"], lootOverrideObj = {}, lootOverrideObjdata = {}, validZType;
             completeObjdata = function () {
                 runCreateObj.run = true;
 
                 validZType = "RTID(" + userInput.ZombieType + "@ZombieTypes)";
                 var realOverride = {};
                 realOverride[myGrid.data[0].name] = validZType;
                 realOverride[myGrid.data[1].name] = userInput.LootOverride;
                 lootOverrideArray.push(realOverride);
                 function createObj() {
                     lootOverrideObj.aliases = lootOverrideAlias;
                     lootOverrideObj.objclass = "LootOverrideModuleProperties";
                     lootOverrideObjdata.Overrides = lootOverrideArray;
                     lootOverrideObj.objdata = lootOverrideObjdata;
                     console.log(JSON.stringify(lootOverrideObj));
                 }
                 completeObjdata.createObj = createObj;
             }
         }
 
         function handlePlank() {
             myGrid = {
                 "className": "Plank",
                 "data": [
                     { "name": "PlankRows", "id": "PSPlank", "displayTxt": "Which row do you want to place plank on? (only work for Pirate Seas) ", "type": "number", "min": "0", "max": "4" }
                 ]
             }; runCreateObj.toSubmit = true;
             createUI();
             var plankRows = [], plankObj = {}, plankObjdata = {}, plankAlias = ["PiratePlanks"];
             completeObjdata = function () {
                 runCreateObj.run = true;
                 plankRows.push(userInput);
                 function createObj() {
                     plankObj.aliases = plankAlias;
                     plankObj.objclass = "PiratePlankProperties";
                     plankObjdata.PlankRows = plankRows;
                     plankObj.objdata = plankObjdata;
                     console.log(JSON.stringify(plankObj));
                 }
                 completeObjdata.createObj = createObj;
             }
         }
 
         function handleRails() {
             rails = [];
             railCarts = [];
             createRailsUI();
 
             var railsRows = [], railsObj = {}, railsObjdata = {}, railsAlias = ["CowboyRails"];
             completeObjdata = function () {
                 function createObj() {
                     railsObj.aliases = railsAlias;
                     railsObj.objclass = "RailCartProperties";
                     railsObj.objdata = userInput;
                     console.log(JSON.stringify(railsObj));
                 };
                 completeObjdata.createObj = createObj;
             }
         }
 
         function createRailsUI() {
             clearInputArea();
             addText("Railcart type: ");
             myGroupBox.appendChild(createInput('text', 'railCartTypeID', 'myClass', 'railcart_cowboy'));
             newLine(); newLine();
 
             //add rails first
             addText("Add rails: "); newLine();
             addText("Column: "); createInput('number', 'railColumnID', 'myClass', 1); addText("  ");
             addText("Row Start: "); createInput('number', 'railRowStartID', 'myClass', 1); addText("  ");
             addText("Row End: "); createInput('number', 'railRowEndID', 'myClass', 3); addText("  ");
 
             var clickHandler = function () {
                 var myRail = {};
                 rails.push(myRail);
                 myRail['Column'] = readIntInput("railColumnID");
                 myRail['RowStart'] = readIntInput("railRowStartID");
                 myRail['RowEnd'] = readIntInput("railRowEndID");
                 console.log('Added rail: ' + JSON.stringify(myRail));
             };
             myGroupBox.appendChild(createButton('Add', clickHandler));
 
             clickHandler = function () {
                 rails = [];
             };
             myGroupBox.appendChild(createButton('Clear all rails', clickHandler));
             newLine(); newLine();
 
             //add carts
             addText("Add Rail Carts: "); newLine();
             addText("Column: "); createInput('number', 'railCartColumnID', 'myClass', 1); addText("  ");
             addText("Row: "); createInput('number', 'railCartRowID', 'myClass', 1); addText("  ");
 
             clickHandler = function () {
                 var myRailCart = {};
                 railCarts.push(myRailCart);
                 myRailCart['Column'] = readIntInput("railCartColumnID");
                 myRailCart['Row'] = readIntInput("railCartRowID");
                 console.log('Added rail cart: ' + JSON.stringify(myRailCart));
             };
             myGroupBox.appendChild(createButton('Add', clickHandler));
 
             clickHandler = function () {
                 railCarts = [];
             };
             myGroupBox.appendChild(createButton('Clear all carts', clickHandler));
             newLine(); newLine();
 
 
             //submit buttons
             clickHandler = function () {
                 userInput = readRailsData();
                 completeObjdata();
                 //instead of setting all input to blank, just create new ui.
                 createRailsUI();
             };
             //myGroupBox.appendChild(createButton('Submit', clickHandler));
 
 
             clickHandler = function () {
                 userInput = readRailsData();
                 completeObjdata();
                 completeObjdata.createObj();
             };
             myGroupBox.appendChild(createButton('Submit and generate chosen object', clickHandler));
         }
         //okay item spawn, this is a f*cking mess
         function handlePotion() {
             addPotionUI();
             var itemsAlias = ['GridItemSpawn'];
             completeObjdata = function () {
                 function createObj() {
                     itemsObj.aliases = itemsAlias;
                     itemsObj.objclass = "ZombiePotionModuleProperties";
                     itemsObj.objdata = userInput;
                     console.log(JSON.stringify(itemsObj));
                 };
                 completeObjdata.createObj = createObj;
             }
         }
 
 
         function addPotionUI() {
             clearInputArea();
             addText('How many items do you want to leave at start? ');
             myGroupBox.appendChild(createInput('number', 'itemPrePlaceNumber', 'potionClass', ''));
             newLine();
             addText('Maximum amount of items on the lawn?  ');
             myGroupBox.appendChild(createInput('number', 'itemMaxNumber', 'potionClass', ''));
             // handle 2 first obj
             newLine();
             var clickHandler = function () {
                 iPCount = readIntInput('itemPrePlaceNumber');
                 maxPCount = readIntInput('itemMaxNumber');
                 clickHandler.onclick = function () { document.getElementById('toBeDisabled').disabled = true; }
             };
             myGroupBox.appendChild(createButton('Confirm', clickHandler, 'toBeDisabled'));
             newLine(); newLine();
             //create potion timer
             addText('Configure potions:'); newLine();
             addText('Maximum time to spawn item:  '); myGroupBox.appendChild(createInput('number', 'itemMaxSpawnTime', 'potionClass', '')); addText(" ");
             addText('Minimum time to spawn item: '); myGroupBox.appendChild(createInput('number', 'itemMinSpawnTime', 'potionClass', '')); addText(" ");
             //handle time
             clickHandler = function () {
                 spawnTimer.Max = readIntInput('itemMaxSpawnTime');
                 spawnTimer.Min = readIntInput('itemMinSpawnTime');
                 clickHandler.onclick = function () { document.getElementById('toBeDisabled2').disabled = true; };
             }
             myGroupBox.appendChild(createButton('Confirm', clickHandler, 'toBeDisabled2'));
             newLine(); newLine();
             addText('What do you want to spawn? '); myGroupBox.appendChild(createInput('text', 'itemToSpawn', 'itemSpawnId', ''))
             //lol handler
             clickHandler = function () {
                 spawnObj.push(readTxtInput('itemToSpawn'))
             };
             myGroupBox.appendChild(createButton('Add', clickHandler));
             clickHandler = function () {
                 userInput = function () {
                     itemsObj.InitialPotionCount = iPCount;
                     itemsObj.MaxPotionCount = maxPCount;
                     itemsObj.PotionSpawnTimer = spawnTimer;
                     itemsObj.PotionTypes = spawnObj;
                     //call handle potion
                 };
                 completeObjdata();
                 completeObjdata.createObj();
                 clickHandler.onclick = function () { document.getElementById('toBeDisabled3').disabled = true; }
             };
             myGroupBox.appendChild(createButton('Generate chosen object', clickHandler, 'toBeDisabled3'));
         }
 
 
         function handleIntPlants() {
             myGrid = {
                 "data": [
                     { "name": "IsInitialIntensiveCarrotPlacements", "id": "intPlantsBurn", "displayTxt": "Burn all plants at the start of the level?", "type": "checkbox" },
                     { "name": "Condition", "id": "intConditions", "displayTxt": "Conditions?", "type": "number" },
                     { "name": "GridX", "id": "gridxIDInt", "displayTxt": "Provide GridX: ", "type": "number", "min": "0", "max": "9" },
                     { "name": "GridY", "id": "gridyIDInt", "displayTxt": "Provide GridY: ", "type": "number", "min": "0", "max": "9" },
                     { "name": "Level", "id": "intPlantLvl", "displayTxt": "What level will it be? (-1 for current level)", "type": "number" },
                     { "name": "PlantType", "id": "plantTypeInt", "displayTxt": "Provide a plant's name (internal): ", "type": "text" }
                 ]
             }
             runCreateObj.toSubmit = true;
             createUI();
             var intPlants = [], intPObj = {}, intAlias = ["InitialPlants"], intPlantsData = {}, confirmLastOfObj = [];
             completeObjdata = function () {
                 runCreateObj.run = true;
                 confirmLastOfObj.push(document.getElementById("intPlantsBurn").checked);
                 delete userInput.IsInitialIntensiveCarrotPlacements;//just to make sure it doesn't log this one every time the user loops
                 intPlants.push(userInput);
                 function createObj() {
                     intPObj.aliases = intAlias;
                     intPObj.objclass = "InitialPlantProperties";
                     intPlantsData.IsInitialIntensiveCarrotPlacements = confirmLastOfObj.pop();
                     intPlantsData.InitialPlantPlacements = intPlants;
                     intPObj.objdata = intPlantsData;
                     console.log(JSON.stringify(intPObj));
                 }
                 completeObjdata.createObj = createObj;
             }
         }
 
         function handleIntZombies() {
             myGrid = {
                 "data": [
                     { "name": "Condition", "id": "intZConditions", "displayTxt": "Conditions? ", "type": "number" },
                     { "name": "GridX", "id": "gridxIDInt", "displayTxt": "Provide GridX: ", "type": "number", "min": "0", "max": "9" },
                     { "name": "GridY", "id": "gridyIDInt", "displayTxt": "Provide GridY: ", "type": "number", "min": "0", "max": "9" },
                     { "name": "TypeName", "id": "plantTypeInt", "displayTxt": "Provide a zombie's name (internal): ", "type": "text" }
                 ]
             }
             runCreateObj.toSubmit = true;
             createUI();
             var intZombies = [], intZObj = {}, intZAlias = ["InitialZombies"], intZData = {};
             completeObjdata = function () {
                 runCreateObj.run = true;
                 intZombies.push(userInput);
                 function createObj() {
                     intZObj.aliases = intZAlias;
                     intZObj.objclass = "InitialZombieProperties";
                     intZData.InitialZombiePlacements = intZombies;
                     intZObj.objdata = intZData;
                     console.log(JSON.stringify(intZObj))
                 }
                 completeObjdata.createObj = createObj;
             }
         }
 
         function handleGridItems() {
             myGrid = {
                 "data": [
                     { "name": "GridX", "id": "gridxIDInt", "displayTxt": "Provide GridX: ", "type": "number", "min": "0", "max": "9" },
                     { "name": "GridY", "id": "gridyIDInt", "displayTxt": "Provide GridY: ", "type": "number", "min": "0", "max": "9" },
                     { "name": "TypeName", "id": "plantTypeInt", "displayTxt": "Provide an item's name (internal): ", "type": "text" }
                 ]
             }
             runCreateObj.toSubmit = true;
             createUI();
             var intItems = [], intIObj = {}, intIAlias = ['InitialGridItem'], intIData = {};
             completeObjdata = function () {
                 runCreateObj.run = true;
                 intItems.push(userInput);
                 function createObj() {
                     intIObj.aliases = intIAlias;
                     intIObj.objclass = "InitialGridItemProperties";
                     intIData.InitialGridItemProperties = intItems;
                     intIObj.objdata = intIData;
                 }
                 completeObjdata.createObj = createObj;
             }
         }
 
         function handleSunProduced() {
             myGrid = {
                 "data": [
                     { "name": "TargetSun", "id": "targetSun", "displayTxt": "Target sun to produce: ", "type": "number", "min": "0", "max": "" }
                 ]
             }
             runCreateObj.toSubmit = false;
             createUI();
             var sunPAlias = ['SunProduced'], sunPObj = {};
             completeObjdata = function () {
                 runCreateObj.run = false;
                 sunPObj.aliases = sunPAlias;
                 sunPObj.objclass = "StarChallengeSunProducedProps";
                 sunPObj.objdata = userInput;
                 console.log(JSON.stringify(sunPObj))
             }
         }
 
         function handleMaxPlants() {
             myGrid = {
                 "data": [
                     { "name": "MaximumPlants", "id": "maxPlantId", 'displayTxt': 'Maximum amount of plants allowed onscreen? ', 'type': 'number', 'min': '0', 'max': '' }
                 ]
             }
             runCreateObj.toSubmit = false;
             createUI();
             var maxPlantsAlias = ["SimultaneousPlants"], maxPlantsObj = {};
             completeObjdata = function () {
                 runCreateObj.run = false;
                 maxPlantsObj.aliases = maxPlantsAlias;
                 maxPlantsObj.objclass = "StarChallengeSimultaneousPlantsProps";
                 maxPlantsObj.objdata = userInput;
             }
         }
 
         function handleMaxPlantsLost() {
             myGrid = {
                 "data": [
                     { 'name': 'MaximumPlantsLost', 'id': 'maxPlantLostID', 'displayTxt': 'Maximum amount of plants to lose? ', 'type': 'number', 'min': '0', 'max': '' }
                 ]
             }
             runCreateObj.toSubmit = false;
             createUI();
             var maxPlantLossAlias = ['PlantsLost'], maxPLossObj = {};
             completeObjdata = function () {
                 runCreateObj.run = false;
                 maxPLossObj.aliases = maxPlantLossAlias;
                 maxPLossObj.objclass = "StarChallengePlantsLostProps";
                 maxPLossObj.objdata = userInput;
             }
         }
 
         function handleMold() {
             var moldTakeObj =
             {
                 "aliases": [
                     "MoldColonies"
                 ],
                 "objclass": "MoldColonyChallengeProps",
                 "objdata": {
                     "Locations": "RTID(Mold@CurrentLevel)"
                 }
             } //create this so well JSON doesn't mess up
             clearInputArea();
             moldConfig = {
                 'data': [
                     { 'display': 'Row 1 ' }, { 'display': 'Row 2 ' }, { 'display': 'Row 3 ' }, { 'display': 'Row 4 ' }, { 'display': 'Row 5 ' }
                 ]
             }
             var c = 0;
 
             var myValidator = function (e) {
                 if (e) {
                     var inptBox = e.target;
                     if (inptBox.value.length > inptBox.maxLength) inptBox.value = inptBox.value.slice(0, inptBox.maxLength);
                 }
             };
             moldConfig.data.forEach(function createMoldUI(param) {
                 var x = document.createTextNode(param.display);
                 myGroupBox.appendChild(x);
                 var i = 0;
                 while (i < 9) {
                     var btn = document.createElement('input');
                     btn.type = 'number';
                     btn.min = 0;
                     btn.max = 1;
                     btn.maxLength = 1;
                     btn.value = '0';
                     btn.id = "moldCollect_" + c + "_" + i;
                     myGroupBox.appendChild(btn);
                     btn.addEventListener('oninput', myValidator, true);
                     btn.addEventListener('input', myValidator, true);
                     addText(" ");
                     i++;
                 }
                 myGroupBox.appendChild(document.createElement('br'));
                 c++;
             }
             )
             var clickHandler = function () {
                 moldReadData();
             }
             myGroupBox.appendChild(createButton("Generate object", clickHandler));
         }
 
         function moldReadData() {
             var c = 0; var r = 0; var moldInptData = []; rows = [];
 
             for (c = 0; c < moldConfig.data.length; c++) {
                 moldInptData[c] = [];
                 for (r = 0; r < 9; r++) {
                     var moldCls = document.getElementById("moldCollect_" + c + "_" + r).value;
                     moldInptData[c].push(parseInt(moldCls))
                 }
             }
 
             console.log(moldInptData);
         }
 
         function handleSeedBank() { //holy crap what did I create..
             var seedBankOption = {}, presetList = [], presetListObj = {}, blacklistArr = [], whitelistArr = [], suggestList = [];
             clearInputArea();
             addText('Preset list: ');
             myGroupBox.appendChild(createInput('text', 'pNames')); addText('   at level  '); myGroupBox.appendChild(createInput('number', 'pLvl'));
             var clickHandler = function () {
                 presetListObj.PlantType = readTxtInput('pNames');
                 presetListObj.Level = readIntInput('pLvl');
                 presetList.push(presetListObj);
                 //empty pls. 25/08/2018: What the hell is empty pls?
             }; addText('  ')
             myGroupBox.appendChild(createButton('Add', clickHandler));
             newLine(); newLine();
             addText('Plant blacklist: ');
             myGroupBox.appendChild(createInput('text', 'blackListedP'));
             clickHandler = function () {
                 blacklistArr.push(readTxtInput('blacklistedP'));
             };
             addText('  '); myGroupBox.appendChild(createButton('Add', clickHandler));
             newLine(); newLine();
             addText('Plant whilelist: ')
             myGroupBox.appendChild(createInput('text', 'whitelistedP'));
             clickHandler = function () {
                 whitelistArr.push(readTxtInput('whitelistedP'));
             }
             addText('  '); myGroupBox.appendChild(createButton('Add', clickHandler));
             newLine(); newLine();
             addText('Suggest plant list: ');
             myGroupBox.appendChild(createInput('text', 'listSuggest'));
             clickHandler = function () {
                 var a = readTxtInput('listSuggest');
                 if (a.includes(',')) {
                     var b = a.spilt(',')
                     suggestList.push(b);
                 }
                 else {
                     suggestList.push(a);
                 }
             }
             //too lazy to create the obj now to later
         }