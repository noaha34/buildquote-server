const cors = require('cors');
const express = require('express');
const mysql = require('mysql');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(cors());

let credentials = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));
let connection = mysql.createConnection(credentials);
connection.connect();


// REVIEW SCHEMS

    // rating INT DEFAULT 10,
    // name TEXT,
    // description TEXT,
    // is_deleted INT DEFAULT 0,
    // created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    // updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
function reviewToRow(row) {
  return {
    rating:row.rating,
    name:row.name,
    description:row.description, // need to change based on buildquote databse
    created_at:row.created_at,
  };
}

function rowToObjectYrLangSkills(row) {
  return {
    gradyr:row.gradyr,
    langs:row.langs, // need to change based on buildquote databse
    skills:row.skills,
  };
}
function rowToObjectYr(row) {
  return {
    gradyr:row.gradyr,
  };
}
// SCHEMA
// id SERIAL PRIMARY KEY, 
// full_name TEXT,
// gradyr INT DEFAULT 0,
// skills TEXT,
// passions TEXT,
// langs TEXT,
// experience TEXT,
// picture TEXT,
// is_deleted INT DEFAULT 0,
// created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
// updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

function rowToObject(row) {
  return {
    full_name: row.full_name,
    gradyr: row.gradyr,
    skills: row.skills,
    passions: row.passions,
    langs:row.langs, 
    experience:row.experience,
    picture:row.picture, 
    id: row.id,
  };
}
/// REVIEW REST
app.get('/Reviews', (request, response) => { // FETCH ALL PROGRAMMERS FROM DATABSE
  const query = 'SELECT rating, name, description, created_at FROM Reviews WHERE is_deleted = 0 ORDER BY id DESC, updated_at DESC'; // change ot buildwuote
  const params = [];
  connection.query(query, params, (error, rows) =>{
    response.send({
      ok: true,
      Reviews: rows.map(rowToObject)
    });
  });
}); 
// To filter by rating
app.get('/Reviews/rating/:low/:high', (request, response) => { // FETCH ALL PROGRAMMERS FROM DATABSE
  const query = 'SELECT rating, name, description, created_at FROM Reviews WHERE is_deleted = 0  and rating >= ? and rating <= ? ORDER BY id DESC, updated_at DESC'; // change ot buildwuote
  const params = [request.params.low, request.param.high];
  connection.query(query, params, (error, rows) =>{
    response.send({
      ok: true,
      Reviews: rows.map(rowToObject)
    });
  });
}); 

app.post('/Reviews/', (request, response) => {
  const query = 'INSERT INTO Reviews(rating, name, description) VALUES (?,?,?)';
  const params = [request.body.rating, request.body.name, request.body.description]; // id is params because it is input value at end of SQL statement
  connection.query(query, params, (error, result) =>{
    response.send({
      ok: true,
      id: result.insertId,
    });
  });
});
app.patch('/Reviews/:id', (request, response) => {
  const query = 'UPDATE Reviews SET rating = ?, name = ?, description = ?,  updated_at = CURRENT_TIMESTAMP WHERE id = ?';
  const params = [request.body.rating, request.body.name, request.body.description, request.params.id]; // id is params because it is input value at end of SQL statement
  connection.query(query, params, (error, result) =>{
    response.send({
      ok: true,
    });
  });
});

app.delete('/Reviews/:id', (request, response) => {
  const query = 'UPDATE Reviews SET is_deleted = 1,  updated_at = CURRENT_TIMESTAMP WHERE id = ?';  // soft delete not using delete command, just changing boolean
  const params = [request.params.id];
  connection.query(query, params, (error, result) =>{
    response.send({
      ok: true,
    });
  });
});

app.get('/Programmers', (request, response) => { // FETCH ALL PROGRAMMERS FROM DATABSE
  const query = 'SELECT full_name, gradyr, skills, passions, langs, experience, picture, id FROM Programmers WHERE is_deleted = 0 ORDER BY id DESC, updated_at DESC'; // change ot buildwuote
  const params = [];
  connection.query(query, params, (error, rows) =>{
    response.send({
      ok: true,
      Programmers: rows.map(rowToObject)
    });
  });
}); 

  app.get('/Programmers/id/:id', (request, response) => { // GET PROGRAMMER BY INDIVIDUAL ID
    const query = 'SELECT full_name, gradyr, skills, passions, langs, experience, picture, id FROM Programmers WHERE is_deleted = 0 AND id = ? ORDER BY id DESC, updated_at DESC'; // change ot buildwuote
    const params = [request.params.id];
    connection.query(query, params, (error, rows) =>{
      response.send({
        ok: true,
        Programmers: rows.map(rowToObject)
      });
    });
  });
