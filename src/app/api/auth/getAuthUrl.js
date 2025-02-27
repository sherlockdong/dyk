// pages/api/auth/getAuthUrl.js
import { getOAuth2Client } from "../../../lib/googleAuth";

export default function handler(req, res) {
  const oauth2Client = getOAuth2Client();
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline", // To receive a refresh token
    scope: ["https://www.googleapis.com/auth/calendar"],
  });
  res.status(200).json({ authUrl });
}
