// // epxress with sql THIS SHOULD GO IN APP.js BUILDQuoteWS
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

function rowToObjectYrLangSkills(row) {
  return {
    gradyr:row.gradyr,
    langssenum:row.langssenum, // need to change based on buildquote databse
    skillsenum:row.skillsenum,
  };
}

function rowToObject(row) {
  return {
    gradyr:row.gradyr,
    skills: row.skills,
    passions: row.passions,
    langssenum:row.langssenum, // need to change based on buildquote databse
    skillsenum:row.skillsenum,
    experience:row.experience,
    picture:row.picture, // not sure if unchanged valued like created_at, id, or is_delted are applied here
  };
}
// gradyr, skills, passions, langssenum, skillsenum, experience, picture
app.get('/Programmers/:gradyr/:langssenum/:skillsenum', (request, response) => {
  const query = 'SELECT gradyr, skills, passions, langssenum, skillsenum, experience, picture, id FROM memory WHERE is_deleted = 0 AND gradyr = ? AND langssenum = ? AND skillsenum = ? ORDER BY id DESC, updated_at DESC'; // change ot buildwuote
  const params = [request.params.gradyr, request.params.skills, request.params.passions, request.params.langssenum, request.params.skillsenum, request.params.experience, request.params.picture];

  connection.query(query, params, (error, rows) =>{
    response.send({
      ok: true,
      Programmers: rows.map(rowToObjectYrLangSkills),// change moeries
    });
  });
});
// this one has way to many params to get
app.get('/Programmers/:gradyr/:skills/:passions/:langssenum/:skillsenum/:experience/:picture', (request, response) => {
  const query = 'SELECT gradyr, skills, passions, langssenum, skillsenum, experience, picture, id FROM memory WHERE is_deleted = 0 AND gradyr = ? AND skills = ? AND passions = ? AND langssenum = ? AND skillsenum = ? AND experience = ? AND picture = ? ORDER BY id DESC, updated_at DESC'; // change ot buildwuote
  const params = [request.params.gradyr, request.params.skills, request.params.passions, request.params.langssenum, request.params.skillsenum, request.params.experience, request.params.picture];

  connection.query(query, params, (error, rows) =>{
    response.send({
      ok: true,
      Programmers: rows.map(rowToObject),// change moeries
    });
  });
});

app.post('/Programmers/', (request, response) => {
  const query = 'INSERT INTO Programmers(gradyr, skills, langssenum, skillsenum, experience, picture) VALUES (?,?,?,?,?,?)';
  const params = [request.body.gradyr, request.body.skills, request.body.passions, request.body.langssenum, request.body.skillsenum, request.body.experience, request.body.picture]; // changed this to match  buildquote db
  connection.query(query, params, (error, result) =>{
    response.send({
      ok: true,
      id: result.insertID,
    });
  });
});
/// also confused as to question marks for id
app.patch('/Programmers/:id', (request, response) => {
  const query = 'UPDATE Programmers SET year = ?, month = ?, day = ?, message = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
  // const params = [request.body.year, request.body.month, request.body.day, request.body.message, request.params.id]; // change this to match your buildquote db
  const params = [request.body.gradyr, request.body.skills, request.body.passions, request.body.langssenum, request.body.skillsenum, request.body.experience, request.body.picture, request.params.id]; // id is params because it is input value at end of SQL statement
  // changed this to match  buildquote db

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

function rowToObjectYrLangSkills(row) {
  return {
    gradyr:row.gradyr,
    langssenum:row.langssenum, // need to change based on buildquote databse
    skillsenum:row.skillsenum,
  };
}

function rowToObject(row) {
  return {
    gradyr:row.gradyr,
    skills: row.skills,
    passions: row.passions,
    langssenum:row.langssenum, // need to change based on buildquote databse
    skillsenum:row.skillsenum,
    experience:row.experience,
    picture:row.picture, // not sure if unchanged valued like created_at, id, or is_delted are applied here
  };
}
// gradyr, skills, passions, langssenum, skillsenum, experience, picture
app.get('/Programmers/:gradyr/:langssenum/:skillsenum', (request, response) => {
  const query = 'SELECT gradyr, skills, passions, langssenum, skillsenum, experience, picture, id FROM memory WHERE is_deleted = 0 AND gradyr = ? AND langssenum = ? AND skillsenum = ? ORDER BY id DESC, updated_at DESC'; // change ot buildwuote
  const params = [request.params.gradyr, request.params.skills, request.params.passions, request.params.langssenum, request.params.skillsenum, request.params.experience, request.params.picture];

  connection.query(query, params, (error, rows) =>{
    response.send({
      ok: true,
      Programmers: rows.map(rowToObjectYrLangSkills),// change moeries
    });
  });
});
// this one has way to many params to get
app.get('/Programmers/:gradyr/:skills/:passions/:langssenum/:skillsenum/:experience/:picture', (request, response) => {
  const query = 'SELECT gradyr, skills, passions, langssenum, skillsenum, experience, picture, id FROM memory WHERE is_deleted = 0 AND gradyr = ? AND skills = ? AND passions = ? AND langssenum = ? AND skillsenum = ? AND experience = ? AND picture = ? ORDER BY id DESC, updated_at DESC'; // change ot buildwuote
  const params = [request.params.gradyr, request.params.skills, request.params.passions, request.params.langssenum, request.params.skillsenum, request.params.experience, request.params.picture];

  connection.query(query, params, (error, rows) =>{
    response.send({
      ok: true,
      Programmers: rows.map(rowToObject),// change moeries
    });
  });
});

app.post('/Programmers/', (request, response) => {
  const query = 'INSERT INTO Programmers(gradyr, skills, langssenum, skillsenum, experience, picture) VALUES (?,?,?,?,?,?)';
  const params = [request.body.gradyr, request.body.skills, request.body.passions, request.body.langssenum, request.body.skillsenum, request.body.experience, request.body.picture]; // changed this to match  buildquote db
  connection.query(query, params, (error, result) =>{
    response.send({
      ok: true,
      id: result.insertID,
    });
  });
});
/// also confused as to question marks for id
app.patch('/Programmers/:id', (request, response) => {
  const query = 'UPDATE Programmers SET year = ?, month = ?, day = ?, message = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
  // const params = [request.body.year, request.body.month, request.body.day, request.body.message, request.params.id]; // change this to match your buildquote db
  const params = [request.body.gradyr, request.body.skills, request.body.passions, request.body.langssenum, request.body.skillsenum, request.body.experience, request.body.picture, request.params.id]; // id is params because it is input value at end of SQL statement
  // changed this to match  buildquote db

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
//end of EXPRESS from profesor johnson video
