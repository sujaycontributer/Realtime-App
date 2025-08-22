import express from 'express'
import cors from 'cors'
import { app } from "../manager/IoManager";
import prisma from "../lib/prisma";
import session from "express-session";
import passport from "passport";
import { strategy } from '../service/auth';
import { VerifyCallback,  Profile } from 'passport-google-oauth20';

const BACKEND_URL = "https://realtime-app-backend.onrender.com"


app.use(cors({
    origin: ["https://xyzquiz.netlify.app", "http://localhost:5173"],
    credentials: true // allow cookies
}));

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY as string,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(strategy);

passport.serializeUser((user, done:VerifyCallback) => {
    //@ts-ignore
    const email = user.emails[0]?user.emails[0].value: undefined;

    done(null, email);
});

// Deserialize user from session
passport.deserializeUser(async (userEmail:string, done:VerifyCallback) => {

    try{
        const user = await prisma?.user.findUnique({
            where:{
                email: userEmail as string
            }
        });
        if(user)
        done(null, user);
        
    }catch (err) {
        done(err);
    }
});

app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google redirects back here
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful login -> create session
    res.redirect("/");
  }
);



app.get('/', (req, res) => {
    res.send("Hey 🤡!");
});

app.get('/auth/status', (req, res) => {
    
    // //@ts-ignore
    // const email = req.user.email;
    // //@ts-ignore
    // const imageUrl = req.user?.photos? profile.photos[0].value : ""
    // if(req.isAuthenticated()) console.log(req.user);


  if (req.isAuthenticated()) {
    // User is authenticated, send a success status and user data
    res.status(200).json({ isAuthenticated: true, user: req.user });
  } else {
    // User is not authenticated, send a failure status
    res.status(200).json({ isAuthenticated: false });
  }
});

app.post('/problemset', async (req, res) => {
    let email = undefined;
    //@ts-ignore
    if(req.isAuthenticated && req.isAuthenticated()) email = req.user.emails ? profile.emails[0].value : undefined;
    const {setName} = req.body;

    const problemSet = await prisma?.problemset.create({
            data: {
                setName: setName,
                emailId: email
            }
    });
    return res.status(200).json({
        status:200,
        message: "Problem set is created!" ,
        problemSet});    

});

app.get('/problemset', async (req, res) => {
    let email = undefined;
    if(req.isAuthenticated && req.isAuthenticated()){
            //@ts-ignore
         email = req.user.email;
        try {
        const allProblem = await prisma?.problemset.findMany({
            where:{
                emailId: email
            },
            include: {
                problems: true
            }
        });
        return res.status(200).json({
            problemSet: allProblem 
        });

        } catch (err) {
        return res.status(500).json("Error while finding problem set" + (err as any).message);
        }
    }else{
        res.status(401).json({message: "Unauthorized"});
    }

});

app.post('/problem', async (req, res) => {
    let email = undefined;
    //@ts-ignore
    if(req.isAuthenticated && req.isAuthenticated()) email = req.user.email;
    else res.status(401).json({message: "Not Authorized"});

    const {problemSetId, problemName, options, ansOption} = req.body;

    try {
        await prisma?.problem.create({
            data: {
                problemSetId,
                problemName,        
                optionA:options[0],          
                optionB:options[1],          
                optionC:options[2],          
                optionD:options[3], 
                ans: ansOption
            }
        });
    } catch (error) {
        res.status(500).json("Error while creating problem" + error);
    }

    res.status(200).json({
        message: "Problem created!"
    });

});

app.get('/problem', async (req, res) => {
    let email = undefined;
    //@ts-ignore
    if(req.isAuthenticated && req.isAuthenticated()) email = req.user.email;
    const {setName} = req.body;
    const {problemSetId} = req.body;

    try {
        const problems = await prisma?.problemset.findMany({
            where: {
                emailId: email,
                setName: setName
            },
            include:{
                problems: true
            }
        });
        res.status(200).json({
            problems: problems,    
            message: "Problem created!"
        });

    } catch (error) {
        res.status(500).json("Error while creating problem" + error);
    }

});



