import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import { babel } from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { dts } from 'rollup-plugin-dts';
import del from 'rollup-plugin-delete';
import postcss from 'rollup-plugin-postcss';
import filesize from 'rollup-plugin-filesize';
import { builtinModules } from 'module';

// This is required to read package.json file when
// using Native ES modules in Node.js
// https://rollupjs.org/command-line-interface/#importing-package-json
import { createRequire } from 'node:module';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const requireFile = createRequire(import.meta.url);
const packageJson = requireFile('./package.json');
const sourceMap = true;

const externalDep = [
    ...builtinModules,
    ...Object.keys(packageJson.devDependencies),
    ...Object.keys(packageJson.peerDependencies),
    'hoist-non-react-statics',
];

export default [
    {
        // Main build for JS (CJS and ESM)
        input: 'src/index.ts',
        output: [
            {
                sourcemap: 'inline',
                dir: 'dist',
                format: 'cjs',
                interop: 'auto',
            },
            {
                sourcemap: 'inline',
                dir: 'dist',
                format: 'esm',
                interop: 'esModule',
            },
        ],
        plugins: [
            del({ targets: 'dist/*' }),
            peerDepsExternal(),
            resolve({
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                moduleDirectories: ['node_modules'],
                dedupe: externalDep,
                preferBuiltins: true,
                browser: true,
                main: true,
            }),
            babel({
                babelHelpers: 'bundled',
                extensions: ['.jsx', '.js', '.ts', '.tsx', '.json'],
                exclude: 'node_modules/**',
                babelrc: true,
            }),
            typescript({
                tsconfig: './tsconfig.rollup.json',
                sourceMap: sourceMap, // Ensure source maps are enabled for TypeScript
                inlineSources: sourceMap,
                noEmitOnError: false, // Allow the build to proceed even if there are TypeScript errors
            }),
            commonjs(),
            terser(),
            postcss({
                minimize: true,
                extensions: ['.css', '.less', '.scss'],
                plugins: [],
            }),
            filesize(),
        ],
        external: externalDep,
    },
    {
        input: 'src/index.ts',
        output: [{ file: 'dist/index.d.ts', format: 'es' }],
        plugins: [dts()],
        external: [/\.css$/],
    },
];
