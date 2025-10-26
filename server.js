import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { prompt } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a friendly Roblox NPC assistant." },
        { role: "user", content: prompt }
      ]
    })
  });

  const data = await response.json();
  res.json(data);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅ Proxy server running on port ${port}`));
