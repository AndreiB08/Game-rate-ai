import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/games", async (req, res) => {
  try {
    const response = await fetch("https://www.freetogame.com/api/games");
    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Eroare la fetch jocuri" });
  }
});

app.post("/review", async (req, res) => {
  const { gameName } = req.body;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Scrie un review scurt și entuziast pentru jocul ${gameName}.`,
        },
      ],
    });

    res.json({
      text: response.choices[0].message.content,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Eroare AI" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});