var Module=typeof Module!=="undefined"?Module:{};try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides={};var key;for(key in Module){if(Module.hasOwnProperty(key)){moduleOverrides[key]=Module[key]}}var arguments_=[];var thisProgram="./this.program";var quit_=function(status,toThrow){throw toThrow};var ENVIRONMENT_IS_WEB=typeof window==="object";var ENVIRONMENT_IS_WORKER=typeof importScripts==="function";var ENVIRONMENT_IS_NODE=typeof process==="object"&&typeof process.versions==="object"&&typeof process.versions.node==="string";var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary,setWindowTitle;function logExceptionOnExit(e){if(e instanceof ExitStatus)return;var toLog=e;err("exiting due to exception: "+toLog)}var nodeFS;var nodePath;if(ENVIRONMENT_IS_NODE){if(ENVIRONMENT_IS_WORKER){scriptDirectory=require("path").dirname(scriptDirectory)+"/"}else{scriptDirectory=__dirname+"/"}read_=function shell_read(filename,binary){var ret=tryParseAsDataURI(filename);if(ret){return binary?ret:ret.toString()}if(!nodeFS)nodeFS=require("fs");if(!nodePath)nodePath=require("path");filename=nodePath["normalize"](filename);return nodeFS["readFileSync"](filename,binary?null:"utf8")};readBinary=function readBinary(filename){var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}assert(ret.buffer);return ret};readAsync=function readAsync(filename,onload,onerror){var ret=tryParseAsDataURI(filename);if(ret){onload(ret)}if(!nodeFS)nodeFS=require("fs");if(!nodePath)nodePath=require("path");filename=nodePath["normalize"](filename);nodeFS["readFile"](filename,function(err,data){if(err)onerror(err);else onload(data.buffer)})};if(process["argv"].length>1){thisProgram=process["argv"][1].replace(/\\/g,"/")}arguments_=process["argv"].slice(2);if(typeof module!=="undefined"){module["exports"]=Module}quit_=function(status,toThrow){if(keepRuntimeAlive()){process["exitCode"]=status;throw toThrow}logExceptionOnExit(toThrow);process["exit"](status)};Module["inspect"]=function(){return"[Emscripten Module object]"}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!=="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}else{scriptDirectory=""}{read_=function(url){try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText}catch(err){var data=tryParseAsDataURI(url);if(data){return intArrayToString(data)}throw err}};if(ENVIRONMENT_IS_WORKER){readBinary=function(url){try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}catch(err){var data=tryParseAsDataURI(url);if(data){return data}throw err}}}readAsync=function(url,onload,onerror){var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=function(){if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}var data=tryParseAsDataURI(url);if(data){onload(data.buffer);return}onerror()};xhr.onerror=onerror;xhr.send(null)}}setWindowTitle=function(title){document.title=title}}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.warn.bind(console);for(key in moduleOverrides){if(moduleOverrides.hasOwnProperty(key)){Module[key]=moduleOverrides[key]}}moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];var noExitRuntime=Module["noExitRuntime"]||true;if(typeof WebAssembly!=="object"){abort("no native wasm support detected")}var wasmMemory;var ABORT=false;var EXITSTATUS;function assert(condition,text){if(!condition){abort("Assertion failed: "+text)}}var UTF8Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(heap,idx,maxBytesToRead){var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heap[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heap.subarray&&UTF8Decoder){return UTF8Decoder.decode(heap.subarray(idx,endPtr))}else{var str="";while(idx<endPtr){var u0=heap[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heap[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heap[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heap[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}}return str}function UTF8ToString(ptr,maxBytesToRead){return ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):""}var buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBufferAndViews(buf){buffer=buf;Module["HEAP8"]=HEAP8=new Int8Array(buf);Module["HEAP16"]=HEAP16=new Int16Array(buf);Module["HEAP32"]=HEAP32=new Int32Array(buf);Module["HEAPU8"]=HEAPU8=new Uint8Array(buf);Module["HEAPU16"]=HEAPU16=new Uint16Array(buf);Module["HEAPU32"]=HEAPU32=new Uint32Array(buf);Module["HEAPF32"]=HEAPF32=new Float32Array(buf);Module["HEAPF64"]=HEAPF64=new Float64Array(buf)}var INITIAL_MEMORY=Module["INITIAL_MEMORY"]||16777216;var wasmTable;var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeExited=false;var runtimeKeepaliveCounter=0;function keepRuntimeAlive(){return noExitRuntime||runtimeKeepaliveCounter>0}function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function exitRuntime(){runtimeExited=true}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}Module["preloadedImages"]={};Module["preloadedAudios"]={};function abort(what){{if(Module["onAbort"]){Module["onAbort"](what)}}what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -s ASSERTIONS=1 for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return filename.startsWith(dataURIPrefix)}function isFileURI(filename){return filename.startsWith("file://")}var wasmBinaryFile;wasmBinaryFile="data:application/octet-stream;base64,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EAsgACgCFCICTQ0AIAAsAEtBCkYNACAAIAJBAWo2AhQgAkEKOgAADAELIAAgAUEPakEBIAAoAiQRAABBAUcNACABLQAPGgsgAUEQaiQAC/ACAgJ/AX4CQCACRQ0AIAAgAmoiA0EBayABOgAAIAAgAToAACACQQNJDQAgA0ECayABOgAAIAAgAToAASADQQNrIAE6AAAgACABOgACIAJBB0kNACADQQRrIAE6AAAgACABOgADIAJBCUkNACAAQQAgAGtBA3EiBGoiAyABQf8BcUGBgoQIbCIANgIAIAMgAiAEa0F8cSICaiIBQQRrIAA2AgAgAkEJSQ0AIAMgADYCCCADIAA2AgQgAUEIayAANgIAIAFBDGsgADYCACACQRlJDQAgAyAANgIYIAMgADYCFCADIAA2AhAgAyAANgIMIAFBEGsgADYCACABQRRrIAA2AgAgAUEYayAANgIAIAFBHGsgADYCACACIANBBHFBGHIiAWsiAkEgSQ0AIACtQoGAgIAQfiEFIAEgA2ohAQNAIAEgBTcDGCABIAU3AxAgASAFNwMIIAEgBTcDACABQSBqIQEgAkEgayICQR9LDQALCwsTAEHQHkGQHTYCAEHMHUEqNgIACxAAIABCADcCACAAQgA3AggLuwIAAkAgAUEUSw0AAkACQAJAAkACQAJAAkACQAJAAkAgAUEJaw4KAAECAwQFBgcICQoLIAIgAigCACIBQQRqNgIAIAAgASgCADYCAA8LIAIgAigCACIBQQRqNgIAIAAgATQCADcDAA8LIAIgAigCACIBQQRqNgIAIAAgATUCADcDAA8LIAIgAigCAEEHakF4cSIBQQhqNgIAIAAgASkDADcDAA8LIAIgAigCACIBQQRqNgIAIAAgATIBADcDAA8LIAIgAigCACIBQQRqNgIAIAAgATMBADcDAA8LIAIgAigCACIBQQRqNgIAIAAgATAAADcDAA8LIAIgAigCACIBQQRqNgIAIAAgATEAADcDAA8LIAIgAigCAEEHakF4cSIBQQhqNgIAIAAgASsDADkDAA8LIAAgAkEAEQQACwtCAQN/IAAoAgAsAAAQCARAA0AgACgCACICLAAAIQMgACACQQFqNgIAIAMgAUEKbGpBMGshASACLAABEAgNAAsLIAELlwIAIABFBEBBAA8LAn8CQCAABH8gAUH/AE0NAQJA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";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinary(file){try{if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}else{throw"both async and sync fetching of the wasm failed"}}catch(err){abort(err)}}function getBinaryPromise(){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)){if(typeof fetch==="function"&&!isFileURI(wasmBinaryFile)){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){if(!response["ok"]){throw"failed to load wasm binary file at '"+wasmBinaryFile+"'"}return response["arrayBuffer"]()}).catch(function(){return getBinary(wasmBinaryFile)})}else{if(readAsync){return new Promise(function(resolve,reject){readAsync(wasmBinaryFile,function(response){resolve(new Uint8Array(response))},reject)})}}}return Promise.resolve().then(function(){return getBinary(wasmBinaryFile)})}function createWasm(){var info={"a":asmLibraryArg};function receiveInstance(instance,module){var exports=instance.exports;Module["asm"]=exports;wasmMemory=Module["asm"]["d"];updateGlobalBufferAndViews(wasmMemory.buffer);wasmTable=Module["asm"]["g"];addOnInit(Module["asm"]["e"]);removeRunDependency("wasm-instantiate")}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}function instantiateArrayBuffer(receiver){return getBinaryPromise().then(function(binary){return WebAssembly.instantiate(binary,info)}).then(function(instance){return instance}).then(receiver,function(reason){err("failed to asynchronously prepare wasm: "+reason);abort(reason)})}function instantiateAsync(){if(!wasmBinary&&typeof WebAssembly.instantiateStreaming==="function"&&!isDataURI(wasmBinaryFile)&&!isFileURI(wasmBinaryFile)&&typeof fetch==="function"){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){var result=WebAssembly.instantiateStreaming(response,info);return result.then(receiveInstantiationResult,function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");return instantiateArrayBuffer(receiveInstantiationResult)})})}else{return instantiateArrayBuffer(receiveInstantiationResult)}}if(Module["instantiateWasm"]){try{var exports=Module["instantiateWasm"](info,receiveInstance);return exports}catch(e){err("Module.instantiateWasm callback failed with error: "+e);return false}}instantiateAsync();return{}}var ASM_CONSTS={1768:function(){return Module.getRandomValue()},1804:function(){if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback=="function"){callback(Module);continue}var func=callback.func;if(typeof func==="number"){if(callback.arg===undefined){getWasmTableEntry(func)()}else{getWasmTableEntry(func)(callback.arg)}}else{func(callback.arg===undefined?null:callback.arg)}}}function getWasmTableEntry(funcPtr){return wasmTable.get(funcPtr)}function handleException(e){if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)}var readAsmConstArgsArray=[];function readAsmConstArgs(sigPtr,buf){readAsmConstArgsArray.length=0;var ch;buf>>=2;while(ch=HEAPU8[sigPtr++]){var readAsmConstArgsDouble=ch<105;if(readAsmConstArgsDouble&&buf&1)buf++;readAsmConstArgsArray.push(readAsmConstArgsDouble?HEAPF64[buf++>>1]:HEAP32[buf]);++buf}return readAsmConstArgsArray}function _emscripten_asm_const_int(code,sigPtr,argbuf){var args=readAsmConstArgs(sigPtr,argbuf);return ASM_CONSTS[code].apply(null,args)}function _emscripten_memcpy_big(dest,src,num){HEAPU8.copyWithin(dest,src,src+num)}var SYSCALLS={mappings:{},buffers:[null,[],[]],printChar:function(stream,curr){var buffer=SYSCALLS.buffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}},varargs:undefined,get:function(){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret},getStr:function(ptr){var ret=UTF8ToString(ptr);return ret},get64:function(low,high){return low}};function _fd_write(fd,iov,iovcnt,pnum){var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAP32[iov>>2];var len=HEAP32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){SYSCALLS.printChar(fd,HEAPU8[ptr+j])}num+=len}HEAP32[pnum>>2]=num;return 0}var ASSERTIONS=false;function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){if(ASSERTIONS){assert(false,"Character code "+chr+" ("+String.fromCharCode(chr)+")  at offset "+i+" not in 0x00-0xFF.")}chr&=255}ret.push(String.fromCharCode(chr))}return ret.join("")}var decodeBase64=typeof atob==="function"?atob:function(input){var keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{enc1=keyStr.indexOf(input.charAt(i++));enc2=keyStr.indexOf(input.charAt(i++));enc3=keyStr.indexOf(input.charAt(i++));enc4=keyStr.indexOf(input.charAt(i++));chr1=enc1<<2|enc2>>4;chr2=(enc2&15)<<4|enc3>>2;chr3=(enc3&3)<<6|enc4;output=output+String.fromCharCode(chr1);if(enc3!==64){output=output+String.fromCharCode(chr2)}if(enc4!==64){output=output+String.fromCharCode(chr3)}}while(i<input.length);return output};function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE==="boolean"&&ENVIRONMENT_IS_NODE){var buf=Buffer.from(s,"base64");return new Uint8Array(buf["buffer"],buf["byteOffset"],buf["byteLength"])}try{var decoded=decodeBase64(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}catch(_){throw new Error("Converting base64 string to bytes failed.")}}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var asmLibraryArg={"b":_emscripten_asm_const_int,"c":_emscripten_memcpy_big,"a":_fd_write};var asm=createWasm();var ___wasm_call_ctors=Module["___wasm_call_ctors"]=function(){return(___wasm_call_ctors=Module["___wasm_call_ctors"]=Module["asm"]["e"]).apply(null,arguments)};var _main=Module["_main"]=function(){return(_main=Module["_main"]=Module["asm"]["f"]).apply(null,arguments)};var calledRun;function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}var calledMain=false;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(args){var entryFunction=Module["_main"];var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exit(ret,true);return ret}catch(e){return handleException(e)}finally{calledMain=true}}function run(args){args=args||arguments_;if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(shouldRunNow)callMain(args);postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}Module["run"]=run;function exit(status,implicit){EXITSTATUS=status;if(keepRuntimeAlive()){}else{exitRuntime()}procExit(status)}function procExit(code){EXITSTATUS=code;if(!keepRuntimeAlive()){if(Module["onExit"])Module["onExit"](code);ABORT=true}quit_(code,new ExitStatus(code))}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();
