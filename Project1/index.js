const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express();

const PORT = 8000;

// Middleware-Plugin
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // This is needed to parse JSON data from POST requests

// Routes
app.get("/users", (req, res) => {
  const html = `
    <ul>
      ${users.map(user => `<li>${user.first_name}</li>`).join('')}
    </ul>
  `;
  res.send(html);
});

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    // Edit user with id
    return res.json({ status: "pending" });
  })
  .delete((req, res) => {
    // Delete user with id
    return res.json({ status: "pending" });
  });

app.post("/api/users", (req, res) => {
  // TODO: Create new user
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ status: "error", message: err.message });
    }

    return res.json({ status: "successful" });
  });
  // If after entering data in postman we add send, it will show body undefined because express has no idea what data is coming, we will use middleware for this to convert data into a Java object.
});

app.listen(PORT, () => console.log(`Server started at Port: ${PORT}`));


