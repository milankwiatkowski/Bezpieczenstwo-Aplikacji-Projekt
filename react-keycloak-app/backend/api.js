const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3001;
const fs = require("fs");
app.use(express.json());
app.use(cors());
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
    console.log("GET /admin");
    const data = JSON.parse(fs.readFileSync("posts.json", "utf-8"));
    return res.send(data);
});

app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});
