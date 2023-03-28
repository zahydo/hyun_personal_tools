import { getCurrentConversionRate } from './external/openexchangerates.js';



/** Función que calcula la pérdida de comprar BUSD con tarjeta de crédito y vender en Binance P2P
 * 
 * @param {*} amount The desired amount to buy with credit card
 * @param {*} conversionRate Specific conversion rate in COP to use in the maths
 * @param {*} creditCardConversionRate Define the Conversion Rate from the Credit Card to a BUSD (default 1.02)
 */
export default async function calculateLoss(amount, conversionRate, creditCardConversionRate = 1.02) {
    if (!!amount) {
        console.log("Current Date: ", (new Date()).toString())
        // Obtener la tasa de cambio
        const currentConversionRate = !!conversionRate ? conversionRate : await getCurrentConversionRate();
        console.log("currentConversionRate: ", currentConversionRate)
    
        // Calcular el costo en COP al comprar BUSD con tarjeta de crédito
        const costInCOP = Math.ceil(amount * creditCardConversionRate * currentConversionRate);
        console.log("costInCOP: ", costInCOP)
    
        // Calcular la cantidad de BUSD obtenida después de comprar con tarjeta de crédito
        const BUSDReceived = Math.ceil(amount / creditCardConversionRate);
        console.log("BUSDReceived: ", BUSDReceived)
    
        // Calcular la cantidad de COP obtenida después de vender BUSD en Binance P2P
        const COPReceived = Math.ceil(BUSDReceived * currentConversionRate);
        console.log("COPReceived: ", COPReceived)
    
        // Calcular la pérdida
        const loss = costInCOP - COPReceived;
    
        console.log("La pérdida en %: ", loss / costInCOP * 100)
        console.log("La pérdida en COP: ", loss)
    } else {
        console.error("Debes ingresar el monto: node calculateLoss 500")
    }
}