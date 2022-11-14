var Module=typeof Module!="undefined"?Module:{};try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary,setWindowTitle;function logExceptionOnExit(e){if(e instanceof ExitStatus)return;let toLog=e;err("exiting due to exception: "+toLog)}if(ENVIRONMENT_IS_NODE){if(ENVIRONMENT_IS_WORKER){scriptDirectory=require("path").dirname(scriptDirectory)+"/"}else{scriptDirectory=__dirname+"/"}var fs,nodePath;if(typeof require==="function"){fs=require("fs");nodePath=require("path")}read_=(filename,binary)=>{var ret=tryParseAsDataURI(filename);if(ret){return binary?ret:ret.toString()}filename=nodePath["normalize"](filename);return fs.readFileSync(filename,binary?undefined:"utf8")};readBinary=filename=>{var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}return ret};readAsync=(filename,onload,onerror)=>{var ret=tryParseAsDataURI(filename);if(ret){onload(ret)}filename=nodePath["normalize"](filename);fs.readFile(filename,function(err,data){if(err)onerror(err);else onload(data.buffer)})};if(process["argv"].length>1){thisProgram=process["argv"][1].replace(/\\/g,"/")}arguments_=process["argv"].slice(2);if(typeof module!="undefined"){module["exports"]=Module}quit_=(status,toThrow)=>{if(keepRuntimeAlive()){process["exitCode"]=status;throw toThrow}logExceptionOnExit(toThrow);process["exit"](status)};Module["inspect"]=function(){return"[Emscripten Module object]"}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}else{scriptDirectory=""}{read_=url=>{try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText}catch(err){var data=tryParseAsDataURI(url);if(data){return intArrayToString(data)}throw err}};if(ENVIRONMENT_IS_WORKER){readBinary=url=>{try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}catch(err){var data=tryParseAsDataURI(url);if(data){return data}throw err}}}readAsync=(url,onload,onerror)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}var data=tryParseAsDataURI(url);if(data){onload(data.buffer);return}onerror()};xhr.onerror=onerror;xhr.send(null)}}setWindowTitle=title=>document.title=title}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.warn.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];var noExitRuntime=Module["noExitRuntime"]||true;if(typeof WebAssembly!="object"){abort("no native wasm support detected")}var wasmMemory;var ABORT=false;var EXITSTATUS;function assert(condition,text){if(!condition){abort(text)}}var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(heapOrArray,idx,maxBytesToRead){var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str}function UTF8ToString(ptr,maxBytesToRead){return ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):""}var buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBufferAndViews(buf){buffer=buf;Module["HEAP8"]=HEAP8=new Int8Array(buf);Module["HEAP16"]=HEAP16=new Int16Array(buf);Module["HEAP32"]=HEAP32=new Int32Array(buf);Module["HEAPU8"]=HEAPU8=new Uint8Array(buf);Module["HEAPU16"]=HEAPU16=new Uint16Array(buf);Module["HEAPU32"]=HEAPU32=new Uint32Array(buf);Module["HEAPF32"]=HEAPF32=new Float32Array(buf);Module["HEAPF64"]=HEAPF64=new Float64Array(buf)}var INITIAL_MEMORY=Module["INITIAL_MEMORY"]||16777216;var wasmTable;var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;function keepRuntimeAlive(){return noExitRuntime}function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return filename.startsWith(dataURIPrefix)}function isFileURI(filename){return filename.startsWith("file://")}var wasmBinaryFile;wasmBinaryFile="data:application/octet-stream;base64,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";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinary(file){try{if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}catch(err){abort(err)}}function getBinaryPromise(){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)){if(typeof fetch=="function"&&!isFileURI(wasmBinaryFile)){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){if(!response["ok"]){throw"failed to load wasm binary file at '"+wasmBinaryFile+"'"}return response["arrayBuffer"]()}).catch(function(){return getBinary(wasmBinaryFile)})}else{if(readAsync){return new Promise(function(resolve,reject){readAsync(wasmBinaryFile,function(response){resolve(new Uint8Array(response))},reject)})}}}return Promise.resolve().then(function(){return getBinary(wasmBinaryFile)})}function createWasm(){var info={"a":asmLibraryArg};function receiveInstance(instance,module){var exports=instance.exports;Module["asm"]=exports;wasmMemory=Module["asm"]["e"];updateGlobalBufferAndViews(wasmMemory.buffer);wasmTable=Module["asm"]["h"];addOnInit(Module["asm"]["f"]);removeRunDependency("wasm-instantiate")}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}function instantiateArrayBuffer(receiver){return getBinaryPromise().then(function(binary){return WebAssembly.instantiate(binary,info)}).then(function(instance){return instance}).then(receiver,function(reason){err("failed to asynchronously prepare wasm: "+reason);abort(reason)})}function instantiateAsync(){if(!wasmBinary&&typeof WebAssembly.instantiateStreaming=="function"&&!isDataURI(wasmBinaryFile)&&!isFileURI(wasmBinaryFile)&&!ENVIRONMENT_IS_NODE&&typeof fetch=="function"){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){var result=WebAssembly.instantiateStreaming(response,info);return result.then(receiveInstantiationResult,function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");return instantiateArrayBuffer(receiveInstantiationResult)})})}else{return instantiateArrayBuffer(receiveInstantiationResult)}}if(Module["instantiateWasm"]){try{var exports=Module["instantiateWasm"](info,receiveInstance);return exports}catch(e){err("Module.instantiateWasm callback failed with error: "+e);return false}}instantiateAsync();return{}}var ASM_CONSTS={2608:()=>{return Module.getRandomValue()},2644:()=>{if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}function callRuntimeCallbacks(callbacks){while(callbacks.length>0){callbacks.shift()(Module)}}function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){if(ASSERTIONS){assert(false,"Character code "+chr+" ("+String.fromCharCode(chr)+")  at offset "+i+" not in 0x00-0xFF.")}chr&=255}ret.push(String.fromCharCode(chr))}return ret.join("")}function ___assert_fail(condition,filename,line,func){abort("Assertion failed: "+UTF8ToString(condition)+", at: "+[filename?UTF8ToString(filename):"unknown filename",line,func?UTF8ToString(func):"unknown function"])}var readAsmConstArgsArray=[];function readAsmConstArgs(sigPtr,buf){readAsmConstArgsArray.length=0;var ch;buf>>=2;while(ch=HEAPU8[sigPtr++]){buf+=ch!=105&buf;readAsmConstArgsArray.push(ch==105?HEAP32[buf]:HEAPF64[buf++>>1]);++buf}return readAsmConstArgsArray}function _emscripten_asm_const_int(code,sigPtr,argbuf){var args=readAsmConstArgs(sigPtr,argbuf);return ASM_CONSTS[code].apply(null,args)}function _emscripten_memcpy_big(dest,src,num){HEAPU8.copyWithin(dest,src,src+num)}var printCharBuffers=[null,[],[]];function printChar(stream,curr){var buffer=printCharBuffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}}var SYSCALLS={varargs:undefined,get:function(){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret},getStr:function(ptr){var ret=UTF8ToString(ptr);return ret}};function _fd_write(fd,iov,iovcnt,pnum){var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>2];var len=HEAPU32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){printChar(fd,HEAPU8[ptr+j])}num+=len}HEAPU32[pnum>>2]=num;return 0}function _proc_exit(code){EXITSTATUS=code;if(!keepRuntimeAlive()){if(Module["onExit"])Module["onExit"](code);ABORT=true}quit_(code,new ExitStatus(code))}function exitJS(status,implicit){EXITSTATUS=status;_proc_exit(status)}function handleException(e){if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)}var ASSERTIONS=false;var decodeBase64=typeof atob=="function"?atob:function(input){var keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{enc1=keyStr.indexOf(input.charAt(i++));enc2=keyStr.indexOf(input.charAt(i++));enc3=keyStr.indexOf(input.charAt(i++));enc4=keyStr.indexOf(input.charAt(i++));chr1=enc1<<2|enc2>>4;chr2=(enc2&15)<<4|enc3>>2;chr3=(enc3&3)<<6|enc4;output=output+String.fromCharCode(chr1);if(enc3!==64){output=output+String.fromCharCode(chr2)}if(enc4!==64){output=output+String.fromCharCode(chr3)}}while(i<input.length);return output};function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE=="boolean"&&ENVIRONMENT_IS_NODE){var buf=Buffer.from(s,"base64");return new Uint8Array(buf["buffer"],buf["byteOffset"],buf["byteLength"])}try{var decoded=decodeBase64(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}catch(_){throw new Error("Converting base64 string to bytes failed.")}}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var asmLibraryArg={"d":___assert_fail,"b":_emscripten_asm_const_int,"c":_emscripten_memcpy_big,"a":_fd_write};var asm=createWasm();var ___wasm_call_ctors=Module["___wasm_call_ctors"]=function(){return(___wasm_call_ctors=Module["___wasm_call_ctors"]=Module["asm"]["f"]).apply(null,arguments)};var _main=Module["_main"]=function(){return(_main=Module["_main"]=Module["asm"]["g"]).apply(null,arguments)};var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(args){var entryFunction=Module["_main"];var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exitJS(ret,true);return ret}catch(e){return handleException(e)}}function run(args){args=args||arguments_;if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(shouldRunNow)callMain(args);postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();
