import { Strategy as GoogleStrategy,Profile, VerifyCallback } from "passport-google-oauth20";
import prisma from "../lib/prisma";
import dotenv from 'dotenv';

dotenv.config();

export const strategy = new GoogleStrategy(
  {
    clientID: process.env.CLIENT_ID as string,
    clientSecret: process.env.CLIENT_SECRET as string,
    callbackURL: "https://realtime-app-backend.onrender.com/auth/google/callback",
  },
  async (accessToken:string, refreshToken:string, profile:Profile, done:VerifyCallback) => {
    // Here you get the Google profile info
    // Normally you would find or create a user in your DB
    const userEmail = profile.emails ? profile.emails[0].value : undefined;
    const imageUrl = profile.photos ? profile.photos[0].value : ""
    console.log(profile.displayName);
  
    const user = await prisma?.user.findUnique({
      where: {
        email: userEmail
      }
    });
    console.log(user?.email);

    if (!user && userEmail) {
  try {
    const newUser = await prisma?.user.create({
      data: {
        name: profile.displayName,
        email: userEmail,
        avatar: imageUrl,
      },
    });
    return done(null, newUser); // ✅ pass DB user
  } catch (err) {
    return done(err, false);
  }
} else {
  return done(null, false); // ✅ return existing DB user
}

  });