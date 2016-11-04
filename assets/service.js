var service = Titanium.Android.currentService;
var intent = service.intent;
var d = new Date();
Titanium.API.info("Time:"+ d.getHours() +":"+ d.getMinutes() +":"+ d.getSeconds());