app.get('/Programmers/:gradyr', (request, response) => { // GET BY GRADUATION YEAR
  const query = 'SELECT full_name, gradyr, skills, passions, langs, experience, picture, id FROM Programmers WHERE is_deleted = 0 AND gradyr = ? ORDER BY id DESC, updated_at DESC'; // change ot buildwuote
  // const params = [request.params.gradyr, request.params.skills, request.params.passions, request.params.langs, request.params.experience, request.params.picture];
  const params = [request.params.gradyr];

  connection.query(query, params, (error, rows) =>{
    response.send({
      ok: true,
      Programmers: rows.map(rowToObject)
    });
  });
});



app.post('/Programmers/', (request, response) => {
  const query = 'INSERT INTO Programmers(full_name, gradyr, skills, passions, langs, experience, picture) VALUES (?,?,?,?,?,?,?)';
  const params = [request.body.full_name, request.body.gradyr, request.body.skills, request.body.passions, request.body.langs , request.body.experience, request.body.picture]; // changed this to match  buildquote db
  connection.query(query, params, (error, result) =>{
    response.send({
      ok: true,
      id: result.insertId,
    });
  });
});
app.patch('/Programmers/:id', (request, response) => {
  const query = 'UPDATE Programmers SET full_name = ?,  gradyr = ?, skills = ?, passions = ?, langs = ?, experience = ?, picture = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
  const params = [request.body.full_name, request.body.gradyr, request.body.skills, request.body.passions, request.body.langs, request.body.experience, request.body.picture, request.params.id]; // id is params because it is input value at end of SQL statement

  connection.query(query, params, (error, result) =>{
    response.send({
      ok: true,
    });
  });
});

app.delete('/Programmers/:id', (request, response) => {
  const query = 'UPDATE Programmers SET is_deleted = 1,  updated_at = CURRENT_TIMESTAMP WHERE id = ?';  // soft delete not using delete command, just changing boolean
  const params = [request.params.id]; // change this to match your buildquote db
  connection.query(query, params, (error, result) =>{
    response.send({
      ok: true,
    });
  });
});
const port = 3443;
app.listen(port, () => {
  console.log(`We're live on port ${port}!`);
});


app.post('/Programmers/', (request, response) => {
  const query = 'INSERT INTO Programmers(gradyr, skills, langs, skills, experience, picture) VALUES (?,?,?,?,?,?)';
  const params = [request.body.gradyr, request.body.skills, request.body.passions, request.body.langs, request.body.skills, request.body.experience, request.body.picture]; // changed this to match  buildquote db
  connection.query(query, params, (error, result) =>{
    response.send({
      ok: true,
      id: result.insertId,
    });
  });
});
app.patch('/Programmers/:id', (request, response) => {
  const query = 'UPDATE Programmers SET year = ?, month = ?, day = ?, message = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
  const params = [request.body.gradyr, request.body.skills, request.body.passions, request.body.langs, request.body.skills, request.body.experience, request.body.picture, request.params.id]; // id is params because it is input value at end of SQL statement


  connection.query(query, params, (error, result) =>{
    response.send({
      ok: true,
    });
  });
});

app.delete('/Programmers/:id', (request, response) => {
  const query = 'UPDATE Programmers SET is_deleted = 1,  updated_at = CURRENT_TIMESTAMP WHERE id = ?';  // soft delete not using delete command, just changing boolean
  const params = [request.params.id];
  connection.query(query, params, (error, result) =>{
    response.send({
      ok: true,
    });
  });
});



// SEARCH TEST ENDPOINTS // IGNORE LATER USE

