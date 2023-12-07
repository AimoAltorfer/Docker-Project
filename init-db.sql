-- Datenbank erstellen, falls sie noch nicht existiert
CREATE DATABASE IF NOT EXISTS tickets;
USE tickets;

-- Tabelle erstellen, falls sie noch nicht existiert
CREATE TABLE IF NOT EXISTS tickets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  issue TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Benutzer 'root' mit dem Passwort 'password' konfigurieren
-- und Zugriff von jeder IP-Adresse erlauben
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'password';

-- Privilegien neu laden
FLUSH PRIVILEGES;
