import { join, range, curry, pipe } from 'rambda'

import S from 'sanctuary'



const log = console.log

// 命令式

// 循环，循环变量   <--消除
// 分支           <--消除

for (let i = 0; i <= 30; i++) {
    if (i % 7 == 0) {  // 空值/异常值处理
        //bypass 
        log("nothing,")
    }
    else {            // 正常业务流程
        if (i % 15 == 0)
            log("FizzBuzz,");
        else if (i % 3 == 0)
            log("Fizz,");
        else if (i % 5 == 0)
            log("Buzz,");
        else
            log(`${i},`);
    }
}



// data {output:"Fizz",number:3}
// Left("Fizz") or Right(3)
function handle(
    divisor, // e.g. 3, 5, etc
    output, data) // e.g. "Fizz", "Buzz", etc
{
    if (S.isLeft(data)) { return data; }// already processed
    if (data.value % divisor !== 0) {
        return data; // not applicable
    }
    return S.Left(output);
}

const logger = curry((info, data) => (console.log(`${info}:\n`, data), data))

//加入Maybe对象，引入异常值
//7的倍数是异常值
//[1,2,3,4,5,6,7]
//[Nothing,2,3,4,5,6,Nothing]

const toMaybe = curry((divisor, n) => (n % divisor) ? S.Just(n) : S.Nothing)

const handleCurried = curry(handle)


// 构建函数管道 需要考虑的
// 关键是，管道里面流动的数据的类型 
// 这里是用 Maybe 包裹的 Either monad
// Nothing Just(Left("Fizz")) Just(Right(3))

const fizzBuzzPipe =
    pipe(
        handleCurried(15, "FizzBuzz"),
        handleCurried(3, "Fizz"),
        handleCurried(5, "Buzz"),
    )

const process = (i) =>
    fizzBuzzPipe(S.Right(i))


const finalStep = (data) =>  data.value.toString()

const Id = (data) => {
    if (S.isNothing(data)) { return "nothing" }
    else {
        return data.value
    }
}
// 函数式程序设计的关键
// 代码加入了异常值的处理 没有改变 可以复用的函数 process,finalStep
// OCP 原则 ，对增加功能是开放的，对修改是封闭的
// 用 Functor Monad 设计模式 包裹
// S.map 将 操作process finalStep 应用到 Monad  内部的封装值上。

console.log(pipe(
    logger("start"),
    S.map(toMaybe(7)),
    logger("toMaybe(7)"),
    // S.map(S.map((x) => x * 2)),  // 理解这里  S.map S.map 的原因
    logger("after double"),
    S.map(S.map(process)),     // 外面的S.map 是列表处理，里面的S.map，是对 Maybe 对象的处理
    logger("after process"),
    S.map(S.map(finalStep)),
    logger("after finalStep"),
    S.map(Id),
    join(',\n'),
    logger("end"),
)(range(0, 30)))

// 如果 代码中有异步操作，可以用类似的机制，将异步操作抽象处理