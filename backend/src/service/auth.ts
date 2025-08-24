// Corrected code for src/service/auth.ts
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import prisma from "../lib/prisma";
import dotenv from 'dotenv';

dotenv.config();

export const strategy = new GoogleStrategy(
  {
    clientID: process.env.CLIENT_ID as string,
    clientSecret: process.env.CLIENT_SECRET as string,
    callbackURL: process.env.CALLBACK_URL as string,
  },
  async (accessToken:string, refreshToken:string, profile:Profile, done:VerifyCallback) => {
    const userEmail = profile.emails ? profile.emails[0].value : undefined;
    const imageUrl = profile.photos ? profile.photos[0].value : "";
    console.log(profile.displayName);
  
    try {
      const user = await prisma?.user.findUnique({
        where: {
          email: userEmail
        }
      });
      console.log(user?.email);
  
      if (user) {
        // Correct logic: If user exists, return the user object to Passport
        return done(null, user); 
      } else if (userEmail) {
        // Correct logic: If user does not exist, create a new one
        const newUser = await prisma?.user.create({
          data: {
            name: profile.displayName,
            email: userEmail,
            avatar: imageUrl,
          },
        });
        return done(null, newUser);
      }
    } catch (err) {
      return done(err as Error);
    }
  }
);