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



// ------ users------- //
// get all users
app.get('/users', async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM users");
        res.json(allUsers.rows);
    } catch (error) {
        console.error(error.message);
    }
})

// adding a new user
app.post('/users', async (req, res) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password
        const hasdhedPassword = await bcrypt.hash(password.toString(), 10); // hashing and salting the password

        // adding user to database
        const newUser = await pool.query("INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *", [username, email, hasdhedPassword]);
        res.json(newUser.rows[0]);

    } catch (error) {
        console.error(error.message);
    }
})

// signing in an existing user
app.post("/users/signin", async (req, res) => {
    // search the user with email in req
    const user = await pool.query("SELECT * FROM users WHERE email = ($1)", [req.body.email]);
    if (user.rows.length === 0) {
        return res.status(400).send("Can't find user :(");
    }

    // checks if the password is correct
    try {
        if (await bcrypt.compare(req.body.password, user.rows[0].password)) {
            res.send("Success ! Yay :D");
        } else {
            res.send("Not allowed : wrong password.");
        }
    } catch (error) {
        console.error(error.message);
    }
});



// listening to any modification
app.listen(5000, () => {
    console.log("server has started on port 5000 :)")
});