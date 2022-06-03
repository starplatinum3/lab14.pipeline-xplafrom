

## 圈复杂度计算

http://kaelzhang81.github.io/2017/06/18/%E8%AF%A6%E8%A7%A3%E5%9C%88%E5%A4%8D%E6%9D%82%E5%BA%A6/

- 代码复杂度 = 分支节点个数 + 1

### 函数式编程

- 通过消除 `循环与分支`，降低代码复杂度
  - 只使用 `顺序`  代码总体的圈复杂度最低

- 通过无副作用小函数，降低代码耦合，提高代码的组合能力
- 机制

  - 一系列的高阶 算子 map filter reduce（函数）
  - 设计 函数的组合接口（类型）
  - 利用柯里化机制(Curry)将函数全部设计为 单值函数

- 复杂度无法消除
  - 函数式基本算子
    - Ramda库里面的基本函数，是 构建机制 `Building Block`

  - 接口类型的设计
    - 代数数据类型
    - Monad 设计模式


## pipeline Desgn

https://bb.zucc.edu.cn/bbcswebdav/users/j04014/softarch/lec01.PipelinedDesign.zip

- 代码  https://github.com/swlaschin/pipeline_oriented_programming_talk

- 视频、讲义 https://fsharpforfunandprofit.com/pipeline/

## JavaScript函数式编程指南

## 3.4 代码推理 (p95)

比较下面的代码风格，命令式与函数式的程序控制流

- 命令式 有显式`循环，分支`
- 函数式 只有 `顺序 pipeline `

```js
// 3.6 命令式风格  for if 

var names = ['alonzo church', 'Haskell curry', 'stephen_kleene',
    'John Von Neumann', 'stephen_kleene'];

var result = [];
for (let i = 0; i < names.length; i++) { //<--- 遍历数组中的所有名字
    var n = names[i];
    if (n !== undefined && n !== null) { //<--- 检查所有词是否都合法
        var ns = n.replace(/_/, ' ').split(' '); //<--- 数组包含格式不一致的数据。这是规范化（修复）元素的步骤
        for (let j = 0; j < ns.length; j++) {
            var p = ns[j];
            p = p.charAt(0).toUpperCase() + p.slice(1);
            ns[j] = p;
        }
        if (result.indexOf(ns.join(' ')) < 0) { //<--- 检查是否已存在于结果中，以去除重复的元素
            result.push(ns.join(' '));
        }
    }
}
result.sort(); //<--- 数组

console.log(result)


// 3.7 函数式风格  pipeline
import _ from 'lodash'

const isValid = val => !_.isUndefined(val) && !_.isNull(val);

const resultfp = _.chain(names)    //<--- 初始化函数链（该话题会马上涉及）
    .filter(isValid)                          //<--- 去除非法值
    .map(s => s.replace(/_/, ' ')) //<--- 规范化值
    .uniq()                                 //<--- 去掉重复元素
    .map(_.startCase)              //<--- 大写首字母
    .sort()
    .value();

console.log(resultfp)

//-> ['Alonzo Church', 'Haskell Curry', 'Jon Von Neumann','Stephen Kleene']
```



## Lodash 函数链程序的控制流程

通过一系列操作对person对象数组进行 处理。数据沿着函数链传递，并最终转化为单一值。

 清单3.8能够写得如此流畅与函数式编程中的纯性以及无副作用的基本原则息息相关。链中的每个函数都以一种不可变的方式来处理由上一个函数构建的新数组。Lodash 利用函数链这种模式，通过调用 _.chain() 提供了一种基础功能，以满足各种需求。 



```sql
SELECT p.firstname, p.birthYear FROM Person p
WHERE p.birthYear > 1903 and p.country IS NOT 'US'
GROUP BY p.firstname, p.birthYear
```

lodash的`mixin`方法 ，给现有的函数重新命名，类似于SQL 语法，`声明式编程`

```
// Sql like 

_.mixin({
    'select': _.map,
    'from': _.chain,
    'where': _.filter
});

let personsql = _.from(persons)
    .where(p => p.birthYear > 1900 && p.address.country !== 'US')
    .sortBy(['_firstname'])
    .select(rec => rec.firstname)
    .value();
```

链式流程，降低了程序复杂度，但是 异常值，异步值的问题，依然无法解决，于是有了下面的函数式编程设计技巧

## Monad Maybe Either

是函数式编程中为解决特定问题的 [设计模式](https://blog.ploeh.dk/2017/10/04/from-design-patterns-to-category-theory/)

- Maybe 解决 空值问题
  - 面向对象设计模式 [空对象模式](https://cloud.tencent.com/developer/article/1922390)

- Either 解决多个返回值问题
- Monad 解决 链式调用返回的嵌套值问题

[The Functional Programmer's Toolkit.pdf](The Functional Programmer's Toolkit.pdf)

所有的设计模式，都是为了保证，函数式程序设计中

- 各个函数/模块的 `可组合性`
- 函数的可复用性

[pipeline/readme.md](pipeline/ReadME.md)

```js
                  
var Maybe = function(x) {
  this.__value = x;
}

Maybe.of = function(x) {
  return new Maybe(x);
}

Maybe.prototype.isNothing = function() {
  return (this.__value === null || this.__value === undefined);
}

Maybe.prototype.map = function(f) {
  return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
}

Maybe.of("Malkovich Malkovich").map(match(/a/ig));
//=> Maybe(['a', 'a'])

Maybe.of(null).map(match(/a/ig));
//=> Maybe(null)

const R = require('rambda')

Maybe.of({name: "Boris"}).map(R.prop("age")).map(add(10));
//=> Maybe(null)

Maybe.of({name: "Dinah", age: 14}).map(R.prop("age")).map(add(10));
//=> Maybe(24)

//  safeHead :: [a] -> Maybe(a)
var safeHead = function(xs) {
  return Maybe.of(xs[0]);
};

var streetName = compose(map(_.prop('street')), safeHead, _.prop('addresses'));

streetName({addresses: []});
// Maybe(null)

streetName({addresses: [{street: "Shady Ln.", number: 4201}]});
// Maybe("Shady Ln.")

```

Promise.then 方法 本质上是 函数式编程中的 Monad 设计模式

- 没有Promise 的时候，必须用嵌套的 回调 （命令式程序风格）

- Promise 简化了流程，流式接口 （pipeline 函数式风格）

  ```js
  function later () {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve("yay"), 1500)
    })
  }
  
  var p = later()
  // then 相当于 Monad的 chain 方法
  // then 本身是高阶函数，then 的参数 是 可复用的 函数，将普通的函数，复用到异步操作上
  p .then(x => x + x )
    .then(x => x.toUpperCase())
    .then(x => console.log(x))
  ```

  


## 异步问题的 函数式设计案例

- https://js-sigcc.vercel.app/#/16async/ReadME
  - 请比较多个方案 思考 函数式设计技巧的运用
  - 将 可能返回异常、异步值的函数，构造成 函数式的管道化设计 pipeline design

## JavaScript函数式编程指南 ch05

##  值容器

- List 列表
- Maybe 可空值
- Promise 异步值

 ## 值操作

- map
- chain

https://gitee.com/mirrors_luijar/functional-programming-js/blob/master/src/ch05/jest/ch05.test.js

## algebraic structures 

https://github.com/fantasyland/fantasy-land/blob/master/README.md
