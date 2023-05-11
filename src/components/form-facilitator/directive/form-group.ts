import type { DirectiveBinding, ObjectDirective, Directive } from 'vue'

// type FocusableElement = HTMLInputElement | HTMLTextAreaElement
// type NotificationCallback = (isNowFocused: boolean) => void
// type GenericEventHandler = () => void
// interface ExtendedDirective extends ObjectDirective {
//     handleFocus: GenericEventHandler
//     handleBlur: GenericEventHandler
// }

const FormGroup: Directive = {

    created(el: HTMLElement, binding: DirectiveBinding, vNode) {
        console.log("created")
        // binding.instance?.$.props['input-state'] = 'warning'
        // see below for details on arguments
        // el.setAttribute('v-bind', "")
        // console.log("vNode", vNode)
        // vNode.props["input-state", "error"]
        // vNode.props["message-text", "asdfds"]
        // console.log("sdf", vNode.props)

        // vNode.props['message-text'] = "error"
        // vNode.props['input-state'] = "error"
    },
    mounted(el: HTMLElement, binding: DirectiveBinding, vNode) {
        console.log("el", el)
        // el.setAttribute('input-state', "warning")
        binding.instance['input-state'] = 'warning'
        console.log( )
        // const callback = (binding.value as NotificationCallback)
        // const thisDirective = binding.dir as ExtendedDirective
        // thisDirective.handleFocus = () => { callback(true) }
        // thisDirective.handleBlur = () => { callback(false) }
        // element.addEventListener('focus', thisDirective.handleFocus)
        // element.addEventListener('blur', thisDirective.handleBlur)
    },
    updated(el: HTMLElement, binding: DirectiveBinding) {
        binding.instance['input-state'] = 'warning'
    }
    // beforeUnmount(element: HTMLElement, binding: DirectiveBinding) {
    //     // const thisDirective = binding.dir as ExtendedDirective
    //     // element.removeEventListener('focus', thisDirective.handleFocus)
    //     // element.removeEventListener('blur', thisDirective.handleBlur)
    // }
}

export default FormGroup
