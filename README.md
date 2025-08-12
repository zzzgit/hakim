# hakim

[![NPM Version](https://img.shields.io/npm/v/hakim)](https://www.npmjs.com/package/hakim)

A lightweight, flexible validation library for JavaScript that works in both browser and Node.js environments.
<https://www.npmjs.com/package/hakim>

## Why Hakim?

Hakim provides a powerful yet simple validation system that handles both string and numeric values with the same API. This is particularly useful for browser environments where form inputs are often strings even when representing numbers.

Key features:
- Unified validation for strings and numbers
- Composable validation rules for complex validations
- Flexible logic operators (AND/OR) for combining rules
- Extensible plugin system for custom validators
- Modern ES module format with browser and Node.js support

## Installation

To install via npm:

```bash
npm install hakim
```

## Usage

Import Hakim in your JavaScript project:

```javascript
// ESM import
import Hakim, { anyOf } from 'hakim';

// Or in browser with script tag
<script src="path/to/hakim.js"></script>
```

## Basic Concept

The core concept of Hakim is simple:

```javascript
const validator = new Hakim(rules);
validator.validate(value); // returns true or false
```

Where `rules` is an array of validation rules, and each rule consists of a validator and an operand:

```javascript
[{is: "number"}, {is: "integer"}]
```

In the above example, `is` is the validator and `"number"` is the operand. Each rule is executed in order, and all rules must pass for the validation to succeed (AND logic by default).

### Key Features

1. Unified validation for both numbers and strings
2. Multiple rules can be combined to create complex validations
3. Configurable logic operators (AND/OR) for rule processing
4. Support for nested rule groups

### Examples

Basic validation:
```javascript
import Hakim from 'hakim';

// Validate an integer
new Hakim([{is: "number"}, {is: "integer"}]).validate(2); // true
new Hakim([{is: "number"}, {is: "integer"}]).validate("2"); // true
new Hakim([{is: "number"}, {is: "integer"}]).validate(2.5); // false

// Validate an email
new Hakim([{is: "email"}]).validate("user@example.com"); // true
```

Using OR logic with `anyOf`:
```javascript
import Hakim, { anyOf } from 'hakim';

// Value must be empty OR a number OR an email
new Hakim(anyOf([
  {is: "empty"}, 
  {is: "number"}, 
  {is: "email"}
])).validate("user@example.com"); // true
```

Nested rules:
```javascript
// Must be empty OR (a number AND an integer)
new Hakim([
  {is: "empty"}, 
  [{is: "number"}, {is: "integer"}]
]).validate(""); // true
```

## Validators

Hakim provides a rich set of validators to create expressive validation rules:

### Value Type Validators

| Validator | Description |
|-----------|-------------|
| `is` | Checks if a value matches a predefined entity type (e.g., number, email) |
| `isNot` | Negates the `is` validator |
| `equal` | Checks if a value equals the operand (uses `==`) |
| `match` | Tests if a string matches a regular expression pattern |
| `required` | Checks if a value is not empty |

### Number Validators

| Validator | Description |
|-----------|-------------|
| `gt` | Greater than |
| `lt` | Less than |
| `goe` | Greater than or equal |
| `loe` | Less than or equal |
| `dplacesGt` | Decimal places greater than |
| `dplacesLt` | Decimal places less than |
| `dlengthOf` | Decimal places equals |

### String Validators

| Validator | Description |
|-----------|-------------|
| `lengthOf` | String length equals |
| `lengthGt` | String length greater than |
| `lengthLt` | String length less than |
| `beginWithSub` | String begins with a substring |
| `notBeginWithSub` | String does not begin with a substring |
| `hasString` | String contains a substring |

### Character Set Validators

| Validator | Description |
|-----------|-------------|
| `are` | All characters in string belong to a character set |
| `exists` | String contains characters from a character set |
| `startWithSet` | String starts with a character from a set |
| `notStartWithSet` | String does not start with a character from a set |

## Entity Types

Entity types are used with the `is` and `isNot` validators to check if a value represents a specific type of data:

| Entity | Description |
|--------|-------------|
| `number` | Validates if value is a number (or string representing a number) |
| `integer` | Validates if value is an integer |
| `decimal` | Validates if value is a decimal number |
| `positive` | Validates if value is a positive number |
| `negative` | Validates if value is a negative number |
| `email` | Validates if value is a valid email address |
| `empty` | Validates if value is `""`, `null`, `undefined` or `[]` |
| `ip` | Validates if value is a valid IP address |
| `url` | Validates if value is a valid URL |
| `string` | Validates if value is a string |

Example:
```javascript
// Check if value is a number
new Hakim([{is: "number"}]).validate("123"); // true

// Check if value is an email
new Hakim([{is: "email"}]).validate("test@example.com"); // true
```

## Character Sets

Character sets are used with the `are`, `exists`, `startWithSet`, and `notStartWithSet` validators:

| Character Set | Description |
|---------------|-------------|
| `latin` | Latin letters (a-z, A-Z) |
| `enLetter` | English letters (same as latin) |
| `digit` | Numeric digits (0-9) |

Example:
```javascript
// Check if all characters are digits
new Hakim([{are: "digit"}]).validate("12345"); // true
new Hakim([{are: "digit"}]).validate("123a5"); // false

// Check if string contains any digits
new Hakim([{exists: "digit"}]).validate("abc123"); // true
```

## Logic Operations

By default, Hakim processes rules with AND logic (all rules must pass), but you can change this using the `anyOf` function for OR logic:

### AND Logic (Default)
All rules must pass for validation to succeed:

```javascript
// Value must be a number AND an integer
new Hakim([{is: "number"}, {is: "integer"}]).validate("123"); // true
new Hakim([{is: "number"}, {is: "integer"}]).validate("123.4"); // false
```

### OR Logic
Using `anyOf` to enable OR logic (any rule passing means validation success):

```javascript
import Hakim, { anyOf } from 'hakim';

// Value can be either empty OR a number
new Hakim(anyOf([
  {is: "empty"}, 
  {is: "number"}
])).validate(""); // true
new Hakim(anyOf([
  {is: "empty"}, 
  {is: "number"}
])).validate("123"); // true
```

### Nested Logic Groups
You can create complex validations by nesting rule groups:

```javascript
// Must be either empty OR (a number AND positive)
new Hakim([
  {is: "empty"},
  [{is: "number"}, {is: "positive"}]
]).validate("123"); // true

// Must be (a number AND an integer) OR (a string AND not empty)
new Hakim(anyOf([
  [{is: "number"}, {is: "integer"}],
  [{is: "string"}, {required: true}]
])).validate("hello"); // true
```

## Extensions

You can extend Hakim with custom validators using the `extend` method:

### Adding Custom Entity Types

```javascript
// Add a 'binary' entity type
Hakim.extend('something', 'binary', function(value) {
  return /^[01]+$/.test(value);
});

// Now you can use it in validation
new Hakim([{is: "binary"}]).validate("1010"); // true
new Hakim([{is: "binary"}]).validate("1234"); // false
```

### Adding Custom Character Sets

```javascript
// Add a 'hex' character set
Hakim.extend('characterSets', 'hex', function(char) {
  return /^[0-9a-fA-F]$/.test(char);
});

// Now you can use it in validation
new Hakim([{are: "hex"}]).validate("a1f5"); // true
```

## Browser Compatibility

Hakim is designed to work in all modern browsers. The library is provided as both ES modules and CommonJS formats:

- `built/hakim.js` - ES module format
- `built/hakim.cjs` - CommonJS format

## Testing

The library includes comprehensive test cases for both browser and Node.js environments:

```bash
# Run tests in Node.js
npm run test:node

# Run tests in browser
npm run test:browser
```

## License

This project is licensed under the [LGPL-3.0-or-later](LICENSE)
