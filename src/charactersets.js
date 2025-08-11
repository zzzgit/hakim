const charactersets = {
	// currently latin is the same to enLetter
	latin: function(char){
		char = char + ''
		if ((/[a-zA-Z]/).test(char)){
			return true
		}
		return false
	},
	enLetter: function(char){
		char = char + ''
		return char >= 'a' && char <= 'z' || char >= 'A' && char <= 'Z'
	},
	digit: function(char){
		char = char + ''
		if ((/[0-9]/).test(char)){
			return true
		}
		return false
	},

}

export default charactersets
