const noteList = document.querySelector('.note-list');
const notepadTitle = document.querySelector('.notepad-title');
const notepadContent = document.getElementById('notepad-area');

const newNoteName = document.querySelector('.new.notes');
const newNoteButton = document.querySelector('.btn.create.create-note');

const clearNotepadButton = document.querySelector('.clear-notepad');
const deleteNoteButton = document.querySelector('.delete-note');

newNoteButton.addEventListener('click', createNote);
clearNotepadButton.addEventListener('click', clearNotepad);
deleteNoteButton.addEventListener('click', deleteNote);

let notes = [
  {
    name: 'Data Transmission',
    content: `Transmission of data
    • Electrical pulses through metal wires
    • Pulses of light through a fiber-optic cable
    • Wireless signals (radio, microwave/infrared waves)
    • Transmission medium = what carries the on/off signals
  
  Serial vs parallel
    Serial Transmission
      ○ Bits are sent one by one in a single wire
      ○ Reliable (bits are received by the order they were sent)
      ○ Used for long distances
      ○ E.g. USB
        § Universal serial bus
        § Standardized
        § Can only be inserted one way 
        § Backward compatible 
        § Can power devices
        § Faster transfer speeds
        § Cheap to manufacture and purchase
    Parallel Transmission
      ○ Multiple bits sent at a time through multiple wires
      ○ Faster than serial
      ○ Unreliable (bits may arrive at different timings)
      ○ Used for short distances
      ○ E.g. IC
        § Integrated Circuit
        § Collection of microscopic electronic circuits
  
  Simplex vs Duplex
    Simplex
      ○ Data can only go one way
      ○ E.g. Closed-circuit tv -> guards monitor
    Half-duplex
      ○ The link can only carry signals in one direction at a time
      ○ E.g. Walkie-talkie system
    Duplex
      ○ The signal can go both ways at the same time
      ○ E.g. Phone conversation
    
  Error checking
    • Loss of data can be caused by:
      ○ Loss of power/electricity
      ○ Spillage of liquids
      ○ Flood
      ○ Fire
      ○ Human error (accidental deletion, not saving data, incorrect shutdown procedure)
      ○ Hardware failure
      ○ Software failure
    • May cause the gain, loss, or change of bits
    • Can use an outer conductive layer shield to prevent electrical interference
  `
  }
];

let activeNoteIndex = 0;

function clearNotepad() {
  notes[activeNoteIndex].content = '';
  render();
}

function deleteNote() {
  if (notes.length > 1) {
    notes.splice(activeNoteIndex, 1);
    if (activeNoteIndex >= notes.length) activeNoteIndex = notes.length - 1;
    render();
  }
}

function createNote() {
  if (newNoteName.value != '') {
    notes[activeNoteIndex].content = notepadContent.value;
    notes.push({
      name: newNoteName.value,
      content: ''
    });
    activeNoteIndex = notes.length - 1;
    newNoteName.value = '';
    render();
  }
}

function renderNotes() {
  noteList.innerHTML = '';
  notes.forEach((note, index) => {
    const element = document.createElement('li');
    element.classList.add('note-name');
    if (index == activeNoteIndex) element.classList.add('active-note');
    element.innerHTML = note.name;

    noteList.appendChild(element);

    element.addEventListener('click', () => {
      switchNote(index);
    });
  });
}

function switchNote(noteIndex) {
  notes[activeNoteIndex].content = notepadContent.value;
  activeNoteIndex = noteIndex;
  render();
}

function renderNotepad() {
  notepadContent.value = notes[activeNoteIndex].content;
}

function renderHeader() {
  notepadTitle.innerHTML = notes[activeNoteIndex].name;
}

function render() {
  renderNotes();
  renderNotepad();
  renderHeader();
}

render();