var ListContacts = function(srcList) {
    this.srcList = srcList;

    this.getListContacts = function(){
        var file = Ti.Filesystem.getFile(this.srcList);

        var contents = file.read();
        var parsedData = JSON.parse(contents.text);
        return parsedData;
    };

    this.setAttrsContact =function(list_contacts) {
        var list = [];
        
        for(var i=0, size = list_contacts.length; i<size; i++) {
        	list[i] = new Contact(list_contacts[i].Name, list_contacts[i].LastName, list_contacts[i].Photo, list_contacts[i].Email, list_contacts[i].Phone, list_contacts[i].CellPhone, list_contacts[i].Birthday);
        }
        
        var adapter = new AdapterList(list);
        adapter.renderList();
    };
};

var AdapterList = function(list_contacts){
	this.list_contacts = list_contacts;
	var self = this;
	
	this.renderList = function(){
		this.list_contacts.sort(function(a, b){
			  if (a.getName() > b.getName()) {
			    return 1;
			  }
			  if (a.getName() < b.getName()) {
			    return -1;
			  }
			  // a must be equal to b
			  return 0;

		});
		for(var i=0, size = this.list_contacts.length; i< size; i++){
        	var contact = Alloy.createModel('contacts', {
        		name: list_contacts[i].getName(),
				lastname: list_contacts[i].getLastName(),
				email: list_contacts[i].getEmail(),
				phone: list_contacts[i].getPhone(),
				cellphone: list_contacts[i].getCellPhone(),
				birthday: list_contacts[i].getBirthday(),
				photo: "file:///storage/emulated/legacy/Contacts/" + list_contacts[i].getPathImage()
        	});

        	myContacts.add(contact);
        	contact.save();
        }
        

        $.list.addEventListener('itemclick', function(e){
			var index = e.itemIndex;
			var service = new BatteryService();
			var infos = service.readBatteryInfo();
			alert("Voltage: "+infos.voltage +"\nCurrent: "+ infos.current);
			self.renderToast(e.itemIndex);
		});

		Ti.API.info("finish!");
	};

	this.renderToast = function(index) {
		var toast = Ti.UI.createNotification({
	    	message: "Name: "+self.list_contacts[index].getName()+" "+self.list_contacts[index].getLastName()+
	    	"\nE-mail: "+ self.list_contacts[index].getEmail()+
	    	"\nTelefone: "+ self.list_contacts[index].getPhone()+
	    	"\nCelular: "+ self.list_contacts[index].getCellPhone()+
	    	"\nAniversário: "+ self.list_contacts[index].getBirthday(),	

	    	duration: Ti.UI.NOTIFICATION_DURATION_LONG
		});

		toast.show();
	};
};

var Contact = function(name, lastName, pathImage, email, phone, cellPhone, birthday){
	var this.name = name;
	var this.lastName = lastName;
	var this.pathImage = pathImage;
	var this.email = email;
	var this.phone = phone;
	var this.cellPhone = cellPhone;
	var this.birthday = birthday;

	this.getName = function(){
		return this.name;
	};

	this.setName = function(name) {
		this.name = name;
	}

	this.getLastName = function(){
		return this.lastName;
	};

	this.setLastName = function(lastName) {
		this.lastName = lastName;
	}

	this.getPathImage = function(){
		return this.pathImage;
	};

	this.setPathImage = function(pathImage) {
		this.pathImage = pathImage;
	}

	this.getEmail = function(){
		return this.email;
	};

	this.setEmail = function(email) {
		this.email = email;
	}

	this.getPhone = function(){
		return this.phone;
	};

	this.setPhone = function(phone) {
		this.phone = phone;
	}

	this.getCellPhone = function(){
		return this.cellPhone;
	};

	this.setCellPhone = function(cellPhone) {
		this.cellPhone = cellPhone;
	}

	this.getBirthday = function(){
		return this.birthday;
	};

	this.setBirthday = function(birthday) {
		this.birthday = birthday;
	}
};

/*var BatteryService = function(){
	var self = this;
	this.samples = [];
	this.active = false;
	
	this.start = function() {
		intervalRead = setInterval(function(){
			//setTimeout(function(){
			self.samples.push(self.readBatteryInfo());
			
		},0);
	};

	this.stop = function(time) {
		var potency = 0;
		var pMed = 0;
		var qtSamples = 0;
		var samplesTxt = "";

		this.samples.push(this.readBatteryInfo());
		clearInterval(intervalRead);
		for(var i=0, size = this.samples.length; i < size; i++) {
			qtSamples ++;
			potency += this.samples[i].voltage * (this.samples[i].current*-1);
			samplesTxt += String(self.samples[i].voltage * (self.samples[i].current*-1)) +" W;\n";
		}
		pMed = potency/qtSamples;
		var toast = Ti.UI.createNotification({
	    	message:   "Potência Média: "+ pMed
	    				+ " W\nEnergia consumida: "+ (pMed * time)
	    				+ " joules\nNúmero de Amostras: "+ qtSamples
	    				+ "\nAmostras: \n"+ samplesTxt 
	    				+ "\nTempo: "+ time +" s",

	    	duration: Ti.UI.NOTIFICATION_DURATION_LONG
		});
		
		toast.show();
	};

	this.readBatteryInfo = function(){
		var v = Ti.Filesystem.getFile("file:///sys/class/power_supply/battery/voltage_now");
		var c = Ti.Filesystem.getFile("file:///sys/class/power_supply/battery/current_now");
		var volt = parseFloat(v.read())/1000000;
		var current = parseFloat(c.read())/1000000;
		var infos = new Object();
		infos.voltage = volt;
		infos.current = current;

		return infos;
	};
}*/

var myContacts = Alloy.Collections.contacts;
var activity = Titanium.Android.currentActivity;
var start;
Ti.Android.currentActivity.onCreate = function(e){
    start = new Date().getTime();
   
	var list = new ListContacts('file:///storage/emulated/legacy/Contacts/list.json');
	var contatos = list.getListContacts();
	list.setAttrsContact(contatos);
	$.index.open();
	
	activity.onPause();
};
Ti.Android.currentActivity.onPause = function(e) {
	var currentTime = (new Date().getTime() - start)/1000;
	var toast = Ti.UI.createNotification({
	    	message:   "Tempo: " + currentTime,

	    	duration: Ti.UI.NOTIFICATION_DURATION_LONG
		});
	toast.show();

	activity.finish();
	$.index.close()
};




