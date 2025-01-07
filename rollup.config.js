import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import { babel } from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { dts } from 'rollup-plugin-dts';
import del from 'rollup-plugin-delete';
import styles from 'rollup-plugin-styles';
import filesize from 'rollup-plugin-filesize';
import { builtinModules } from 'module';
import { format, parse } from 'path';

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

const getTypesPath = (jsFile) => {
    const pathInfo = parse(jsFile);
    console.log('pathInfo', pathInfo);
    return format({
        ...pathInfo,
        base: '',
        dir: pathInfo.dir,
        ext: '.d.ts',
    });
};

export default [
    {
        // Main build for JS (CJS and ESM)
        input: 'src/index.ts',
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
                interop: 'compat',
                exports: 'named',
                sourcemap: true,
                inlineDynamicImports: true,
            },
            {
                file: packageJson.module,
                format: 'esm',
                exports: 'named',
                sourcemap: true,
                inlineDynamicImports: true,
            },
        ],
        plugins: [
            del({ targets: 'dist/*' }),
            peerDepsExternal(),
            resolve({
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                browser: true,
            }),
            babel({
                babelHelpers: 'bundled',
                extensions: ['.jsx', '.js', '.ts', '.tsx', '.json'],
                exclude: 'node_modules/**',
                babelrc: true,
            }),
            styles({ mode: 'inject' }),
            typescript({
                tsconfig: './tsconfig.rollup.json',
                sourceMap: sourceMap, // Ensure source maps are enabled for TypeScript
                inlineSources: sourceMap,
                noEmitOnError: false, // Allow the build to proceed even if there are TypeScript errors
            }),
            commonjs(),
            terser(),
            filesize(),
        ],
        external: externalDep,
    },
    {
        input: getTypesPath(packageJson.module ?? packageJson.main),
        output: [{ file: packageJson.types, format: 'esm' }],
        plugins: [dts()],
        external: [/\.(sass|scss|css)$/] /* ignore style files */,
    },
];
