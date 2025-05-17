const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3001;
const fs = require("fs");
app.use(express.json());
app.use(cors());
function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = Buffer.from(base64Url, 'base64').toString('utf-8');
  return JSON.parse(base64);
}


app.post('/admin', (req, res) => {
      const data = JSON.parse(fs.readFileSync("posts.json", "utf-8"));
      const nowypost = {
        poster:req.body.poster,
        tytul:req.body.tytul,
        tresc:req.body.tresc
    };
    data.posts.push(nowypost);
        fs.writeFileSync("posts.json", JSON.stringify(data, null, 4));
    return res.send(`Post o tytule ${nowypost.tytul}} utworzono pomyślnie.`);
});
app.get('/admin', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Brak tokenu' });
  }
  const decoded = parseJwt(token);
  const realmRoles = decoded?.realm_access?.roles || [];
  const data = JSON.parse(fs.readFileSync("posts.json", "utf-8"));
  if (!realmRoles.includes("admin")) {
    const finder = data.posts.filter((post) => post.poster == "moderator");
    console.log(finder);
    return res.send(finder);
  } 
  else {
    return res.send(data.posts);
  }
});


app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});
