let FolderStore = require('../stores/folder-store.jsx');
let UserStore = require('../stores/user-store.jsx');
let PackStore = require('../stores/pack-store.jsx');
let EasylearnConfig = require('../api/easylearn-config.js');

let EasylearnApi = {
	sync: function(success, fail) {
		let user = UserStore.getUser();
		let setting = user.setting;
		delete user.setting;

		var sendData = {
			user: user,
			setting: setting,
			folder: FolderStore.getFolder(),
			pack: PackStore.getSyncAllPack()
		};

		console.log('[sync]Start', sendData);

		var syncAjax = $.ajax({
			method: "POST",
			headers: { 'X-Auth-Token': UserStore.getToken() },
			url: EasylearnConfig.SERVER_URL + 'sync',
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify(sendData)
		});

		//success
		syncAjax.done(function(data) {
			console.log('[sync] success', data);
			success(data);
		});

		//fail
		syncAjax.fail(function(xhr, textStatus, error) {
			console.log('[sync] fail');
			console.log(xhr.statusText);
			console.log(textStatus);
			console.log(error);
			fail();
		});
	},

	fileDataUpload: function(id, deletehash) {
		$.ajax({
			url: EasylearnConfig.SERVER_URL + 'file_data',
			type: 'POST',
			data: {
				id: id,
				deletehash: deletehash
			},
			success: function() {
				console.log('[fileDataUpload]success');
			},
			error: function() {
				console.log('[fileDataUpload]fail');
			}
		});
	},

	postComment: function(noteId, newComment) {
		console.log('[postComment]', noteId, newComment);
		$.ajax({
			type: "POST",
			url: EasylearnConfig.SERVER_URL + 'comment/' + noteId,
			data: JSON.stringify(newComment),
			success: function() {
				console.log('[postComment]success');
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log('[postComment]error');
				console.log(jqXHR);
				console.log(textStatus);
				console.log(errorThrown);
			}
		});
	},

	getComment: function(noteId, callback) {
		console.log('[getComment]', noteId);
		//set url for get comment
		var url = EasylearnConfig.SERVER_URL + 'comment/' + noteId;
		console.log(url);
		$.ajax({
			type: "GET",
			url: url,
			success: function(data) {
				console.log('success get comment');
				console.log(data);
				callback(data);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log('error');
				console.log(jqXHR);
				console.log(textStatus);
				console.log(errorThrown);
			}
		});
	},

	auth: function(id, token,name, callback){
	$.ajax({
		type: "POST",
		url: "http://localhost:8080/auth",
		contentType: "application/json; charset=UTF-8",
		data: JSON.stringify({id:id,token:token}),
		success: function(data) {
			console.log('success auth');
			console.log(data);
			callback(id, name, data.token);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
	}
}
module.exports = EasylearnApi;
