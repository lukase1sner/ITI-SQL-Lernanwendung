<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Registrieren – SQLMate</title>
  <link rel="stylesheet" href="signup.css" />
</head>
<body>
  <div class="container">
    <h1>Registrieren</h1>
    <form id="signupForm">
      <input type="email" name="email" placeholder="E-Mail" required />
      <input type="password" name="password" placeholder="Passwort" required />
      <button type="submit">Registrieren</button>
    </form>
    <a class="back-link" href="../index.html">← Zurück zur Startseite</a>
  </div>

  <script>
    document.getElementById("signupForm").addEventListener("submit", async function (e) {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;

      const res = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Registrierung erfolgreich!");
        window.location.href = "../loginFrontend/login.html";
      } else {
        alert(data.message || "Fehler bei der Registrierung");
      }
    });
  </script>
</body>
</html>
