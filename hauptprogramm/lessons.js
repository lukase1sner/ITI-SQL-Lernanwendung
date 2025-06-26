window.lessons = [
  // --- Ursprüngliche Lektionen ---
  {
    title: "Einführung in Datenbanken – Grundlagen und Nutzen",
    description:
      "Max, der neue Azubi bei der Bierdepot GmbH, staunt nicht schlecht: Im Lager stapeln sich nicht nur Bierkästen, sondern auch Ordner voller Excel-Listen und ausgedruckter Lieferscheine. Frau Müller, die IT-Leiterin, bittet Max um Hilfe – denn endlich soll alles digital, sicher und für alle Abteilungen zugänglich werden.\n\nModerne Datenbanksysteme ermöglichen strukturierte, effiziente und sichere Datenverwaltung – insbesondere im Mehrbenutzerbetrieb. Diese Einheit vermittelt die zentralen Konzepte relationaler Datenbanken, ihren Nutzen gegenüber herkömmlichen Dateisystemen und den Einsatz von SQL.\n\nMit dabei: Max (Azubi), Frau Müller (IT-Leiterin)",
    objectives: [
      "Grundlagen relationaler Datenbanken verstehen",
      "Vorteile gegenüber Dateisystemen erkennen",
      "Einsatz und Nutzen von SQL-Befehlen kennenlernen"
    ],
    list: [
      "Eine Datenbank ist eine logisch strukturierte Sammlung von Daten, verwaltet durch ein Datenbankmanagementsystem (DBMS).",
      "Im Mehrbenutzerbetrieb greifen mehrere Anwendungen gleichzeitig auf dieselben Daten zu – z. B. bei Buchungs- oder Verwaltungssystemen.",
      "Klassische Dateisysteme erfordern detaillierte Kenntnisse der physischen Datenstruktur – Änderungen sind fehleranfällig und aufwendig.",
      "Ein DBMS abstrahiert die physische Datenhaltung und stellt eine standardisierte logische Schnittstelle bereit – das erhöht Portabilität und reduziert Wartungsaufwand.",
      "SQL (Structured Query Language) ist der internationale Standard zur Arbeit mit relationalen Datenbanken.",
      "SQL ist deklarativ – man beschreibt, *was* man möchte, nicht *wie* es erreicht wird.",
      "Grundlegende SQL-Befehle:",
      "  • SELECT – Daten abfragen",
      "  • INSERT – Neue Daten hinzufügen",
      "  • UPDATE – Bestehende Daten ändern",
      "  • DELETE – Daten entfernen",
      "Beispielhafte SQL-Abfragen zur Lagerverwaltung:",
      "  • SELECT Sorte, Hersteller, Anzahl FROM Bierdepot WHERE Sorte = 'Weißbier';",
      "  • INSERT INTO Bierdepot VALUES (43, 'Pils', 'Dortmunder Union', 'Kasten', 6);",
      "  • UPDATE Bierdepot SET Anzahl = Anzahl + 2 WHERE Nr = 11;",
      "  • DELETE FROM Bierdepot WHERE Nr = 47;",
      "Mit zunehmender Unternehmensgröße werden auch Kunden-, Personal- und Verkaufsdatenbanken erforderlich – inklusive differenzierter Benutzerrechte und parallelem Datenzugriff.",
      "Fazit: Datenbanksysteme sind die technische Grundlage moderner Informationssysteme."
    ],
    challenge: {
      type: "mc",
      question: "Warum sind Datenbanksysteme gerade für Unternehmen mit vielen gleichzeitigen Zugriffen wichtig?",
      options: [
        "Weil sie billiger sind als Excel.",
        "Weil sie den Zugriff und die Pflege großer Datenmengen strukturieren und absichern.",
        "Weil sie keine IT-Kenntnisse erfordern.",
        "Weil sie keine Wartung benötigen."
      ],
      solution: 1
    },
    nextLesson: "Anforderungen an moderne Datenbanksysteme",
    video: "https://www.youtube.com/embed/k0GfZyol66M"
  },
  {
    title: "Anforderungen an moderne Datenbanksysteme",
    description:
      "Nach dem ersten Erfolg im Lager freut sich Frau Müller: Endlich ist die Datensuche nicht mehr wie Ostereier-Suchen! Aber Buchhalter Herr Schulz macht Druck: 'Was, wenn versehentlich jemand meinen Gehaltszettel liest? Und wie schnell kann ich die Zahlen abfragen?'\n\nDiese Lektion beleuchtet die zentralen Anforderungen an professionelle Datenbanksysteme: Struktur, Sicherheit, Performance und Skalierbarkeit.\n\nMit dabei: Frau Müller (IT-Leiterin), Herr Schulz (Buchhalter)",
    objectives: [
      "Verstehen, welche Anforderungen Datenbanksysteme erfüllen müssen",
      "Erkennen von Sicherheits- und Performanceanforderungen",
      "Bedeutung von Datenintegrität und Ausfallsicherheit erfassen"
    ],
    list: [
      "Daten sollen logisch zusammenhängend und strukturiert gespeichert werden.",
      "Verteilte Speicherung über mehrere Systeme oder Standorte muss transparent durch das DBMS verwaltet werden.",
      "Minimierung redundanter Daten zur Erhöhung der Datenkonsistenz.",
      "Notwendige Redundanzen (z. B. Lagerbestand) müssen automatisch konsistent gehalten werden.",
      "Performante Abfragen: Antwortzeiten unter 2 Sekunden sollten Standard sein.",
      "Zugriff erfolgt über eine abstrahierte logische Schnittstelle, unabhängig vom physischen Speicherort.",
      "Das DBMS optimiert die interne Datenorganisation dynamisch – ohne Auswirkungen auf Benutzerprogramme.",
      "Feingranulare Zugriffskontrolle bis auf Feldebene (z. B. für Gehaltsdaten).",
      "Rechte- und Rollenkonzepte mit Passwortschutz und Zugriffssichten.",
      "Datenintegrität: Korrekte, plausible und widerspruchsfreie Daten (z. B. keine 400 Arbeitsstunden/Woche).",
      "Gleichzeitiger Zugriff durch mehrere Nutzer ohne Datenkonflikte (Concurrency Management).",
      "Protokollierung aller Änderungen (Audit-Trail) zur Nachvollziehbarkeit.",
      "Ausfallsicherheit durch Backup-Strategien und Recovery-Mechanismen.",
      "Monitoring: Nutzerstatistiken, Performance-Daten, Systemzustände messbar und auswertbar.",
      "Fazit: Ein DBMS ist ein leistungsfähiges, intelligentes Verwaltungssystem für strukturierte Daten."
    ],
    challenge: {
      type: "mc",
      question: "Herr Schulz möchte, dass nur er und Frau Müller Zugriff auf die Gehaltsdaten haben. Wie sollte ein Datenbanksystem hier vorgehen?",
      options: [
        "Durch Zugriffsschutz auf Dateiebene.",
        "Feingranulare Rechte- und Zugriffskontrolle auf Feldebene sowie ein Rollenkonzept mit Passwortschutz und Sichten.",
        "Indem alle Daten öffentlich sind.",
        "Keine spezielle Maßnahme notwendig."
      ],
      solution: 1
    },
    prerequisites: ["Einführung in Datenbanken – Grundlagen und Nutzen"],
    nextLesson: "Die Rolle des Datenbankadministrators (DBA)",
    video: "https://www.youtube.com/embed/O9T6d1ZcHgo"
  },
  {
    title: "Die Rolle des Datenbankadministrators (DBA)",
    description:
      "Die Daten wachsen, immer mehr Mitarbeiter bekommen Zugänge. Frau Müller holt Max zu sich: 'Wir brauchen jemanden, der hier den Überblick behält und alles am Laufen hält.' Max lernt, was es bedeutet, Datenbankadministrator zu sein.\n\nErfahre, welche Aufgaben ein Datenbankadministrator übernimmt und warum seine Rolle für den stabilen und sicheren Betrieb unerlässlich ist.\n\nMit dabei: Max (Azubi), Frau Müller (IT-Leiterin)",
    objectives: [
      "Die zentralen Aufgaben eines DBA benennen können",
      "Verstehen, wie Rechte und Rollen im DBMS verwaltet werden",
      "Unterschied zwischen DDL, DML und DCL kennen"
    ],
    list: [
      "Einrichtung der Datenbank: Tabellen, Indizes, Partitionierung, Verteilung der Daten.",
      "Laufende Systemadministration: Nutzerverwaltung, Rechtevergabe, Überwachung, Fehlerdiagnose.",
      "Der DBA besitzt vollständige Systemrechte; reguläre Benutzer erhalten nur die notwendigen Zugriffsrechte.",
      "Rechtevergabe: Wer darf lesen, schreiben, löschen oder Strukturen ändern?",
      "Trennung von Aufgaben und Rollen ist essenziell für Sicherheit und Transparenz.",
      "Datenbankschnittstellen unterteilen sich in:",
      "  • DDL (Data Definition Language): Strukturdefinitionen (CREATE, DROP, GRANT).",
      "  • DCL (Data Control Language): Zugriffskontrolle und Rechtevergabe.",
      "  • DML (Data Manipulation Language): Datenbearbeitung (SELECT, INSERT, UPDATE, DELETE).",
      "Optimierung und Performance-Tuning bei Engpässen oder Nutzeranfragen.",
      "Fazit: Der DBA verantwortet den stabilen, sicheren und performanten Betrieb der Datenbanklandschaft."
    ],
    challenge: {
      type: "mc",
      question: "Welche Aufgabe gehört NICHT zu den typischen Tätigkeiten eines DBA?",
      options: [
        "Backup-Strategien festlegen.",
        "Nutzerrechte vergeben.",
        "Tabellen entwerfen.",
        "Kaffee für das Team kochen."
      ],
      solution: 3
    },
    prerequisites: ["Anforderungen an moderne Datenbanksysteme"],
    nextLesson: "Datenbankmodelle im Vergleich",
    video: "https://www.youtube.com/embed/BmDhbELOu60"
  },
  {
    title: "Datenbankmodelle im Vergleich",
    description:
      "Die Brauerei expandiert! Jetzt braucht es mehr als nur klassische Tabellen: Kunden, Lieferwege und Social-Media-Feedback sollen strukturiert erfasst werden. Max fragt sich: 'Welche Datenbank passt am besten?'\n\nDiese Lektion stellt klassische und moderne Datenbankmodelle vor – inklusive ihrer Anwendungsgebiete und Stärken.\n\nMit dabei: Max (Azubi), Frau Müller (IT-Leiterin)",
    objectives: [
      "Verschiedene Datenbankmodelle vergleichen können",
      "Einsatzgebiete für relationale und NoSQL-Systeme erkennen",
      "Vor- und Nachteile objektorientierter und hierarchischer Modelle verstehen"
    ],
    list: [
      "Relationale Datenbanken: Tabellenstruktur, basiert auf relationaler Algebra, weit verbreitet (z. B. Oracle, MySQL, PostgreSQL).",
      "  • Vorteile: Flexibel, gut integrierbar, umfangreiche Tools und Standards.",
      "  • Nachteile: Komplexe Abfragen bei vielen Relationen können Performanceprobleme verursachen.",
      "Objektorientierte Datenbanken: Speicherung komplexer Objekte mit Methoden, Klassen und Vererbung (z. B. DB2, Oracle mit O/R-Erweiterung).",
      "  • Vorteile: Direkte Abbildung realer Strukturen, besonders geeignet für Multimedia oder CAD-Anwendungen.",
      "  • Nachteile: Höherer Modellierungs- und Pflegeaufwand.",
      "Hierarchische Datenbanken: Baumstruktur (Wurzel → Knoten → Blätter), historisch bedeutend (z. B. IBM IMS).",
      "  • Vorteile: Schneller Datenzugriff, geringe Redundanz.",
      "  • Nachteile: Sehr unflexibel, schwer wartbar.",
      "Netzwerkdatenbanken: Flexible Netze aus Knoten und Verbindungen (z. B. IDMS, UDS).",
      "  • Vorteile: Hohe Performance und Flexibilität bei strukturierter Speicherung.",
      "  • Nachteile: Komplexe Handhabung, geringe Akzeptanz heute.",
      "Moderne Entwicklungen – NoSQL (Not Only SQL): Für Big Data und hochvernetzte Szenarien.",
      "  • Key/Value- und dokumentenbasierte Modelle: Flexibel, schemafrei (z. B. MongoDB, CouchDB).",
      "  • Spaltenorientierte Systeme: Optimiert für analytische Abfragen (z. B. Cassandra, HBase).",
      "  • Graphdatenbanken: Ideal für Beziehungsstrukturen (z. B. Neo4j).",
      "Fazit: Das relationale Modell dominiert, aber NoSQL-Modelle gewinnen je nach Anwendungsfall an Bedeutung."
    ],
    challenge: {
      type: "mc",
      question: "Ordne die Modelle dem jeweils typischsten Vorteil zu (passende Reihenfolge auswählen):",
      options: [
        "Relational = Flexibel und weit verbreitet.",
        "NoSQL = Schemafrei, für Big Data geeignet.",
        "Hierarchisch = Schneller Zugriff, aber unflexibel.",
        "Objektorientiert = Gut für komplexe Strukturen, z.B. CAD."
      ],
      solution: [0, 1, 2, 3]
    },
    prerequisites: ["Die Rolle des Datenbankadministrators (DBA)"],
    nextLesson: "Transaktionen in Datenbanksystemen",
    video: "https://www.youtube.com/embed/Z5PciTwU6ro"
  },
  {
    title: "Transaktionen in Datenbanksystemen",
    description:
      "Im Sommer wird das Bier knapp – im System gehen täglich hunderte Bestellungen und Lagerbewegungen ein. Max erkennt: 'Es darf keine Fehler geben, auch wenn viele gleichzeitig buchen!'\n\nTransaktionen sind die Grundlage sicherer Datenänderungen – sie sorgen für Konsistenz, selbst bei Systemfehlern oder parallelem Zugriff.\n\nMit dabei: Max (Azubi)",
    objectives: [
      "Verstehen, was Transaktionen von einfachen Datenoperationen unterscheidet",
      "Die vier ACID-Eigenschaften benennen können",
      "Den Ablauf einer Transaktion beispielhaft nachvollziehen können"
    ],
    list: [
      "Datenzugriffsarten:",
      "  • Abfragen (SELECT): Lesen von Daten.",
      "  • Mutationen (INSERT, UPDATE, DELETE): Datenänderungen.",
      "  • Transaktionen: Logische Zusammenfassung mehrerer Operationen zu einer konsistenten Einheit.",
      "Beispiel – Banküberweisung:",
      "  1. Betrag von Konto A abbuchen",
      "  2. Betrag auf Konto B gutschreiben",
      "  → Nur beide Schritte gemeinsam sichern Datenkonsistenz.",
      "Eigenschaften von Transaktionen:",
      "  • Atomarität: Ganz oder gar nicht.",
      "  • Konsistenz: Einhaltung aller definierten Regeln.",
      "  • Isolation: Unabhängige Ausführung paralleler Transaktionen.",
      "  • Dauerhaftigkeit: Erfolgreich abgeschlossene Transaktionen bleiben erhalten.",
      "Fazit: Transaktionen garantieren zuverlässige, nachvollziehbare Änderungen auch unter Last und bei Fehlern."
    ],
    challenge: {
      type: "mc",
      question: "Wie stellt eine Transaktion sicher, dass bei einer Überweisung von Konto A zu B kein Geld verloren geht, auch wenn das System mitten im Vorgang abstürzt?",
      options: [
        "Durch Überprüfung der Konsistenz nach jedem Schritt.",
        "Durch Atomarität: Entweder werden beide Buchungen durchgeführt, oder keine – nie nur eine Hälfte.",
        "Durch die Verwendung von Fremdschlüsseln.",
        "Keine Maßnahme erforderlich."
      ],
      solution: 1
    },
    prerequisites: ["Datenbankmodelle im Vergleich"],
    nextLesson: "ACID-Prinzipien für sichere Transaktionen",
    video: "https://www.youtube.com/embed/qcPJtik203M"
  },
  {
    title: "ACID-Prinzipien für sichere Transaktionen",
    description:
      "Das System läuft stabil, auch wenn der Strom mal ausfällt: Max und Frau Müller überprüfen, wie das Datenbanksystem Fehler, gleichzeitige Zugriffe und unvollständige Buchungen verhindert.\n\nACID steht für vier essentielle Eigenschaften, die jede professionelle Transaktion erfüllen muss. Diese Prinzipien sichern Integrität, Stabilität und Wiederherstellbarkeit.\n\nMit dabei: Max (Azubi), Frau Müller (IT-Leiterin)",
    objectives: [
      "Die Bedeutung der ACID-Eigenschaften für Datenkonsistenz erklären können",
      "Wissen, wann COMMIT und ROLLBACK eingesetzt werden",
      "ACID als Standard in modernen Datenbanksystemen einordnen"
    ],
    list: [
      "ACID – die vier Säulen professioneller Transaktionen:",
      "  • A – Atomarität: Die Transaktion wird vollständig oder gar nicht durchgeführt.",
      "  • C – Konsistenz: Datenbank bleibt regelkonform und widerspruchsfrei.",
      "  • I – Isolation: Gleichzeitige Transaktionen beeinflussen sich nicht gegenseitig.",
      "  • D – Dauerhaftigkeit: Nach erfolgreichem Abschluss sind Änderungen permanent gespeichert.",
      "Wichtige SQL-Befehle:",
      "  • COMMIT – Transaktion abschließen und speichern.",
      "  • ROLLBACK – Transaktion abbrechen und Änderungen zurücknehmen.",
      "Fazit: ACID gewährleistet Datenkonsistenz, Fehlertoleranz und Transaktionssicherheit – unverzichtbar in produktiven Datenbanksystemen."
    ],
    challenge: {
      type: "mc",
      question: "Welche ACID-Eigenschaft sorgt dafür, dass nach einem Stromausfall alle abgeschlossenen Transaktionen erhalten bleiben?",
      options: [
        "Konsistenz.",
        "Atomarität.",
        "Isolation.",
        "Dauerhaftigkeit."
      ],
      solution: 3
    },
    prerequisites: ["Transaktionen in Datenbanksystemen"],
    nextLesson: null,
    video: "https://www.youtube.com/embed/PnnOXFZJiDo"
  },

];