app.get('/Programmers/search/name/param/perc', (request, response) => { //test this out
  // const query = 'SELECT full_name, gradyr, skills, passions, langs, experience, picture, id FROM Programmers WHERE is_deleted = 0 ORDER BY id DESC, updated_at DESC'; // change ot buildwuote
  const query = "SELECT full_name, gradyr, skills, passions, langs, experience, picture, id FROM Programmers WHERE is_deleted = 0 and full_name LIKE %?%  ORDER BY id DESC, updated_at DESC"; // change ot buildwuote
  let s = 's';
  // const query = "SELECT full_name, gradyr, skills, passions, langs, experience, picture, id FROM Programmers WHERE is_deleted = 0 and gradyr = ? and full_name LIKE %?% ORDER BY id DESC, updated_at DESC"; // change ot buildwuote
  // const params = [request.body.full_name];
  // const params = [request.body.gradyr, request.body.full_name]; // changed this to match  buildquote db
  const params = [s]; 

  // const params = [request.body.gradyr, request.body.skills, request.body.passions, request.body.langs, request.body.skills, request.body.experience, request.body.picture]; // changed this to match  buildquote db
  connection.query(query, params, (error, rows) =>{
    response.send({
      ok: true,
      Programmers: rows.map(rowToObject)
    });
  });
});
app.get('/Programmers/search/name/param', (request, response) => { //test this out
  // const query = 'SELECT full_name, gradyr, skills, passions, langs, experience, picture, id FROM Programmers WHERE is_deleted = 0 ORDER BY id DESC, updated_at DESC'; // change ot buildwuote
  const query = "SELECT full_name, gradyr, skills, passions, langs, experience, picture, id FROM Programmers WHERE is_deleted = 0 and full_name LIKE ?  ORDER BY id DESC, updated_at DESC"; // change ot buildwuote

  // const query = "SELECT full_name, gradyr, skills, passions, langs, experience, picture, id FROM Programmers WHERE is_deleted = 0 and gradyr = ? and full_name LIKE %?% ORDER BY id DESC, updated_at DESC"; // change ot buildwuote
  // const params = [request.body.full_name];
  // const params = [request.body.gradyr, request.body.full_name]; // changed this to match  buildquote db
  const params = [request.body.full_name]; 

  // const params = [request.body.gradyr, request.body.skills, request.body.passions, request.body.langs, request.body.skills, request.body.experience, request.body.picture]; // changed this to match  buildquote db
  connection.query(query, params, (error, rows) =>{
    response.send({
      ok: true,
      Programmers: rows.map(rowToObject)
    });
  });
});
app.get('/Programmers/search/name/noperc/noquest', (request, response) => { //test this out
  // const query = 'SELECT full_name, gradyr, skills, passions, langs, experience, picture, id FROM Programmers WHERE is_deleted = 0 ORDER BY id DESC, updated_at DESC'; // change ot buildwuote
  const query = "SELECT full_name, gradyr, skills, passions, langs, experience, picture, id FROM Programmers WHERE is_deleted = 0 and full_name LIKE s  ORDER BY id DESC, updated_at DESC"; // change ot buildwuote

  // const query = "SELECT full_name, gradyr, skills, passions, langs, experience, picture, id FROM Programmers WHERE is_deleted = 0 and gradyr = ? and full_name LIKE %?% ORDER BY id DESC, updated_at DESC"; // change ot buildwuote
  // const params = [request.body.full_name];
  // const params = [request.body.gradyr, request.body.full_name]; // changed this to match  buildquote db
  const params = []; 

  // const params = [request.body.gradyr, request.body.skills, request.body.passions, request.body.langs, request.body.skills, request.body.experience, request.body.picture]; // changed this to match  buildquote db
  connection.query(query, params, (error, rows) =>{
    response.send({
      ok: true,
      Programmers: rows.map(rowToObject)
    });
  });
});
app.get('/Programmers/search/name/likes', (request, response) => { //test this out
  // const query = 'SELECT full_name, gradyr, skills, passions, langs, experience, picture, id FROM Programmers WHERE is_deleted = 0 ORDER BY id DESC, updated_at DESC'; // change ot buildwuote
  const query = "SELECT full_name, gradyr, skills, passions, langs, experience, picture, id FROM Programmers WHERE is_deleted = 0 and full_name LIKE %s%  ORDER BY id DESC, updated_at DESC"; // change ot buildwuote

  // const query = "SELECT full_name, gradyr, skills, passions, langs, experience, picture, id FROM Programmers WHERE is_deleted = 0 and gradyr = ? and full_name LIKE %?% ORDER BY id DESC, updated_at DESC"; // change ot buildwuote
  // const params = [request.body.full_name];
  // const params = [request.body.gradyr, request.body.full_name]; // changed this to match  buildquote db
  const params = []; 

  // const params = [request.body.gradyr, request.body.skills, request.body.passions, request.body.langs, request.body.skills, request.body.experience, request.body.picture]; // changed this to match  buildquote db
  connection.query(query, params, (error, rows) =>{
    response.send({
      ok: true,
      Programmers: rows.map(rowToObject)
    });
  });
});
app.get('/Programmers/search/name/onlys', (request, response) => { //test this out
  // const query = 'SELECT full_name, gradyr, skills, passions, langs, experience, picture, id FROM Programmers WHERE is_deleted = 0 ORDER BY id DESC, updated_at DESC'; // change ot buildwuote
  const query = "SELECT full_name, gradyr, skills, passions, langs, experience, picture, id FROM Programmers WHERE is_deleted = 0 and full_name LIKE s  ORDER BY id DESC, updated_at DESC"; // change ot buildwuote

  // const query = "SELECT full_name, gradyr, skills, passions, langs, experience, picture, id FROM Programmers WHERE is_deleted = 0 and gradyr = ? and full_name LIKE %?% ORDER BY id DESC, updated_at DESC"; // change ot buildwuote
  // const params = [request.body.full_name];
  // const params = [request.body.gradyr, request.body.full_name]; // changed this to match  buildquote db
  const params = []; 

  // const params = [request.body.gradyr, request.body.skills, request.body.passions, request.body.langs, request.body.skills, request.body.experience, request.body.picture]; // changed this to match  buildquote db
  connection.query(query, params, (error, rows) =>{
    response.send({
      ok: true,
      Programmers: rows.map(rowToObject)
    });
  });
});
app.get('/Programmers/search/name', (request, response) => { //test this out
  // const query = 'SELECT full_name, gradyr, skills, passions, langs, experience, picture, id FROM Programmers WHERE is_deleted = 0 ORDER BY id DESC, updated_at DESC'; // change ot buildwuote
  const query = "SELECT full_name, gradyr, skills, passions, langs, experience, picture, id FROM Programmers WHERE is_deleted = 0 and full_name LIKE %?%  ORDER BY id DESC, updated_at DESC"; // change ot buildwuote

  // const query = "SELECT full_name, gradyr, skills, passions, langs, experience, picture, id FROM Programmers WHERE is_deleted = 0 and gradyr = ? and full_name LIKE %?% ORDER BY id DESC, updated_at DESC"; // change ot buildwuote
  // const params = [request.body.full_name];
  // const params = [request.body.gradyr, request.body.full_name]; // changed this to match  buildquote db
  const params = ['s']; 

  // const params = [request.body.gradyr, request.body.skills, request.body.passions, request.body.langs, request.body.skills, request.body.experience, request.body.picture]; // changed this to match  buildquote db
  connection.query(query, params, (error, rows) =>{
    response.send({
      ok: true,
      Programmers: rows.map(rowToObject)
    });
  });
});
app.get('/Programmers/search/all', (request, response) => { //test this out
  // const query = 'SELECT full_name, gradyr, skills, passions, langs, experience, picture, id FROM Programmers WHERE is_deleted = 0 ORDER BY id DESC, updated_at DESC'; // change ot buildwuote
  const query = "SELECT full_name, gradyr, skills, passions, langs, experience, picture, id FROM Programmers WHERE is_deleted = 0 and gradyr = ? and full_name LIKE %?%  and skills LIKE %?% and passions LIKE %?% and langs LIKE %?% and experience LIKE %?% ORDER BY id DESC, updated_at DESC"; // change ot buildwuote

  // const query = "SELECT full_name, gradyr, skills, passions, langs, experience, picture, id FROM Programmers WHERE is_deleted = 0 and gradyr = ? and full_name LIKE %?% ORDER BY id DESC, updated_at DESC"; // change ot buildwuote
  const params = [request.body.gradyr, ,request.body.full_name, request.body.skills, request.body.passions, request.body.langs, request.body.experience];
  // const params = [request.body.gradyr, request.body.full_name]; // changed this to match  buildquote db
  // const params = []; 

  // const params = [request.body.gradyr, request.body.skills, request.body.passions, request.body.langs, request.body.skills, request.body.experience, request.body.picture]; // changed this to match  buildquote db
  connection.query(query, params, (error, rows) =>{
    response.send({
      ok: true,
      Programmers: rows.map(rowToObject)
    });
  });
});

