/*! javascript-ad-lib - 1.4.0-c80c46e2.j - 2015-07-17 */
!function(){for(var a="80c46e2",b="1.4.0",c="http://ads.mp.mydas.mobi",d={defaultAjaxOptions:{async:!0,url:"",success:null,error:null,always:null},userData:null,lastAdRequestUrl:null},e="EXPOSE_PRIVATE_FUNCTIONS_FOR_TESTING",f={mergeDefaultOptions:function(a,b){for(var c in a)a.hasOwnProperty(c)&&void 0===b[c]&&(b[c]=a[c]);return b},convertObjToEncodedRequestParamString:function(a){var b="";for(var c in a)a.hasOwnProperty(c)&&(b.length>0&&(b+="&"),b+=c+"="+encodeURIComponent(a[c]));return b.length>0&&(b="?"+b),b},ajax:function(a){a=this.mergeDefaultOptions(d.defaultAjaxOptions,a);var b;b=new XMLHttpRequest,b.onreadystatechange=function(){4==b.readyState&&200==b.status&&(a.success&&a.success(b.responseText),a.always&&a.always(b.responseText))};var c=a.url;a.data&&(c+=f.convertObjToEncodedRequestParamString(a.data)),b.open("GET",c,a.async),b.send()},wrapResponseInHtml:function(a){var b='<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><html><head><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/></head><body style="margin: 0px;padding: 0px;background-color: black;">';return b+=a,b+="</body></html>"},generateGetAdUrl:function(d,e,g){var h={sdkversion:b+"-c"+a+".j",apid:d.apid,ua:window.navigator.userAgent,at:"inline"==d.placementType?"b":"i","do":window.innerWidth>window.innerHeight?"landscape":"portrait",language:window.navigator.language.substring(0,2),cachedvideo:!1,hpx:window.screen.height,wpx:window.screen.width,density:1,tslr:Math.round((new Date).getTime()/1e3),accelerometer:void 0!==window.ondevicemotion,dm:window.navigator.platform,ate:1!=window.navigator.doNotTrack&&"yes"!=window.navigator.doNotTrack,r:Math.floor(1e4*Math.random())},i=document.domain;if(i&&(h.mdomain=i),d.metadata)for(var j=["age","gender","ethnicity","zip","education","marital","keywords"],k=0;k<j.length;k++){var l=j[k];d.metadata.hasOwnProperty(l)&&(h[l]=d.metadata[l])}if("inline"==d.placementType?(h.hswd=d.width,h.hsht=d.height):(h.hswd=window.innerWidth,h.hsht=window.innerHeight),e&&e.userId&&e.userId.length>0&&(h.webid=e.userId),g&&g.coords&&(h.lat=g.coords.latitude,h["long"]=g.coords.longitude,h.ha=g.coords.accuracy,null!==g.coords.altitude&&(h.alt=g.coords.altitude),null!==g.coords.altitudeAccuracy&&(h.va=g.coords.altitudeAccuracy)),d.testing&&d.testing.params){var m=d.testing.params;for(var n in m)m.hasOwnProperty(n)&&(h[n]=m[n])}var o=c+"/getAd"+f.convertObjToEncodedRequestParamString(h);return o},getResponse:function(a,b){if(void 0!==a.creative)setTimeout(function(){b(a.creative)},0);else{var c=0,e=2,g=null,h=null,i=function(){if(c++,c==e){var i=f.generateGetAdUrl(a,g,h);f.ajax({url:i,async:!0,success:function(a){d.lastAdRequestUrl=i,b(a)}})}};f.getUserData(function(a){g=a,i()});var j=!1,k=null,l=function(a){j||(j=!0,k&&(clearTimeout(k),k=null),h=a,i())};window.navigator.geolocation&&a.allowLocation===!0?(k=setTimeout(function(){l(null)},5e3),window.navigator.geolocation.getCurrentPosition(l,l,{timeout:5e3})):l(null)}},getUserData:function(a){if(d.userData)a(d.userData);else{var b=!1,c=function(c){b||(b=!0,d.userData=c,window.removeEventListener("message",f,!1),window.document.body.removeChild(e),a(d.userData))},e=document.createElement("iframe");e.style.display="none",e.src=d.rootDir+"javascriptAdLibLocalStorage.html";var f=function(a){0===d.rootDir.indexOf(a.origin)&&c(JSON.parse(a.data))};window.addEventListener("message",f,!1);var g=function(){e.removeEventListener("load",g,!1),e.contentWindow.postMessage("getUserData",d.rootDir)};e.addEventListener("load",g,!1),window.document.body.appendChild(e),setTimeout(function(){c(null)},5e3)}}},g=document.getElementsByTagName("script"),h=g.length-1;h>=0;h--){var i=g[h].src.indexOf("mmadlib.js");if(i>-1){var j=g[h].src.substring(0,i);d.rootDir=j;break}}window.mmAPI={placeAd:function(b,c){if(arguments[2]===e)return void(window.mmAPI.privateFunctions=f);if(b.testing&&b.testing.response&&(b.creative=b.testing.response),void 0===b.containerElementId||void 0===b.apid&&void 0===b.creative||"inline"!=b.placementType&&"interstitial"!=b.placementType||"inline"==b.placementType&&(void 0===b.width||void 0===b.height))throw"MILLENNIAL MEDIA IMPLEMENTATION ERROR";f.getResponse(b,function(e){e=e.trim();var g=document.getElementById(b.containerElementId);if(g.innerHTML="",e&&e.length>0){var h=document.createElement("iframe");g.appendChild(h),h.id="mmAd"+b.apid,b.width?h.style.width=b.width+"px":h.style.width=window.top.innerWidth+"px",b.height?h.style.height=b.height+"px":h.style.height=window.top.innerHeight+"px",h.style.border="0",h.style.backgroundColor="black",h.scrolling="no",h.contentWindow.mmVariables={placementType:b.placementType,rootDir:d.rootDir,mraidCacheBuster:a},b.onClick&&(h.contentWindow.mmVariables.onClick=b.onClick),b.onClose&&(h.contentWindow.mmVariables.onClose=b.onClose),b.onExpand&&(h.contentWindow.mmVariables.onExpand=b.onExpand),-1==e.indexOf("<html")&&(e=f.wrapResponseInHtml(e)),e=e.replace('<script src="mraid.js"></script>',"");var i=e.match(/<head[^>]*>/);i=i&&i.length>0?i[0]:null;var j=e.match(/<body[^>]*>/);j=j&&j.length>0?j[0]:null;var k='<script src="'+d.rootDir+"mraid.js?v="+a+'"></script>';i?e=e.replace(i,i+k):j&&(e=e.replace(j,j+k)),e=e.replace("<body>",'<body style="margin:0px;padding:0px;">'),h.contentWindow.document.open(),h.contentWindow.document.write(e),h.contentWindow.document.close(),c&&c(!0)}else{if(b.passbackJS||b.passbackURL){var l=document.createElement("IFRAME");if(l.className="mmPassbackFrame",l.style.width=b.width+"px",l.style.height=b.height+"px",l.style.border=0,b.passbackURL&&(l.src=b.passbackURL),g.appendChild(l),b.passbackJS){if(b.passbackJSVars)for(var m in b.passbackJSVars)l.contentWindow[m]=b.passbackJSVars[m];var n=document.createElement("script");n.src=b.passbackJS,n.className="mmPassbackScript",l.contentWindow.document.body.appendChild(n)}}c&&c(!1)}})},getLastAdRequestUrl:function(){return d.lastAdRequestUrl}}}();