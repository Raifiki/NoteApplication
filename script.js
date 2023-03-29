let noteHL = ['Überschrift Notiz1', 'Überschirft Notiz2'];
let noteText = ['Text Notiz1', 'Text Notiz2'];

let noteHLBin = [];
let noteTextBin = [];

let varNameLocalStorage = ['HL', 'Text', 'HLBin', 'TextBin'];
let varNameGlobal = ['noteHL', 'noteText', 'noteHLBin', 'noteTextBin'];

loadData(varNameLocalStorage, varNameGlobal);

function renderNotes() {
    let content = document.getElementById('dynamicContent');
    content.innerHTML = '';
    for (let i = 0; i < noteHL.length; i++) {
        content.innerHTML +=/*html*/`
            <div class="noteCard">
                <div onclick="renderOverlayChange(${i})" class="curserPointer">
                    <h2>${noteHL[i]}</h2>
                    <p>${addNewLine(noteText[i])}</p>
                </div>
                <button class="buttonStyle" onclick="moveNote2Bin(${i})" ><img src="img/icon/trash-64.ico" alt="Löschen"></button>
            </div>
        `;
    }

    setNavbarBG('notesButton');
}


function renderNotesBin() {
    let content = document.getElementById('dynamicContent');
    content.innerHTML = '';
    for (let i = 0; i < noteHLBin.length; i++) {
        content.innerHTML +=/*html*/`
            <div class="noteCard">
                <div>
                    <h2>${noteHLBin[i]}</h2>
                    <p>${addNewLine(noteTextBin[i])}</p>
                </div>
                <div>
                    <button class="buttonStyle" onclick="delNote(${i})" ><img src="img/icon/x-mark-64.ico" alt="Löschen"></button>
                    <button class="buttonStyle" onclick="restoreNote(${i})" ><img src="img/icon/reuse-64.ico" alt="Wiederherstellen"></button>
                </div>
            </div>
        `;
    }

    setNavbarBG('binButton');
}


function renderOverlayAdd() {
    let content = document.getElementById('overlayContent');

    content.innerHTML = /*html*/ `
    <button class="buttonStyle" onclick="hideOverlay()" id="closeOverlay"><img src="img/icon/x-mark-64.ico" alt="close"></button>
    `;

    content.innerHTML += /*html*/`
        <div id="wrapperOverlayNote">
            <div >
                <input id="newHL" placeholder="Überschrift">
                <textarea id="newText" placeholder="Neue Notiz ..."></textarea>
            </div>
            <button class="buttonStyle" onclick="addNote()"><img src="img/icon/save-64.ico" alt="Speichern"></button>  
        </div>
    `;

    showOverlay();
    setNavbarBG('addButton');
}


function addNote() {
    /*get value form HMTL*/
    let newHl = document.getElementById('newHL').value;
    let newTxt = document.getElementById('newText').value;
    if (newHl && newTxt) // check if not empty
    {
        /*push values to global variable*/
        noteHL.push(newHl);
        noteText.push(newTxt);

        hideOverlay();
        renderNotes();
        saveData(varNameLocalStorage, [noteHL, noteText, noteHLBin, noteTextBin]);
    }
}


function showOverlay(){
   let overlay = document.getElementById('overlayContent');
   overlay.style.display = 'flex';
}


function hideOverlay(){
    let overlay = document.getElementById('overlayContent');
    overlay.style.display = 'none';
    renderNotes()
}


function renderOverlayChange(idx) {
    let content = document.getElementById('overlayContent');

    content.innerHTML = /*html*/ `
    <button class="buttonStyle" onclick="hideOverlay('notesButton')" id="closeOverlay"><img src="img/icon/x-mark-64.ico" alt="close"></button>
    `;

    content.innerHTML += /*html*/`
        <div id="wrapperOverlayNote">
            <div >
                <input id="changeHL" placeholder="Überschrift" value="${noteHL[idx]}">
                <textarea id="changeText" placeholder="Neue Notiz ...">${noteText[idx]}</textarea>
            </div>
            <div>
                <button class="buttonStyle" onclick="changeNote(${idx})"><img src="img/icon/save-64.ico" alt="Speichern"></button>
                <button class="buttonStyle" onclick="moveNote2Bin(${idx})"><img src="img/icon/trash-64.ico" alt="Speichern"></button> 
            </div>
        </div>
    `;

    showOverlay();
}


function changeNote(idx) {
    let changeHl = document.getElementById('changeHL').value;
    let changeTxt = document.getElementById('changeText').value;

    if (changeHl && changeTxt) // check if not empty
    {
        /*change values in global variable*/
        noteHL[idx] = changeHl;
        noteText[idx] = changeTxt;
        hideOverlay();
    }

    renderNotes();
    saveData(varNameLocalStorage, [noteHL, noteText, noteHLBin, noteTextBin]);
}


function moveNote2Bin(idx) {
    noteHLBin.push(noteHL[idx]);
    noteTextBin.push(noteText[idx]);

    noteHL.splice(idx, 1);
    noteText.splice(idx, 1);

    hideOverlay();
    renderNotes();
    saveData(varNameLocalStorage, [noteHL, noteText, noteHLBin, noteTextBin]);
}


function delNote(idx) {
    noteHLBin.splice(idx, 1);
    noteTextBin.splice(idx, 1);

    renderNotesBin();
    saveData(varNameLocalStorage, [noteHL, noteText, noteHLBin, noteTextBin]);
}


function restoreNote(idx) {
    noteHL.push(noteHLBin[idx]);
    noteText.push(noteTextBin[idx]);

    noteHLBin.splice(idx, 1);
    noteTextBin.splice(idx, 1);

    renderNotesBin();
    saveData(varNameLocalStorage, [noteHL, noteText, noteHLBin, noteTextBin]);
}


function saveData(varName, data) {
    for (let i = 0; i < varName.length; i++) {
        saveArrayToLocalStorage(varName[i], data[i]);
    }
}


function loadData(varNamelocal, varName) {
    for (let i = 0; i < varNamelocal.length; i++) {
        let localData = getArrayFromLocalStorage(varNamelocal[i]);
        if (localData) {
            eval(varName[i] + '=localData;');
        }
    }
}


function setNavbarBG (buttonID){
    document.getElementById('addButton').style.backgroundColor = 'transparent';
    document.getElementById('notesButton').style.backgroundColor = 'transparent';
    document.getElementById('binButton').style.backgroundColor = 'transparent';

    document.getElementById(buttonID).style.backgroundColor = 'var(--color3)';
}

//------------ help fucntions -----------------
function addNewLine(string) {
    return string.replace(/\n/g, "<br>");
}


function saveArrayToLocalStorage(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
}


function getArrayFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}