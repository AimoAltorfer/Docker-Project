# Mein Docker-Projekt

## Beschreibung
Dieses Projekt ist eine Docker-basierte Webanwendung, die aus drei Hauptkomponenten besteht: einem Web-Frontend, einem Backend-Service und einer MySQL-Datenbank.

## Voraussetzungen
Bevor Sie beginnen, stellen Sie sicher, dass Sie Folgendes installiert haben:

- Docker
- Docker Compose

## Installation und Ausführung

1. **Klonen des Repositorys**

Klonen Sie dieses Repository auf Ihren lokalen Computer mit dem folgenden Befehl:

```bash
git clone https://github.com/AimoAltorfer/Docker-Project
```
2. **Starten der Docker-Container**

Wechseln Sie in das Verzeichnis des geklonten Repositorys und führen Sie den folgenden Befehl aus, um alle Dienste zu starten:

```bash
docker-compose up -d
```

3. **Zugriff auf die Anwendung**  
Nach dem Start der Container können Sie auf die Webanwendung zugreifen:
- Frontend: [http://localhost:8080](http://localhost:8080)
- Backend: [http://localhost:3000](http://localhost:3000)

4. **Überprüfen der laufenden Container**  
Um zu überprüfen, ob alle Container ordnungsgemäß laufen, verwenden Sie:

```bash
docker-compose ps
```


5. **Herunterfahren der Anwendung**  
Zum Stoppen und Entfernen der Container, Netzwerke und Volumes, die von `docker-compose up` erstellt wurden, verwenden Sie:

```bash
docker-compose down
```

## Zusätzliche Befehle

### Ports freigeben
Falls Sie auf Probleme stossen, bei denen die benötigten Ports bereits belegt sind, können Sie die folgenden Befehle verwenden, um die belegten Ports freizugeben:

- Um einen bestimmten Prozess zu beenden (ersetzen Sie `PID` durch die tatsächliche Prozess-ID):

```bash
taskkill /PID <PID> /F
```

- Um zu überprüfen, welche Prozesse einen bestimmten Port verwenden (ersetzen Sie `3306` durch den relevanten Port):

```bash
netstat -ano | findstr :3306
```