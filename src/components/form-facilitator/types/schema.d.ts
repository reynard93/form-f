interface Schema {
    show: Function,
    validation: {
        rules: {
            [key: string]: {
                fn: Function
                runMode: String
            }
        }
    }
}
