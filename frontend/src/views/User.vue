<template>
<div id="background">

	<aside>
		<h1 id="welcome_msg">Meculator</h1>

		<ul id="side_nav">
			<li><button id="new_vector">Create Vector</button></li>

			<li><button id="new_momentum">Create Momentum</button></li>

			<li><button id="see_vector_table">Vectors Table</button></li>

			<li><button id="see_momentum_table">Momenta Table</button></li>

			<li><button id="see_all">Full Table</button></li>
		</ul>

		<footer id="aside_footer">
		<router-link
			id="log_out"
			:to="{ name: 'home' }"
		>
				<i class="bi bi-arrow-bar-left"></i>
		</router-link>
		</footer>
	</aside>

	<main>
		<table>
			<tr>
				<th>Name</th>
				<th>Magnitude</th>
				<th>Unit</th>
				<th>i</th>
				<th>Unit</th>
				<th>j</th>
				<th>Unit</th>
				<th>k</th>
				<th>Unit</th>
				<th>XY Reference</th>
				<th>Unit</th>
				<th>XZ Reference</th>
				<th>Unit</th>
				<th>YZ Reference</th>
				<th>Unit</th>
			</tr>
			<tr>
				<td>Car</td>
				<td>3</td>
				<td>kN</td>
				<td>3</td>
				<td>kN</td>
				<td>0</td>
				<td>N</td>
				<td>0</td>
				<td>N</td>
				<td>90</td>
				<td>deg</td>
				<td>90</td>
				<td>deg</td>
				<td>0</td>
				<td>Rad</td>
			</tr>
			<tr>
				<td>Ball</td>
				<td>33</td>
				<td>kN</td>
				<td>33</td>
				<td>kN</td>
				<td>0</td>
				<td>N</td>
				<td>0</td>
				<td>N</td>
				<td>90</td>
				<td>deg</td>
				<td>90</td>
				<td>deg</td>
				<td>0</td>
				<td>Rad</td>
			</tr>
		</table>
	</main>
</div>
</template>

<style scoped src="@/assets/css/user.css">
</style>

<script>
export default {
}
</script>
