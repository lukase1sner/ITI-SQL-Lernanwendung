window.lessons2 = [
  {
    title: "Beispiel zu relationalen Datenbanken",
    description: "Tauche ein in den Alltag eines Elektromarkt-Betreibers – und entdecke, warum kluges Datenbankdesign dir wirklich den Kopf retten kann.",
    list: [
      "Stell dir vor, du führst einen eigenen Elektromarkt. Anfangs erscheint es praktisch, alle Informationen zu Verkäufen, Verkäufern und Produkten in einer einzigen Tabelle zu sammeln. So hast du alles auf einen Blick – bis die Datenmenge wächst. Plötzlich tauchen Verkäufer wie Herr Meier mehrfach auf, weil er unterschiedliche Produkte verkauft. Seine Adresse steht in jeder Zeile mit seinen Produkten. Sobald sich eine Kleinigkeit wie die Adresse ändert, musst du an allen Stellen nachbessern. Und wenn du ein Produkt löschst, verschwindet womöglich gleich der gesamte Verkäufer aus deiner Datenbank.",

      "Das Ergebnis: Daten werden mehrfach gespeichert, Fehler und Widersprüche schleichen sich ein, und du verlierst schnell den Überblick. Änderungen werden zur Sisyphusarbeit, weil du nie sicher sein kannst, ob wirklich überall alles stimmt.",

      "Die Lösung liegt in einem strukturierten Datenbankdesign. Profis trennen Informationen in eigene Tabellen auf: Verkäufer, Produkte und Verkäufe stehen jeweils für sich. So wird jeder Verkäufer nur einmal angelegt, Produkte lassen sich unabhängig pflegen, und Verkäufe verbinden beides sauber miteinander. Deine Datenbank bleibt übersichtlich, Speicher wird gespart, und Änderungen lassen sich sicher und schnell umsetzen.",

      "Fazit: Ein gutes Datenbankdesign ist mehr als nur Technik – es macht den Unterschied zwischen Datenchaos und echter Kontrolle. Im nächsten Abschnitt schauen wir uns die Grundbausteine dieser Strukturen genauer an."
    ],
    video: "https://www.youtube.com/embed/2RlWxMRYw20",
    challenge: {
      type: "mc",
      question: "Was kann passieren, wenn du alle Informationen in nur einer Tabelle speicherst?",
      options: [
        "Es werden weniger Daten gespeichert.",
        "Verkäufer oder Produkte können versehentlich aus der Datenbank verschwinden.",
        "Man braucht mehr Tabellen.",
        "Die Tabelle ist immer fehlerfrei."
      ],
      solution: 1
    }
  },
  {
    title: "Relationale Datenstrukturen – Grundbegriffe & Aufbau",
    description: "Warum sagen Datenbank-Profis nie einfach 'Tabelle'? Lerne die Begriffe kennen, die wirklich Ordnung ins Datenchaos bringen.",
    list: [
      "Vielleicht kennst du klassische Excel-Tabellen. In der Welt der Datenbanken gibt es allerdings spezielle Begriffe und klare Regeln, die für Übersicht und Stabilität sorgen. Eine einzelne Tabelle wird in der Datenbanktheorie als „Relation“ bezeichnet. Jede Zeile dieser Tabelle heißt „Tupel“ und stellt einen Datensatz dar, während die Spalten als „Attribute“ bezeichnet werden. Die Anzahl der Zeilen nennt man Kardinalität, die Anzahl der Spalten den Grad.",

      "Besonders wichtig: Der sogenannte Primärschlüssel. Das ist ein Attribut oder eine Kombination aus Attributen, das jede Zeile eindeutig identifiziert – etwa eine Kundennummer. Und jede Spalte hat eine sogenannte Domäne: das ist der erlaubte Wertebereich, zum Beispiel nur gültige deutsche Postleitzahlen.",

      "Das Ganze wird an einem einfachen Beispiel schnell klar:",

      "| LNr | Name     | Stadt      | PLZ   |",
      "|-----|----------|------------|-------|",
      "| 1   | Müller   | München    | 81724 |",
      "| 2   | Schmidt  | Regensburg | 93055 |",
      "| 3   | Maier    | Hamburg    | 20543 |",

      "Für eine saubere Datenbankstruktur gelten einige Grundregeln: Es darf keine doppelten Zeilen geben. Die Reihenfolge von Zeilen und Spalten spielt keine Rolle. In jedem Feld steht immer nur ein einzelner Wert, nie mehrere gleichzeitig. Und jeder Wert muss zum festgelegten Typ der Spalte passen.",

      "Was passiert, wenn man sich nicht daran hält? Sobald in einer Spalte wie 'Produkte' mehrere Werte stehen, wird die Datenbank unübersichtlich und fehleranfällig. Damit verlierst du schnell die Kontrolle über deine Daten.",

      "Fazit: Mit klaren Strukturen und Begriffen schaffst du eine solide Basis für jede Datenbank – und sorgst dafür, dass alles nachvollziehbar und einfach zu pflegen bleibt. Im nächsten Abschnitt erfährst du, warum der Primärschlüssel dabei so eine entscheidende Rolle spielt."
    ],
    video: "https://www.youtube.com/embed/UZiVj6nKSM8",
    challenge: {
      type: "mc",
      question: "Welcher Begriff bezeichnet in einer relationalen Tabelle eine einzelne Zeile?",
      options: [
        "Attribut",
        "Kardinalität",
        "Tupel",
        "Grad"
      ],
      solution: 2
    }
  },
  {
    title: "Primärschlüssel – Das Rückgrat jeder Tabelle",
    description: "Eindeutigkeit ist alles! Entdecke, warum der Primärschlüssel so wichtig ist – und wie du ihn clever wählst, damit nie wieder Daten-Chaos entsteht.",
    list: [
      "Stell dir vor, es gibt in deiner Kundendatenbank zwei Personen mit gleichem Namen. Oder jemand wird versehentlich doppelt eingetragen. Ohne klare Unterscheidung kann die Datenbank nicht mehr zuverlässig arbeiten. Genau dafür gibt es den sogenannten Primärschlüssel. Er macht jeden Datensatz eindeutig – zum Beispiel durch eine Kundennummer, die es nur einmal gibt.",

      "Jede Tabelle sollte einen Primärschlüssel haben, denn nur so kannst du gezielt nach Datensätzen suchen, diese ändern oder löschen, ohne Fehler zu riskieren. Auch für viele Abfragen und die Verknüpfung von Tabellen ist ein Primärschlüssel unverzichtbar.",

      "Nicht jeder Wert eignet sich als Schlüssel. Ein Beispiel: In einer Tabelle für chemische Elemente könnte sowohl der Name als auch das Elementsymbol oder die Anzahl der Protonen ein Primärschlüssel sein, weil diese Werte eindeutig sind. Ein Attribut wie das Atomgewicht hingegen ist nicht eindeutig genug und eignet sich daher nicht.",

      "Neben dem Primärschlüssel gibt es noch weitere wichtige Begriffe: Superschlüssel sind alle Kombinationen von Attributen, die eine Zeile eindeutig machen. Schlüsselkandidaten sind die minimalen dieser Superschlüssel, und der Primärschlüssel ist einer der Schlüsselkandidaten, den du auswählst. Die anderen Schlüsselkandidaten heißen alternative Schlüssel.",

      "Ein guter Primärschlüssel ist eindeutig, bleibt möglichst konstant, ist so kurz wie möglich und besteht idealerweise aus nur einem Attribut. Manchmal ist aber auch eine Kombination aus zwei Feldern nötig – zum Beispiel, wenn allein der Produktname nicht eindeutig ist, aber die Kombination aus Produktname und Produkttyp schon.",

      "Tipp: Führe eine neue Nummer als Primärschlüssel nur dann ein, wenn es nicht bereits eine natürliche, eindeutige Kombination in den Daten gibt. So vermeidest du unnötige Redundanzen.",

      "Fazit: Der Primärschlüssel sorgt dafür, dass jede Tabelle klar strukturiert und zuverlässig bleibt. Im nächsten Kapitel siehst du, wie die Datenbank diese Ordnung durch Integritätsregeln absichert."
    ],
    video: "https://www.youtube.com/embed/wSEK8C0N9UQ",
    challenge: {
      type: "mc",
      question: "Was zeichnet einen guten Primärschlüssel aus?",
      options: [
        "Er enthält so viele Felder wie möglich.",
        "Er garantiert Eindeutigkeit und ändert sich möglichst nie.",
        "Er darf ruhig doppelt vorkommen.",
        "Er besteht immer aus Vor- und Nachname."
      ],
      solution: 1
    }
  },
  {
    title: "Relationale Integritätsregeln – So bleiben deine Daten sauber",
    description: "Sicherheit, auf die du dich verlassen kannst: Mit Integritätsregeln sorgt die Datenbank dafür, dass deine Daten immer korrekt und widerspruchsfrei bleiben.",
    list: [
      "Wer schon einmal nach einem alten Datensatz gesucht oder eine Rechnung doppelt verschickt hat, weiß, wie wichtig Zuverlässigkeit ist. Datenbanken sorgen mit sogenannten Integritätsregeln dafür, dass alles stimmt und sich keine Fehler einschleichen.",

      "Zwei Regeln sind dabei besonders wichtig: Die Entitäts-Integrität und die Referenz-Integrität. Die Entitäts-Integrität verlangt, dass jeder Datensatz einen gültigen, nie leeren Primärschlüssel besitzt. Ohne diese Regel könnten doppelte oder unvollständige Einträge entstehen.",

      "Die Referenz-Integrität sorgt dafür, dass Beziehungen zwischen Tabellen funktionieren. Sie verlangt, dass jeder Fremdschlüssel auf einen existierenden Primärschlüssel in einer anderen Tabelle verweist. Ein klassisches Beispiel: In einer Auftragstabelle steht eine Kundennummer. Diese Nummer muss es auch in der Kundentabelle geben – sonst ist die Verbindung ungültig.",

      "Datenbanken können beim Löschen oder Ändern von Daten auf verschiedene Arten reagieren: Sie verhindern das Löschen, solange noch Verweise bestehen (NO ACTION). Sie löschen automatisch alle abhängigen Datensätze mit (CASCADE). Oder sie setzen den Fremdschlüssel auf NULL, falls das zulässig ist.",

      "Fazit: Integritätsregeln schützen dich vor Datenchaos und machen deine Datenbank zu einem verlässlichen Werkzeug. Im nächsten Schritt lernst du die Werkzeuge kennen, mit denen du gezielt und flexibel auf alle Daten zugreifen kannst."
    ],
    video: "https://www.youtube.com/embed/gWkD_1mRFWw",
    challenge: {
      type: "mc",
      question: "Was ist ein Beispiel für Verletzung der Referenz-Integrität?",
      options: [
        "Eine Auftragstabelle enthält eine Kundennummer, die es in der Kundentabelle nicht gibt.",
        "Ein Primärschlüssel ist eindeutig.",
        "Ein Feld ist atomar.",
        "Eine Tabelle hat mehrere Spalten."
      ],
      solution: 0
    }
  },
  {
    title: "Relationale Algebra – Das Werkzeug für Datenbank-Abfragen",
    description: "Die Zaubertricks der Datenbankabfragen: Mit relationaler Algebra kombinierst, filterst und verwandelst du Daten – wie ein echter Daten-Magier!",
    list: [
      "Stell dir vor, du möchtest ganz gezielt Daten aus deiner Datenbank herausholen – zum Beispiel nur die Kunden aus München, alle Verkäufe eines bestimmten Produkts oder die Summe aller Umsätze. Mit der relationalen Algebra steht dir ein Werkzeugkasten voller Möglichkeiten zur Verfügung.",

      "Du kannst Tabellen zusammenführen (Vereinigung), gemeinsame Daten herausfiltern (Schnitt), Unterschiede anzeigen (Differenz), einzelne Spalten auswählen (Projektion) oder nur bestimmte Zeilen anzeigen (Restriktion). Das Kreuzprodukt erlaubt es, alle Kombinationen aus zwei Tabellen zu erzeugen, während der Verbund – auch Join genannt – Tabellen über gemeinsame Spalten miteinander verbindet. Mit der Division findest du beispielsweise alle Lieferanten, die jede einzelne Produktart liefern können, und mit der Umbenennung passt du Tabellennamen oder Spalten an, damit alles zusammenpasst.",

      "Das Beste daran: Nach jedem Schritt entsteht wieder eine ganz normale Tabelle, die du weiterverarbeiten kannst. So lässt sich auch die komplexeste Abfrage Schritt für Schritt aufbauen.",

      "Ein paar Beispiele machen es anschaulich: Um Kunden aus Berlin oder Hamburg zu finden, verbindest du die entsprechenden Teiltabellen durch Vereinigung. Mit einer Projektion zeigst du nur die Namen aller Kunden an. Und mit einer Restriktion kannst du etwa gezielt alle Kunden mit einer bestimmten Postleitzahl auswählen.",

      "Fazit: Die relationale Algebra ist das Fundament für flexible und mächtige Datenbankabfragen. Im nächsten Abschnitt siehst du, wie diese Konzepte ganz praktisch in SQL umgesetzt werden."
    ],
    video: "https://www.youtube.com/embed/9PpWZ8gKa8c",
    challenge: {
      type: "mc",
      question: "Welcher Operator der relationalen Algebra wählt bestimmte SPALTEN einer Tabelle aus?",
      options: [
        "Vereinigung (∪)",
        "Projektion (π)",
        "Schnitt (∩)",
        "Kreuzprodukt (×)"
      ],
      solution: 1
    }
  }
];
