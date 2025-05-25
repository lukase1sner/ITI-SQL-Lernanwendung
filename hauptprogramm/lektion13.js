function normalize(s) {
    return s.trim().toLowerCase().replaceAll(';', '').replace(/\s+/g, ' ');
  }
  
  function showTab(id) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    document.querySelectorAll('.tab-buttons button').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`btn-${id}`);
    if (activeBtn) activeBtn.classList.add('active');
  }
  
  function updateProgress(percent) {
    document.getElementById("progressBar").style.width = percent + "%";
  }
  
  const editorA1 = CodeMirror(document.getElementById('editorA1'), {
    mode: "text/x-sql",
    theme: "material-darker",
    lineNumbers: true
  });
  
  const editorA2 = CodeMirror(document.getElementById('editorA2'), {
    mode: "text/x-sql",
    theme: "material-darker",
    lineNumbers: true
  });
  
  const editorA3 = CodeMirror(document.getElementById('editorA3'), {
    mode: "text/x-sql",
    theme: "material-darker",
    lineNumbers: true
  });
  
  const editorA4 = CodeMirror(document.getElementById('editorA4'), {
    mode: "text/x-sql",
    theme: "material-darker",
    lineNumbers: true
  });
  
  // Aufgabe 1 – Datenbank erstellen
  function checkA1() {
    const input = normalize(editorA1.getValue());
    const f = document.getElementById('f1');
    if (input.includes('create database') && input.includes('autohaus')) {
      f.textContent = '✅ Super! Die Datenbank "Autohaus" wurde korrekt erstellt.';
      f.style.color = '#00f2ff';
      updateProgress(20);
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
    } else {
      f.textContent = '❌ Hinweis: CREATE DATABASE Autohaus;';
      f.style.color = '#ff6b6b';
    }
  }
  
  // Aufgabe 2 – Tabelle anlegen
  function checkA2() {
    const input = normalize(editorA2.getValue());
    const f = document.getElementById('f2');
    if (
      input.includes('create table') &&
      input.includes('fahrzeuge') &&
      input.includes('id int') &&
      input.includes('marke varchar(50)') &&
      input.includes('modell varchar(50)') &&
      input.includes('preis int')
    ) {
      f.textContent = '✅ Richtig! Die Tabelle "Fahrzeuge" wurde korrekt erstellt.';
      f.style.color = '#00f2ff';
      updateProgress(40);
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
    } else {
      f.textContent = '❌ Beispiel: CREATE TABLE Fahrzeuge (ID INT PRIMARY KEY, Marke VARCHAR(50), Modell VARCHAR(50), Preis INT);';
      f.style.color = '#ff6b6b';
    }
  }
  
  // Aufgabe 3 – Daten einfügen
  function checkA3() {
    const input = normalize(editorA3.getValue());
    const f = document.getElementById('f3');
    if (
      input.includes('insert into') &&
      input.includes('fahrzeuge') &&
      input.includes('1') &&
      input.includes("'audi'") &&
      input.includes("'a3'") &&
      input.includes('23990')
    ) {
      f.textContent = '✅ Super! Das Fahrzeug wurde korrekt eingefügt.';
      f.style.color = '#00f2ff';
      updateProgress(60);
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
    } else {
      f.textContent = "❌ Beispiel: INSERT INTO Fahrzeuge (ID, Marke, Modell, Preis) VALUES (1, 'Audi', 'A3', 23990);";
      f.style.color = '#ff6b6b';
    }
  }
  
  // Aufgabe 4 – Daten gezielt abfragen
  function checkA4() {
    const input = normalize(editorA4.getValue());
    const f = document.getElementById('f4');
    if (
      input.includes('select') &&
      input.includes('*') &&
      input.includes('from fahrzeuge') &&
      (input.includes('where id = 1') || input.includes('where id=1'))
    ) {
      f.textContent = '✅ Richtig! Du hast das Fahrzeug mit ID 1 korrekt abgefragt.';
      f.style.color = '#00f2ff';
      updateProgress(80);
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
    } else {
      f.textContent = '❌ Beispiel: SELECT * FROM Fahrzeuge WHERE ID = 1;';
      f.style.color = '#ff6b6b';
    }
  }
  