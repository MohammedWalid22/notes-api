const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "data", "notes.json");

function readNotes() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function writeNotes(notes) {
  fs.writeFileSync(filePath, JSON.stringify(notes, null, 2));
}

function getAllNotes(res) {
  const notes = readNotes();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(notes));
}

function getNoteById(res, id) {
  const notes = readNotes();
  const note = notes.find(n => n.id === id);

  if (!note) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "Note not found" }));
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(note));
}

function createNote(req, res) {
  let body = "";

  req.on("data", chunk => body += chunk.toString());
  req.on("end", () => {
    const notes = readNotes();
    const newNote = {
      id: Date.now().toString(),
      ...JSON.parse(body),
    };

    notes.push(newNote);
    writeNotes(notes);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newNote));
  });
}

function updateNote(req, res, id) {
  let body = "";

  req.on("data", chunk => body += chunk.toString());
  req.on("end", () => {
    const notes = readNotes();
    const index = notes.findIndex(n => n.id === id);

    if (index === -1) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Note not found" }));
    }

    notes[index] = { ...notes[index], ...JSON.parse(body) };
    writeNotes(notes);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(notes[index]));
  });
}

function deleteNote(res, id) {
  const notes = readNotes();
  const filteredNotes = notes.filter(n => n.id !== id);

  writeNotes(filteredNotes);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Note deleted" }));
}

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
};
