import { GroupSchema, ListFieldSchema } from '@typings/schema'
import { validators } from '@momwins/wins-form-schemas'

// make use of this testSchema for my test
// TODO?: default validation mandatory: makes sense
// just define dependencies and messages within schema
const groupSchema: GroupSchema = {
  repeatedTest: {
    min: 0,
    max: 3,
    schema: {
      textType: {
        defaultValue: 'textCom',
        validation: {
          mandatory: validators.mandatory,
          errorX: (value: string) => {
            return {
              result: value !== 'tex',
              message: 'tex is not allowed'
            }
          }
        }
      },
      textType2: {
        defaultValue: 'textCom2',
        show: ({ textType }: { textType: string }) => {
          // maybe not removed in time, look at how show is triggered
          return textType == 'textComj'
        },
        validation: {
          errorX: (value: string) => {
            return {
              result: value !== 'textComp', //if N false, then error
              message: 'textComp is not allowed'
            }
          }
        }
      }
    }
  } as ListFieldSchema
}
// warning this should actually be on form.vue but forget it for now
const baseSchema: GroupSchema = {
  ...groupSchema,
  textAreaType: {
    defaultValue: 'textCom',
    validation: {
      mandatory: validators.mandatory,
      errorX: (value: string) => {
        return {
          result: value !== 'textComp', //if N false, then error
          message: 'textComp is not allowed'
        }
      }
    }
  },
  radioType: {
    defaultValue: 'N',
    validation: {
      // mandatory
      errorX: (value: string) => {
        return {
          result: value !== 'R', //if N false, then error
          message: 'NO Renewal allowed'
        }
      }
    },
    // eslint-disable-next-line no-undef
    options: () => [
      {
        value: 'N',
        label: 'New'
      },
      {
        value: 'R',
        label: 'Renewal'
      }
    ]
  },
  applyDate: {
    defaultValue: { value: '1 Jun 2023' },
    show: ({ radioType }) => {
      return radioType === 'N'
    },
    validation: {
      errorX: ({ value }: { value: string }) => {
        return {
          result: value !== '1 Jun 2023',
          message: '1 Jun is NOT allowed'
        }
      }
    }
  },
  applyMonth: {
    defaultValue: { value: 'Feb 2023' },
    validation: {}
  },
  number: {
    defaultValue: '123',
    validation: {
      mandatory: validators.mandatory
    }
  },
  nationality2: {
    defaultValue: 'sg',
    options: [
      {
        label: 'singaporean',
        value: 'sg'
      },
      {
        label: 'malaysian',
        value: 'my'
      },
      {
        label: 'indonesian',
        value: 'id'
      }
    ],
    validation: {
      mandatory: (v: string) => ({
        result: v !== 'id',
        message: 'Indonesian not supported'
      })
    }
  },
  nationality: {
    show: ({ radioType }) => {
      return radioType === 'N'
    },
    // defaultValue: 'sg',
    defaultValue: { value: 'sg' }, // difference from select is select is just string
    options: [
      {
        label: 'singaporean',
        value: 'sg'
      },
      {
        label: 'malaysian',
        value: 'my'
      },
      {
        label: 'indonesian',
        value: 'id'
      }
    ],
    validation: {
      mandatory: (defined: any) => {
        if (defined) {
          return {
            result: defined.value !== 'id',
            message: 'Indonesian not supported'
          }
        }
      }
    }
  },
  // so email validation is ran, but if no validation.rules possible to just ignore
  email: {
    defaultValue: { value: 'sam@gmai.com' },
    validation: {
      mandatory: validators.mandatory,
      email: validators.email,
      maxLength: validators.maxLength(100)
    }
  },
  checkBox: {
    defaultValue: false,
    validation: {
      truthy: (v: boolean) => {
        return {
          result: v,
          message: 'must be truthy'
        }
      }
    }
  },
  institution: {
    defaultValue: null,
    validation: {
      mandatory: validators.mandatory
    }
  }
}
export default baseSchema
