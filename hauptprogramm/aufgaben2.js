window.aufgaben2 = `
  <h2>📚 Aufgaben zu Lektion 2: Relationale Datenstrukturen</h2>
  <div class="frage-block">
    <strong>1. Was ist in einer relationalen Datenbank eine "Relation"?</strong><br>
    <label><input type="radio" name="q1"> Ein Datenbankbenutzer</label><br>
    <label><input type="radio" name="q1"> Eine Spalte</label><br>
    <label><input type="radio" name="q1" data-solution="1"> Eine Tabelle</label><br>
    <label><input type="radio" name="q1"> Eine Verbindung zwischen zwei Datenbanken</label><br>
    <button onclick="checkQ1()">Antwort prüfen</button>
    <div class="feedback" id="feedbackQ1"></div>
  </div>
  <div class="frage-block">
    <strong>2. Welche Aussagen treffen auf "atomare Werte" zu? (Mehrfachauswahl)</strong><br>
    <label><input type="checkbox" name="q2" data-solution="1"> In jedem Feld steht nur ein einzelner Wert</label><br>
    <label><input type="checkbox" name="q2"> Ein Feld kann beliebig viele Werte enthalten</label><br>
    <label><input type="checkbox" name="q2" data-solution="1"> Dient der Klarheit und Vermeidung von Fehlern</label><br>
    <label><input type="checkbox" name="q2"> Es dürfen mehrere Städte in einer Zelle stehen</label><br>
    <button onclick="checkQ2()">Antworten prüfen</button>
    <div class="feedback" id="feedbackQ2"></div>
  </div>
  <div class="frage-block">
    <strong>3. Ergänze: Wie nennt man eine einzelne Zeile einer Tabelle?</strong><br>
    <input type="text" id="q3input" style="width:220px;"> <button onclick="checkQ3()">Antwort prüfen</button>
    <div class="feedback" id="feedbackQ3"></div>
  </div>
  <div class="frage-block">
    <strong>4. Welche Aussage zu Relationen ist <u>falsch</u>?</strong><br>
    <label><input type="radio" name="q4"> Die Reihenfolge der Zeilen ist nicht festgelegt</label><br>
    <label><input type="radio" name="q4"> Es gibt keine doppelten Zeilen</label><br>
    <label><input type="radio" name="q4" data-solution="1"> In einem Feld dürfen mehrere Werte stehen</label><br>
    <label><input type="radio" name="q4"> Jede Relation hat einen festen Datentyp je Attribut</label><br>
    <button onclick="checkQ4()">Antwort prüfen</button>
    <div class="feedback" id="feedbackQ4"></div>
  </div>
  <div class="frage-block">
    <strong>5. Wofür steht der Begriff "Kardinalität"?</strong><br>
    <label><input type="radio" name="q5"> Die Anzahl der Spalten</label><br>
    <label><input type="radio" name="q5" data-solution="1"> Die Anzahl der Zeilen</label><br>
    <label><input type="radio" name="q5"> Die Anzahl der Schlüssel</label><br>
    <label><input type="radio" name="q5"> Die Anzahl der Tabellen</label><br>
    <button onclick="checkQ5()">Antwort prüfen</button>
    <div class="feedback" id="feedbackQ5"></div>
  </div>
`;
