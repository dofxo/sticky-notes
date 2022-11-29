// drop-down menu 
const menuEl = document.getElementById('drop-menu'),
    colorPalette = document.getElementById('color-palette'),
    color = document.querySelectorAll('.color')

// function that hides/unhides the sidebar drop-menu
function sideBarDropMenu() {
    if (!(colorPalette.classList.contains('drop-menu-animation'))) {
        colorPalette.classList.add('drop-menu-animation')
    }
    else {
        colorPalette.classList.remove('drop-menu-animation')
    }
}

// event listener to hide/unhide the menu (colors and menu it sekf)

menuEl.addEventListener('click', sideBarDropMenu)

color.forEach(circleColor => {
    circleColor.addEventListener('click', sideBarDropMenu)

})


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
            </div>
        </div>`
            // addes new notes to the #notes container
            notesContainer.innerHTML += newInnerHtml

            deleteNote()

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
// saves the notes into the localStorage
function saveNote() {

}


