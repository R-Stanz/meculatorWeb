<template>
	<main>
		<div 
			id="panel" 
			v-if="edit_show_alert"
		> {{ edit_alert_msg }}
		</div>
		<vee-form v-if="tableStore.locked" id="form" :validation-schema="schema" @submit="tableStore.apply()">
			<div id="all_inputs_area">
				<div 
					class="inputs_area"
					v-for="(info, index) in input_info()" 
					:key="index"
				>
						<vee-field 
							:name="info.attribute"
							:placeholder="info.placeholder"
							:id="info.attribute"
							:type="info.type"
							class="input"
						>
						</vee-field>
					<ErrorMessage class="required" :name="info.name" />
				</div>
			</div>

			<button
				type="submit"
				:disabled="tableStore.edit_in_submission"
			> Apply Changes
			</button>

		</vee-form>

		<table>
			<tr>
				<td 
					v-for="label in tableStore.labels()"
				>
					{{ label }}
				</td>
			</tr>

			<tr
				v-for="(item, index) in tableStore.show().data"
			>
				<td v-if="!tableStore.locked">
					<input 
						type="checkbox" 
						v-model="item.check"
						@click="tableStore.check(item.id)" 
					/>
				</td>
				<td
					v-for="(att, index) in tableStore.attributes()"
					v-bind:key="index"
				>
					{{ item.attributes[att] }}
				</td>
			</tr>

		</table>
	</main>
</template>

<style scoped src="@/assets/css/user.css">
</style>

<script>
import { tableService } from '@/api/TableService'
import { isAxiosError } from 'axios'
import { useTableStore } from '@/stores/tableStore'
import { mapState } from 'pinia'

export default {
	setup() {
		const tableStore = useTableStore()
		return { tableStore }
	},
	data() {
		return {
			edit_in_submission:	false,
			edit_show_alert:	false,
			edit_alert_variant:	"info",
			edit_alert_msg:		"Loading!",
		}
	},

	methods: {

		async delete() {

			this.edit_in_submission = 	true
			this.edit_show_alert = 		true
			this.edit_alert_variant = 	"info"
			this.edit_alert_msg =		"Submiting!"

			try {
				let deleted_list = []
				let count = 0
				if (this.show_vectors) {
					while (count < this.selected_list.length) {
						let id = this.selected_list[count]
						let res = await tableService.delVector(id)

						for (let i in this.vectors.data) {
							if (this.vectors.data[i].id == id) {
								this.vectors.data.splice(i, 1)
							}
						}

						count++
					}
				}
				else {
					while (count < this.selected_list.length) {
						let id = this.selected_list[count]
						let res = await tableService.delMoment(id)

						for (let i in this.moments.data) {
							if (this.moments.data[i].id == id) {
								this.moments.data.splice(i, 1)
							}
						}

						count++
					}
				}
					this.$emit("deleted")
			}
			catch(e) {
				this.error_msg(e)
			}
			finally {
				this.edit_in_submission = false
			}
		}
	},
	
	computed: {
		schema() {
			let reference = "required|max:40|alpha_dash"
			let numb = "required"
			let new_schema = {}
			let att = tableStore.attributes()

			for (let i in att) {
				let name = att[i]
				let obj = {}
				if (i%2 == 0) {
					obj = { [name] : reference }
				}
				else {
					obj = { [name] : numb }
				}
				new_schema = Object.assign(new_schema, obj)
			}

			return new_schema
		},

	},
	
	async mounted() {
		await this.tableStore.loadTables()
	      	console.log(this.tableStore.momentStore.table)
	},
}
</script>
