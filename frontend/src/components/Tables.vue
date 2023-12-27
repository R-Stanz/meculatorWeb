<template>
	<main>
		<div 
			id="panel" 
			v-if="edit_show_alert"
		> {{ edit_alert_msg }}
		</div>
		<vee-form v-if="tableStore.locked" id="form" :validation-schema="tableStore.schema" @submit="tableStore.apply">
			<div id="all_inputs_area">
				<div 
					class="inputs_area"
					v-for="(info, index) in tableStore.input_info" 
					:key="index"
				>
					<vee-field 
						v-if="info.attribute != 'is_torque'"
						:name="info.attribute"
						:placeholder="info.placeholder"
						:id="info.attribute"
						:type="info.type"
						class="input"
					>
					</vee-field>

					<div id="is_torque_area" v-else>
						<p>Is torque?</p>
						<vee-field 
							name="is_torque"
							placeholder="Is torque?"
							id="is_torque"
							as="select"
							class="input"
						>
							<option value="true">Yes</option>
							<option value="false">No</option>
						</vee-field>
					</div>
					<ErrorMessage class="required" :name="info.attribute" />

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
					v-for="label in tableStore.labels"
				>
					{{ label }}
				</td>
			</tr>

			<tr
				v-for="(item, index) in tableStore.show.data"
			>
				<td v-if="!tableStore.locked">
					<input 
						type="checkbox" 
						v-model="item.check"
						@click="tableStore.check(item.id)" 
					/>
				</td>
				<td
					v-for="(att, index) in tableStore.attributes"
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
	
	async mounted() {
		await this.tableStore.loadTables()
	      	console.log(this.tableStore.momentStore.table)
	},
}
</script>
