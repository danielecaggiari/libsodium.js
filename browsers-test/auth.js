var Module=typeof Module!="undefined"?Module:{};try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary,setWindowTitle;function logExceptionOnExit(e){if(e instanceof ExitStatus)return;let toLog=e;err("exiting due to exception: "+toLog)}if(ENVIRONMENT_IS_NODE){if(ENVIRONMENT_IS_WORKER){scriptDirectory=require("path").dirname(scriptDirectory)+"/"}else{scriptDirectory=__dirname+"/"}var fs,nodePath;if(typeof require==="function"){fs=require("fs");nodePath=require("path")}read_=(filename,binary)=>{var ret=tryParseAsDataURI(filename);if(ret){return binary?ret:ret.toString()}filename=nodePath["normalize"](filename);return fs.readFileSync(filename,binary?undefined:"utf8")};readBinary=filename=>{var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}return ret};readAsync=(filename,onload,onerror)=>{var ret=tryParseAsDataURI(filename);if(ret){onload(ret)}filename=nodePath["normalize"](filename);fs.readFile(filename,function(err,data){if(err)onerror(err);else onload(data.buffer)})};if(process["argv"].length>1){thisProgram=process["argv"][1].replace(/\\/g,"/")}arguments_=process["argv"].slice(2);if(typeof module!="undefined"){module["exports"]=Module}quit_=(status,toThrow)=>{if(keepRuntimeAlive()){process["exitCode"]=status;throw toThrow}logExceptionOnExit(toThrow);process["exit"](status)};Module["inspect"]=function(){return"[Emscripten Module object]"}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}else{scriptDirectory=""}{read_=url=>{try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText}catch(err){var data=tryParseAsDataURI(url);if(data){return intArrayToString(data)}throw err}};if(ENVIRONMENT_IS_WORKER){readBinary=url=>{try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}catch(err){var data=tryParseAsDataURI(url);if(data){return data}throw err}}}readAsync=(url,onload,onerror)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}var data=tryParseAsDataURI(url);if(data){onload(data.buffer);return}onerror()};xhr.onerror=onerror;xhr.send(null)}}setWindowTitle=title=>document.title=title}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.warn.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];var noExitRuntime=Module["noExitRuntime"]||true;if(typeof WebAssembly!="object"){abort("no native wasm support detected")}var wasmMemory;var ABORT=false;var EXITSTATUS;function assert(condition,text){if(!condition){abort(text)}}var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(heapOrArray,idx,maxBytesToRead){var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str}function UTF8ToString(ptr,maxBytesToRead){return ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):""}var buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBufferAndViews(buf){buffer=buf;Module["HEAP8"]=HEAP8=new Int8Array(buf);Module["HEAP16"]=HEAP16=new Int16Array(buf);Module["HEAP32"]=HEAP32=new Int32Array(buf);Module["HEAPU8"]=HEAPU8=new Uint8Array(buf);Module["HEAPU16"]=HEAPU16=new Uint16Array(buf);Module["HEAPU32"]=HEAPU32=new Uint32Array(buf);Module["HEAPF32"]=HEAPF32=new Float32Array(buf);Module["HEAPF64"]=HEAPF64=new Float64Array(buf)}var INITIAL_MEMORY=Module["INITIAL_MEMORY"]||16777216;var wasmTable;var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;function keepRuntimeAlive(){return noExitRuntime}function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return filename.startsWith(dataURIPrefix)}function isFileURI(filename){return filename.startsWith("file://")}var wasmBinaryFile;wasmBinaryFile="data:application/octet-stream;base64,AGFzbQEAAAABSQxgA39/fwF/YAJ/fwBgA39/fwBgAX8Bf2ADf39+AGABfwBgBH9/f38AYAAAYAJ/fwF/YAR/f39/AX9gBX9/f39/AGADf35/AX4CGQQBYQFhAAYBYQFiAAkBYQFjAAABYQFkAAIDKSgAAQQBAgoAAgcIAwQEBAEFAgYGBQAHAwEFAQUBBwEIAwIDCQILAwAIBAQBcAAEBQcBAYACgIACBgkBfwFB4K7AAgsHEQQBZQIAAWYAIAFnACsBaAEACQkBAEEBCwMpKigKnXUo8gICAn8BfgJAIAJFDQAgACABOgAAIAAgAmoiA0EBayABOgAAIAJBA0kNACAAIAE6AAIgACABOgABIANBA2sgAToAACADQQJrIAE6AAAgAkEHSQ0AIAAgAToAAyADQQRrIAE6AAAgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgE2AgAgAyACIARrQXxxIgRqIgJBBGsgATYCACAEQQlJDQAgAyABNgIIIAMgATYCBCACQQhrIAE2AgAgAkEMayABNgIAIARBGUkNACADIAE2AhggAyABNgIUIAMgATYCECADIAE2AgwgAkEQayABNgIAIAJBFGsgATYCACACQRhrIAE2AgAgAkEcayABNgIAIAQgA0EEcUEYciIEayICQSBJDQAgAa1CgYCAgBB+IQUgAyAEaiEBA0AgASAFNwMYIAEgBTcDECABIAU3AwggASAFNwMAIAFBIGohASACQSBrIgJBH0sNAAsLIAALCwAgAEEAIAEQBBoLCgAgACABIAIQEAs2AQF/IwBBQGoiAiQAIAAgAhAbIABB0AFqIgAgAkLAABAQIAAgARAbIAJBwAAQBSACQUBrJAAL7QEBA38jAEHAAWsiBCQAIAJBgQFPBEAgABAcIAAgASACrRAQIAAgBBAbQcAAIQIgBCEBCyAAEBwgBEFAa0E2QYABEAQaIAIEQANAIARBQGsgA2oiBSAFLQAAIAEgA2otAABzOgAAIANBAWoiAyACRw0ACwsgACAEQUBrIgNCgAEQECAAQdABaiIAEBwgA0HcAEGAARAEGiACBEBBACEDA0AgBEFAayADaiIFIAUtAAAgASADai0AAHM6AAAgA0EBaiIDIAJHDQALCyAAIARBQGsiAEKAARAQIABBgAEQBSAEQcAAEAUgBEHAAWokAAttAQF/IwBBgAJrIgUkACAEQYDABHEgAiADTHJFBEAgBSABQf8BcSACIANrIgNBgAIgA0GAAkkiARsQBBogAUUEQANAIAAgBUGAAhALIANBgAJrIgNB/wFLDQALCyAAIAUgAxALCyAFQYACaiQAC4AEAQN/IAJBgARPBEAgACABIAIQAyAADwsgACACaiEDAkAgACABc0EDcUUEQAJAIABBA3FFBEAgACECDAELIAJFBEAgACECDAELIAAhAgNAIAIgAS0AADoAACABQQFqIQEgAkEBaiICQQNxRQ0BIAIgA0kNAAsLAkAgA0F8cSIEQcAASQ0AIAIgBEFAaiIFSw0AA0AgAiABKAIANgIAIAIgASgCBDYCBCACIAEoAgg2AgggAiABKAIMNgIMIAIgASgCEDYCECACIAEoAhQ2AhQgAiABKAIYNgIYIAIgASgCHDYCHCACIAEoAiA2AiAgAiABKAIkNgIkIAIgASgCKDYCKCACIAEoAiw2AiwgAiABKAIwNgIwIAIgASgCNDYCNCACIAEoAjg2AjggAiABKAI8NgI8IAFBQGshASACQUBrIgIgBU0NAAsLIAIgBE8NAQNAIAIgASgCADYCACABQQRqIQEgAkEEaiICIARJDQALDAELIANBBEkEQCAAIQIMAQsgACADQQRrIgRLBEAgACECDAELIAAhAgNAIAIgAS0AADoAACACIAEtAAE6AAEgAiABLQACOgACIAIgAS0AAzoAAyABQQRqIQEgAkEEaiICIARNDQALCyACIANJBEADQCACIAEtAAA6AAAgAUEBaiEBIAJBAWoiAiADRw0ACwsgAAsXACAALQAAQSBxRQRAIAEgAiAAEBgaCwvEAQEBfwJAAkBBjB0oAgAiAEEATgRAIABFDQFB5CUoAgAgAEH/////e3FHDQELAkBBkB0oAgBBCkYNAEHUHCgCACIAQdAcKAIARg0AQdQcIABBAWo2AgAgAEEKOgAADAILEBkMAQtBjB1BjB0oAgAiAEH/////AyAAGzYCAAJAAkBBkB0oAgBBCkYNAEHUHCgCACIAQdAcKAIARg0AQdQcIABBAWo2AgAgAEEKOgAADAELEBkLQYwdKAIAGkGMHUEANgIACwtlAQF/IwBBEGsiAiAANgIMIAIgATYCCEEAIQAgAkEAOgAHA0AgAiACLQAHIAIoAgggAGot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bWFjc2hhMjU2X2tleWJ5dGVzKCkgPiAwVQBjcnlwdG9fYXV0aF9obWFjc2hhNTEyX2tleWJ5dGVzKCkgPiAwVQBjcnlwdG9fYXV0aF9ieXRlcygpID4gMFUAY3J5cHRvX2F1dGhfaG1hY3NoYTI1Nl9ieXRlcygpID4gMFUAY3J5cHRvX2F1dGhfaG1hY3NoYTUxMl9ieXRlcygpID4gMFUAaG1hY3NoYTUxMjI1NgBzb2RpdW1fbWVtY21wKGEyLCBhMywgc2l6ZW9mIGEyKSA9PSAwAHN0cmNtcChjcnlwdG9fYXV0aF9wcmltaXRpdmUoKSwgImhtYWNzaGE1MTIyNTYiKSA9PSAwAC0tLSBTVUNDRVNTIC0tLQAobnVsbCkAY3J5cHRvX2F1dGhfaG1hY3NoYTI1Nl9zdGF0ZWJ5dGVzKCkgPT0gc2l6ZW9mKGNyeXB0b19hdXRoX2htYWNzaGEyNTZfc3RhdGUpAGNyeXB0b19hdXRoX2htYWNzaGE1MTJfc3RhdGVieXRlcygpID09IHNpemVvZihjcnlwdG9fYXV0aF9obWFjc2hhNTEyX3N0YXRlKQBjcnlwdG9fYXV0aF9obWFjc2hhNTEyMjU2X2tleWJ5dGVzKCkgPT0gY3J5cHRvX2F1dGhfa2V5Ynl0ZXMoKQBjcnlwdG9fYXV0aF9obWFjc2hhNTEyMjU2X3N0YXRlYnl0ZXMoKSA+PSBjcnlwdG9fYXV0aF9obWFjc2hhNTEyMjU2X2tleWJ5dGVzKCkAY3J5cHRvX2F1dGhfaG1hY3NoYTUxMjI1Nl9ieXRlcygpID09IGNyeXB0b19hdXRoX2J5dGVzKCkAAAAAAAAAZ+YJaoWuZ7ty8248OvVPpX9SDlGMaAWbq9mDHxnN4FuYL4pCkUQ3cc/7wLWl27XpW8JWOfER8Vmkgj+S1V4cq5iqB9gBW4MSvoUxJMN9DFV0Xb5y/rHegKcG3Jt08ZvBwWmb5IZHvu/GncEPzKEMJG8s6S2qhHRK3KmwXNqI+XZSUT6YbcYxqMgnA7DHf1m/8wvgxkeRp9VRY8oGZykpFIUKtyc4IRsu/G0sTRMNOFNUcwpluwpqdi7JwoGFLHKSoei/oktmGqhwi0vCo1FsxxnoktEkBpnWhTUO9HCgahAWwaQZCGw3Hkx3SCe1vLA0swwcOUqq2E5Pypxb828uaO6Cj3RvY6V4FHjIhAgCx4z6/76Q62xQpPej+b7yeHHGgABBsBALwQUIybzzZ+YJajunyoSFrme7K/iU/nLzbjzxNh1fOvVPpdGC5q1/Ug5RH2w+K4xoBZtrvUH7q9mDH3khfhMZzeBbIq4o15gvikLNZe8jkUQ3cS87TezP+8C1vNuJgaXbtek4tUjzW8JWORnQBbbxEfFZm08Zr6SCP5IYgW3a1V4cq0ICA6OYqgfYvm9wRQFbgxKMsuROvoUxJOK0/9XDfQxVb4l78nRdvnKxlhY7/rHegDUSxyWnBtyblCZpz3Txm8HSSvGewWmb5OMlTziGR77vtdWMi8adwQ9lnKx3zKEMJHUCK1lvLOktg+SmbqqEdErU+0G93KmwXLVTEYPaiPl2q99m7lJRPpgQMrQtbcYxqD8h+5jIJwOw5A7vvsd/Wb/Cj6g98wvgxiWnCpNHkafVb4ID4FFjygZwbg4KZykpFPwv0kaFCrcnJskmXDghGy7tKsRa/G0sTd+zlZ0TDThT3mOvi1RzCmWosnc8uwpqduau7UcuycKBOzWCFIUscpJkA/FMoei/ogEwQrxLZhqokZf40HCLS8IwvlQGo1FsxxhS79YZ6JLREKllVSQGmdYqIHFXhTUO9LjRuzJwoGoQyNDSuBbBpBlTq0FRCGw3Hpnrjt9Md0gnqEib4bW8sDRjWsnFswwcOcuKQeNKqthOc+Njd0/KnFujuLLW828uaPyy713ugo90YC8XQ29jpXhyq/ChFHjIhOw5ZBoIAseMKB5jI/r/vpDpvYLe62xQpBV5xrL3o/m+K1Ny4/J4ccacYSbqzj4nygfCwCHHuIbRHuvgzdZ92up40W7uf0999bpvF3KqZ/AGppjIosV9YwquDfm+BJg/ERtHHBM1C3EbhH0EI/V32yiTJMdAe6vKMry+yRUKvp48TA0QnMRnHUO2Qj7LvtTFTCp+ZfycKX9Z7PrWOqtvy18XWEdKjBlEbIAAQfAWC0EZAAoAGRkZAAAAAAUAAAAAAAAJAAAAAAsAAAAAAAAAABkAEQoZGRkDCgcAAQAJCxgAAAkGCwAACwAGGQAAABkZGQBBwRcLIQ4AAAAAAAAAABkACg0ZGRkADQAAAgAJDgAAAAkADgAADgBB+xcLAQwAQYcYCxUTAAAAABMAAAAACQwAAAAAAAwAAAwAQbUYCwEQAEHBGAsVDwAAAAQPAAAAAAkQAAAAAAAQAAAQAEHvGAsBEgBB+xgLHhEAAAAAEQAAAAAJEgAAAAAAEgAAEgAAGgAAABoaGgBBshkLDhoAAAAaGhoAAAAAAAAJAEHjGQsBFABB7xkLFRcAAAAAFwAAAAAJFAAAAAAAFAAAFABBnRoLARYAQakaCycVAAAAABUAAAAACRYAAAAAABYAABYAADAxMjM0NTY3ODlBQkNERUYAQdAaCyR3aGF0IGRvIHlhIHdhbnQgZm9yIG5vdGhpbmc/AAAAAEplZmUAQZAbC7EBQW5vdGhlciBvbmUgZ290IGNhdWdodCB0b2RheSwgaXQncyBhbGwgb3ZlciB0aGUgcGFwZXJzLiAiVGVlbmFnZXIgQXJyZXN0ZWQgaW4gQ29tcHV0ZXIgQ3JpbWUgU2NhbmRhbCIsICJIYWNrZXIgQXJyZXN0ZWQgYWZ0ZXIgQmFuayBUYW1wZXJpbmciLi4uIERhbW4ga2lkcy4gVGhleSdyZSBhbGwgYWxpa2UuAAAFAEHMHAsBAQBB5BwLDgIAAAADAAAAWBMAAAAEAEH8HAsBAQBBjB0LBf////8K";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinary(file){try{if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}catch(err){abort(err)}}function getBinaryPromise(){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)){if(typeof fetch=="function"&&!isFileURI(wasmBinaryFile)){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){if(!response["ok"]){throw"failed to load wasm binary file at '"+wasmBinaryFile+"'"}return response["arrayBuffer"]()}).catch(function(){return getBinary(wasmBinaryFile)})}else{if(readAsync){return new Promise(function(resolve,reject){readAsync(wasmBinaryFile,function(response){resolve(new Uint8Array(response))},reject)})}}}return Promise.resolve().then(function(){return getBinary(wasmBinaryFile)})}function createWasm(){var info={"a":asmLibraryArg};function receiveInstance(instance,module){var exports=instance.exports;Module["asm"]=exports;wasmMemory=Module["asm"]["e"];updateGlobalBufferAndViews(wasmMemory.buffer);wasmTable=Module["asm"]["h"];addOnInit(Module["asm"]["f"]);removeRunDependency("wasm-instantiate")}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}function instantiateArrayBuffer(receiver){return getBinaryPromise().then(function(binary){return WebAssembly.instantiate(binary,info)}).then(function(instance){return instance}).then(receiver,function(reason){err("failed to asynchronously prepare wasm: "+reason);abort(reason)})}function instantiateAsync(){if(!wasmBinary&&typeof WebAssembly.instantiateStreaming=="function"&&!isDataURI(wasmBinaryFile)&&!isFileURI(wasmBinaryFile)&&!ENVIRONMENT_IS_NODE&&typeof fetch=="function"){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){var result=WebAssembly.instantiateStreaming(response,info);return result.then(receiveInstantiationResult,function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");return instantiateArrayBuffer(receiveInstantiationResult)})})}else{return instantiateArrayBuffer(receiveInstantiationResult)}}if(Module["instantiateWasm"]){try{var exports=Module["instantiateWasm"](info,receiveInstance);return exports}catch(e){err("Module.instantiateWasm callback failed with error: "+e);return false}}instantiateAsync();return{}}var ASM_CONSTS={3792:()=>{return Module.getRandomValue()},3828:()=>{if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}function callRuntimeCallbacks(callbacks){while(callbacks.length>0){callbacks.shift()(Module)}}function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){if(ASSERTIONS){assert(false,"Character code "+chr+" ("+String.fromCharCode(chr)+")  at offset "+i+" not in 0x00-0xFF.")}chr&=255}ret.push(String.fromCharCode(chr))}return ret.join("")}function ___assert_fail(condition,filename,line,func){abort("Assertion failed: "+UTF8ToString(condition)+", at: "+[filename?UTF8ToString(filename):"unknown filename",line,func?UTF8ToString(func):"unknown function"])}var readAsmConstArgsArray=[];function readAsmConstArgs(sigPtr,buf){readAsmConstArgsArray.length=0;var ch;buf>>=2;while(ch=HEAPU8[sigPtr++]){buf+=ch!=105&buf;readAsmConstArgsArray.push(ch==105?HEAP32[buf]:HEAPF64[buf++>>1]);++buf}return readAsmConstArgsArray}function _emscripten_asm_const_int(code,sigPtr,argbuf){var args=readAsmConstArgs(sigPtr,argbuf);return ASM_CONSTS[code].apply(null,args)}function _emscripten_memcpy_big(dest,src,num){HEAPU8.copyWithin(dest,src,src+num)}var printCharBuffers=[null,[],[]];function printChar(stream,curr){var buffer=printCharBuffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}}var SYSCALLS={varargs:undefined,get:function(){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret},getStr:function(ptr){var ret=UTF8ToString(ptr);return ret}};function _fd_write(fd,iov,iovcnt,pnum){var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>2];var len=HEAPU32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){printChar(fd,HEAPU8[ptr+j])}num+=len}HEAPU32[pnum>>2]=num;return 0}function _proc_exit(code){EXITSTATUS=code;if(!keepRuntimeAlive()){if(Module["onExit"])Module["onExit"](code);ABORT=true}quit_(code,new ExitStatus(code))}function exitJS(status,implicit){EXITSTATUS=status;_proc_exit(status)}function handleException(e){if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)}var ASSERTIONS=false;var decodeBase64=typeof atob=="function"?atob:function(input){var keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{enc1=keyStr.indexOf(input.charAt(i++));enc2=keyStr.indexOf(input.charAt(i++));enc3=keyStr.indexOf(input.charAt(i++));enc4=keyStr.indexOf(input.charAt(i++));chr1=enc1<<2|enc2>>4;chr2=(enc2&15)<<4|enc3>>2;chr3=(enc3&3)<<6|enc4;output=output+String.fromCharCode(chr1);if(enc3!==64){output=output+String.fromCharCode(chr2)}if(enc4!==64){output=output+String.fromCharCode(chr3)}}while(i<input.length);return output};function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE=="boolean"&&ENVIRONMENT_IS_NODE){var buf=Buffer.from(s,"base64");return new Uint8Array(buf["buffer"],buf["byteOffset"],buf["byteLength"])}try{var decoded=decodeBase64(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}catch(_){throw new Error("Converting base64 string to bytes failed.")}}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var asmLibraryArg={"a":___assert_fail,"c":_emscripten_asm_const_int,"d":_emscripten_memcpy_big,"b":_fd_write};var asm=createWasm();var ___wasm_call_ctors=Module["___wasm_call_ctors"]=function(){return(___wasm_call_ctors=Module["___wasm_call_ctors"]=Module["asm"]["f"]).apply(null,arguments)};var _main=Module["_main"]=function(){return(_main=Module["_main"]=Module["asm"]["g"]).apply(null,arguments)};var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(args){var entryFunction=Module["_main"];var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exitJS(ret,true);return ret}catch(e){return handleException(e)}}function run(args){args=args||arguments_;if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(shouldRunNow)callMain(args);postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();
