(window["webpackJsonphips-web"]=window["webpackJsonphips-web"]||[]).push([[0],{101:function(e,t,n){},102:function(e,t,n){},107:function(e,t){},109:function(e,t){},145:function(e,t){},146:function(e,t){},208:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),s=n(54),o=n.n(s),i=(n(101),n(12)),c=n(13),u=n(15),l=n(14),d=n(16),m=(n(102),n(103),function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(u.a)(this,Object(l.a)(t).call(this))).importKeys=function(){alert("importing",e.state.address),fetch("http://".concat(e.state.address,":8000/keys")).then((function(e){return e.json()})).then((function(t){alert(t),window.localStorage.hips=JSON.stringify(t),e.props.onImport()})).catch((function(e){alert(e),console.log(e)}))},e.changeAddress=function(t){e.setState({address:t.target.value})},e.state={address:"localhost"},e}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"importer"},r.a.createElement("p",null,"To import the keys, run ",r.a.createElement("span",{className:"code"},"hips export-key")," on the console in your computer, and enter here the IP address or the DNS name of the computer."),r.a.createElement("input",{id:"address-input",className:"input is-primary importer-input",placeholder:"Address",value:this.state.address,onChange:this.changeAddress}),r.a.createElement("button",{className:"button is-primary importer-button",onClick:this.importKeys},"Import"))}}]),t}(r.a.Component)),h=n(94),p=n.n(h);function f(e){var t=JSON.parse(window.localStorage.hips);return function(e,t){var n=Uint8Array.from(e,(function(e){return e.charCodeAt(0)})),a=Uint8Array.from(atob(t),(function(e){return e.charCodeAt(0)}));return window.crypto.subtle.importKey("raw",n,{name:"PBKDF2"},!1,["deriveKey","deriveBits"]).then((function(e){return window.crypto.subtle.deriveKey({name:"PBKDF2",salt:a,iterations:1e4,hash:{name:"SHA-256"}},e,{name:"AES-CBC",length:256},!1,["encrypt","decrypt"])}))}(e,t.salt).then((function(e){var n=Uint8Array.from(atob(t.iv),(function(e){return e.charCodeAt(0)})),a=Uint8Array.from(atob(t.keys),(function(e){return e.charCodeAt(0)}));return window.crypto.subtle.decrypt({name:"AES-CBC",iv:n},e,a)})).then((function(e){var t=(new TextDecoder).decode(e),n=JSON.parse(t);return function(e){if(!e.privateKey||!e.publicKey)throw new Error("Invalid decrypted data")}(n),n}))}var y=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(u.a)(this,Object(l.a)(t).call(this))).handleInput=function(t){e.setState({masterKey:t.target.value})},e.unlock=function(){f(e.state.masterKey).then((function(t){e.props.onFinish(e.state.masterKey)})).catch((function(e){console.log(e)}))},e.state={masterKey:"",test:""},e.crypto=JSON.parse(window.localStorage.hips),e}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"masterkey"},r.a.createElement("h1",{className:"title is-3"},"Enter Master Key"),r.a.createElement("input",{type:"password",value:this.state.masterKey,onChange:this.handleInput,className:"input is-primary"}),r.a.createElement("button",{className:"button is-primary is-large masterkey-button",onClick:this.unlock},"Unlock"),r.a.createElement("p",null,this.state.test))}}]),t}(r.a.Component);function b(e,t){var n;return f(e).then((function(e){return n=e.privateKey,function(e){return function(e){if(window.localStorage.gistId)return Promise.resolve(window.localStorage.gistId);return fetch("https://api.github.com/users/".concat(e,"/gists")).then((function(e){return e.json()})).then((function(e){return e.find((function(e){return e.description.match(/^hips.storage$/)}))})).then((function(e){return window.localStorage.gistId=e.id,e.id}))}(e).then((function(e){return fetch("https://api.github.com/gists/".concat(e))})).then((function(e){return e.json()})).then((function(e){return e.files.hips_passwords.content}))}(t)})).then((function(e){return function(e,t){var n=new p.a;n.importKey(e);var a=(new TextDecoder).decode(n.decrypt(t));return JSON.parse(a)}(n,e)}))}var w=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(u.a)(this,Object(l.a)(t).call(this))).handleInput=function(t){e.setState({githubUsername:t.target.value})},e.submit=function(){b(e.props.masterKey,e.state.githubUsername)&&(window.localStorage.credentials=JSON.stringify({githubUsername:e.state.githubUsername}),e.props.onFinish())},e.state={githubUsername:""},e}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"masterkey"},r.a.createElement("h1",{className:"title is-3"},"Github Username"),r.a.createElement("input",{type:"text",value:this.state.githubUsername,onChange:this.handleInput,className:"input is-primary"}),r.a.createElement("button",{className:"button is-primary is-large masterkey-button",onClick:this.submit},"Search"))}}]),t}(r.a.Component),g=n(95),v=n.n(g),S=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(u.a)(this,Object(l.a)(t).call(this))).select=function(t){return function(){e.setState({selected:t.password})}},e.onSelect=function(e){return function(){alert("password ".concat(e.name," copied to the clipboard"))}},e.reset=function(){delete window.localStorage.hips,delete window.localStorage.gistId,delete window.localStorage.credentials,window.location.reload()},e.state={passwords:[],selected:""},e}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;b(this.props.masterKey,this.props.credentials.githubUsername).then((function(t){e.setState({passwords:t.passwords})}))}},{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"home"},r.a.createElement("h1",{className:"title is-3 home-title"},"Stored Passwords"),r.a.createElement("div",{className:"home-passwords"},this.state.passwords.map((function(t){return r.a.createElement(v.a,{key:t.key,className:"button home-button is-primary","data-clipboard-text":t.password,onSuccess:e.onSelect(t)},t.name)})))),r.a.createElement("div",{className:"reset-wrapper"},r.a.createElement("button",{className:"button home-reset is-danger is-fullwidth",onClick:this.reset},"reset")))}}]),t}(r.a.Component);function k(){try{return JSON.parse(window.localStorage.credentials)}catch(e){return null}}var E=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(u.a)(this,Object(l.a)(t).call(this))).dataImportedCallback=function(){e.setState({hasImportedData:!0})},e.masterKeyCallback=function(t){e.setState({masterKey:t})},e.credentialsCallback=function(){e.setState({credentials:k()})},e.state={hasImportedData:!!window.localStorage.hips,masterKey:"",credentials:k()},e}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"app"},this.renderPage())}},{key:"renderPage",value:function(){return this.state.hasImportedData?this.state.masterKey?this.state.credentials?r.a.createElement(S,{masterKey:this.state.masterKey,credentials:this.state.credentials}):r.a.createElement(w,{masterKey:this.state.masterKey,onFinish:this.credentialsCallback}):r.a.createElement(y,{onFinish:this.masterKeyCallback}):r.a.createElement(m,{onImport:this.dataImportedCallback})}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},96:function(e,t,n){e.exports=n(208)}},[[96,1,2]]]);
//# sourceMappingURL=main.7458cc1e.chunk.js.map