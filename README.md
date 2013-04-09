TBDUserScript
=============

##http://w3.tbd.my/thread-9293.html
#Logs on 2.0.202
* Fix for undisplayed post due to flood
* Using jquery yg sedia ada tak perlu dunlod lagi
* Typo error pada TBD_log
* Typo error missing p pada tmp div
#Logs on 2.0.197
* Callbacks dalam sandox for plugins avaliable callbacks get_chat atau post_chat
So dalam plugins salah satu seperti dibawah
Code:
this.callback = true;//Post chat by default
this.callback = 'get_chat';
this.callback = 'post_chat';
* Fix for firefox 18 keatas
* Introduce TBDDebug untuk enable disable logs
* New chat command line
Code:
test
untuk check if code berjalan ke tidak
* Disable post jika bukan di index page untuk mengelak shoutbox spam hanya yang output false aje akan fungsi jika bukan dari index page
* Using repo lists di url http://w3.tbd.my/us/plugins.php (tqs to suhz). Repo2 di github kemungkinan akan berubah utk elak dari unregistered plugins(bahaya nih kalu tak register bleh curik cookies)
* Disable penggunaan GM_xmlhttpRequest dan adaptasi guna jquery ajax.
* Fix ajax cycle supaya ikot turutan

Plugins avaliable
Buzz :
Code:
buzz
Salam : Salah satu di bawah
Code:
assalamualiakum
Code:
salam
Code:
assalamualaikumsalam wbt
Code:
assalam


