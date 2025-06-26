                                   function checkQ1() {
                                     const selected = document.querySelector('input[name="q1"]:checked');
                                     const result = document.getElementById("q1-result");
                                     if (!selected) {
                                       result.innerText = "❗ Bitte eine Antwort wählen.";
                                       return;
                                     }
                                     if (selected.value === "1") {
                                       result.innerText = "✅ Richtig! Anwendungen müssen die Struktur nicht kennen.";
                                       result.style.color = "lightgreen";
                                     } else {
                                       result.innerText = "❌ Leider falsch. Tipp: Relationale DBs kapseln die Struktur.";
                                       result.style.color = "red";
                                     }
                                   }

                                   function checkQ2() {
                                     document.getElementById("term-db").innerText = "Sammlung strukturierter Daten";
                                     document.getElementById("term-dbms").innerText = "Verwaltungssoftware für Datenbanken";
                                     document.getElementById("term-sql").innerText = "Sprache zum Abfragen und Verändern";
                                   }
