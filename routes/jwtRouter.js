import express from 'express';
import path from 'path';
import url from 'url';
import jwt from 'jsonwebtoken';

const publicDir = path.join(path.dirname(url.fileURLToPath(import.meta.url)), '../public');

// Verify middleware
const verifyToken = (req, res, next) => {
  // We can destructure from req.cookies because we enabled cookie-parser as an app-level middleware
  let { token } = req.cookies;
  token
    ? jwt.verify(token, 'SECRET', (err, decoded) => {
        if (err) return res.redirect('/jwt/login');
        next();
      })
    : res.redirect('/jwt/login');
};

const jwtRouter = express.Router();

jwtRouter.get('/login', (req, res) => {
  res.sendFile('index.html', { root: publicDir });
});

jwtRouter.post('/connect', (req, res) => {
  const { name, password } = req.body;
  if (name === 'Jorge' && password === '12345') {
    const token = jwt.sign({ name }, 'SECRET');
    res.cookie('token', token).redirect('/jwt/admin');
  } else {
    res.redirect('/jwt/login');
  }
});

jwtRouter.get('/admin', verifyToken, (req, res) => {
  res.send('Secret area');
});

export default jwtRouter;
