const fs=require('fs');
const _=require('lodash');
const yargs=require('yargs');

const notes=require('./notes.js');

const titleOptions = {
  describe:'Titleof note',
  demand :true,
  alias:'t'
};
const bodyOptions = {
  describe:'Body of note',
  demand :true,
  alias:'b'
};

const argv=yargs.command('add','Add a new note',{
  title:titleOptions,
  body:bodyOptions
})
.command('list','List all notes')
.command('read','Read a note',{
  title:titleOptions
})
.command('remove','Remove a note',{
  title:titleOptions
})
.help()
.argv;
var command=argv._[0];


if (command ==='add'){
  var note = notes.addNote(argv.title,argv.body);
  if (note){
    console.log("Note created");
  }
  else {
    console.log("Title taken");
  }
}else if (command === 'list'){
var allNotes = notes.getAll();
allNotes.forEach((note)=>console.log(note.title,note.body));
}else if (command === 'read'){
var readNotes =  notes.getNote(argv.title);
if(readNotes){
  console.log(readNotes.body);
}
else{
  console.log("Note not found");
}
}else if (command === 'remove'){
var remove =  notes.removeNote(argv.title);
var msg=remove?"Note was removed":"No note with the title exists";
console.log(msg);
}else {
  console.log("Command not found");
}
