import axios from "axios";

/** Función que obtiene la tasa de cambio actual de USD a COP
 * 
 * @returns Number - Current conversion rate
 */
export async function getCurrentConversionRate() {
    const response = await axios.get(`https://openexchangerates.org/api/latest.json?app_id=${process.env.OPEN_EXCHANGE_APP_ID}&symbols=USD,COP`);

    // Obtener la tasa de cambio actual de USD a COP
    const currentConversionRate = response.data.rates.COP / response.data.rates.USD;

    return currentConversionRate;
}