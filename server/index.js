const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json()); // middleware to parse JSON request bodies


// ------ routes ------ //
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


// listening to any modification
app.listen(5000, () => {
    console.log("server has started on port 5000 :)")
});