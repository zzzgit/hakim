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
## directives
### is
### gt
### lt
### goe
### loe
### xxx
## plugin
