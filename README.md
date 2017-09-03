[![Build Status](https://travis-ci.org/zzzgit/hakim.png)](https://travis-ci.org/zzzgit/hakim)

# hakim
a javascript validation lib
https://www.npmjs.com/package/hakim
## why
It has been a long time since I need to find a javascript validation lib. Every libs I found on github is not suit for me. So finally I decided to make a new wheel.
## design
```javascript
let hakim = new Hakim(rules)
hakim.validate("value")
```
It is the basic form of usage of `Hakim`. 
The rules should be an array, e.g:
```javascript
[{is: "number"}, {is: "integer"}]
```
The elements of the array consist of a directive and an operand. e.g `is` is the directive and `"number"` is the operand.
the elements will be performed one by one, follow the order of their indexes in the array. If one rule fails, the whole process will be failed. 
If you want an or behavior, just append a Boolean value to the end of the array.
```javascript
let hakim = new Hakim([{is: "empty"}, {is: "number"}, {is: "email"}, true])
hakim.validate("")  // true
hakim.validate("123.4")  // true
hakim.validate("fatus@sky.com")  // true
```
The element itself can be an array too, e.g:
```javascript
let rules = new Hakim([{is: "empty"}, [{is: "number"}, {is: "integer"}]])
```
## installation
to install via npm, run:
`npm install hakim`
## load
load hakim in node.js:
```javascript
let Hakim = require('hakim');
// use math.js
new Hakim([{is: "number"}, {is: "integer"}]).validate(2) // is will be true
```
## usage
..
## directives
### is
whether the string represent a special string or number
### includes
whether the string includes a certain type of string
### contains
whether the string contains a certain substring
### gt
whether it is greater than the operand
### lt
whether it is lower than the operand
### goe
whether it is greater than or equal to the operand
### loe
whether it is lower than or equal to the operand
### test
whether it can return a truthy value from the regular express
### dplacesGt
whether the digits of decimal part is greater than the operand 
### dplacesLt
whether the digits of decimal part is Lower than the operand 
### lengthGt
whether the length of the string is greater than the operand
### lengthLt
whether the length of the string is lower than the operand
### beginWith
whether the string begin with the operand
### notBeginWith
whether the string don't begin with the operand
## types for is
### number
whether the string represent a number
### integer
whether the string represent an integer
### positive
whether the string represent a positive number
### decimal
whether the string represent a decimal number
### latin
whether the string consist of latin letter
### enLetter
whether the string consist of english letter
### email
whether the string contains a email
### empty
whether the string is ""
### money
whether the string represent a number which has less than two decimal digits
### qq
whether the string represent a qq number
### cellphone
..
### ip
whether the string represent an ip address
### url
whether the string represent a url
## logic conjunction and disjunction
it depends on you whether the rules passed into the construction function will behave in a logic conjunction manner or a disjunction manner. you can set it by appending an additional truthy value into the rules array. e.g:
```javascript
new Hakim([{is: "number"}, {is: "empty"}, true]).validate("2.3")
```
it will be false by default.
## plugin
Third-party plugins are available by means of the plugin API. Currently only the `is` directive can be extended.
If you want to define a plugin which extend Hakim to have a capability to judge whether the operand is a binary number, it should be like this:



alphanumeric
