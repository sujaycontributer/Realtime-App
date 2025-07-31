import { server } from "../manager/IoManager";
import { app } from "../manager/IoManager";
import prisma from "../lib/prisms";

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
                optionD:options[3] 
            }
        });
    } catch (error) {
        res.send("Error while creating problem" + error);
    }

    res.status(200).json({
        message: "Problem created!"
    });

});

app.post('/problemset', async (req, res) => {

})

