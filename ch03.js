// list.3.6 命令式风格

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


// list.3.7 函数式风格 
import _ from 'lodash'

const isValid = val => !_.isUndefined(val) && !_.isNull(val);

const resultfp = _.chain(names)  //<--- 初始化函数链（该话题会马上涉及）
    .filter(isValid) //<--- 去除非法值
    .map(s => s.replace(/_/, ' ')) //<--- 规范化值
    .uniq() //<--- 去掉重复元素
    .map(_.startCase) //<--- 大写首字母
    .sort()
    .value();

console.log(resultfp)
//-> ['Alonzo Church', 'Haskell Curry', 'Jon Von Neumann','Stephen Kleene']


// list.3.8  SQL like programming

import {Person} from './Person.js'
import {Address} from './Address.js'

const p5 = new Person('David', 'Hilbert', '555-55-5555');
p5.address = new Address('Germany');
p5.birthYear = 1903;

const p6 = new Person('Alan', 'Turing', '666-66-6666');
p6.address = new Address('England');
p6.birthYear = 1912;

const p7 = new Person('Stephen', 'Kleene', '777-77-7777');
p7.address = new Address('US');
p7.birthYear = 1909;

const persons = [p5,p6,p7]

const gatherStats = function (stat, country) {
    if (!isValid(stat[country])) {
        stat[country] = { 'name': country, 'count': 0 };
    }
    stat[country].count++;
    return stat;
};
 

let personchain = _.chain(persons) //<--- 创建惰性计算函数链来处理给定的数组
    .filter(isValid)
    .map(_.property('address.country')) //<--- 使用 _.property 抽取 person 对象的address.country 属性。这是 Ramda 的 R.view() 的 Lodash 对应版本，虽然Lodash 的版本没有那么功能丰富
    .reduce(gatherStats, {})
    .values()
    .sortBy('count')
    .reverse()
    .first()
    .value() // <--- 执行函数链中的所有函数

console.log(personchain)


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

    console.log(personsql)

//-> ['Alan', 'Barkley', 'John']