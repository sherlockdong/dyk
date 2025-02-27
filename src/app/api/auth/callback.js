// pages/api/auth/callback.js
import { getOAuth2Client } from "../../../lib/googleAuth";

export default async function handler(req, res) {
  const oauth2Client = getOAuth2Client();
  const code = req.query.code;
  
  if (!code) {
    return res.status(400).json({ error: "Authorization code not provided" });
  }

  try {
    // Exchange authorization code for access and refresh tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    
    // Here you should save tokens in a secure way (e.g., session, database, secure cookie)
    // For now, we just return them in the response for demonstration
    res.status(200).json({ message: "Authentication successful", tokens });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
