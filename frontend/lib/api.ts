export type GeneralPredictionRequestDto = {
    age: number;
    /**
     * `true` - male
     * 
     * `false` - female
     */
    sex: boolean;
    /**
     * In kilograms
     */
    weight: number;
    /**
     * In centimeters
     */
    height: number;
    children: number;
    smoker: boolean;
};

export type MedicalPredictionRequestDto = {
    age: number;
    diabetes: boolean;
    blood_pressure_problems: boolean;
    any_transplants: boolean;
    any_chronic_diseases: boolean;
    /**
     * In kilograms
     */
    weight: number;
    /**
     * In centimeters
     */
    height: number;
    known_allergies: boolean;
    history_of_cancer_in_family: boolean;
    number_of_major_surgeries: number;
};

export type PredictionResponseDto = {
    general: {
        input: GeneralPredictionRequestDto;
        /**
         * In KSh
         */
        prediction: number;
    };
    medical: {
        input: MedicalPredictionRequestDto;
        /**
         * In KSh
         */
        prediction: number;
    };
};

export type PredictionRequestDto = {
    general: GeneralPredictionRequestDto;
    medical: MedicalPredictionRequestDto;
};

export class PredictionError extends Error {
    statusCode: number;
    constructor(errorMessage: string, statusCode: number) {
        super(`${statusCode}: Failed to predict: ${errorMessage}`);
        this.name = "PredictionError";
        this.statusCode = statusCode;
    }
}


/**
 * Predict the insurance premium price for a given input
 * 
 * @param input The input data to predict the insurance premium price for
 * 
 * @returns The prediction response
 * 
 * @throws PredictionError If the prediction fails, usually due to a bad request or a server error
 * 
 * @throws Network related errors and such, basically fetch errors e.g., when there's no internet connection
 * 
 * @example 
 * 
 * import { type PredictionRequestDto, predict } from './api';
 * 
 * const input: PredictionRequestDto = {
 *     general: {
 *         age: 25,
 *         sex: true,
 *         weight: 70,
 *         height: 170,
 *         children: 0,
 *         smoker: false,
 *     },
 *     medical: {
 *         age: 25,
 *         diabetes: false,
 *         blood_pressure_problems: false,
 *         any_transplants: false,
 *         any_chronic_diseases: false,
 *         weight: 70,
 *         height: 170,
 *         known_allergies: false,
 *         history_of_cancer_in_family: false,
 *         number_of_major_surgeries: 0,
 *     },
 * };
 * 
 * const resp = await predict([input]);
 * console.log(resp);
 **/
export async function predict(input: PredictionRequestDto[]): Promise<PredictionResponseDto> {
    const url = `http://127.0.0.1:${process.env.FLASK_PORT || 5000}/api/predict`;
    const resp = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ input }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const resp_text = await resp.text();
    let resp_json: { error?: string; data?: PredictionResponseDto } = {};
    try {
        resp_json = JSON.parse(resp_text);

    } catch { }
    if (!resp_json.data || !resp.ok) {
        const errorMessage = resp_json.error || resp_text;
        throw new PredictionError(errorMessage, resp.status);
    }
    return resp_json.data
}

