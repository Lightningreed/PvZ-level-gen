function myReadData() {
    var a = {};
    myGrid.data.forEach(function insertObject(aliasesObject) {
        var val = document.getElementById(aliasesObject.id).value;
        if (val != "") {
            if (aliasesObject.type === "number") { val = parseInt(val); }
            a[aliasesObject.name] = val;
            if (aliasesObject.type === 'checkbox') {
               let chk =  document.getElementById(aliasesObject.id);
                if (chk.checked == true) {a[aliasesObject.name] = true;}
                else {a[aliasesObject.name] = false;}
            }
        }
    }

    );
    return a;
}

function readRailsData() {
    var a = {};
    a['RailCartType'] = readTxtInput("railCartTypeID");
    a['Rails'] = rails;
    a['RailCarts'] = railCarts;
    return a;
}


//utilities
//--------------------------------------------------------------------------------
function clearInputArea(preserveButtons = false) {
    while (myGroupBox.firstChild) {
        if (myGroupBox.lastChild) {
            var x = myGroupBox.lastChild.id;
            if (x == 'Escalation' && preserveButtons) { newSubLine(); break; }
        }
        myGroupBox.removeChild(myGroupBox.lastChild);
    }
    myGroupBox.appendChild(document.createElement('br'))
}

function clearSubInputArea(preserveButtons = true) {
    while (mySubGroupBox.firstChild) {
        var x = mySubGroupBox.lastChild.id;
        if (x == 'SunDropper' && preserveButtons) { newSubLine(); break; } /*because sun dropper is the last in the list, make sure to replace it when add new items into the list */
        mySubGroupBox.removeChild(mySubGroupBox.lastChild);
    }
    mySubGroupBox.appendChild(document.createElement('br'))
}

//clears previous and create new input ui
function createUI(c = null) {
    if (c == null) {
        clearInputArea();
    }
    var clsName = myGrid.className;
    //lay input boxes
    myGrid.data.forEach(function insertObject(aliasesObject) {
        //var x = document.createTextNode('For ' + clsName + ', ');
        //myGroupBox.appendChild(x);

        var x = document.createTextNode(aliasesObject.displayTxt);
        myGroupBox.appendChild(x);
        var bth = document.createElement('input');
        bth.type = 'text';
        bth.id = aliasesObject.id;
        bth.className = 'myClass';
        bth.type = aliasesObject.type;
        if (aliasesObject.type === "number") {
            bth.min = aliasesObject.min;
            bth.max = aliasesObject.max;
        }
        myGroupBox.appendChild(bth);
        myGroupBox.appendChild(document.createElement('br'))
    }
    );


    var clickHandler = function () {
        userInput = myReadData();
        completeObjdata();
        myGrid.data.forEach(function insertObject(aliasesObject) {
            document.getElementById(aliasesObject.id).value = "";
        })
    }
    if (runCreateObj.toSubmit === true) {
        myGroupBox.appendChild(createButton('Submit', clickHandler));
    }

    if (c == null) {
        clickHandler = function () {
            userInput = myReadData();
            completeObjdata();
            if (runCreateObj.run == true) {
                completeObjdata.createObj();
            }
        };
        myGroupBox.appendChild(createButton('Submit and generate chosen object', clickHandler));
    }
}
function createSubUI() {
    clearSubInputArea();

    var clsName = myGrid.className;
    //lay input boxes
    myGrid.data.forEach(function insertObject(aliasesObject) {
        var x = document.createTextNode(aliasesObject.displayTxt);
        mySubGroupBox.appendChild(x);
        var bth = document.createElement('input');
        bth.type = 'text';
        bth.id = aliasesObject.id;
        bth.className = 'myClass';
        bth.type = aliasesObject.type;
        if (aliasesObject.type === "number") {
            bth.min = aliasesObject.min;
            bth.max = aliasesObject.max;
        }
        mySubGroupBox.appendChild(bth);
        mySubGroupBox.appendChild(document.createElement('br'))
    }
    );

    var clickHandler = function () {
        userInput = myReadData();
        completeObjdata();
        myGrid.data.forEach(function insertObject(aliasesObject) {
            document.getElementById(aliasesObject.id).value = "";
        })
    }
    if (runCreateObj.toSubmit === true) {
        mySubGroupBox.appendChild(createButton('Submit', clickHandler));
    }

}



//creates button object with name and click handler
function createButton(name, clickHandler, id = '', className = '') {
    var button = document.createElement('button');
    button.innerHTML = name;
    button.onclick = clickHandler;
    button.type = "button";
    button.id = id;
    button.className = className;
    return button;
}

function createInput(type, id, className = 'myClass', value = '') {
    var inpt = document.createElement('input');
    inpt.type = type;
    inpt.id = id;
    inpt.className = className;
    inpt.value = value;
    myGroupBox.appendChild(inpt);
    return inpt;
}


function newLine() {
    myGroupBox.appendChild(document.createElement('br'));
}
function newSubLine() {
    mySubGroupBox.appendChild(document.createElement('br'));
}

function addText(txtt) {
    myGroupBox.appendChild(document.createTextNode(txtt));
}

function addSubText(txtt) {
    mySubGroupBox.appendChild(document.createTextNode(txtt));
}

