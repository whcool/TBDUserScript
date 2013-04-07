// TheBotDilaila
// 2011-08-08
// Added autopost and time usages
// --------------------------------------------------------------------
//
// ==UserScript==
<<<<<<< HEAD
// @name            TheBotDilaila
// @namespace       http://w3.tbd.my/index.php
// @description     TheBotDilaila the Gaybot Shemale Version
// @author          Izham87, Jejaka Pemalu, Hotfloppy
// @include         http://w3.tbd.my/*
// @version         1.2
// ==/UserScript==
// 
function sendResp(url, respon) {

GM_xmlhttpRequest({
  method: "POST",
  url: url,
  data: "shout_data=" + respon + "&shout_key=" + unsafeWindow.my_post_key,
  headers: {
"Content-Type": "application/x-www-form-urlencoded"
  },
  
  onload: function(responseDetails) {
    var dt = document.implementation.createDocumentType("html", 
              "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd"),
            doc = document.implementation.createDocument('', '', dt),
            html = doc.createElement('html');

          html.innerHTML = responseDetails.responseText;
          doc.appendChild(html);
          callback(doc);
    }
});
}


function getPostHash(threadid, messages, callback) {
GM_xmlhttpRequest({
  method: "GET",
  url: "http://w3.tbd.my/newreply.php?tid=" + threadid,
  
  onload: function(responseDetails) {
    var dt = document.implementation.createDocumentType("html", 
              "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd"),
            doc = document.implementation.createDocument('', '', dt),
            html = doc.createElement('html');

          html.innerHTML = responseDetails.responseText;
          doc.appendChild(html);
          source = doc.documentElement.innerHTML;
          hash = source.split("posthash\" value=\"");
          hash = hash[1].split("\" type=\"hidden\"");
          callback(hash[0],threadid, messages, unsafeWindow.my_post_key);
    }
});

}

function sendPost(posthash,threadid, messages, postkey) {

boundary= "-----------------------------31337676334";

GM_xmlhttpRequest({
  method: "POST",
  url: "http://w3.tbd.my/newreply.php?tid=" + threadid + "&processed=1",
  data: "--"+boundary+"\r\n"+
        "Content-Disposition: form-data; name=\"my_post_key\"\r\n"+"\r\n"+
        postkey+"\r\n"+
        "--"+boundary+"\r\n"+
        "Content-Disposition: form-data; name=\"subject\"\r\n"+"\r\n"+
        "Autobot Reply\r\n"+
        "--"+boundary+"\r\n"+
        "Content-Disposition: form-data; name=\"icon\"\r\n"+"\r\n"+
        "-1\r\n"+
        "--"+boundary+"\r\n"+
        "Content-Disposition: form-data; name=\"message_new\"\r\n"+"\r\n"+
        messages+"\r\n"+
        "--"+boundary+"\r\n"+
        "Content-Disposition: form-data; name=\"message\"\r\n"+"\r\n"+
        messages+"\r\n"+
        "--"+boundary+"\r\n"+
        "Content-Disposition: form-data; name=\"postoptions[signature]\"\r\n"+"\r\n"+
        "1\r\n"+
        "--"+boundary+"\r\n"+
        "Content-Disposition: form-data; name=\"postoptions[subscriptionmethod]\"\r\n"+"\r\n"+"\r\n"+
        "--"+boundary+"\r\n"+
        "Content-Disposition: form-data; name=\"attachment\"; filename=\"\"\r\nContent-Type: application/octet-stream"+"\r\n"+"\r\n"+"\r\n"+
        "--"+boundary+"\r\n"+
        "Content-Disposition: form-data; name=\"submit\"\r\n\r\nPost Reply\r\n"+
        "--"+boundary+"\r\n"+
        "Content-Disposition: form-data; name=\"action\"\r\n"+"\r\n"+
        "do_newreply\r\n"+
        "--"+boundary+"\r\n"+
        "Content-Disposition: form-data; name=\"replyto\""+"\r\n"+"\r\n"+"\r\n"+
        "--"+boundary+"\r\n"+
        "Content-Disposition: form-data; name=\"posthash\""+"\r\n"+"\r\n"+
        posthash+"\r\n"+
        "--"+boundary+"\r\n"+
        "Content-Disposition: form-data; name=\"attachmentaid\""+"\r\n"+"\r\n"+"\r\n"+
        "--"+boundary+"\r\n"+
        "Content-Disposition: form-data; name=\"attachmentact\""+"\r\n"+"\r\n"+"\r\n"+
        "--"+boundary+"\r\n"+
        "Content-Disposition: form-data; name=\"quoted_ids\""+"\r\n"+"\r\n"+"\r\n"+
        "--"+boundary+"\r\n"+
        "Content-Disposition: form-data; name=\"tid\""+"\r\n"+"\r\n"+
        +threadid+"\r\n"+
        "--"+boundary+"--\r\n",
  headers: {
"Content-Type": "multipart/form-data; boundary="+boundary
  }
});
}


function getPost(url, callback)
{
GM_xmlhttpRequest({
  method: "GET",
  url: url,
  onload: function(responseDetails) {
    var dt = document.implementation.createDocumentType("html", 
              "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd"),
            doc = document.implementation.createDocument('', '', dt),
            html = doc.createElement('html');

          html.innerHTML = responseDetails.responseText;
          doc.appendChild(html);
          callback(doc);
    }
});
}

function shoutout(source){

    thejson = source.split("<br>");
    thejson = thejson[0].split("member.php?action=profile&amp;uid=");
    thejson = thejson[1].split("\">");
    userid = thejson[0];
        thejson = thejson[1].split(" - ");
    username = thejson[0];    
        thejson = thejson[1].split(" -- ");
    whatisthecase(thejson[1],username);
        
}

