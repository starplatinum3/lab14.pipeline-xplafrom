import { pipe, map, filter, length, add, multiply,prop ,
    // ,average,value
    sum
} from 'rambda'
// rambda average


let enrollment = [
    {enrolled: 2, grade: 100},
    {enrolled: 2, grade: 80},
    {enrolled: 1, grade: 89}
  ];

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

// console.log(count_imp())

// 只有顺序一种控制,用高阶函数去掉命令式程序中的 循环，分支
// 函数式 pipeline 操作管道
let count_fp = pipe(
    map((x) => x + 2),
    filter((x) => x > 3),
    length
)

let average=(arr)=>{
    console.log("arr");
    console.log(arr);
    let sum=0;
    for(let  i=0;i<arr.length;i++){
        sum+=arr[i];
    }
    return sum/arr.length
    // alert(sum/arr.length);
}

// let avgScore = pipe(
//     filter(student => student.enrolled > 1),
//     // R.propEq('grade', 2),
//     // R.prop('grade'),
//     map(prop('grade')) ,
//     average(),
//     // map((x) => x + 2),
//     // value()
//     sum()
//     // length
// )

let avgScore = pipe(
    filter(student => student.enrolled > 1),
    // R.propEq('grade', 2),
    // R.prop('grade'),
    map(prop('grade')) ,
    // average(),
    average,
    // sum
    // map((x) => x + 2),
    // value()
    // sum()
    // length
)

let res= avgScore(enrollment)
console.log("res");
console.log(res);

// console.log(count_fp(list))
// arr
// [ 100, 80 ]
// res
// 90


// console.log(pipe(
//     add(1),
//     multiply(2)
// )(6))