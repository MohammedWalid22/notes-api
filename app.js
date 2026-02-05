const http = require("http");
const { handleNotesRoutes } = require("./routes/notesRoutes");

const server = http.createServer((req, res) => {
  if (req.url.startsWith("/notes")) {
    handleNotesRoutes(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
