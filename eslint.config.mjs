import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import perfectionist from 'eslint-plugin-perfectionist';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
    // config
    ...tseslint.configs.recommended,
    pluginJs.configs.recommended,
    eslintPluginPrettierRecommended,
    eslintConfigPrettier,
    {
        languageOptions: { globals: globals.node },
        plugins: { perfectionist },
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
            'prettier/prettier': 'error',
            'no-console': ['warn', { allow: ['table', 'warn', 'error'] }],
            'perfectionist/sort-imports': [
                'error',
                {
                    type: 'line-length',
                    order: 'asc',
                    newlinesBetween: 'always', // Fix: Corrected property name
                    groups: [['builtin', 'external'], 'custom-src', ['parent', 'sibling', 'index'], 'object', 'unknown'],
                    customGroups: {
                        value: {
                            'custom-src': 'src/**',
                        },
                    },
                    internalPattern: ['src/**'], // Fix: Corrected the property name
                },
            ],
        },
    },
);
