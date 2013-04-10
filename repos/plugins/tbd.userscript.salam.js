var TBDPluginSalam = new function() {
	this.request = true;
	this.regex = '^(assalamualaikum|salam|assalamualaikumsalam wbt|assalam)$';
	this.regexFlag = "i";
	this.callback = true;
	this.action = function(){
		var output = 'وَعَلَيْكُمْ السَّلاَمُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ ';
		if (typeof this.request.username !== 'undefined'){
			output+= '[b]'+this.request.username+'[/b]';
		}
		return output;
	}
		
};
