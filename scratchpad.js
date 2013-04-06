// TheBotDilaila
// 2011-08-08
// Added autopost and time usages
// --------------------------------------------------------------------
//
// ==UserScript==
// @name        TBDBot-Devel
// @namespace   tbd.my
// @description TBDBotox
// @include     http://w3.tbd.my/*
// @include     https://w3.tbd.my/*
// @exclude			http*://w3.tbd.my/xmlhttp.php*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require			http://chat.tbd.my/tbd/jquery.base64.min.js
// @require     http://chat.tbd.my/tbd/pushstream.js
// @version     1.0.77
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_log
// @grant GM_xmlhttprequest
// @grant GM_addStyle
// ==/UserScript==
//

if (typeof GM_log === 'undefined'){
	var GM_log = function(msg){
		console.log(msg);
	}
}

if (typeof GM_xmlhttprequest === 'undefined'){
	var GM_xmlhttprequest = function (params) {
   	    var req = new XMLHttpRequest();
       	req.open(params.method, params.url,true);
   	    for (var header in params.headers) {
   		   req.setRequestHeader(header, params.headers[header]);
		}
		req.onreadystatechange = function () {
			if (req.readyState == 4 && req.status == 200) {
				params.onload(req);
			}
		};
		req.send(params.data);
	};
}

//Create temporary directory
var TBDElement = new function(){
	this.body = document.getElementsByTagName('body')[0];
	var tmp = document.createElement('div');
	tmp.style.display='none';
	tmp.id = 'GM_TBD_tmp';
	this.tmp = tmp;
	this.body.appendChild(tmp);
},
//Initialize of the bot
GM_TBD_init = function(){
	GM_log('Initialized');


	//TBDRequest Represents what is displayed at chatbox.
	var TBDRequest = new function (){
		this.url='chat.tbd.my';
		this.port = '80';                                                                                                          
		this.channel = 'tbdshoutbox';
		this.shout_url = 'http://w3.tbd.my/xmlhttp.php?action=show_shouts';
		this.lastid = 0;
		this.username = '';
		this.userid = '';
		this.message = '';
		this.GET = function(url,fn){
			GM_xmlhttprequest({
				method: "GET",
				url: url,
				onload: function(r) {
					var dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd"),
					d = document.implementation.createDocument('', '', dt), html = d.createElement('html');
					html.innerHTML = r.responseText;
					d.appendChild(html);
					TBDResponse.message = r.responseText;
					fn(d);
				}
			});
		};
	},

	//TBDSession The users identity to post or get anything
	TBDSession = new function(){
		this.username = unsafeWindow.tbd_uname;
		this.userid = unsafeWindow.tbd_uid;
		this.shout_key = jquery('#shout_key').attr('value');
		this.post_key = 	unsafeWindow.my_post_key;
	},
	//TBDPlugins Load or call the plugins action
	TBDPlugins = new function(){
			this.actions = {};
			this.repo = {};
			//Create and load plugin script
			var _list = 'list.js',
			_url_prefix = 'https://raw.github.com/jejakapemalu/TBDUserScript/devel/repos/',
			r = document.createElement('script');
      r.type = 'text/javascript';
      r.src = _url_prefix + _list;
      TBDElement.body.appendChild(r);
      
      //Load Repolists	
			var _get_repo_list = function(){
				if (typeof unsafeWindow.TBDRepositories === 'undefined' ){
					window.setTimeout(_get_repo_list, 100);				
				}else{
					this.repo = unsafeWindow.TBDRepositories;
				}
    	};
  
    	//Execute each repo's loaded actions
    	
	  	_get_repo_list();
    	//Enabled plugins lists
			this.enabled = GM_getValue('plugins',['Buzzer']);
			
			for (var i=0; i<this.enabled.length; i++) {
				var s = document.createElement('script');
      	s.type = 'text/javascript';
      	s.src = _url_prefix +'plugins/tbd.userscript.'+this.enabled[i].toLowerCase()+'.js';
      	TBDElement.body.appendChild(s);
			}
	},

	//TBDResponse what the output of the bot be like
	TBDResponse =  function(){
			GM_log('Filter :'+TBDRequest.message);
			for (var i=0; i<TBDPlugins.enabled.length; i++) {
				var fn = 'TBDPlugin'+TBDPlugins.enabled[i];
				fn = unsafeWindow[fn];
				if (typeof fn !== 'undefined'){
					var re = new RegExp(fn.regex);
					if (re.test(String(TBDRequest.message))){
						GM_log('Executing action for '+TBDPlugins.enabled[i]);
						fn.action();
					}
				}
			}
	},

	//HTTP get chat contents
	http_get_chat = function(){
		TBDRequest.GET(TBDRequest.shout_url,function(doc) {
						var d = doc.documentElement.innerHTML.split("<br>");
						d = d[0].split("member.php?action=profile&amp;uid=");
						var tmp = d[0].split('^'), 
						b = tmp[0];
						d = d[0].split("\">");						
						TBDRequest.userid = d[0];
						d = d[1].split(" - ");
						TBDRequest.username = d[0];
						d = d[1].split(" -- ");
						TBDRequest.message = d[1];

				if (TBDRequest.lastid < b ){
					TBDResponse();
					TBDRequest.lastid = b;
				}
			});
	}
		if (("WebSocket" in window)===true){    //Yes Got websocket
				GM_log('Using socket');
				http_get_chat();
				var socket = new PushStream({
					host: TBDRequest.url,
					port: TBDRequest.port,
					modes: "websocket",
					channelsByArgument: true,
					channelsArgument: 'channels'
				});
		//a = base64 msg
		//b = msgID
		//c = channel
			socket.onmessage = function(a,b,c){
				if (TBDRequest.lastid < b && c === TBDRequest.channel){//Make sure the msg isn't it
					var d = jquery.parseJSON(jquery.base64.decode(a));
					TBDRequest.message = d.shout_msg;
					TBDRequest.username = jquery(d.uname).html();
					TBDRequest.userid = d.uid;
					TBDResponse();
				}
				TBDRequest.lastid = b;
		  };		
			socket.addChannel(TBDRequest.channel);
			socket.connect();	
	}else{//no got websocket
		GM_log('No socket');
		setInterval (function(){http_get_chat()},2000)
	}
};

var GM_start = function () {
	if (typeof unsafeWindow.jQuery === 'undefined') {
		window.setTimeout(GM_start, 100);
	} else {
		jquery = unsafeWindow.jQuery = unsafeWindow.jQuery.noConflict(true);
		jquery(document).ready(function(){
			GM_TBD_init();
		});
	}
};
GM_start();
