const express = require("express");
const session = require("express-session");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session middleware
app.use(session({
  name: "sid",                  // cookie name
  secret: "supersecretkey",     // sign the cookie (change in real apps)
  resave: false,                // dont save if nothing changed
  saveUninitialized: false,     // dont create empty sessions
  cookie: {
    httpOnly: true,             // JS cant read the cookie
    sameSite: "lax",            // helps prevent CSRF
    secure: false,              // set true if using HTTPS
    maxAge: 15 * 60 * 1000      // 15 minutes
  }
}));

// Fake user
const DEMO_USER = {
  id: "u1",
  email: "admin@example.com",
  password: "admin123",
  name: "Admin"
};

// Middleware to protect routes
function requireSession(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not logged in" });
  }
  next();
}

// Login page (simple form)
app.get("/login", (req, res) => {
  res.send(`
    <form method="POST" action="/login">
      <input name="email" placeholder="admin@example.com" required />
      <input name="password" type="password" placeholder="admin123" required />
      <button>Login</button>
    </form>
    <p>Demo creds: admin@example.com / admin123</p>
  `);
});

// Login route → create session
app.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  if (email !== DEMO_USER.email || password !== DEMO_USER.password) {
    return res.status(401).send("Invalid credentials");
  }

  // Rotate session on login (security)
  req.session.regenerate(err => {
    if (err) return next(err);

    req.session.user = {
      id: DEMO_USER.id,
      email: DEMO_USER.email,
      name: DEMO_USER.name
    };

    res.json({
      message: "Login success. Session created",
      user: req.session.user
    });
  });
});

// Protected route
app.get("/me", requireSession, (req, res) => {
  res.json({ message: "Profile data", user: req.session.user });
});

// Logout
app.get("/logout", (req, res, next) => {
  req.session.destroy(err => {
    if (err) return next(err);
    res.clearCookie("sid");
    res.json({ message: "Logged out" });
  });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000/login"));
