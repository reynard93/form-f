import createInputComponent, {
  FormGroupProps,
  type InputComponentProps
} from '../../utils/create-input-component'
import { defineComponent, h, PropType, ref, watchEffect } from 'vue'
import { useFormFieldWatch } from '../../composable/useFormFieldWatch'

type UploadOption = {
  params: {
    docType: string
    link: boolean
    throwPdfError: boolean
  }
  withCredentials: boolean
  url: string
  previewUrl: string
  previewPath: string
  headers: Record<string, string>
}

const DocumentUploader = () => {
  return defineComponent({
    props: {
      fieldId: {
        type: String as PropType<FormGroupProps['fieldId']>,
        required: true
      },
      index: Number as PropType<InputComponentProps['index']>,
      label: {
        type: String,
        default: ''
      },
      /*** newProps ***/
      // messageText should be passed down from schema if error add it thru validations
      // accomodate schema to get in messageText default
      // how do i accommodate that? messageText should be dynamic
      // messageText: {
      //   // TODO: turn into messageTextInternal
      //   type: String,
      //   default: ''
      // },
      // TODO: ? don't seem to need this, see if need to override other props then need
      options: {
        // TODO: type this better
        type: Object as PropType<UploadOption>,
        default: () => ({})
      },
      docType: {
        type: String,
        default: ''
      },
      authHeader: {
        // i don't want wins-common-axios dependency here
        // get from new AxiosBuilder(this._documentApiUrl).withAuth(cookie.getCookie('wins-hdp')).build()
        type: String,
        default: ''
      },
      documentApiUrl: {
        type: String,
        default: '/document'
      },
      maxTotalFileSize: {
        type: [Number, String],
        default: 2,
        validator: (value: string | number) => {
          return ['2', 2, 5, '5'].includes(value)
        }
      },
      subText: {
        type: String,
        default: ''
      },
      acceptedFiles: {
        type: String,
        default: 'image/jpeg, image/png, application/pdf'
      },
      // new
      deleteFile: {
        type: Function,
        default: () => void 0
      }
    },
    setup(props) {
      // TODO: pass in data-qa ? don't use data-qa anymore

      const optionsModel: UploadOption = {
        headers: {
          Authorization: props.authHeader
        },
        // kinda coupled, but so is the original one
        url: `${props.documentApiUrl}/upload`,
        previewUrl: `${props.documentApiUrl}/get-token`,
        previewPath: `${props.documentApiUrl}/$view/`,
        // not used, cfm from design-sys: maxChunkRetries, chunkRetryInterval
        withCredentials: true,
        params: {
          docType: props.docType,
          link: false, // see there's a need to customize, leave it hardcoded for now, same below
          throwPdfError: true
        }
      }

      const vModelInternal = ref([])
      let inputStateInternal: any // to sync this with inputState from store, using a watcher for it, look createInputComponent > watchers

      // https://vuejs.org/guide/extras/render-function.html#template-refs
      const inputComponentRef = ref(null)
      // maybe don't use getModelList yet? see how
      const _getModelList = (files: any) =>
        files.map((f: any) => {
          f.docType = props.docType || ''
          delete f.file
          return f
        })

      // handle validate myself?
      const UploadComponent = createInputComponent(
        'mom-upload',
        {
          newListeners: {
            // need to ensure each of them run
            // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
            onRemove: ({ dispatch, vModel, reset, errorState }, file) => {
              if (file && file.id) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                props.deleteFile(file.id)
                inputComponentRef?.value?.uploader?.removeFile(file)
                reset()
              }
            },
            onCancel: (file: any) => {
              if (file && file.id) {
                inputComponentRef?.value?.uploader?.removeFile(file)
              }
            },
            onError: error => {
              // vModel.value = !vModel.value
            }
          },
          newProps: {
            maxFiles: 2,
            linkType: 'securelink',
            subText: props.subText,
            acceptedFiles: props.acceptedFiles,
            maxTotalFileSize: props.maxTotalFileSize,
            ...optionsModel
          },
          watchers: [
            // leave this here for now though don't really know what this 'reset' is for
            useFormFieldWatch('options', ({ reset, resetSelection }) => () => {
              console.log('resetSelection', resetSelection)
              if (resetSelection) {
                reset()
              }
            })
          ]
        },
        inputComponentRef
      )
      // watchEffect to remove, just test i got the ref
      // Log the instance of the component // Use uploadComponentRef.value to do something
      watchEffect(() => {
        if (inputComponentRef.value && inputComponentRef.value) {
          console.log(inputComponentRef.value)
        }
      })
      return () => {
        // drill down standard createInputComponent props that FormGroup expects
        return h(UploadComponent, {
          fieldId: props.fieldId,
          size: 'l',
          index: props.index,
          label: props.label,
          inputState: inputStateInternal,
          // use modelValue(code) instead of v-model(template)
          modelValue: vModelInternal // whatever emitted from actions then run _getModelList to save to actual store
        })
      }
    }
  })
}
// validation happens inside, whenever upload i don't have to configure it thru modelValue change myself
export default DocumentUploader
