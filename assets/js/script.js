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


// creating note 
const notesContainer = document.getElementById('notes')

// updateable nodelists

let clearBtn = document.querySelectorAll('.clear')
let note = document.querySelectorAll('.note')

// calling the function
createNote()

// create notes on click (gets the hexcode value from each color element and creats a new note with the related background color)
function createNote() {

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

    // updates/selects the new clear btns &&  updates/selects the new notes
    clearBtn = document.querySelectorAll('.clear')
    note = document.querySelectorAll('.note')


    for (let i = 0; i < clearBtn.length; i++) {

        clearBtn[i].addEventListener('click', () => {
            // removes the note element
            note[i].remove()
        })

    }
}


let saveBtn = document.querySelectorAll('.save')
const savedAlret = document.getElementById('saved-alert')

// saves the notes into the localStorage
saveNote()
function saveNote() {


    // updates/selects the new save btns &&  updates/selects the new notes
    saveBtn = document.querySelectorAll('.save')
    note = document.querySelectorAll('.note')


    saveBtn.forEach(button => {


        button.addEventListener('click', () => {

            // changes the saveBtn color to green (saves the note)
            if (!(button.style.color === '#a5fd83')) {

                // changes the save button color to green
                button.style.color = '#a5fd83'
                //  addes a class to saveAlert element and shows a alert / disappears after 
                savedAlret.classList.add('alert')
                setTimeout(() => {
                    savedAlret.classList.remove('alert')
                }, 800)
            }

        })

    })

}


