const {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/notesController");

function handleNotesRoutes(req, res) {
  const method = req.method;
  const urlParts = req.url.split("/");
  const id = urlParts[2];

  if (method === "GET" && req.url === "/notes") {
    getAllNotes(res);
  } 
  else if (method === "GET" && id) {
    getNoteById(res, id);
  } 
  else if (method === "POST" && req.url === "/notes") {
    createNote(req, res);
  } 
  else if (method === "PUT" && id) {
    updateNote(req, res, id);
  } 
  else if (method === "DELETE" && id) {
    deleteNote(res, id);
  } 
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Invalid request" }));
  }
}

module.exports = { handleNotesRoutes };
