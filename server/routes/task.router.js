const express = require('express');
const taskRouter = express.Router();
const pg = require('pg');

// DB CONNECTION
/* const Pool = pg.Pool;

const pool = new Pool({
    database: "weekend-to-do-app",
    host: "localhost",
    port: 5432,
    max: 12,
    idleTimeoutMillis: 20000
});
*/
let pool;
if (process.env.DATABASE_URL) {
    console.log("Gonna connect to a heroku DB");
    pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL
    });
} else {
    console.log("Assuming we're running locally");
    pool = new pg.Pool({
        database: "weekend-to-do-app"
    });
}


// GET
taskRouter.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "tasks" ORDER BY "status" DESC, "id" DESC;';
    pool.query(queryText).then(result => {
            // Sends back the results in an object
            res.send(result.rows);
        })
        .catch(error => {
            console.log('error getting tasks', error);
            res.sendStatus(500);
        });
});


taskRouter.post('/', (req, res) => {
    console.log('inrouter post');
    let newTask = req.body;
    console.log('Adding task', newTask);
    let queryText = `INSERT INTO "tasks" ("task") VALUES ($1);`;
    pool.query(queryText, [newTask.task]).then(result => {
        res.sendStatus(201);
    }).catch(error => {
        console.log('Error adding new task', error);
        res.sendStatus(500);
    });
});

taskRouter.delete('/:id', (req, res) => {
    let id = req.params.id
    const queryText = `DELETE FROM "tasks" WHERE id = $1;`;
    pool.query(queryText, [id])
        .then((result) => {
            res.sendStatus(204);
        }).catch((err) => {
            res.sendStatus(500);
        })
})


taskRouter.put('/:id', (req, res) => {
    let task = req.body;
    let taskId = req.params.id;
    console.log('marking for complete', taskId);
    let queryText = `UPDATE "tasks" SET "status" = 'complete' WHERE "id" = ${req.params.id};`;
    pool.query(queryText)
        .then((result) => {
            console.log('DB should update', task);
            res.sendStatus(200);
        }).catch((er) => {
            console.log("Error from put", err);
            res.sendStatus(500);
        })
});





module.exports = taskRouter;