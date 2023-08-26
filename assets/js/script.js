// drop-down menu
const menuEl = document.querySelector("#drop-menu");
const colors = Array.from(document.querySelectorAll(".color"));

// function that hides/unhides the sidebar color elements
function toggleColorVisibility() {
	colors.forEach((color) => {
		color.classList.toggle("show");
	});

	menuEl.classList.toggle("rotate");
}

// event listener to hide/unhide the menu
menuEl.addEventListener("click", toggleColorVisibility);

// defines the backgroundColorArray and checks if it exists in localStorage and acts based on its existence
let backgroundColorArray =
	JSON.parse(localStorage.getItem("background-colors")) || [];
let textValueArray = JSON.parse(localStorage.getItem("text-values")) || [];

// saved alert element selection
const savedAlert = document.querySelector("#saved-alert");

// the notes container selection
const notesContainer = document.querySelector("#notes");

// selects and updates newly created notes child and etc.
function updateNewElements() {
	saveBtn = Array.from(document.querySelectorAll(".save"));
	textBox = Array.from(document.querySelectorAll(".textbox"));
	clearBtn = Array.from(document.querySelectorAll(".clear"));
	note = Array.from(document.querySelectorAll(".note"));
}

// create notes on click
function createNote() {
	colors.forEach((color) => {
		color.addEventListener("click", () => {
			const colorHexCode = color.getAttribute("backgroundColor");

			const newNote = document.createElement("div");
			newNote.classList.add("note");
			newNote.setAttribute("style", `background:${colorHexCode};`);
			newNote.innerHTML = `
        <textarea class="textbox" spellcheck="false" dir="auto"></textarea>
        <div class="buttons">
          <button><i class='bx bxs-trash-alt clear'></i></button>
          <button><i class='bx bxs-save save'></i></button>
        </div>
      `;

			notesContainer.append(newNote);

			backgroundColorArray.push(colorHexCode);
			localStorage.setItem(
				"background-colors",
				JSON.stringify(backgroundColorArray)
			);

			updateNewElements();
			deleteNote();
			saveNote();
		});
	});
}

// deletes the notes on click
function deleteNote() {
	clearBtn.forEach((btn, index) => {
		btn.addEventListener("click", () => {
			note[index].remove();
			backgroundColorArray.splice(index, 1);
			localStorage.setItem(
				"background-colors",
				JSON.stringify(backgroundColorArray)
			);

			textValueArray.splice(index, 1);
			localStorage.setItem("text-values", JSON.stringify(textValueArray));
		});
	});
}

// saves the notes on click
function saveNote() {
	saveBtn.forEach((btn, index) => {
		btn.addEventListener("click", () => {
			savedAlert.classList.add("alert");
			setTimeout(() => {
				savedAlert.classList.remove("alert");
			}, 800);

			const textValue = textBox[index].value;
			textValueArray[index] = textValue;

			localStorage.setItem("text-values", JSON.stringify(textValueArray));
		});
	});
}

// shows and adds the savedNotes from the localStorage to the notes container
function showNotes() {
	backgroundColorArray.forEach((backgroundColor, index) => {
		const newNote = document.createElement("div");
		newNote.classList.add("note");
		newNote.setAttribute("style", `background:${backgroundColor};`);
		newNote.innerHTML = `
      <textarea class="textbox" spellcheck="false" dir="auto"></textarea>
      <div class="buttons">
        <button><i class='bx bxs-trash-alt clear'></i></button>
        <button><i class='bx bxs-save save'></i></button>
      </div>
    `;

		notesContainer.append(newNote);
		updateNewElements();
		textBox[index].textContent = textValueArray[index];
	});
}

// calls functions on DOM load
window.addEventListener("DOMContentLoaded", () => {
	showNotes();
	createNote();
	saveNote();
	deleteNote();
	timeUpdate();
});

// (live time)
const clock = document.getElementById("clock");
let hour, minute, second, meridiem;

// updates the time every 1s
setInterval(timeUpdate, 1000);

// updates time function
function timeUpdate() {
	const time = new Date();
	hour = time.getHours();
	minute = time.getMinutes();
	second = time.getSeconds();

	meridiem = hour < 12 ? "AM" : "PM";

	hour = hour < 10 ? `0${hour}` : hour;
	minute = minute < 10 ? `0${minute}` : minute;
	second = second < 10 ? `0${second}` : second;

	clock.textContent = `${hour}:${minute}:${second} ${meridiem}`;
}
