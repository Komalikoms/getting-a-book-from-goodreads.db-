const express = require("express");
const { open } = require("sqlite");
const path = require("path");
const sqlite3 = require("sqlite3");

const app = express();

const dbPath = path.join(__dirname,"goodreads.db");
let db = null;

const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("The server is running at http://localhost:3000/books/");
    });
  } catch (e) {
    console.log(`DB Error:${e.message}`);
    process.exit(1);
  }
};
initializeDbAndServer();


app.get("/books/",async(request,response)=>{
    const getBookQuery=
        SELECT *
        FROM book 
        ORDER BY book_id;
        ;
    const booksArray=await db.all(getBookQuery);
    response.send(booksArray);
});
