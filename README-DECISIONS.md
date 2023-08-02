# wins-common-form-component-v3

This will document plugin decisions, rules and setup scripts

You can combine linting and compilation by using a tool like eslint-plugin-tsc that integrates TypeScript compilation
errors into ESLint. This allows you to catch both TypeScript errors and linting issues in a single command.

The 'plugin:vue/vue3-essential' extends configuration is sufficient for Vue 3 projects, but you can remove '
@vue/eslint-config-typescript' and '@vue/eslint-config-prettier/skip-formatting'. These configurations are already
included in 'plugin:vue/vue3-essential' and 'plugin:@typescript-eslint/recommended' respectively.

testing principle is not to test the implementation details, test what the component is supposed to do and it returns
the result

validateOnSubmit is usually an edge situation, it's clearer to state it on my component given that the schema helper is
already
doing a lot
adding more if checks there is not going to do it any favor
// emit validated
i guess the usecase is to attach a handler to do soemthing immediately when the form is valdiated
like the case i see on QualificationItems which makes sense for me to emit validated

will move the design system to devDependencies afterwards
