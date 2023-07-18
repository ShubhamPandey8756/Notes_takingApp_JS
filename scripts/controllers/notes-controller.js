// Controller (I/O) + Events + Talk to Service

import {noteOperations} from '../services/note-service.js'
window.addEventListener('load', init);

    
function init(){
    showCounts();
    bindEvents();
    sortEvents();
    disableButtonUpdate();
    disableButton();
}

function generateUniqueId(){
    let id=1;//mera initial count hogya...
    return function(){
        return id++;
    }
}
const uniqueIdGenerator=generateUniqueId();
const enableButton=()=>
    document.querySelector('#delete')
    .disabled = false;
const disableButton=()=>
    document.querySelector('#delete')
    .disabled=true;
const disableButtonUpdate = () => 
document.querySelector('#update').disabled = true;
const enableButtonUpdate = () => 
document.querySelector('#update').disabled = false;
    
function bindEvents() {
        document.querySelector('#add').addEventListener('click', addNote);
        document.querySelector('#delete').addEventListener('click', deleteMarked);
        //document.querySelector('#edit').addEventListener('click', edit);
        document.querySelector('#search').addEventListener('click', toggleSearch);
        document.querySelector('#update').addEventListener('click', addNote);
        document.querySelector('#clear').addEventListener('click', clearAll);
        document.querySelector('#save').addEventListener('click', save);
    }
function sortEvents(){
        document.querySelector('#up').addEventListener('click',sortUp);
        document.querySelector('#down').addEventListener('click',sortDown);
        document.querySelector('#up1').addEventListener('click',sortUpDate);
        document.querySelector('#down1').addEventListener('click',sortDownDate);
}
function sortUp(){
        //console.log("upwala");
        printNotes(noteOperations.sortUp());
}
function sortDown(){
        //console.log("downwala");
        printNotes(noteOperations.sortDown());
}
function sortUpDate(){
        //console.log(notes);
        console.log("upwala");
        printNotes(noteOperations.sortUpDate());
}
function sortDownDate(){
        console.log("downwala");
        printNotes(noteOperations.sortDownDate());
}
function toggleSearch() {
        const searchDiv = document.querySelector('#searchdiv');
        const searchContainer = searchDiv.querySelector('input');
        const dropdownDiv = searchDiv.querySelector('.dropdown');
      
        if (searchContainer && dropdownDiv) {
          searchDiv.removeChild(searchContainer.parentNode);
          searchDiv.removeChild(dropdownDiv);
        } else {
          searchDiv.appendChild(searchNote());
          searchDiv.appendChild(dropdownwala());
          const select = document.getElementById('dropdown-select');
          select.addEventListener('change', function() {
            const selectedValue = this.value;
            if (selectedValue === 'selectById') {
              searchId();
            } else if (selectedValue === 'selectByTitle') {
              searchTitle();
            }
          });
        }
}
      
function searchNote() {
        const newDiv = document.createElement('div');
        const searchContainer = document.createElement('input');
        searchContainer.type = 'text';
        searchContainer.placeholder = 'Search value....';
        searchContainer.id = 'input';
        // searchContainer.style.backgroundColor = 'aqua';
        newDiv.appendChild(searchContainer);
        return newDiv;
}
      
function dropdownwala() {
        const choice = ['Select', 'SelectById', 'SelectByTitle'];
        const myDiv = document.createElement('div');
        let selectHTML = "<select id='dropdown-select'>";
      
        for (let i = 0; i < choice.length; i++) {
          selectHTML += `<option id="${choice[i].split(' ').join('')}">${choice[i]}</option>`;
        }
      
        selectHTML += '</select>';
        myDiv.innerHTML = selectHTML;
        myDiv.classList.add('dropdown');
        return myDiv;
}
      
function searchId() {
        const dropdown = document.querySelector('.dropdown');
       // console.log("SearchID called");
        dropdown.addEventListener('keypress', function(e) {
          if (e.key === 'Enter') {
            let e1 = document.querySelector('#input').value;
            printNote1(noteOperations.searchById(e1));
          }
        });
}
function searchTitle(){
        // console.log("tiltle wala");
        const dropdown = document.querySelector('.dropdown');
       // console.log("Searchtitle called");
        dropdown.addEventListener('keypress', function(e) {
          if (e.key === 'Enter') {
            let e1 = document.querySelector('#input').value;
            console.log(e1);
            printNote1(noteOperations.searchByTitle(e1));
          }
        });
}    
 function printNote1(notes){
        const tbody=document.querySelector("#notes");
        tbody.innerHTML='';
        printNote(notes)

        showCounts();
}   
function deleteMarked(){
    noteOperations.remove();
    printNotes(noteOperations.getNotes());
}
function showCounts(){
    noteOperations.markTotal()>0
    ?enableButton():disableButton();
    document.querySelector('#total').innerText 
    = noteOperations.total();
    document.querySelector('#marktotal').innerText 
    = noteOperations.markTotal();
    document.querySelector('#unmarktotal').innerText 
    = noteOperations.unMarkTotal();
    
}

