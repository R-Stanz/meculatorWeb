import { 
	Form as VeeForm, Field as VeeField, defineRule, ErrorMessage, configure, 
} from "vee-validate"
import { required, min, max, alpha_dash as alphaDash } from '@vee-validate/rules'

export default {
	install(app) {
		app.component("VeeForm", VeeForm)
		app.component("VeeField", VeeField)
		app.component("ErrorMessage", ErrorMessage)

		defineRule('required', required)
		defineRule('min', min)
		defineRule('max', max)
		defineRule('alpha_dash', alphaDash)

		configure({
			generateMessage: (ctx) => {
				const messages = {
					required: 	`The field ${ctx.field} is required.`,
					min: 		`The field ${ctx.field} is too short.`,
					max:		`The field ${ctx.field} is too long.`,
					alpha_dash: 	`The field ${ctx.field} has an invalid character.`,
				}

				const message = messages[ctx.rule.name]
					? messages[ctx.rule.name]
					: `The field ${ctx.field} is invalid.`

				return message;
			}
		}) 
	},
}
