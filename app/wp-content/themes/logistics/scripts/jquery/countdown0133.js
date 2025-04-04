/*
 countdown.js v2.4.1 http://countdownjs.org
 Copyright (c)2006-2014 Stephen M. McKamey.
 Licensed under The MIT License.
*/
var module,countdown=function(u){function x(a,b){var c=a.getTime();a.setMonth(a.getMonth()+b);return Math.round((a.getTime()-c)/864E5)}function v(a){var b=a.getTime(),c=new Date(b);c.setMonth(a.getMonth()+1);return Math.round((c.getTime()-b)/864E5)}function h(a,b){return a+" "+(1===a?r[b]:t[b])}function n(){}function l(a,b,c,e,f,d){0<=a[c]&&(b+=a[c],delete a[c]);b/=f;if(1>=b+1)return 0;if(0<=a[e]){a[e]=+(a[e]+b).toFixed(d);switch(e){case "seconds":if(60!==a.seconds||isNaN(a.minutes))break;a.minutes++;
a.seconds=0;case "minutes":if(60!==a.minutes||isNaN(a.hours))break;a.hours++;a.minutes=0;case "hours":if(24!==a.hours||isNaN(a.days))break;a.days++;a.hours=0;case "days":if(7!==a.days||isNaN(a.weeks))break;a.weeks++;a.days=0;case "weeks":if(a.weeks!==v(a.refMonth)/7||isNaN(a.months))break;a.months++;a.weeks=0;case "months":if(12!==a.months||isNaN(a.years))break;a.years++;a.months=0;case "years":if(10!==a.years||isNaN(a.decades))break;a.decades++;a.years=0;case "decades":if(10!==a.decades||isNaN(a.centuries))break;
a.centuries++;a.decades=0;case "centuries":if(10!==a.centuries||isNaN(a.millennia))break;a.millennia++;a.centuries=0}return 0}return b}function y(a,b,c,e,f,d){var h=new Date;a.start=b=b||h;a.end=c=c||h;a.units=e;a.value=c.getTime()-b.getTime();0>a.value&&(h=c,c=b,b=h);a.refMonth=new Date(b.getFullYear(),b.getMonth(),15,12,0,0);try{a.millennia=0;a.centuries=0;a.decades=0;a.years=c.getFullYear()-b.getFullYear();a.months=c.getMonth()-b.getMonth();a.weeks=0;a.days=c.getDate()-b.getDate();a.hours=c.getHours()-
b.getHours();a.minutes=c.getMinutes()-b.getMinutes();a.seconds=c.getSeconds()-b.getSeconds();a.milliseconds=c.getMilliseconds()-b.getMilliseconds();var k;0>a.milliseconds?(k=s(-a.milliseconds/1E3),a.seconds-=k,a.milliseconds+=1E3*k):1E3<=a.milliseconds&&(a.seconds+=m(a.milliseconds/1E3),a.milliseconds%=1E3);0>a.seconds?(k=s(-a.seconds/60),a.minutes-=k,a.seconds+=60*k):60<=a.seconds&&(a.minutes+=m(a.seconds/60),a.seconds%=60);0>a.minutes?(k=s(-a.minutes/60),a.hours-=k,a.minutes+=60*k):60<=a.minutes&&
(a.hours+=m(a.minutes/60),a.minutes%=60);0>a.hours?(k=s(-a.hours/24),a.days-=k,a.hours+=24*k):24<=a.hours&&(a.days+=m(a.hours/24),a.hours%=24);for(;0>a.days;)a.months--,a.days+=x(a.refMonth,1);7<=a.days&&(a.weeks+=m(a.days/7),a.days%=7);0>a.months?(k=s(-a.months/12),a.years-=k,a.months+=12*k):12<=a.months&&(a.years+=m(a.months/12),a.months%=12);10<=a.years&&(a.decades+=m(a.years/10),a.years%=10,10<=a.decades&&(a.centuries+=m(a.decades/10),a.decades%=10,10<=a.centuries&&(a.millennia+=m(a.centuries/
10),a.centuries%=10)));b=0;!(e&1024)||b>=f?(a.centuries+=10*a.millennia,delete a.millennia):a.millennia&&b++;!(e&512)||b>=f?(a.decades+=10*a.centuries,delete a.centuries):a.centuries&&b++;!(e&256)||b>=f?(a.years+=10*a.decades,delete a.decades):a.decades&&b++;!(e&128)||b>=f?(a.months+=12*a.years,delete a.years):a.years&&b++;!(e&64)||b>=f?(a.months&&(a.days+=x(a.refMonth,a.months)),delete a.months,7<=a.days&&(a.weeks+=m(a.days/7),a.days%=7)):a.months&&b++;!(e&32)||b>=f?(a.days+=7*a.weeks,delete a.weeks):
a.weeks&&b++;!(e&16)||b>=f?(a.hours+=24*a.days,delete a.days):a.days&&b++;!(e&8)||b>=f?(a.minutes+=60*a.hours,delete a.hours):a.hours&&b++;!(e&4)||b>=f?(a.seconds+=60*a.minutes,delete a.minutes):a.minutes&&b++;!(e&2)||b>=f?(a.milliseconds+=1E3*a.seconds,delete a.seconds):a.seconds&&b++;if(!(e&1)||b>=f){var g=l(a,0,"milliseconds","seconds",1E3,d);if(g&&(g=l(a,g,"seconds","minutes",60,d))&&(g=l(a,g,"minutes","hours",60,d))&&(g=l(a,g,"hours","days",24,d))&&(g=l(a,g,"days","weeks",7,d))&&(g=l(a,g,"weeks",
"months",v(a.refMonth)/7,d))){e=g;var n,p=a.refMonth,q=p.getTime(),r=new Date(q);r.setFullYear(p.getFullYear()+1);n=Math.round((r.getTime()-q)/864E5);if(g=l(a,e,"months","years",n/v(a.refMonth),d))if(g=l(a,g,"years","decades",10,d))if(g=l(a,g,"decades","centuries",10,d))if(g=l(a,g,"centuries","millennia",10,d))throw Error("Fractional unit overflow");}}}finally{delete a.refMonth}return a}function d(a,b,c,e,d){var h;c=+c||222;e=0<e?e:NaN;d=0<d?20>d?Math.round(d):20:0;"function"===typeof a?(h=a,a=null):
a instanceof Date||(a=null!==a&&isFinite(a)?new Date(a):null);"function"===typeof b?(h=b,b=null):b instanceof Date||(b=null!==b&&isFinite(b)?new Date(b):null);if(!a&&!b)return new n;if(!h)return y(new n,a,b,c,e,d);var l=c&1?1E3/30:c&2?1E3:c&4?6E4:c&8?36E5:c&16?864E5:6048E5,k,g=function(){h(y(new n,a,b,c,e,d),k)};g();return k=setInterval(g,l)}var s=Math.ceil,m=Math.floor,r,t,p,q,w;n.prototype.toString=function(){var a=w(this),b=a.length;if(!b)return"";1<b&&(a[b-1]=p+a[b-1]);return a.join(q)};n.prototype.toHTML=
function(a){a=a||"span";var b=w(this),c=b.length;if(!c)return"";for(var d=0;d<c;d++)b[d]="\x3c"+a+"\x3e"+b[d]+"\x3c/"+a+"\x3e";--c&&(b[c]=p+b[c]);return b.join(q)};w=function(a){var b=[],c=a.millennia;c&&b.push(h(c,10));(c=a.centuries)&&b.push(h(c,9));(c=a.decades)&&b.push(h(c,8));(c=a.years)&&b.push(h(c,7));(c=a.months)&&b.push(h(c,6));(c=a.weeks)&&b.push(h(c,5));(c=a.days)&&b.push(h(c,4));(c=a.hours)&&b.push(h(c,3));(c=a.minutes)&&b.push(h(c,2));(c=a.seconds)&&b.push(h(c,1));(c=a.milliseconds)&&
b.push(h(c,0));return b};d.MILLISECONDS=1;d.SECONDS=2;d.MINUTES=4;d.HOURS=8;d.DAYS=16;d.WEEKS=32;d.MONTHS=64;d.YEARS=128;d.DECADES=256;d.CENTURIES=512;d.MILLENNIA=1024;d.DEFAULTS=222;d.ALL=2047;d.setLabels=function(a,b,c,d){a=a||[];a.split&&(a=a.split("|"));b=b||[];b.split&&(b=b.split("|"));for(var f=0;10>=f;f++)r[f]=a[f]||r[f],t[f]=b[f]||t[f];p="string"===typeof c?c:p;q="string"===typeof d?d:q};(d.resetLabels=function(){r="millisecond second minute hour day week month year decade century millennium".split(" ");
t="milliseconds seconds minutes hours days weeks months years decades centuries millennia".split(" ");p="and ";q=", "})();u&&u.exports?u.exports=d:"function"===typeof window.define&&"undefined"!==typeof window.define.amd&&window.define("countdown",[],function(){return d});return d}(module);
function _check_zero(x){if(parseInt(x)<10){return '0' + x}else{return x;}}
var app = {
  init: function(){
    app.loop_time();    
  },
  
  loop_time: function(){
    setTimeout(function(){
      app.pop_time();
      app.loop_time();
    }, 1000);    
  },
  
  pop_time: function(){    
    //Create timespan by passing in year, month, day, hour, and minute
    
    //Target time: April 6, 2015 at 3:10 p.m.
    var year = ozy404assets._year;
    var month = (ozy404assets._month-1); //(months are 0-11)
    var day = ozy404assets._day;
    var hour = (ozy404assets._hour-1); //(hours are 0-23)
    var min = ozy404assets._minute;
    
    var timespan = countdown( new Date(year, month, day, hour, min), null, countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS );

    //Update each number	
    jQuery("#days .time>div").text(timespan.days);
    jQuery("#hours .time>div").text(_check_zero(timespan.hours));
    jQuery("#minutes .time>div").text(_check_zero(timespan.minutes));
    jQuery("#seconds .time>div").text(_check_zero(timespan.seconds));        
  } 
}
jQuery(document).ready(function(){app.init();});