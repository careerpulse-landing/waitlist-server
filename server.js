import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_ROLE_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/waitlist", async (req, res) => {
  const { email } = req.body;
  console.log("📩 Incoming email:", email);

  if (!email || typeof email !== "string") {
    return res.status(400).json({ message: "Invalid email" });
  }

  const { error } = await supabase.from("waitlist").insert([{ email }]);
  if (error && error.code !== "23505") {
    console.error("Supabase insert error:", error);
    return res.status(500).json({ message: "Failed to save email" });
  }

  try {
    await resend.emails.send({
      from: "MyRise <noreply@trackmyrise.live>",
      to: [email],
      subject: "You're on the waitlist 🚀",
      html: `<h2>Welcome to Track My Rise</h2><p>We’ll be in touch soon.</p>`
    });
  } catch (e) {
    console.error("Email send error:", e);
  }

  res.status(200).json({ message: `You're on the waitlist, ${email}!` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
