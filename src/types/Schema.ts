interface SchemaFields {
    [key: string]: { defaultValue: string }
}
export default interface Schema {
    [key: string]: SchemaFields ? { defaultValue: string }
}
