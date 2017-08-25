let path = require("path");
let babel = require("rollup-plugin-babel")
module.exports = {
    input: path.resolve(__dirname, "./src/hakim.js"),
    output: {
        file: path.resolve(__dirname, "./built/hakim.js"),
        format: 'es',
    },
    plugins: [
        babel({
          exclude: 'node_modules/**',
        }),
      ],
    //sourcemap: 'none',
}