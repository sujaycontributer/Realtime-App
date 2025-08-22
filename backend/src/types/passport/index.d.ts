import { User } from '@prisma/client';
import { Profile } from 'passport-google-oauth20';

// This declares that the user object managed by Passport can be either 
// a user from your database or a Google profile.
declare module 'passport' {
  interface User extends Pick<Profile, 'id' | 'emails' | 'displayName' | 'photos'> {}
}