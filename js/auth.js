
const signupBtn = document.getElementById("signupBtn");
if (signupBtn) {
  signupBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Please enter email & password");
      return;
    }

    const exists = await fetch(`http://localhost:3000/users?email=${email}`);
    const data = await exists.json();

    if (data.length > 0) {
      alert("Email already exists!");
      return;
    }

    await fetch(`http://localhost:3000/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        bookmarks: [],
        posts: []
      })
    });

    localStorage.setItem("userEmail", email);
    alert("Signup successful!");
    window.location.href = "main.html";
  });
}

const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const res = await fetch(`http://localhost:3000/users?email=${email}&password=${password}`);
    const data = await res.json();

    if (data.length === 0) {
      alert("Invalid email or password!");
      return;
    }

    localStorage.setItem("userEmail", email);
    alert("Login successful!");
    window.location.href = "main.html";
  });
}
