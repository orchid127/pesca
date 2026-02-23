const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bcrypt = require('bcrypt')

// middleware
app.use(cors());
app.use(express.json()); // middleware to parse JSON request bodies


// ------ sessions ------ //
// log a session
app.post("/sessions", async (req, res) => {
    try {
        const { session_date } = req.body;
        const { session_length } = req.body;
        const newSession = await pool.query("INSERT INTO sessions(session_date, session_length) VALUES($1, $2) RETURNING *", [session_date, session_length]);

        res.json(newSession.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

// get all the sessions
app.get("/sessions", async (req, res) => {
    try {
        const allSessions = await pool.query("SELECT * FROM sessions");
        res.json(allSessions.rows);
    } catch (error) {
        console.error(error.message);
    }
})

app.get("/sessions/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const session = await pool.query("SELECT * FROM sessions WHERE session_id= $1", [id]);
        res.json(session.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
})

// delete a session

app.delete("/sessions/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSession = await pool.query("DELETE FROM sessions WHERE session_id= $1", [id]);

        res.json("session was successfully deleted :D !")
    } catch (error) {
        console.error(error.message);
    }
})

// delete all sessions



// ------ sign-in ------- //

const users = []

app.get('/users', (req, res) => {
    res.json(users);
})

// adding a new user
app.post('/users', async (req, res) => {
    // hashing and salting the password
    try {
        const hasdhedPassword = await bcrypt.hash(req.body.password, 10);

        const user = { name: req.body.name, password: hasdhedPassword };
        users.push(user);
        res.status(201).send();
    } catch (error) {
        res.status(500).send();
    }
})

app.post("/users/signin", async (req, res) => {
    const user = users.find(user => user.name = req.body.name);
    if (user == null) {
        return res.status.apply(400).send("Can't find user :(")
    }

    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send("Success ! Yay :D");
        } else {
            res.send("Not allowed.");
        }
    } catch (error) {
        res.status(500).send()
    }
});



// listening to any modification
app.listen(5000, () => {
    console.log("server has started on port 5000 :)")
});