// drop-down menu 
const menuEl = document.getElementById('drop-menu')
color = document.querySelectorAll('.color')


// function that hides/unhides the sidebar color elements
function sideBarDropMenu() {
    color.forEach(item => {

        if (!(item.classList.contains('show'))) {
            item.classList.add('show')
        }
        else {
            item.classList.remove('show')
        }
    })

}

// event listener to hide/unhide the menu 

menuEl.addEventListener('click', sideBarDropMenu)


// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-


const notesContainer = document.getElementById('notes')
    , savedAlret = document.getElementById('saved-alert')


let saveBtn, textBox, clearBtn, note

// selects and updates new element classes
function updateNewElements() {

    saveBtn = document.querySelectorAll('.save')
    textBox = document.querySelectorAll('.textbox')
    clearBtn = document.querySelectorAll('.clear')
    note = document.querySelectorAll('.note')
}

// create notes on click (gets the hexcode value from each color element and creats a new note with the related background color)
function createNote() {

    updateNewElements()

    color.forEach(item => {
        item.addEventListener('click', () => {

            let colorHexCode = item.getAttribute('backgroundColor')
            let newInnerHtml = ` 
            <div class="note" style="background:${colorHexCode};">
            <textarea class="textbox" spellcheck="false"></textarea>
            <div class="buttons">
             <button><i class='bx bxs-trash-alt clear'></i></button>
             <button><i class='bx bxs-save save'></i></button>
            </div>
        </div>`
            // addes new notes to the #notes container
            notesContainer.innerHTML += newInnerHtml

            deleteNote()
            saveNote()

        })


    })
}
// deletes the notes on click 
function deleteNote() {

    updateNewElements()

    for (let i = 0; i < clearBtn.length; i++) {

        clearBtn[i].addEventListener('click', () => {
            // removes the note element
            note[i].remove()
        })

    }
}

//  saves the notes on click
function saveNote() {


    updateNewElements()


    for (let i = 0; i < saveBtn.length; i++) {

        saveBtn[i].addEventListener('click', () => {

            //  addes a class to saveAlert element and shows a alert / disappears after 
            savedAlret.classList.add('alert')
            setTimeout(() => {
                savedAlret.classList.remove('alert')
            }, 800)


        })
    }
}




// calling the function
createNote()
saveNote()