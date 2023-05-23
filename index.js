import calculateLoss from "./src/services/calculateLoss.js";
import { getAnswer } from "./src/services/openAI.js";
import scaleImagesFromFolder from "./src/services/scaleImagesFromFolder.js";
import dotenv from 'dotenv';
dotenv.config();


async function execute(funcName, params) {
    switch (funcName) {
        case 'scaleImagesFromFolder':
            scaleImagesFromFolder(params[0]);
            break;
        case 'calculateLoss':
            calculateLoss(params[0], params[1], params[2]);
            break;
        case 'openAI':
            getAnswer(`Act as a software architect and based on this design decision: '${params[0]}', give me a list of the top 5 architectural patterns with their respective architectural tactics that can be used to complement this design decision. Response in the language of the design decision entered.`)
            break;
        default:
            console.error('Error: función no encontrada');
    }
}

// Get arguments from command line
const funcName = process.argv[2];
const params = process.argv.slice(3);

execute(funcName, params);