function handleWave() {
    var waveButtons = ['WaveManager', 'WaveManagerProps', 'Escalation (Randomizer)', 'WaveModules'];
    var waveEvent = ['Jam', 'LowTide', 'GroundSpawn', '(Sand/Snow)storm', 'RaidingParty', 'GridSpawn', 'SpawnFromGrid', 'BotSwarm', 'TideChange', 'FrostWind', 'ParachuteRain', 'Portal', 'Dino', 'SunDropper'];
    var waveMgr = [];
    var i = 1; //yup i is wave count in da level. global.
    clearInputArea();
    var handler = function () {
        clearInputArea(true);
        clearSubInputArea(false);
        createEventButton();
        newLine();
        addText("Wave: " + i);
    newLine();
        myGrid = {
            'data': [
                { 'name': "AdditionalPlantfood", "type": "number", 'displayTxt': 'Wave plantfood: ', 'min': '0', 'max': '' },
                { 'name': 'ZombieSpawnPattern', 'type': 'text', 'displayTxt': 'Spawn pattern: ', 'value': 'ZombieSpawnPattern' }
            ]
        }
        createUI(10);
        askZ(); newLine();
        myGroupBox.appendChild(createButton('Generate wave and events', handleAddWave));
    }
    myGroupBox.appendChild(createButton(waveButtons[0], handler)); addText('      ');
    handleAddWave = function () {
        
    }

    handler = function () { //handler of waveprops
        clearInputArea(true);
        clearSubInputArea(true);
        addText('Please finish creating all your waves before using this! I am not responsibe if WaveCount is falsified, or your JSON crashes because of this. Eventually I will fix it, but not now.')
        myGrid = {
            'data': [ 
            {'name': 'FlagWaveInterval','displayTxt':'Flag interval: ','type':'number','min':'0','id':'flagInterval'},
            {'name':'SuppressFlagZombie','displayTxt':'Suppress flag zombie? ','type':'checkbox','id':'flagZSupression'},
            {'name':'LevelJam', 'displayTxt':'Level jam: (MD only, 1 jam for the whole level): ','type':'text','id':'lvMDJam'},
            {'name':"MinNextWaveHealthPercentage",'displayTxt':'Minimum next wave health %: ','type':'number','min':'0','id':'minNextWavePercent', 'max':''},
            {'name':'MaxNextWaveHealthPercentage','displayTxt':'Maximum next wave health %', 'type':'number','id':'maxWavePercent','min':'0','max':''},
            {'name':"ZombieCountdownFirstWaveSecs",'displayTxt':'Zombie countdown first wave seconds: ', 'type':'number','min':'0','max':'','id':'zCDFirstWaveSecs'},
            {'name':'ZombieCountdownFirstWaveConveyorSecs','displayTxt':'Zombie countdown first wave conveyor seconds: ','type':'number','min':'0','max':'9','id':'zCDFirstWaveConvoSecs'},
            {'name':"ZombieCountdownHugeWaveDelay",'displayTxt':'Zombie countdown huge wave delay: ','type':'number','min':'0', 'max':'', 'id':'zCDHugeWaveDelay'}
            ]
        }
        createUI(10);
        nest('Additional flag wave: ',undefined,'number',undefined,'additionalFW',undefined,false,true,undefined,undefined,undefined,undefined,undefined,addFlagWave,true);
        var aliasesWaveProp = ['WaveProperties'], wavePropsData = {}
        completeObjdata = function () {
            wavePropsData.aliases = aliawsesWaveProp;
            wavePropsData.objclass = "WaveManagerProperties";
            wavePropsData.objdata = userInput;
            wavePropsData.objdata.AdditionalFlagWaves = addFlagWave;
        }
    }
    myGroupBox.appendChild(createButton(waveButtons[1], handler)); addText('      '); 
    handler = function () {
        clearInputArea(true);
        clearSubInputArea(true);
        addText('Ensure that you created WaveProperties. (I know I can prevent the accessiblity of this module before you do it, but laziness). Any excess from WaveProps will be randomized (wave count, e.t.c)'); newLine();
        myGrid = {
            'data': [
                {'name':'FlagCount','id':'flagCount','displayTxt':'Flag count (excessing flags will be randomized, check WaveProps)', 'type':'number', 'min':'1'},
                {'name':'PointIncrementWave','id':'pointIncrementWave','displayTxt':'Point increment wave:','type':'number'},
                {'name':'StartingPoints','id':'startingPoints','displayTxt':'Starting points:', 'type':'number'},
                {'name':'WavePerFlag','id':'wavePerFlagRando','displayTxt':'Wave per flag:','type':'number'}
            ] //should include global scope for flags wave, most of these are not local anyway
        }
        createUI(22);
        askZ();
    }
    myGroupBox.appendChild(createButton(waveButtons[2], handler, waveButtons[2]));

    //event button, probably I'll be able to fire an event for nest here to clear a global array for convenient, too many arrays currently
    function createEventButton() {
        newLine(); newLine(); showSubBox();
        waveEvent.forEach(function (a) {
            addText(' ');
            mySubGroupBox.appendChild(createButton(a, clickHandler, a, 'evButton'))
        });
    }

    //switch of events
    var clickHandler = function () {
        switch (this.id) {
            case "Jam":
                let arr = ['Rap', 'Punk', '8Bit', 'Metal', 'Ballad']; //unfinished
                clearSubInputArea();
                newSubLine();
                addSubText('Music?');
                newSubLine();
                arr.forEach(function (songName) {
                    mySubGroupBox.appendChild(createButton(songName, handleSong, songName));
                });
                function handleSong() {
                }
                break;
            case "LowTide":
                myGrid = {
                    'data': [
                        { 'name': 'ColumnEnd', 'id': 'colEndTide', 'displayTxt': 'Column end: ', 'type': 'number', 'min': '0', 'max': '9' },
                        { 'name': 'ColumnStart', 'id': 'colStartTide', 'displayTxt': 'Column start: ', 'type': 'number', 'min': '0', 'max': '9' },
                        { 'name': 'TimeBeforeFullSpawn', 'id': 'timebFullSpawnTide', 'displayTxt': 'Time before full spawn: ', 'type': 'number', 'min': '0', 'max': '' },
                        { 'name': 'TimeBetweenGroup', 'id': 'timebweenGrTide', 'displayTxt': 'Time between group: ', 'type': 'number', 'min': '0', 'max': '' },
                        { 'name': 'WaveStartMessage', 'id': 'waveMessage', 'displayTxt': 'Wave start message: ', 'type': 'text' },
                        { 'name': 'ZombieCount', 'id': 'zCountTide', 'displayTxt': 'Zombie count: ', 'type': 'number', 'min': '0', 'max': '' },
                        { 'name': 'ZombieType', 'id': 'zTypeTide', 'displayTxt': 'Zombie ambush type: ', 'type': 'text' }
                    ]
                }
                runCreateObj.toSubmit = false;
                createSubUI();
                addSubEvButton();
                completeObjdata = function () {
                    var lowAlias = ['Wave' + i + 'LowTideEvent'], lowObj = {};
                    lowObj.aliases = lowAlias;
                    lowObj.objclass = "BeachStageEventZombieSpawnerProps";
                    lowObj.objdata = userInput;
                    console.log(JSON.stringify(lowObj));
                }
                break;
            case "GroundSpawn":
                myGrid = {
                    'data': [
                        { 'name': 'ColumStart', 'id': 'GSColStart', 'displayTxt': 'Column start: ', 'type': 'number', 'min': '0', 'max': '9' },
                        { 'name': 'ColumnEnd', 'id': 'GSColEnd', 'displayTxt': 'Coulumn end: ', 'type': 'number', 'min': '0', 'max': '9' }
                    ]
                }
                runCreateObj.toSubmit = false;
                createSubUI();
                askSubZ();
                addSubEvButton();
                completeObjdata = function () {
                    var groundAlias = ['Wave' + i + 'GroundSpawnEvent'], groundObj = {}, groundData = {}
                    groundObj.aliases = groundAlias;
                    groundObj.objclass = "SpawnZombiesFromGroundSpawnerProps";
                    groundData.Zombies = zArr;
                    groundObj.objdata = userInput;
                    groundObj.objdata.Zombies = zArr;
                    console.log(JSON.stringify(groundObj));
                }
                break;
            case "(Sand/Snow)storm":
                myGrid = {
                    'data': [
                        { 'name': 'ColumnEnd', 'id': 'colEndStorm', 'displayTxt': 'Column end: ', 'type': 'number', 'min': '0', 'max': '9' },
                        { 'name': 'ColumnStart', 'id': 'colStartStorm', 'displayTxt': 'Column start: ', 'type': 'number', 'min': '0', 'max': '9' },
                        { 'name': 'TimeBetweenGroup', 'id': 'timebweenGrStorm', 'displayTxt': 'Time between group: ', 'type': 'number', 'min': '0', 'max': '' },
                        { 'name': 'Waves', 'id': 'stormWaves', 'displayTxt': 'Waves: ', 'type': 'text' },
                        { 'name': 'Type', 'id': 'stormType', 'displayTxt': 'Storm type: (sandstorm, snowstorm) ', 'type': 'text' },
                    ]
                }
                createSubUI();
                askSubZ();
                addSubEvButton();
                completeObjdata = function () {
                    var stormAlias = ['Wave' + i + 'StormEvent'], stormObj = {};
                    stormObj.aliases = stormAlias;
                    stormObj.objclass = "StormZombieSpawnerProps";
                    stormObj.objdata = userInput;
                    stormObj.objdata.Zombies = zArr;
                }
                break;
            case "RaidingParty":
                myGrid = {
                    'data': [
                        { 'name': 'SwashbucklerCount', 'id': 'bucklerCount', 'displayTxt': 'Swashbuckler count: ', 'type': 'number', 'min': '0', 'max': '' },
                        { 'name': 'GroupSize', 'id': 'raidGrSize', 'displayTxt': 'Group size: ', 'type': 'number', 'min': '0', 'max': '9' },
                        { 'name': 'TimeBetweenGroup', 'id': 'timebweenGrTide', 'displayTxt': 'Time between group: ', 'type': 'number', 'min': '0', 'max': '' }
                    ]
                }
                createSubUI();
                addSubEvButton();
                completeObjdata = function () {
                    var raidAlias = ['Wave' + i + 'RaidingEvent'], raidObj = {};
                    raidObj.aliases = raidAlias;
                    raidObj.objclass = 'RaidingPartyZombieSpawnerProps';
                    raidObj.objdata = userInput;
                }
            case 'BotSwarm':
                myGrid = {
                    'data': [
                        { 'name': 'ColumnEnd', 'id': 'colEndSwarm', 'displayTxt': 'Column end: ', 'type': 'number', 'min': '0', 'max': '9' },
                        { 'name': 'ColumnStart', 'id': 'colStartSwarm', 'displayTxt': 'Column start: ', 'type': 'number', 'min': '0', 'max': '9' },
                        { 'name': 'TimeBetweenGroup', 'id': 'timebweenGrSwarm', 'displayTxt': 'Time between group: ', 'type': 'number', 'min': '0', 'max': '' },
                        { 'name': 'TimeBeforeFullSpawn', 'id': 'timefullSpawnSwarm', 'displayTxt': 'Time before full spawn', 'type': 'number', 'min': '0', 'max': '' },
                        { 'name': 'GroupSize', 'id': 'raidGrSize', 'displayTxt': 'Group size: ', 'type': 'number', 'min': '0', 'max': '9' },
                        { 'name': 'SpiderCount', 'id': 'spiderCount', 'displayTxt': 'Ambush count: ', 'type': 'number', 'min': '0', 'max': '9' },
                        { 'name': 'SpiderZombieName', 'id': 'spiderName', 'displayTxt': 'Ambush name: ', 'type': 'text' },
                        { 'name': 'WaveStartMessage', 'id': 'waveMessSwarm', 'displayTxt': 'Wave message: ', 'type': 'text' },
                        { 'name': 'ZombieFallTime', 'id': 'zFallTimeSwarm', 'displayTxt': 'Zombie fall time: ', 'type': 'number', 'min': '0', 'max': '9' }
                    ]
                }
                createSubUI();
                addSubEvButton();
                completeObjdata = function () {
                    var swarmAlias = ['Wave' + i + 'SwarmEvent'], swarmObj = {};
                    swarmObj.aliases = swarmAlias;
                    swarmObj.objclass = "SpiderRainZombieSpawnerProps";
                    swarmObj.objdata = userInput;
                }
                break;
            case 'TideChange':
                myGrid = {
                    'data': [
                        { 'name': 'ChangeAmount', 'id': 'changeAmount', 'type': 'number', 'min': '0', 'max': '', 'displayTxt': 'Change amount' },
                        { 'name': 'ChangeType', 'id': 'changeType', 'type': 'text', 'displayTxt': 'Change type: ' },
                    ]
                }
                createSubUI();
                addSubEvButton();
                completeObjdata = function () {
                    var tideChangeAlias = ['Wave' + i + 'TideChangeEvent'], tideChangeObj = {};
                    tideChangeObj.aliases = tideChangeAlias;
                    tideChangeObj.objclass = "TidalChangeWaveActionProps";
                    tideChangeObj.objdata.TidalChange = userInput;
                }
                break;
            case 'GridSpawn':
                newSubLine();
                myGrid = {
                    'data': [
                        { 'name': 'SpawnEffectAnimID', 'displayTxt': 'Spawn effect: ', 'id': 'spawnEffGS', 'type': 'text' },
                        { 'name': 'SpawnSoundID', 'displayTxt': 'Spawn sound: ', 'id': 'spawnSoundGS', 'type': 'text' }
                    ]
                }
                createSubUI();

                nest('Type:', 'Count:', 'text', 'number', 'gridSpawnType', 'gridSpawnCount', true, false, true, 'Type', 'Count', manageGrid, undefined, nestArr1);
                newSubLine();

                nest('mX:', 'mY', 'number', 'number', 'mX', 'mY', true, true, true, 'mX', 'mY', undefined, undefined, nestArr2);
                addSubEvButton();

                var gridSAlias = ['Wave' + i + "GridSpawnEvent"], gridSObj = {};
                completeObjdata = function () {
                    gridSObj.aliases = gridSAlias;
                    gridSObj.objclass = 'SpawnZombiesFromGridItemSpawnerProps';
                    gridSObj.objdata = userInput;
                    gridSObj.objdata.GraveStonePool = nestArr1;
                    gridSObj.objdata.SpawnPostionPool = nestArr2;
                    console.log(JSON.stringify(gridSObj))
                }
                break;
            case 'SunDropper':
                myGrid = {
                    'data': [
                        { 'name': 'SunAmountToDrop', 'displayTxt': 'Sun amount to drop: ', 'id': 'sunDropper', 'type': 'number', 'min': '0', 'max': '' }
                    ]
                }
                createSubUI();
                addSubEvButton();
                var dropperAlias = ['Wave' + i + 'SunDropperEvent'], dropperObj = {};
                completeObjdata = function () {
                    dropperObj.aliases = dropperAlias;
                    dropperObj.objclass = "SunDropperWaveActionProps";
                    dropperObj.objdata = userInput;
                }
                break;
            case 'SpawnFromGrid':
                myGrid = {
                    'data': [
                        { 'name': 'AdditionalPlantfood', 'displayTxt': 'Wave plantfood amount: ', 'id': 'addPFSpawnFromGrid', 'type': 'number', 'min': '0', 'max': '' }
                    ]
                }
                createSubUI();

                nest('Grid type to spawn from: ', undefined, 'text', undefined, 'gridSpawnType', undefined, false, false, undefined, undefined,
                    undefined, manageGrid, undefined, spawnGridNestArr)
                newSubLine();

                nest('Zombie type:', undefined, 'text', undefined, 'zTypeSpawnGrid', undefined, true, false, undefined,
                    'Type', undefined, validateZombie, undefined, zGridNestArr)

                newSubLine(); addSubEvButton();
                var spawnGridAlias = ['Wave' + i + 'SpawnFromGridEvent'], spawnGridObj = {};
                completeObjdata = function () {
                    spawnGridObj.aliases = spawnGridAlias;
                    spawnGridObj.objclass = "SpawnZombiesFromGridItemSpawnerProps";
                    spawnGridObj.objdata = userInput;
                    spawnGridObj.objdata.GridTypes = spawnGridNestArr;
                    spawnGridObj.objdata.Zombies = zGridNestArr;
                    console.log(JSON.stringify(spawnGridObj))
                };
                break;
                case 'Dino':
                myGrid = {
                    'data': [
                        {'name':'DinoRow','id':'dinoRow','type':'number','displayTxt':'Dino row: ','min':'0','max':'4'},
                        {'name':'DinoType','id':'dinoType','type':'text','displayTxt':'Dino type: ',},
                        {'name':'DinoWaveDuration','id':'dinoDuration','type':'number','min':'0','max':'','displayTxt':'Dino wave duration: '} //disorganized af
                    ]
                }
                createSubUI();
                addSubEvButton();
                var dinoObj = {}, dinoAliases = ['Wave'+i+'DinoEvent'];
                completeObjdata = function () {
                    dinoObj.aliases = dinoAliases;
                    dinoObj.objclass = "DinoWaveActionProps";
                    dinoObj.objdata = userInput;
                }
                break;
                case 'FrostWind':
                myGrid = {'data':[]}
                createSubUI();
                nest('Direction:', 'Row:','text','number','windDirection','windRow',true,false,true,'Direction','Row',
                undefined,undefined,frostWindArr)
                addSubEvButton();
                var windObj = {}, windAliases = ['Wave'+i+'FrostWindEvent'];
                completeObjdata = function () {
                    windObj.aliases = windAliases;
                    windObj.objclass = "FrostWindWaveActionProps";
                    windObj.objdata = {Winds: frostWindArr};
                    console.log(JSON.stringify(windObj));
                }
                break;
                case 'ParachuteRain':
                myGrid = {
                    'data': [
                        { 'name': 'ColumnEnd', 'id': 'colEndSwarm', 'displayTxt': 'Column end: ', 'type': 'number', 'min': '0', 'max': '9' },
                        { 'name': 'ColumnStart', 'id': 'colStartSwarm', 'displayTxt': 'Column start: ', 'type': 'number', 'min': '0', 'max': '9' },
                        { 'name': 'TimeBetweenGroup', 'id': 'timebweenGrSwarm', 'displayTxt': 'Time between group: ', 'type': 'number', 'min': '0', 'max': '' },
                        { 'name': 'TimeBeforeFullSpawn', 'id': 'timefullSpawnSwarm', 'displayTxt': 'Time before full spawn', 'type': 'number', 'min': '0', 'max': '' },
                        { 'name': 'GroupSize', 'id': 'raidGrSize', 'displayTxt': 'Group size: ', 'type': 'number', 'min': '0', 'max': '9' },
                        { 'name': 'SpiderCount', 'id': 'spiderCount', 'displayTxt': 'Ambush count: ', 'type': 'number', 'min': '0', 'max': '9' },
                        { 'name': 'SpiderZombieName', 'id': 'spiderName', 'displayTxt': 'Ambush name: ', 'type': 'text' },
                        { 'name': 'WaveStartMessage', 'id': 'waveMessSwarm', 'displayTxt': 'Wave message: ', 'type': 'text' },
                        { 'name': 'ZombieFallTime', 'id': 'zFallTimeSwarm', 'displayTxt': 'Zombie fall time: ', 'type': 'number', 'min': '0', 'max': '9' }
                    ]
                }
                createSubUI();
                addSubEvButton();
                completeObjdata = function () {
                    var rainAlias = ['Wave' + i + 'RainEvent'], rainObj = {};
                    rainObj.aliases = rainAlias;
                    rainObj.objclass = "ParachuteRainZombieSpawnerProps";
                    rainObj.objdata = userInput;
                    console.log(JSON.stringify(rainObj));
                }
                break;
                case 'Portal':
                myGrid = {
                    'data': [
                        {'name': 'PortalColumn', 'id':'portalCol', 'displayTxt':'Portal column:', 'type':'number', 'min':'0','max':'9'},
                        {'name':'PortalRow','id':'portalRow','displayTxt':'Portal row:', 'type':'number',"min":'0','max':'4'},
                        {'name':'PortalType','id':'portalType','displayTxt':'Portal type (world name):','type':'text'},
                        {'name':'SpawnEffectAnimID','id':'portalEffAnimID','displayTxt':'Spawn effect animation ID:',},
                        {'name':'SpawnSoundID','id':'portalSoundID','displayTxt':'Spawn sound ID:','type':'text'}
                    ]
                }
                createSubUI();
                addSubEvButton();
                completeObjdata = function () {
                    var portalAlias = ['Wave' + i + 'PortalEvent'], portalObj = {};
                    portalObj.aliases = portalAlias;
                    portalObj.objclass = "SpawnModernPortalsWaveActionProps";
                    portalObj.objdata = userInput;
                    console.log(JSON.stringify(portalObj));
                }
                break;
        }
    };
}

//maybe dump this?

// New idea: Dropdown, only select from it.
//Though can't be throughly updated
