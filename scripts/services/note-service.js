// CRUD
import Note from '../models/note.js';
export const noteOperations ={
    notes:[],
 add(noteObject){
    const note = new Note(noteObject);
    this.notes.push(note);
 },
 searchById(id){
   return this.notes.find(note=>note.id==id);
 },
 searchByTitle(title){
   return this.notes.find(note => note.title.toLowerCase()===(title.toLowerCase()));
 }
 ,
 toggleMark(id){
   this.searchById(id).toggleMark();
   //const noteObject = this.searchById(id);
   //noteObject.isMarked = !noteObject.isMarked;
 },
setallTask(newnotes){
  this.notes=newnotes;
  this.printNotes();
}
,
 total(){
    return this.notes.length;
 },
 markTotal(){
    return this.notes.
    filter(note=>note.isMarked).length;
 },
 unMarkTotal(){
    return this.total() - this.markTotal();
 },
 getNotes(){
   return this.notes;
 },
 remove(){
  // console.log(this.notes);
   this.notes = this.notes
   .filter(note=>!note.isMarked)
  // console.log(this.notes);

   // for prnting individual id's
   // console.log(this.notes);
   //  for(var i=0;i<this.notes.length;i++)
   //   {
   //      console.log(this.notes[i].id);
   //   }
 },
 search(){
   
 },
 sortUp(){
    const arr = [...this.notes];
    //console.log(arr);
    return arr.sort((a, b) => a.title.localeCompare(b.title));
    
 },
 sortDown(){
   const arr=[...this.notes];
   //console.log(arr.sort((b,a)=>a.title.localeCompare(b.title)));
   return arr.sort((b, a) => a.title.localeCompare(b.title));
},
sortUpDate(){
   const arr=[...this.notes];
   return arr.sort((a, b) => a.cdate.localeCompare(b.cdate));
},
sortDownDate(){
  const arr=[...this.notes];
//   console.log("nothing");
  return arr.sort((b,a) =>a.cdate.localeCompare(b.cdate));

},
 save(){

 },
 update(){

 },
 load(){

 },
 deleteById(id) {
 // console.log(id);
 return this.notes = this.notes.filter(note => note.id!=id);
},
savefromserver(){

},
loadfromserver(){

}
}