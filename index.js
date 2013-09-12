define(['aura'], function(Aura) {
	console.log(Date()+'loading index.js')
	var app=Aura({debug:{enable:false}})
	app.components.addSource('aura', '../node_webkit/auraext')
	app.use('../node_webkit/auraext/aura-backbone')
	app.use('../node_webkit/auraext/aura-yadb')
	app.start({ widgets: 'body' }).then(function() {
		// 起動 aura_components 目錄中
    	//  各子目錄 (web-widget 及 comp-widget) 的 main.js
    	console.log(Date()+'Aura Started')
    })
});