function clearAll(){
  const fields = ['id', 'title', 'desc', 'cdate', 'importance'];
  for (let x of fields) {
    // console.log(obj[x]);
    document.querySelector(`#${x}`).value ="";
  }
}

function addNote(){
    // read id , title, desc , date of completion, importance
    // DOM
    const fields =['id', 'title', 'desc', 'cdate', 'importance'];
    const noteObject = {}; // Object Literal
    const inputField=document.getElementById('id');
    inputField.addEventListener('input',function(){
        const uniqueId = uniqueIdGenerator();
        inputField.value = uniqueId;
    });
    //==>this function  i made struggle on editing
      //niche wala upade krte waqt dekhunga ....pehle aage ka dekhleta hu..........
    // const inputField = document.getElementById('id');
    // inputField.addEventListener('input', function() {
    //   if (!isUserInput) {
    //     const uniqueId = uniqueIdGenerator();
    //     inputField.value = uniqueId;
    //   }
    // });
    
    // inputField.addEventListener('focus', function() {
    //   isUserInput = true;
    // });
    
    // inputField.addEventListener('blur', function() {
    //   isUserInput = false;
    // });


    for(let field of fields){
        
        noteObject[field] = document
        .querySelector(`#${field}`).value.trim();
    }
    noteOperations.add(noteObject);
    printNote(noteObject);
    showCounts();
    //const id = document.querySelector('#id').value;
    //const title = document.querySelector('#title').value;   
}
function printIcon(myClassName='trash', fn, id){
    // <i class="fa-solid fa-trash"></i>
    //<i class="fa-solid fa-user-pen"></i>
    const iTag = document.createElement('i'); // <i>
    iTag.setAttribute('note-id',id);
    iTag.className = `fa-solid fa-${myClassName} me-2 hand`;
    iTag.addEventListener('click',fn);
    return iTag;
}
function toggleMark(){
    //console.log('Toggle Mark.... ', this);
    const icon = this;
    const id = this.getAttribute('note-id');
    noteOperations.toggleMark(id);
    const tr = icon.parentNode.parentNode;
    //tr.className = 'table-danger';
    tr.classList.toggle('table-danger');
    showCounts();
}

function edit(){

  enableButtonUpdate();
  const icon = this;
  const id = this.getAttribute('note-id');
  const obj = noteOperations.searchById(id);
 
  // console.log(obj);

  
 
  for (let x in obj) {
    // console.log(obj[x]);
    if(x=='isMarked')
    continue;
    document.querySelector(`#${x}`).value = obj[x];
  }

  printNotes(noteOperations.deleteById(id)) ;
  enableButtonUpdate();

    // console.log('Edit...');
}

function printNotes(notes){
    const tbody = document
    .querySelector('#notes');
    tbody.innerHTML = '';
    notes.forEach(note=>printNote(note));
    showCounts();
    disableButtonUpdate();
}
function printNote(noteObject){
    const tbody = document.querySelector('#notes');
    const row = tbody.insertRow(); // <tr>
    for(let key in noteObject){
        if(key =='isMarked'){
            continue;
        }
        const td =  row.insertCell(); //<td>
        td.innerText = noteObject[key];
    }
 
    const td =  row.insertCell();
    td.appendChild(printIcon('trash', toggleMark, noteObject.id));
    td.appendChild(printIcon('user-pen', edit, noteObject.id));
    disableButtonUpdate();
}
function save(){
  if(window.localStorage){
    const alltask=noteOperations.getNotes();
    localStorage.tasks=JSON.stringify(alltask);
    alert("Data Stored");
  }
  else{
    alert("Outdated Browser is outdated");
  }
}
// function load(){
//   if(window.localStorage){
//     const alltask=localStorage.tasks;
//     noteOperations.set
//   }
// }