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



let clearBtn = document.querySelectorAll('.clear')
let note = document.querySelectorAll('.note')
// gets the hexcode value from each color element and creats a new note with the related background color
color.forEach(item => {
    item.addEventListener('click', () => {

        let colorHexCode = item.getAttribute('backgroundColor')

        notesContainer.innerHTML += ` 
        <div class="note" style="background:${colorHexCode};">
            <textarea class="text" cols="20" rows="20" spellcheck="false"></textarea>
            <div class="buttons">
             <button><i class='bx bxs-trash-alt clear'></i></button>
            </div>
        </div>
        `

        // +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

        // selects the new clear btns / deletes the note
        clearBtn = document.querySelectorAll('.clear')

        for (let i = 0; i < clearBtn.length; i++) {

            clearBtn[i].addEventListener('click', () => {

                // updates the note's node list / clearBtn node list
                note = document.querySelectorAll('.note')
                // sets the note display to none
                note[i].style.display = 'none'

            })

        }
    })


})






