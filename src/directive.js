/* eslint-disable no-console */
import get from 'lodash/get'
const tagInstance = {
	inserted(el, binding, vNode) {
		eventHandler(el, binding, vNode)
	},
	componentUpdated(el, binding, vNode) {
		eventHandler(el, binding, vNode)
	},
	unbind(el) {
		el.onclick = null
	},
}

function eventHandler(el, binding, vNode) {
	// vNode.context.$nextTick(() => {
	// setTimeout(() => {
	const execute = binding.expression
	const attribute = ['tag-category', 'tag-action', 'tag-label', 'tag-value']
	const params = attribute.map(attr => getRealValue(el.getAttribute(attr), vNode)).filter(attr => !!attr)
	if (isValidatedExpression(execute, vNode)) {
		el.onclick = () => vNode.context[execute](...params)
	}
	// }, 0)
	// })
}

function isValidatedExpression(expression, vNode) {
	if (/\(\w+\)/.test(expression)) {
		console.error('v-tag error: v-tag don\'t supported immediately-invoked-function-expression')
		return false
	}
	else if (!vNode.context[expression]) {
		console.error('v-tag error: the binding expression is\'t vue\'s methods')
		return false
	}
	return true
}

function getRealValue(property, vNode) {
	if (!property) return
	if (/\(\w+\)/.test(property)) {
		const array = property.split(/\(|\)|,/)
		return vNode.context[array[0]](...array.slice(1, -1).map(attr => getRealValue(attr, vNode)))
	}
	else if (get(vNode.context, property, '')) {
		return get(vNode.context, property, '')
	}
	else if (get(vNode.context, `$props.${property}`, '')) {
		return get(vNode.context, `$props.${property}`, '')
	}
	return property
}

// function getAttribute(el, vNode) {
// 	const params = ['tag-category', 'tag-action', 'tag-label', 'tag-value']
// 	const lastValue = params.map(function(str) {
// 		if (el.hasAttribute(`:${str}`)) {
// 			if (/(\w+)/.test(el.getAttribute(str))) {
// 				const arr = el.getAttribute(str).split(/(|)|,/)
// 				if (!vNode.context[arr[0]]) {
// 					console.error(`v-tag error: ${arr[0]} is not defined in vue`)
// 				}
// 				else if (arr.slice(1).every(property => isValidatedProperty(property, vNode))) {

// 				}
// 				else {
// 					return vNode.context[arr[0]](...arr.slice(1))
// 				}
// 			}
// 			else {
// 				return vNode.context[el.getAttribute(str)]
// 			}
// 		}
// 		else if (el.hasAttribute(str)) {
// 			return el.getAttribute(str)
// 		}
// 		else {
// 			return ''
// 		}
// 	})
// }

// function isValidatedProperty(property, vNode) {
// 	return typeof property === 'string' ? true : vNode.context.hasOwnProperty(String(property))
// }

export default tagInstance
