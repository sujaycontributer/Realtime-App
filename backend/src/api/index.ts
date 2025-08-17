import express from 'express'
import cors from 'cors'
import { app } from "../manager/IoManager";
import prisma from "../lib/prisma";


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hey 🤡!");
});

app.post('/problemset', async (req, res) => {
    const {setName} = req.body;

    const problemSet = await prisma?.problemset.create({
            data: {
                setName: setName
            }
    });
    return res.status(200).json({
        status:200,
        message: "Problem is created!" ,
        problemSet});    

});

app.get('/problemset', async (req, res) => {

    try {
        const allProblem = await prisma?.problemset.findMany({
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

});

app.post('/problem', async (req, res) => {
    const {problemSetId, problemName, options} = req.body;

    try {
        await prisma?.problem.create({
            data: {
                problemSetId,
                problemName,        
                optionA:options[0],          
                optionB:options[1],          
                optionC:options[2],          
                optionD:options[3], 
                ans: options[4]
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
    const {problemSetId} = req.body;

    try {
        const problems = await prisma?.problem.findMany({
            where: {
                problemSetId
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



