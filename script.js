import { words } from "./words.js";

const randomWord = words[Math.floor(Math.random() * words.length)];

const keys = document.querySelectorAll(".kbd");
const textbox = document.getElementById("textbox");
const deleteButton = document.getElementById("delete-btn");
const submitButton = document.getElementById("submit-btn");
const clearButton = document.getElementById("clear-btn");
const definitionContainer = document.getElementById("definition");

// Function to fetch a random definition from the API
async function fetchRandomDefinition() {
	const word = "horse";
	const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`;

	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error("Failed to fetch definition");
		}
		const data = await response.json();
		const definition = data[0]['meanings'][0]['definitions'][0]['definition'];
		definitionContainer.innerHTML = definition.toLowerCase();
	} catch (error) {
		console.error(error);
		return "Failed to fetch definition";
	}
}

fetchRandomDefinition();

function updateTextBox(key) {
	textbox.innerHTML += key;
}

function handleKeyPress(event) {
	const key = event.key.toLowerCase();
	const kbdElement = document.querySelector(`kbd[data-key="${key}"]`);
	if (kbdElement) {
		kbdElement.classList.add("active");
		updateTextBox(key);
	}
}

function handleKeyRelease(event) {
	const key = event.key.toLowerCase();
	const kbdElement = document.querySelector(`kbd[data-key="${key}"]`);
	if (kbdElement) {
		kbdElement.classList.remove("active");
	}
}

function addClickListenersToKeys() {
	keys.forEach((key) => {
		key.addEventListener("click", () => {
			const keyLetter = key.textContent.toLowerCase();
			key.classList.add("active");
			updateTextBox(keyLetter);
			setTimeout(() => {
				key.classList.remove("active");
			}, 100);
		});
	});
}

function handleDelete() {
	const currentText = textbox.innerHTML;
	if (currentText.length > 0) {
		textbox.innerHTML = currentText.slice(0, -1); // Remove the last character
	}
}

function handleClear() {
	textbox.innerHTML = "";
}

function handleSubmit() {
	const currentGuess = textbox.innerHTML;
	console.log(currentGuess, randomWord)
	if (currentGuess === randomWord) {
		window.alert("Nice job!")
	}
}

keys.forEach((key) => {
	const keyLetter = key.textContent.toLowerCase();
	key.setAttribute("data-key", keyLetter);
});

// document event listeners
document.addEventListener("keyup", handleKeyRelease);
document.addEventListener("keydown", (event) => {
	if (event.code === "Backspace") {
		handleDelete();
	} else {
		handleKeyPress(event);
	}
});

// button event listeners
deleteButton.addEventListener("click", handleDelete);
clearButton.addEventListener("click", handleClear);
submitButton.addEventListener("click", handleSubmit);

// Add click listeners for each key
addClickListenersToKeys();
