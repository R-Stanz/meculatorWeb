export function vector_page_handler(input) {

	var vector = { }
	var vector1 = []
	var output = []
	for (let i in input.data) {
		for (let n in input.data[i]){
			if(n == "id") {
				vector1 = []
				vector.id = input.data[i][n]
				vector.check = false
			}
			else {
				for (let att in input.data[i][n]) {
					if(att != "createdAt" && att != "updatedAt" && att != "publishedAt") {
						vector1.push([ att , input.data[i][n][att] ])
					}
				}
				let swap = vector1[13]
				vector1[13] = vector1[14]
				vector1[14] = swap
				for(let j = vector1.length-1; j > 0; j--){
					vector1[j] = vector1[j-1]
				}
				vector1[0] = swap

				let vector2 = []
				let count = 0
				while(vector2.length < vector1.length) {
					if(count == 4){
						vector2.push(vector1[vector1.length-1])
					}
					vector2.push(vector1[count])
					count++
				}

				vector.val = vector2
				output.push(vector)
				vector = { "id": 0, "val": []}
			}
		}
	}
	return output
}

export function vector_handler(input) {
	let output = {}
	let vector1 = []

	output.id = input.data.id
	output.check = false
	for (let att in input.data.attributes) {
		console.log(att)
		if(att != "createdAt" && att != "updatedAt" && att != "publishedAt") {
			vector1.push([ att , input.data.attributes[att] ])
		}
	}
	let swap = vector1[13]
	vector1[13] = vector1[14]
	vector1[14] = swap
	for(let j = vector1.length-1; j > 0; j--){
		vector1[j] = vector1[j-1]
	}
	vector1[0] = swap

	let vector2 = []
	let count = 0
	while(vector2.length < vector1.length) {
		if(count == 4){
			vector2.push(vector1[vector1.length-1])
		}
		vector2.push(vector1[count])
		count++
	}

	output.val = vector2
	console.log(output)
	return output
}

export function new_vector_handler(id, values) {
	let vector = []
	console.log(values)
	for (let att in values) {
		vector.push([att, values[att]])
	}
	let output = { 'id': id, val : vector, check : false }
	console.log(output)
	return output
}
