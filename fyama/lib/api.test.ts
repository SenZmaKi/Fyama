import { type PredictionRequestDto, predict } from './api';
// @ts-ignore
import { test } from "bun:test"

test(async () => {
    const input: PredictionRequestDto = {
        general: {
            age: 25,
            sex: true,
            weight: 70,
            height: 170,
            children: 0,
            smoker: false,
        },
        medical: {
            age: 25,
            diabetes: false,
            blood_pressure_problems: false,
            any_transplants: false,
            any_chronic_diseases: false,
            weight: 70,
            height: 170,
            known_allergies: false,
            history_of_cancer_in_family: false,
            number_of_major_surgeries: 0,
        },
    };
    const resp = await predict([input]);
    console.log(resp);
})   