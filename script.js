const addButton = document.querySelector('#add');


const updateLSData=()=>{
    const testAreaData = document.querySelectorAll('textarea');
    const notes = [];
    testAreaData.forEach((note)=>{
        return notes.push(note.value);
    })
    console.log(notes)
    localStorage.setItem('notes',JSON.stringify(notes));
}

const addNewNote = (text = '') => {
    const note = document.createElement('div');
    note.classList.add('note');
    const htmlData = `
    <div class="operation">
            <button class="edit">
                <img src="img/edit.png" class="icons" alt="">
            </button>
            <button class="delete">
                <img src="img/delete.png" class="icons" alt="">
            </button>
        </div>
        <div class="main ${text ? " " : " "}"></div> 
        <textarea class="${text ? "hidden" : ""}" rows="10" cols="33" placeholder="Type here..."></textarea>
    `;
    note.insertAdjacentHTML('afterbegin', htmlData)

    const editButton = note.querySelector('.edit');
    const delButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textarea = note.querySelector('textarea');

    delButton.addEventListener('click', () => {
        note.remove();
    })

    textarea.value = text;
    mainDiv.innerHTML = text;

    editButton.addEventListener('click',()=>{
        textarea.classList.toggle('hidden');
    })

    textarea.addEventListener('change',(event)=>{
        const value = event.target.value;
        mainDiv.innerHTML = value;
        updateLSData();
    })

    document.body.appendChild(note);
}

const notes =JSON.parse(localStorage.getItem('notes'));
if (notes) {
    notes.forEach((note)=> addNewNote(note))
}

addButton.addEventListener('click', () => addNewNote());
