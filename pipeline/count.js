import { pipe, map, filter, length, add, multiply } from 'rambda'


let count = 0;
const list = [1, 2, 3, 4]

//命令式
function count_imp() {
    for (let i in list) { // 循环
        let j = i + 2;
        if (j > 3) {    // 分支
            count++;
        }
    }
    return count;
}

console.log(count_imp())

// 只有顺序一种控制,用高阶函数去掉命令式程序中的 循环，分支
// 函数式 pipeline 操作管道
let count_fp = pipe(
    map((x) => x + 2),
    filter((x) => x > 3),
    length
)

console.log(count_fp(list))


console.log(pipe(
    add(1),
    multiply(2)
)(6))