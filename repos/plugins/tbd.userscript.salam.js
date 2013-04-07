TBDPluginSalam = new function() {
	this.request = true;
	this.regex = '^(assalamualiakum|salam|assalamualaikumsalam wbt|assalam)$';
	this.regexFlag = "i";
	this.callback = true;
	this.action = function(){
		var output = 'وَعَلَيْكُمْ السَّلاَمُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ ';
		if (typeof this.request.username !== 'undefined'){
			output+= this.request.username;
		}
		return output;
	}
		
};
