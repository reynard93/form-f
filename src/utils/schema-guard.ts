import { FieldSchema } from '../../typings/schema'

const isFieldSchema = (schema: unknown): schema is FieldSchema => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return !('schema' in schema)
}
export { isFieldSchema }
