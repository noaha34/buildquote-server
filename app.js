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
  };
}
  //INSERT INTO Programmers (full_name, gradyr, skills, passions, langs, experience, picture) VALUES ('Tao Ren', 2021, 'Web Development, Agile Scrum', 'China', 'JS, HTML, CSS, C, Java', 'Dopest Guy In China', 'minorityprogrammers.org/img/kush.jpg');

//INSERT INTO Programmers (full_name, gradyr, skills, passions, langs, experience, picture) VALUES ('Kush Gupta', 2021, 'Web Development, Agile Scrum', 'Learning', 'JS, HTML, CSS, C, Java', 'Software Engineer and Northrup Grumman', 'minorityprogrammers.org/img/kush.jpg');
//INSERT INTO Programmers (full_name, gradyr, skills, passions, langs, experience, picture) VALUES ('Chris Johnson', 2012, 'Web Development, 3D Developments', 'Teaching', 'JS, HTML, CSS, C++, madeup.xyz', 'Professor', 'twodee.org/imgs/me_small_circle.png');
app.get('/Programmers/:gradyr', (request, response) => { //test this out
  const query = 'SELECT full_name, gradyr, skills, passions, langs, experience, picture, id FROM Programmers WHERE is_deleted = 0 AND gradyr = ? ORDER BY id DESC, updated_at DESC'; // change ot buildwuote
  // const params = [request.params.gradyr, request.params.skills, request.params.passions, request.params.langs, request.params.experience, request.params.picture];
  const params = [request.params.gradyr];

  connection.query(query, params, (error, rows) =>{
    response.send({
      ok: true,
      Programmers: rows.map(rowToObjectYr)
    });
  });
}); // add more get statements, but be cognizant of appending long strings

// INSERT INTO Programmers(full_name, gradyr, skills, passions, langs, experience, picture) VALUES (?,?,?,?,?,?,?);
app.post('/Programmers/', (request, response) => {
  const query = 'INSERT INTO Programmers(full_name, gradyr, skills, passions, langs, experience, picture) VALUES (?,?,?,?,?,?,?);';
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


//

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
