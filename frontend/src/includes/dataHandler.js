export  function vector_handler(input) {
	console.log("___")
	console.log(input)

	var vector = { "id": 0, "val": []}
	var vector1 = []
	var output = []
	for (let i in input.data) {
		for (let n in input.data[i]){
			if(n == "id") {
				vector1 = []
				vector.id = input.data[i][n]
				console.log(vector)
			}
			else {
				for (var att in input.data[i][n]) {
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

				var vector2 = []
				var count = 0
				while(vector2.length < vector1.length) {
					if(count == 4){
						vector2.push(vector1[vector1.length-1])
					}
					vector2.push(vector1[count])
					count++
				}

				vector.val = vector2
				output.push(vector)
				var vector = { "id": 0, "val": []}
			}
		}
	}
	console.log(output)
	return output
}
