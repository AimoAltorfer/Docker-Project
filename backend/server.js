const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Erlauben Sie CORS-Anfragen von jedem Ursprung
app.use(cors());

// Zum Parsen von JSON-Anfragen
app.use(express.json());

// Verbindung zur MySQL-Datenbank
const db = mysql.createConnection({
  host: 'db', // Name des Datenbankdienstes in docker-compose
  user: 'root', // Ihr Datenbankbenutzer
  password: 'password', // Ihr Datenbankpasswort
  database: 'tickets' // Name Ihrer Datenbank
});

// Verbindung zur Datenbank herstellen
db.connect(err => {
  if (err) {
    console.error('Fehler beim Verbinden mit der Datenbank: ', err);
    return;
  }
  console.log('Mit der Datenbank verbunden');
});

app.post('/tickets', (req, res) => {
  const { name, email, issue } = req.body;

  // Datenvalidierung
  if (!email || !name || !issue) {
    return res.status(400).send('Alle Felder müssen ausgefüllt werden');
  }

  // Zusätzliche Validierungen können hier hinzugefügt werden, z.B. E-Mail-Format validieren

  const query = 'INSERT INTO tickets (name, email, issue) VALUES (?, ?, ?)';

  db.query(query, [name, email, issue], (err, result) => {
    if (err) {
      console.error('Fehler beim Speichern des Tickets:', err);
      res.status(500).send('Fehler beim Speichern des Tickets');
      return;
    }
    res.status(201).send(`Ticket erstellt mit ID: ${result.insertId}`);
  });
});


// Alle Tickets abrufen
app.get('/tickets', (req, res) => {
  db.query('SELECT * FROM tickets', (err, results) => {
    if (err) {
      res.status(500).send('Fehler beim Abrufen der Tickets');
      return;
    }
    res.json(results);
  });
});

// Einzelnes Ticket nach ID abrufen
app.get('/tickets/:id', (req, res) => {
  const query = 'SELECT * FROM tickets WHERE id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err || results.length === 0) {
      res.status(404).send('Ticket nicht gefunden');
      return;
    }
    res.json(results[0]);
  });
});

// Ticket aktualisieren
app.put('/tickets/:id', (req, res) => {
  const { name, email, issue } = req.body;
  const query = 'UPDATE tickets SET name = ?, email = ?, issue = ? WHERE id = ?';
  db.query(query, [name, email, issue, req.params.id], (err, result) => {
    if (err) {
      res.status(500).send('Fehler beim Aktualisieren des Tickets');
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send('Ticket nicht gefunden');
      return;
    }
    res.send('Ticket aktualisiert');
  });
});

// Ticket löschen
app.delete('/tickets/:id', (req, res) => {
  const query = 'DELETE FROM tickets WHERE id = ?';
  db.query(query, [req.params.id], (err, result) => {
    if (err) {
      res.status(500).send('Fehler beim Löschen des Tickets');
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send('Ticket nicht gefunden');
      return;
    }
    res.send('Ticket gelöscht');
  });
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