function readIntInput(myId) {
    var val = document.getElementById(myId).value;
    if (val != "") {
        return parseInt(val);
    }
}

function readTxtInput(myId) {
    var val = document.getElementById(myId).value;
    if (val != "") {
        return val;
    }
}

function readBoolInput(myId) {
    var val = document.getElementById(myId).value;
    if (val.checked) {
        val = true;
        return val;
    }
}

function validateWave(a) {
    var val = "RTID(" + a + "@CurrentLevel)";
    return val;
}

function validateZombie(a) {
    var val = "RTID(" + a + "@ZombieType)";
    return val;
}

function manageGrid(a) {
    var val = "RTID(" + a + "@GridItemType)";
    return val;
}

function hideSubBox() {
    document.getElementById('mySubGroupBox').setAttribute('hidden', true);
}

function showSubBox() {
    document.getElementById('mySubGroupBox').removeAttribute('hidden');
}
function askZ(putZombieIntoObject = Boolean) { //false also disable row input
    var zArr = [];
    newLine(); addText('Zombie: '); myGroupBox.appendChild(createInput('text', 'zombie'));
   if (putZombieIntoObject != false) { 
       addText('  at row: '); myGroupBox.appendChild(createInput('text', 'rowW')); addText('  ');
   }
   var handleZ = function () {
    if (putZombieIntoObject != false) {
    var objW = {};
    var row = readIntInput('rowW');
    var zombieW = readTxtInput('zombie');
    objW.Type = validateZombie(zombieW);
    if (row != null && row != undefined) { objW.Row = row };
    zArr.push(objW);
    console.log('HAH');
   }
   else {zArr.push(validateZombie(zombieW)); console.log('HAH');}
}
   myGroupBox.appendChild(createButton('Add', handleZ));
}

function askSubZ() {
    newSubLine(); addSubText('Zombie: '); mySubGroupBox.appendChild(createInput('text', 'zombieSub'));

    var handleZ = function () {
        var objW = {};
        var row = readIntInput('rowWSub');
        var zombieW = readTxtInput('zombieSub');
        objW.Type = validateZombie(zombieW);
        if (row != null && row != undefined) { objW.Row = row };
        zArr.push(objW);
    };
    addSubText('  at row: '); mySubGroupBox.appendChild(createInput('text', 'rowWSub')); addSubText('  '); mySubGroupBox.appendChild(createButton('Add', handleZ));

}

function nest(firstText = '', secondText = '', firstType = '', secondType = '', firstId = '', secondId = '',
    toNest = Boolean, isFirstInt = Boolean, isSecondInt = Boolean,
    nestFirstProp = '', nestSecondProp = '', processFirstAns, processSecondAns, nestArr, putAbove = Boolean) {

        if (putAbove == false ||putAbove == undefined) {
    newSubLine(); addSubText(firstText + " "); mySubGroupBox.appendChild(createInput(firstType, firstId));
        }
        else {
            newLine(); addText(firstText + " "); myGroupBox.appendChild(createInput(firstType, firstId));
    }
    
    //stop writing Spaghetti code :O
    //need a global array for this

    var nester = function () {
        var obj = {};
        var firstAns, secondAns;

        if (isFirstInt == true) {
            firstAns = readIntInput(firstId);
        } else {
            firstAns = readTxtInput(firstId);
        }
        if (isSecondInt != undefined && isSecondInt != null && isSecondInt != Boolean) {
            if (isSecondInt == true) {
                secondAns = readIntInput(secondId)
            } else {
                secondAns = readTxtInput(secondId)
            }
        } //check if 2nd input exists


        if (typeof processFirstAns == 'function') {
            firstAns = processFirstAns(firstAns);
        }
        if (typeof processSecondAns == 'function' && secondType != undefined) {
            secondAns = processSecondAns(secondAns);
        }
        //this function declare that whether to not use a fucntion on the provided input.

        if (toNest == true) { //which means only activate when toNest is true and why am i commenting this
            if (firstAns != undefined) {
                obj[nestFirstProp] = firstAns //which is <nestFirstProp>:key. HOW COULD I FORGET THIS HAHAHAHA
            }
            if (secondAns != undefined && secondAns != null) {
                obj[nestSecondProp] = secondAns
            }
            nestArr.push(obj);
        } 
        else {
            if (firstAns != undefined) {
                nestArr.push(firstAns); //add that element into array. Long function, just making sure i won't forget.
            }
        }

    };
    if (secondType != null && secondType != undefined && secondType != '') { addSubText(' ' + secondText + ' '); mySubGroupBox.appendChild(createInput(secondType, secondId)); }
    mySubGroupBox.appendChild(createButton('Add', nester));
}

/* Usage:
This is the form to create <text> <input> (.<text> <input>.) <add button> in a single line.
(..) is optional.
To use: Assign a variable to a function: `var a = nest();`
Text = <text>
Type = Input type
Id = Input id

 */


function addSubEvButton(a) {
    newSubLine();
    clickHandler = function () {
        userInput = myReadData();
        completeObjdata();
        if (runCreateObj.run == true) {
            completeObjdata.createObj();
        }
        zArr = [];
    };
    mySubGroupBox.appendChild(createButton('Add event', clickHandler, 'evSubButton'));
}