// drop-down menu 
const menuEl = document.querySelector('#drop-menu')
color = document.querySelectorAll('.color')


// function that hides/unhides the sidebar color elements
function sideBarDropMenu() {
    color.forEach(item => {
        // if item DOES NOT HAVE the class
        if (!(item.classList.contains('show'))) {
            item.classList.add('show')
        }
        // if item has the class
        else {
            item.classList.remove('show')
        }
    })
    // if item DOES NOT HAVE the class
    if (!(menuEl.classList.contains('rotate'))) {
        menuEl.classList.add('rotate')
    }
    // if item has the class
    else {
        menuEl.classList.remove('rotate')
    }

}

// event listener to hide/unhide the menu 

menuEl.addEventListener('click', sideBarDropMenu)


// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

// defines the backgroundColorArray and checks if it's exists in localStorage and acts based on it's existence

let backgroundColorArray = [],
    textValueArray = [],
    textValueArrayFromLocalStorage = JSON.parse(localStorage.getItem('text-values'))
backgroundColorArrayFromLocalStorage = JSON.parse(localStorage.getItem('background-colors'))

//  checks for localStorage item existence 
if (backgroundColorArrayFromLocalStorage && textValueArrayFromLocalStorage) {
    backgroundColorArray = backgroundColorArrayFromLocalStorage
    textValueArray = textValueArrayFromLocalStorage

}


// saved alert EL selection
const savedAlret = document.querySelector('#saved-alert')

// the notes container selection
const notesContainer = document.querySelector('#notes')

// buttons and notes
let saveBtn = document.querySelectorAll('.save'),
    textBox = document.querySelectorAll('.textbox'),
    clearBtn = document.querySelectorAll('.clear'),
    note = document.querySelectorAll('.note')



// selects and updates newly created notes child and etc.
function updateNewElements() {
    saveBtn = document.querySelectorAll('.save')
    textBox = document.querySelectorAll('.textbox')
    clearBtn = document.querySelectorAll('.clear')
    note = document.querySelectorAll('.note')

}

// create notes on click 
function createNote() {
    color.forEach(item => {
        // for each colored circles

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

            //  gets the clicked circle backgroundColor hexCode and set it to a variable
            let newBackgroundColor = colorHexCode

            // gets the newly created note's backgroundColor and pushes it into the backgroundColorArrays
            backgroundColorArray.push(newBackgroundColor)
            // pushes the created Array into localStorage
            localStorage.setItem('background-colors', JSON.stringify(backgroundColorArray))


            updateNewElements()
            // runs the needed functions after creating each note
            deleteNote()
            saveNote()

        })
    })
}
// deletes the notes on click 
function deleteNote() {

    for (let i = 0; i < clearBtn.length; i++) {

        // event for each clear Btn clicked
        clearBtn[i].addEventListener('click', () => {


            // removes the note element from the notesContaier's childs
            note[i].remove()

            // clears the background array for lenght of 1 and updates it in the localStorage
            backgroundColorArray.splice(backgroundColorArray[i], 1)
            localStorage.setItem('background-colors', JSON.stringify(backgroundColorArray))

            // clears the textValue array for lenght of 1 and updates it in the localStorage
            textValueArray.splice(textValueArray[i], 1)
            localStorage.setItem('text-values', JSON.stringify(textValueArray))
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

            // gets the text value
            let textValue = textBox[i].value

            // sets the related array item into the new text
            textValueArray[i] = textValue




            // pushes the array into the localStorage
            localStorage.setItem('text-values', JSON.stringify(textValueArray))

        })


    }

}
// shows and addes the savedNotes from the localStorage to notes container
function showNotes() {

    for (let i = 0; i < backgroundColorArray.length; i++) {

        // creates a new ELement (and gives it specefit settings)
        let newInnerHtml = document.createElement('div')
        newInnerHtml.classList.add('note')
        newInnerHtml.setAttribute('style', `background:${backgroundColorArray[i]};`)
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

        // sets the textBox's values into the same index of the textValueArrays
        textBox[i].textContent = textValueArray[i]

    }


}
// calls functions on dom load
window.addEventListener('DOMContentLoaded', () => {
    showNotes()
    createNote()
    saveNote()
    deleteNote()
})

