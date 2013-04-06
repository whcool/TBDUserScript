TBDPluginBuzzer = new function() {
	this.session = true;
	this.response = true;
	this.regex = '^(buzz)$';
	var b = document.getElementById('GM_TBD_tmp'),
	s = document.createElement('audio');
//	s.src = 'http://www.soundjay.com/button/beep-1.wav';
	s.src = 'http://images.wikia.com/monchbox/images/0/01/Beep-sound.ogg';
	s.preload = 'auto';
	b.appendChild(s);

	var	$ = window.jQuery = window.jQuery.noConflict(true);
	this.action = function(){
		s.load();
		if (typeof s.play === 'undefined'){
			s.Play();
		}else{
			s.play();
		}
	}
		
};
