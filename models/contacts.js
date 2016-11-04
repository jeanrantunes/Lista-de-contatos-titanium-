exports.definition = {
	config: {
		"columns": {
			"name": "String",
			"lastname": "String",
			"email": "String",
			"phone": "String",
			"cellphone": "String",
			"birthday": "String",
			"photo": "String"
		},
		"defaults": {
			"name": "-",
			"lastname": "-",
			"email": "-",
			"phone": "-",
			"cellphone": "-",
			"birthday": "-",
			"photo": "-"
		},
		"adapter": {
            "type": "sql",
            "collection_name": "contacts"
        }
	}
};