function whatisthecase(youshout,username){
   // For Time Variable Usages  
    var currentTime = new Date();
    var theTime = new Array();
    theTime['Hr']  = currentTime.getHours();
    theTime['Min']  = currentTime.getMinutes();
    theTime['Sec']  = currentTime.getSeconds();

   // Izham thread autoposts
   
    rexp = /^[Pp][Oo][Ss][Tt]/
    // Change your Username to rexp in below
    rexp2 = /^[J][e][j][a][k][a][ ][P][e][m][a][l][u]/
    rexp3 =/^[P][o][s][t][e][d]/
    if (rexp.test(String(youshout)) && rexp2.test(String(username)) && !(rexp3.test(String(youshout)))){
    	iwantToShout('Posted');
	youshout= youshout.split("mesg:");
    	tid=youshout[0].split(" ");
    	tid=tid[1];
    	mesg=youshout[1];
    	getPostHash(tid, mesg, function(posthash,threadid,messages, postkey) {  sendPost(posthash,threadid, messages, postkey) });
	return;
    //EOF Izham Thread autoposts
    
    } else {
	
    // For using cases statement it starts here
    	switch (youshout){
	    case("testing"):{
		shellvalue = "success";
		break;
	    }
	      default:{
		shellvalue = "";
		break;
	    }
	}
	
	if ( shellvalue != "" ){          
        	iwantToShout(shellvalue);
      // EOF Using case statements
      
      	}else{
       
      // You own Regular Expression
      		// Example of a salam being called
        	regexp = /^[Ss][Aa][Ll][Aa][Mm]/
        	if (regexp.test(String(youshout))){
        		iwantToShout("وَعَلَيْكُمْ السَّلاَمُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ");
        	} else if (  theTime['Hr'].toString() == '1' && theTime['Min'].toString() == '5' && theTime['Sec'].toString() == '10' ){
        	//Example of using time in your condition
        	iwantToShout("[bot]");

        	}
        }
        
      // EOF own regular expression
   }
}

function iwantToShout(theseWords){
	sendResp('http://w3.tbd.my/xmlhttp.php?action=add_shout', theseWords);
}

setInterval (function() {getPost('http://w3.tbd.my/xmlhttp.php?action=show_shouts', function(doc) {  shoutout(doc.documentElement.innerHTML) });}, 2000);
=======
// @name        TBDBot-Devel
// @namespace   tbd.my
// @description TBDBotox
// @include     http://w3.tbd.my/*
// @include     https://w3.tbd.my/*
// @exclude			http*://w3.tbd.my/xmlhttp.php*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require			http://chat.tbd.my/tbd/jquery.base64.min.js
// @require     http://chat.tbd.my/tbd/pushstream.js
// @version     1.0.81
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
	var TBDRequest = {
		url:'chat.tbd.my',
		port : '80',
		channel : 'tbdshoutbox',
		shout_url : 'http://w3.tbd.my/xmlhttp.php?action=show_shouts',
		lastid : 0,
		username : '',
		userid : '',
		message : '',
		GET : function(url,fn){
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
		}
	},

	//TBDSession The users identity to post or get anything
	TBDSession = {
		username : unsafeWindow.tbd_uname,
		userid : unsafeWindow.tbd_uid,
		shout_key : jquery('#shout_key').attr('value'),
		post_key : 	unsafeWindow.my_post_key
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
	  	_get_repo_list();
    	//Enabled plugins lists
			this.enabled = GM_getValue('plugins',['Buzzer','Salam']);
			
			for (var i=0; i<this.enabled.length; i++) {
				var s = document.createElement('script');
      	s.type = 'text/javascript';
      	s.src = _url_prefix +'plugins/tbd.userscript.'+this.enabled[i].toLowerCase()+'.js';
      	TBDElement.body.appendChild(s);
			}
	},
	//post function for chat
	http_post_chat = function(msg){
		GM_xmlhttpRequest({
  			method: "POST",
  			url: 'http://w3.tbd.my/xmlhttp.php?action=add_shout',
		  	data: "shout_data=" + msg + "&shout_key=" + TBDSession.shout_key,
			  headers: {
			  	"Content-Type": "application/x-www-form-urlencoded"
			  	},
			  onload: function(responseDetails) {
					GM_log(responseDetails);
    		}
		});
	},

	//TBDResponse what the output of the bot be like
	TBDResponse =  function(){
    	//Execute each repo's loaded actions
			GM_log('Filter :'+TBDRequest.message);
			for (var i=0; i<TBDPlugins.enabled.length; i++) {
				var fn = 'TBDPlugin'+TBDPlugins.enabled[i];
				fn = unsafeWindow[fn];
				if (typeof fn !== 'undefined' && TBDRequest.userid !== TBDSession.userid){
					if (typeof fn.regexFlag === 'undefined'){
						var re = new RegExp(fn.regex);
					}else{
						var re = new RegExp(fn.regex,fn.regexFlag);
					}
					if (re.test(String(TBDRequest.message))){
						if (typeof fn.session !== 'undefined' && fn.session === true){
							fn.session = TBDSession;
						}
						if (typeof fn.request !== 'undefined' && fn.request === true){
							fn.request = TBDRequest;
						}
						GM_log('Executing action for '+TBDPlugins.enabled[i]);
						var output = fn.action();
						if (output !== false){
								GM_log('Output detected');
								if (typeof fn.callback === 'function'){							
									fn.callback(output);
								}else{
									var callback = window[fn.callback];
									if (typeof callback !== 'undefined'){
										cb(output);
									}else{
										http_post_chat(output);
									}
								}
						}
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
				}
					TBDRequest.lastid = b;
			});
	};
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
			if (TBDRequest.lastid < b){//Make sure the msg isn't it
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
},
GM_start = function () {
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
>>>>>>> devel
