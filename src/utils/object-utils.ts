/**
 * Returns true if and only if the fields and its subfields in the given obj is a truthy value
 *
 *  @example
 * isObjectTruthy(obj, field1, field2) === (obj[field1] && obj[field1][field2]) // true
 *
 */
export const isObjTruthy: (obj: any, ...fields: string[]) => boolean = (obj: any, ...fields: string[]): boolean => {
    if (!obj) {
        return false;
    }

    if (fields.length === 0) {
        return !!obj
    } else if (fields.length === 1) {
        return obj[fields[0] as string]
    } else {
        return isObjTruthy(obj[fields[0] as string], ...fields.slice(1))
    }
}