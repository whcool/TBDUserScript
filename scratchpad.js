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
// @require     http://chat.tbd.my/tbd/pushstream.js
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version         1.0.30
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


//TBDRequest Represents what is displayed at chatbox.
//Initialize of the bot
var GM_TBD_init = function(){
	GM_log('Initialized');
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
	};

	//TBDSession The users identity to post or get anything
	var TBDSession = new function(){
		this.username = unsafeWindow.tbd_uname;
		this.userid = unsafeWindow.tbd_uid;
		this.shout_key = jquery('#shout_key').attr('value');
		this.post_key = 	unsafeWindow.my_post_key;
	}

	//TBDResponse what the output of the bot be like
	var TBDResponse = new function(){
		this.beforeFilter= function(){
			GM_log('BeforeFilter :'+TBDRequest.message);
		};
	}
		if (("WebSocket" in window)===true){    //Yes Got websocket
				GM_log('Using socket');
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
					var d = TBDJQuery.parseJSON(TBDJQuery.base64.decode(a));
					TBDRequest.message = d.shout_msg;
					TBDResponse.beforeFilter(d);
				}
				TBDRequest.lastid = b;
		  };		
			socket.addChannel(TBDRequest.channel);
			socket.connect();	
	}else{//no got websocket
		GM_log('No socket');
		setInterval (function() {
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
					TBDResponse.beforeFilter(d[1]);
					TBDRequest.lastid = b;
				}
			});
		},2000)
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
