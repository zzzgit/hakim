import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
	input: path.resolve(__dirname, './src/Hakim.js'),
	output: [
		{
			file: path.resolve(__dirname, './built/hakim.js'),
			format: 'es',
			exports: 'named',
			sourcemap: false,
		},
		{
			file: path.resolve(__dirname, './built/hakim.cjs'),
			format: 'cjs',
			exports: 'named',
			sourcemap: false,
		},
	],
}
