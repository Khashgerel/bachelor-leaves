const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const admin = require("firebase-admin");
const serviceAccount = require("./database/serviceAccountKey.json"); // path to your downloaded key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const app = express();
const PORT = 4000;

// In-memory data store (replace with DB in production)
let requests = [];

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.redirect(302, "/api/create-dummy-users");
});

// Get all requests
app.get("/api/requests", (req, res) => {
    res.json(requests);
});

// Get a single request by ID
app.get("/api/requests/:id", (req, res) => {
    const reqId = req.params.id;
    const found = requests.find(r => String(r.id) === String(reqId));
    if (!found) return res.status(404).json({ error: "Not found" });
    res.json(found);
});

// Create a new request
app.post("/api/requests", (req, res) => {
    const newReq = req.body;
    newReq.id = Date.now(); // Simple unique ID
    requests.push(newReq);
    res.status(201).json(newReq);
});

// Update a request
app.put("/api/requests/:id", (req, res) => {
    const reqId = req.params.id;
    const idx = requests.findIndex(r => String(r.id) === String(reqId));
    if (idx === -1) return res.status(404).json({ error: "Not found" });
    requests[idx] = { ...requests[idx], ...req.body };
    res.json(requests[idx]);
});

// Delete a request
app.delete("/api/requests/:id", (req, res) => {
    const reqId = req.params.id;
    const idx = requests.findIndex(r => String(r.id) === String(reqId));
    if (idx === -1) return res.status(404).json({ error: "Not found" });
    const deleted = requests.splice(idx, 1);
    res.json(deleted[0]);
});

app.get("/api/create-dummy-users", async (req, res) => {
      const users = [
        { email: 'erhlegch@num.edu.mn', password: 'erhlegch123' },
        { email: 'bagsh@num.edu.mn', password: 'bagsh123' },
        { email: 'tuslah@num.edu.mn', password: 'tuslah123' },
      ];
    
      try {
        for (const user of users) {
          const hashedPassword = await bcrypt.hash(user.password, 10);
          await db.collection('users').doc(user.email).set({
            email: user.email,
            passwordHash: hashedPassword,
            role: 'dummy',
            createdAt: new Date().toISOString(),
          });
        }
    
        res.status(200).json({ message: 'Dummy users created in Firestore' });
      } catch (error) {
        console.error('Error creating dummy users:', error);
        res.status(500).json({ error: 'Failed to create dummy users' });
      }
});

// Start server
app.listen(PORT, () => {
    console.log(`API server running at http://localhost:${PORT}`);
});