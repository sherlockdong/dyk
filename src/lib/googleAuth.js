// lib/googleAuth.js
import { google } from "googleapis";

export const getOAuth2Client = () => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI // e.g., "http://localhost:3000/api/auth/callback"
  );
  return oauth2Client;
};
