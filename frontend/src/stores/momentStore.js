import { tableService } from '@/api/TableService'
import { defineStore } from "pinia"

export const useMomentStore = defineStore('moment', {
	state: () => ({ 
		table: {},

		input_info: [
			{ attribute : "moment_name", 		type : "text",		placeholder: "Name" 		}, 
			{ attribute : "magnitude", 		type : "number", 	placeholder: "Magnitude"	},
			{ attribute : "magnitude_unit", 	type : "text", 		placeholder: "Unit"		},
			{ attribute : "magnitude_i", 		type : "number", 	placeholder: "i"		},
			{ attribute : "magnitude_i_unit", 	type : "text", 		placeholder: "Unit"		},
			{ attribute : "magnitude_j", 		type : "number", 	placeholder: "j"		},
			{ attribute : "magnitude_j_unit", 	type : "text", 		placeholder: "Unit"		},
			{ attribute : "magnitude_k", 		type : "number", 	placeholder: "k"		},
			{ attribute : "magnitude_k_unit", 	type : "text", 		placeholder: "Unit"		},
			{ attribute : "angle_xy_plane", 	type : "number", 	placeholder: "xy Reference"	},
			{ attribute : "angle_xy_plane_unit", 	type : "text", 		placeholder: "Unit"		},
			{ attribute : "angle_xz_plane", 	type : "number", 	placeholder: "xz Reference"	},
			{ attribute : "angle_xz_plane_unit", 	type : "text", 		placeholder: "Unit"		},
			{ attribute : "angle_yz_plane", 	type : "number", 	placeholder: "yz Reference"	},
			{ attribute : "angle_yz_plane_unit", 	type : "text", 		placeholder: "Unit"		},
			{ attribute : "is_torque", 		type : "select",	placeholder: "Is Torque"	}
		],

		labels: [
			"Select", "Name", "Magnitude", "Unit", "i", "Unit", "j", "Unit", "k", "Unit", 
			"xy Reference", "Unit", "xz Reference", "Unit", "yz Reference", "Unit", "Is Torque"
		],

	}),
	getters: {
		attributes: (state) => {
			let list_of_attributes = []
			for (const i of state.input_info) {
				list_of_attributes.push(i.attribute)
			}
			return list_of_attributes
		}
	},
	actions: {
		async load() {
			try {
				this.table = await tableService.allMoments()

				for (let i in this.table.data) {
					this.table.data[i] = Object.assign({ "check" : false }, this.table.data[i])
				}
			}
			catch (e) {
				console.log(e)
			}
			return this.table
		},

		uncheck() {
			for (let i in this.table) {
				this.table[i].check = false
			}
		}
	}
})
