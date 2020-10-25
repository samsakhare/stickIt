function createNote(e) {
  try {
    e.preventDefault();
    let noteTitle = document.getElementById("txtTitle").value;
    let noteContent = document.getElementById("txtNoteContent").value;

    document.getElementById("txtTitle").value = "";
    document.getElementById("txtNoteContent").value = "";

    saveNote(noteTitle, noteContent);
  } catch (error) {
    console.error(error);
  }
}

function getNote() {
  const notes = lsRead();
  if (notes && notes.notes && Array.isArray(notes.notes)) {
    notes.notes.forEach((note) => {
      renderNote(note.title, note.content);
    });
  }
}

/**
 *
 * @param {*} strTitle
 * @param {*} strNoteContent
 * @description saves note logic.
 */
function saveNote(strTitle, strNoteContent) {
  try {
    lsSave({ strTitle, strNoteContent });
    renderNote(strTitle, strNoteContent);
  } catch (error) {
    console.error(error);
  }
}

/**
 * @description Removes the note
 */
function removeNote(e) {
  e.preventDefault();
  if (e.target.classList.contains("delete")) {
    if (confirm("Are you sure want to delete the note?")) {
      let li = e.target.parentElement.parentElement;
      let ul = document.getElementById("lstNotes");
      ul.removeChild(li);
    }
    renderEmptyNote();
  }
}

function renderEmptyNote() {
  if (document.getElementById("lstNotes").children.length <= 0) {
    document.getElementById("lblEmptyNote").classList.remove("hidden");
  } else {
    document.getElementById("lblEmptyNote").classList.add("hidden");
  }
}

function renderNote(strTitle, strNoteContent) {
  try {
    let li = document.createElement("li");
    let a = document.createElement("a");
    let h2 = document.createElement("h2");
    let p = document.createElement("p");
    let xButton = document.createElement("button");

    let xText = document.createTextNode("X");
    let h2Text = document.createTextNode(strTitle);
    let pText = document.createTextNode(strNoteContent);

    h2.appendChild(h2Text);
    p.appendChild(pText);
    xButton.appendChild(xText);

    a.appendChild(h2);
    a.appendChild(xButton);
    a.appendChild(p);
    a.setAttribute("href", "#");

    li.appendChild(a);
    document.getElementById("lstNotes").appendChild(li);
    renderEmptyNote();

    xButton.classList.add("delete");
  } catch (error) {
    console.error(error);
  }
}

// Local Storage functions
function lsSave(obj) {
  if ("notes" in localStorage) {
    let data = JSON.parse(localStorage.getItem("notes"));
    if (data && data.notes && Array.isArray(data.notes)) {
      let notes = {
        notes: [
          ...data.notes,
          {
            title: obj.strTitle,
            content: obj.strNoteContent,
          },
        ],
        count: data.notes.length + 1,
      };
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  } else {
    let notes = {
      notes: [
        {
          title: obj.strTitle,
          content: obj.strNoteContent,
        },
      ],
      count: 1,
    };
    localStorage.setItem("notes", JSON.stringify(notes));
  }
}

function lsRead() {
  if ("notes" in localStorage) {
    let data = JSON.parse(localStorage.getItem("notes"));
    if (data && data.notes && Array.isArray(data.notes)) {
      return data;
    }
  }
}

document
  .getElementById("inputForm")
  .addEventListener("submit", createNote, false);

document
  .getElementById("lstNotes")
  .addEventListener("click", removeNote, false);

renderEmptyNote();
getNote();
