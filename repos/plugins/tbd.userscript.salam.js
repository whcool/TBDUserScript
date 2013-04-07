TBDPluginSalam = new function() {
	this.request = true;
	this.regex = '^(assalamualiakum|salam)$';
	this.regexFlag = 'i';
	this.action = function(){
		var output = 'وَعَلَيْكُمْ السَّلاَمُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ ';
		if (typeof this.request.username !== 'undefined'){
			output+=request.username;
		}
		return output;
	}
		
};
