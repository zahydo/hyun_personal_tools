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
            getAnswer(`Based on this quality Attribute: '${params[0]}', give me a list of the top 10 architectural tactics and patterns that can be used to achieve this quality attribute.`)
            break;
        default:
            console.error('Error: función no encontrada');
    }
}

// Get arguments from command line
const funcName = process.argv[2];
const params = process.argv.slice(3);

execute(funcName, params);