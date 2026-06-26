// Load notes from Local Storage
let notes = JSON.parse(localStorage.getItem("notes")) || [];

const addBtn = document.querySelector(".add-btn");
const notesContainer = document.querySelector(".notes-container");

// Save Notes
function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Create Note
function createNote(noteData) {

    const note = document.createElement("div");
    note.classList.add("note");

    note.innerHTML = `
        <div class="note-header">
            <input
                type="text"
                class="note-title"
                placeholder="Note Title..."
            >

            <button class="delete-btn">🗑️</button>
        </div>

        <textarea
            class="note-content"
            placeholder="Write your note here..."
        ></textarea>

        <div class="note-footer">
            <span class="color yellow"></span>
            <span class="color green"></span>
            <span class="color blue"></span>
            <span class="color pink"></span>
            <span class="color purple"></span>
        </div>
    `;

    notesContainer.appendChild(note);

    const noteTitle = note.querySelector(".note-title");
    const noteContent = note.querySelector(".note-content");
    const deleteBtn = note.querySelector(".delete-btn");
    const colors = note.querySelectorAll(".color");

    // Restore saved data
    noteTitle.value = noteData.title;
    noteContent.value = noteData.content;
    note.style.backgroundColor = noteData.color;

    // Auto save title
    noteTitle.addEventListener("input", () => {
        noteData.title = noteTitle.value;
        saveNotes();
    });

    // Auto save content
    noteContent.addEventListener("input", () => {
        noteData.content = noteContent.value;
        saveNotes();
    });

    // Delete Note
    deleteBtn.addEventListener("click", () => {

        note.remove();

        notes = notes.filter((item) => item.id !== noteData.id);

        saveNotes();

    });

    // Change Note Color
    colors.forEach((color) => {

        color.addEventListener("click", () => {

            if(color.classList.contains("yellow")){
                note.style.backgroundColor = "#FDE68A";
                noteData.color = "#FDE68A";
            }

            else if(color.classList.contains("green")){
                note.style.backgroundColor = "#86EFAC";
                noteData.color = "#86EFAC";
            }

            else if(color.classList.contains("blue")){
                note.style.backgroundColor = "#93C5FD";
                noteData.color = "#93C5FD";
            }

            else if(color.classList.contains("pink")){
                note.style.backgroundColor = "#F9A8D4";
                noteData.color = "#F9A8D4";
            }

            else if(color.classList.contains("purple")){
                note.style.backgroundColor = "#C4B5FD";
                noteData.color = "#C4B5FD";
            }

            saveNotes();

        });

    });

}

// Add New Note
addBtn.addEventListener("click", () => {

    const noteData = {
        id: Date.now(),
        title: "",
        content: "",
        color: "#FDE68A"
    };

    notes.push(noteData);

    saveNotes();

    createNote(noteData);

});

// Load All Notes
notes.forEach((noteData) => {
    createNote(noteData);
});