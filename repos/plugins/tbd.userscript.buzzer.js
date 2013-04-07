//Sample of plugin without output and
var TBDPluginBuzzer = new function() {
	this.regex = '^(buzz)$';
	this.regexFlag = 'i';
	//var b = document.getElementById('GM_TBD_tmp'),
	var s = document.createElement('audio');
//	s.src = 'http://www.soundjay.com/button/beep-1.wav';
	s.src = 'http://images.wikia.com/monchbox/images/0/01/Beep-sound.ogg';
	s.preload = 'auto';
//	b.appendChild(s);
	this.action = function(){
		s.load();
		if (typeof s.play === 'undefined'){
			s.Play();
		}else{
			s.play();
		}
		return false;
	}
		
};
