import { Configuration, OpenAIApi } from "openai";
import { OPENAI_DEFAULT_COMPLETION_MODEL_ID } from "./constants.js";

export async function getAnswer(prompt) {
    if (!!prompt && !!process.env.OPENAI_ORGANIZATION_ID && !!process.env.OPENAI_API_KEY) {
        const configuration = new Configuration({
            organization: process.env.OPENAI_ORGANIZATION_ID,
            apiKey: process.env.OPENAI_API_KEY,
        });

        const openai = new OpenAIApi(configuration);

        try {
            const completion = await openai.createCompletion({
                model: OPENAI_DEFAULT_COMPLETION_MODEL_ID,
                prompt,
                max_tokens: 1000,
                n: 1,
                temperature: 0.3,
            });
            console.log(completion.data.choices[0].text);
        } catch (error) {
            if (error.response) {
                console.log(error.response.status);
                console.log(error.response.data);
            } else {
                console.log(error.message);
            }
        }
    }
}