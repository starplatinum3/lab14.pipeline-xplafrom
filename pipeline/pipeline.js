
import { repeat, join, range, curry, flip,pipe,map } from 'rambda'

const log = console.log

// 命令式

// 循环，循环变量   <--消除
// 分支           <--消除
 
for (let i = 1; i <= 30; i++) {
    if (i % 15 == 0)
        log("FizzBuzz,");
    else if (i % 3 == 0)
        log("Fizz,");
    else if (i % 5 == 0)
        log("Buzz,");
    else
        log(`${i},`);
}



//data {output:"Fizz",number:3}
export function handle(
    divisor, // e.g. 3, 5, etc
    output, data) // e.g. "Fizz", "Buzz", etc
{
    if (data.output !== "") { return data; }// already processed
    if (data.number % divisor !== 0) {
        return data; // not applicable
    }
    return { output, number: data.number };
}

const logger = curry((info, data) => (log(`${info}:`, data), data))

export const handleCurried = curry(handle)


// 构建函数管道 需要考虑的
// 关键是，管道里面流动的数据的类型
// 这里是用 对象
// data {output:"Fizz",number:3}
// 当需要增加新的逻辑时，不变更现有的代码，只是组合新的代码
const fizzBuzzPipe =
    pipe(
        handleCurried(15, "FizzBuzz"),
        handleCurried(3, "Fizz"),
        handleCurried(5, "Buzz"),
    )

export const process = (i) =>
    fizzBuzzPipe({ output: "", number: i })

const finalStep = (data) => {
    if (data.output !== "")
        return data.output // already proocessed
    else
        return data.number.toString()
}

// 函数式程序设计的关键
// 小的型纯函数 通过高阶函数（组合算子） 构造大函数
// 关键点是 函数的可组合型 
// 柯里化是确保可组合性的一个重要技术
// 注意 学习其中的编程思想

log(pipe(
    logger("start"),
    map(process),
    logger("after process"),
    map(finalStep),
    join(',\n'),
    logger("end"),
)(range(0, 20)))