app.get('/Programmers/search', (request, response) => { //test this out
  const query = 'SELECT full_name, gradyr, skills, passions, langs, experience, picture, id FROM Programmers WHERE is_deleted = 0 ORDER BY id DESC, updated_at DESC'; // change ot buildwuote
  // const query = "SELECT full_name, gradyr, skills, passions, langs, experience, picture, id FROM Programmers WHERE is_deleted = 0 and gradyr = ? and full_name LIKE %?%  and skills LIKE %?% and passions LIKE %?% and langs LIKE %?% and experience LIKE %?% ORDER BY id DESC, updated_at DESC"; // change ot buildwuote

  // const query = "SELECT full_name, gradyr, skills, passions, langs, experience, picture, id FROM Programmers WHERE is_deleted = 0 and gradyr = ? and full_name LIKE %?% ORDER BY id DESC, updated_at DESC"; // change ot buildwuote
  // const params = [request.params.gradyr, request.params.skills, request.params.passions, request.params.langs, request.params.experience, request.params.picture];
  // const params = [request.body.gradyr, request.body.full_name]; // changed this to match  buildquote db
  const params = []; 

  // const params = [request.body.gradyr, request.body.skills, request.body.passions, request.body.langs, request.body.skills, request.body.experience, request.body.picture]; // changed this to match  buildquote db
  connection.query(query, params, (error, rows) =>{
    response.send({
      ok: true,
      Programmers: rows.map(rowToObject)
    });
  });
}); 