import calculateLoss from "./src/services/calculateLoss.js";
import scaleImagesFromFolder from "./src/services/scaleImagesFromFolder.js";

function execute(funcName, params) {
    switch (funcName) {
        case 'scaleImagesFromFolder':
            scaleImagesFromFolder(params[0]);
            break;
        case 'calculateLoss':
            calculateLoss(params[0], params[1], params[2]);
            break;
        default:
            console.error('Error: función no encontrada');
    }
}

// Get arguments from command line
const funcName = process.argv[2];
const params = process.argv.slice(3);

execute(funcName, params);