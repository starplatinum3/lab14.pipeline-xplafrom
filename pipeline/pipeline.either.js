import { join, range, curry, pipe,map } from 'rambda'

import S from 'sanctuary'

// data {output:"Fizz",number:3}
// Left("Fizz") or Right(3)
export function handle(
    divisor, // e.g. 3, 5, etc
    output, data) // e.g. "Fizz", "Buzz", etc
{
    if (S.isLeft(data) ) { return data; }// already processed
    if (data.value % divisor !== 0) {
        return data; // not applicable
    }
    return S.Left(output);
}

const logger = curry((info, data) => (console.log(`${info}:\n`, data), data))

export const handleCurried = curry(handle)


// 构建函数管道 需要考虑的
// 关键是，管道里面流动的数据的类型
// 这里是用 Either monad
// Left("Fizz") Right(3)

const fizzBuzzPipe =
    pipe(
        handleCurried(15, "FizzBuzz"),
        handleCurried(3, "Fizz"),
        handleCurried(5, "Buzz"),
    )

export const process = (i) =>
    fizzBuzzPipe(S.Right(i))

const finalStep = (data) =>  data.value.toString()


// 函数式程序设计的关键
// 小的型纯函数 通过高阶函数（组合算子） 构造大函数
// 关键点是 函数的可组合型 
// 柯里化是确保可组合性的一个重要技术
// 注意 学习其中的编程思想

console.log(pipe(
    logger("start"),
    map(process),
    logger("after process"),
    map(finalStep),
    join(',\n'),
    logger("end"),
)(range(0, 20)))

