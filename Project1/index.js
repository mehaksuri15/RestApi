const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 8000;

// Middleware to handle URL encoded + JSON data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Path to the MOCK_DATA.json
const filePath = path.join(__dirname, "MOCK_DATA.json");

// HTML route - renders list of names
app.get("/users", (req, res) => {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Error loading users");
    }
    const users = JSON.parse(data);
    const html = `
      <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
      </ul>
    `;
    res.send(html);
  });
});

// API route - returns all users
app.get("/api/users", (req, res) => {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ error: "Cannot read users file" });
    const users = JSON.parse(data);
    res.json(users);
  });
});

// API route - get user by ID
app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ error: "Cannot read file" });
    const users = JSON.parse(data);
    const user = users.find((u) => u.id === id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  });
});

// POST - Add a new user
app.post("/api/users", (req, res) => {
  console.log("📦 Incoming Data from Postman:", req.body);

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error("❌ Error reading users:", err);
      return res.status(500).json({ error: "Failed to read file" });
    }

    let users = JSON.parse(data);
    const newUser = {
      ...req.body,
      id: users.length + 1,
    };

    users.push(newUser);

    fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        console.error("❌ Error writing to file:", err);
        return res.status(500).json({ error: "Failed to write file" });
      }

      console.log("✅ User successfully added.");
      res.status(201).json({ status: "success", user: newUser });
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

