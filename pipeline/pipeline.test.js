import {  handleCurried, process } from "./pipeline.js";

export default {
    "handle": {
        "handleCurried(15, 'FizzBuzz') ": [handleCurried(15, "FizzBuzz")({ output: "", number: 15 }), { "output": "FizzBuzz", "number": 15 }],
        "handleCurried(5, 'Buzz') ": [handleCurried(5, "Buzz")({ output: "", number: 5 }), { "output": "Buzz", "number": 5 }],
        "handleCurried(3, 'Fizz') ": [handleCurried(3, "Fizz")({ output: "", number: 3 }), { "output": "Fizz", "number": 3 }]
        , "handleCurried with output ": [handleCurried(3, "Fizz")({ output: "FizzBuzz", number: 15 }), { "output": "FizzBuzz", "number": 15 }]
        , "handleCurried no action": [handleCurried(3, "Fizz")({ output: "", number: 1 }), { "output": "", "number": 1 }]
    },
    "process": {
        "process 3": [process(3), { "output": "Fizz", "number": 3 }]
        , "process 1": [process(1), { "output": "", "number": 1 }]
    }
}
