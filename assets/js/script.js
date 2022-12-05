// drop-down menu 
const menuEl = document.querySelector('#drop-menu')
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
    if (!(menuEl.classList.contains('rotate'))) {
        menuEl.classList.add('rotate')
    }
    else {
        menuEl.classList.remove('rotate')
    }

}

// event listener to hide/unhide the menu 

menuEl.addEventListener('click', sideBarDropMenu)


// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

// defines the backgroundColorArray and checks if it's exists in localStorage and acts based on it's existence

let backgroundColorArray = [],
    backgroundColorArrayFromLocalStorage = JSON.parse(localStorage.getItem('background-colors'))

if (backgroundColorArrayFromLocalStorage) {
    backgroundColorArray = backgroundColorArrayFromLocalStorage
}


const notesContainer = document.querySelector('#notes')
    , savedAlret = document.querySelector('#saved-alert')

let saveBtn = document.querySelectorAll('.save'),
    textBox = document.querySelectorAll('.textbox'),
    clearBtn = document.querySelectorAll('.clear'),
    note = document.querySelectorAll('.note')

// selects and updates new element classes
function updateNewElements() {

    saveBtn = document.querySelectorAll('.save')
    textBox = document.querySelectorAll('.textbox')
    clearBtn = document.querySelectorAll('.clear')
    note = document.querySelectorAll('.note')


}

// create notes on click (gets the hexcode value from each color element and creats a new note with the related background color)
function createNote() {
    color.forEach(item => {
        item.addEventListener('click', () => {


            // gets the related Background Color HexCode
            let colorHexCode = item.getAttribute('backgroundColor')

            // creates a new ELement (and gives it specefit settings)
            let newInnerHtml = document.createElement('div')
            newInnerHtml.classList.add('note')
            newInnerHtml.setAttribute('style', `background:${colorHexCode};`)
            newInnerHtml.innerHTML =
                ` 
            <textarea class="textbox" spellcheck="false"></textarea>
            <div class="buttons">
             <button><i class='bx bxs-trash-alt clear'></i></button>
             <button><i class='bx bxs-save save'></i></button>
            </div>
                `

            // appends new notes to the #notes container
            notesContainer.append(newInnerHtml)

            let newBackgroundColor = newInnerHtml.style.background

            // gets the newly created note's backgroundColor and pushes it into the backgroundColorArrays
            backgroundColorArray.push(newBackgroundColor)
            //    pushes the created Array into localStorage
            localStorage.setItem('background-colors', JSON.stringify(backgroundColorArray))

            // updates the created buttons and etc.
            updateNewElements()
            deleteNote()
            saveNote()

        })


    })
}
// deletes the notes on click 
function deleteNote() {

    for (let i = 0; i < clearBtn.length; i++) {

        clearBtn[i].addEventListener('click', () => {


            // removes the note element
            note[i].remove()



            backgroundColorArray.splice(backgroundColorArray[i], 1)

            localStorage.setItem('background-colors', JSON.stringify(backgroundColorArray))

        })



    }
}

//  saves the notes on click

function saveNote() {

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

// shows and addes the savedNotes from the localStorage to notes container

function showNotes() {
    backgroundColorArray.forEach(item => {



        // creates a new ELement (and gives it specefit settings)
        let newInnerHtml = document.createElement('div')
        newInnerHtml.classList.add('note')
        newInnerHtml.setAttribute('style', `background:${item};`)
        newInnerHtml.innerHTML =
            ` 
         <textarea class="textbox" spellcheck="false"></textarea>
         <div class="buttons">
          <button><i class='bx bxs-trash-alt clear'></i></button>
          <button><i class='bx bxs-save save'></i></button>
         </div>
             `

        // appends new notes to the #notes container
        notesContainer.append(newInnerHtml)
        updateNewElements()
    })
}

// calls functions on dom load
window.addEventListener('DOMContentLoaded', () => {
    showNotes()
    createNote()
    saveNote()
    deleteNote()

})


