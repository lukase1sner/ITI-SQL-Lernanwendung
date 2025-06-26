 function checkQ1() {
  const radios = document.querySelectorAll('input[name="q1"]');
  const labels = document.querySelectorAll('.answer-label');
  const result = document.getElementById('result-q1');

  labels.forEach(l => l.classList.remove('correct', 'incorrect'));
  let selected;
  radios.forEach(r => {
    if (r.checked) selected = r;
    r.disabled = true;
  });

  if (!selected) {
    result.textContent = "❗ Bitte wähle eine Antwort aus.";
    result.style.color = "#ffaa00";
    return;
  }

  const label = selected.closest('label');
  if (selected.value === 'a') {
    label.classList.add('correct');
    result.textContent = "✅ Richtig! SQL steht für Structured Query Language.";
    result.style.color = "#00f2ff";
    confetti(); // 🎉 Optional, falls du canvas-confetti nutzt
  } else {
    label.classList.add('incorrect');
    result.textContent = "❌ Falsch. SQL steht für Structured Query Language.";
    result.style.color = "#ff6b6b";
  }
}


 function checkQ2() {
  const checkboxes = document.querySelectorAll('input[name="q2"]');
  const labels = document.querySelectorAll('#q2-container .answer-label');
  const result = document.getElementById('result-q2');

  const correct = ['a', 'b'];
  let selectedValues = [];

  labels.forEach(l => l.classList.remove('correct', 'incorrect'));

  checkboxes.forEach(cb => {
    cb.disabled = true;
    if (cb.checked) selectedValues.push(cb.value);
  });

  const isCorrect = correct.every(v => selectedValues.includes(v)) &&
                    selectedValues.every(v => correct.includes(v));

  if (isCorrect) {
    checkboxes.forEach(cb => {
      if (correct.includes(cb.value)) {
        cb.closest('label').classList.add('correct');
      }
    });
    result.textContent = "✅ Sehr gut! Du hast alle richtigen Aussagen erkannt.";
    result.style.color = "#00f2ff";
    confetti();
  } else {
    checkboxes.forEach(cb => {
      if (cb.checked) {
        cb.closest('label').classList.add(correct.includes(cb.value) ? 'correct' : 'incorrect');
      }
    });
    result.textContent = "❌ Nicht ganz richtig. SQL ist deklarativ und wird in relationalen Datenbanken verwendet.";
    result.style.color = "#ff6b6b";
  }
}

    function checkA3() {
  const correct = {
    "a3-1": "rechte vergeben",
    "a3-2": "struktur definieren",
    "a3-3": "daten abfragen",
    "a3-4": "daten einfügen"
  };
  let allCorrect = true;

  for (let key in correct) {
    const input = document.getElementById(key);
    const val = input.value.trim().toLowerCase();
    if (val === correct[key]) {
      input.style.backgroundColor = "#2e7d32";
      input.style.color = "#fff";
    } else {
      input.style.backgroundColor = "#c62828";
      input.style.color = "#fff";
      allCorrect = false;
    }
  }

  const result = document.getElementById("result-a3");
  result.textContent = allCorrect ? "✅ Alles richtig!" : "❌ Leider nicht ganz richtig.";
  result.style.color = allCorrect ? "#00f2ff" : "#ff6b6b";
  if (allCorrect) confetti();
}

    function checkA4() {
  const correct = {
    "a4-1": "graphdatenbank",
    "a4-2": "objektorientiert",
    "a4-3": "relational",
    "a4-4": "hierarchisch"
  };
  let allCorrect = true;

  for (let key in correct) {
    const input = document.getElementById(key);
    const val = input.value.trim().toLowerCase();
    if (val === correct[key]) {
      input.style.backgroundColor = "#2e7d32";
      input.style.color = "#fff";
    } else {
      input.style.backgroundColor = "#c62828";
      input.style.color = "#fff";
      allCorrect = false;
    }
  }

  const result = document.getElementById("result-a4");
  result.textContent = allCorrect ? "✅ Sehr gut!" : "❌ Nicht ganz korrekt.";
  result.style.color = allCorrect ? "#00f2ff" : "#ff6b6b";
  if (allCorrect) confetti();
}

    function checkA5() {
  const answers = {
    "a5-1": "atomar",
    "a5-2": "konsistent",
    "a5-3": "rollback",
    "a5-4": "commit"
  };
  let allCorrect = true;

  for (let id in answers) {
    const input = document.getElementById(id);
    const val = input.value.trim().toLowerCase();
    if (val === answers[id]) {
      input.style.backgroundColor = "#2e7d32";
      input.style.color = "#fff";
    } else {
      input.style.backgroundColor = "#c62828";
      input.style.color = "#fff";
      allCorrect = false;
    }
  }

  const result = document.getElementById("result-a5");
  result.textContent = allCorrect ? "✅ Genau richtig!" : "❌ Da fehlen noch passende Begriffe.";
  result.style.color = allCorrect ? "#00f2ff" : "#ff6b6b";
  if (allCorrect) confetti();
}
function checkQ6() {
  const correct = ['a', 'b', 'c', 'd'];
  const checkboxes = document.querySelectorAll('input[name="q6"]');
  const result = document.getElementById('result-q6');
  let selected = Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);
  let isCorrect = selected.length === correct.length && selected.every(v => correct.includes(v));

  checkboxes.forEach(cb => {
    const label = cb.closest('label');
    if (cb.checked) {
      label.classList.add(correct.includes(cb.value) ? 'correct' : 'incorrect');
    }
    cb.disabled = true;
  });

  result.textContent = isCorrect ? "✅ Richtig – ACID vollständig erkannt!" : "❌ Nicht ganz vollständig oder fehlerhaft.";
  result.style.color = isCorrect ? "#00f2ff" : "#ff6b6b";
  if (isCorrect) confetti();
}