import { Strategy as GoogleStrategy,Profile, VerifyCallback } from "passport-google-oauth20";
import prisma from "../lib/prisma";
import dotenv from 'dotenv';

dotenv.config();

console.log(process.env.CLIENT_ID)

export const strategy = new GoogleStrategy(
  {
    clientID: process.env.CLIENT_ID as string,
    clientSecret: process.env.CLIENT_SECRET as string,
    callbackURL: "http://localhost:3000/auth/google/callback",
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
        await prisma?.user.create({
          data: {
            name: profile?.displayName,
            email: userEmail,
            avatar: imageUrl
          }
        });
        console.log("Hi");

        // const id = profile.id;
        // const name = profile.displayName;
        // const email = profile.emails;
        // const avatar = profile.photos ? profile.photos[0].value : undefined;
        // console.log("Google profile:", avatar);
        return done(null, profile);

      } catch (err) {
        return done(err, profile);
      }
    } else{
      return done(null, profile);
    }

  });