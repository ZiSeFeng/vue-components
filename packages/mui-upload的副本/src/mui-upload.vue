<template>
<div>
	<input @change="addFile" :multiple="multiple" type="file" :name="name" id="my-upload"/>
</div>
</template>

<script>
import {
  uploadHelper,
  imageFileExtension,
  docFileExtension,
  IGuid,
  getFileType,
  fileSizeToUnit,
  isExceedSizeLimit,
  SIZE_UNIT
} from './upload-help';

export default {
	name: 'mui-upload',
	props: {
		name: String,
		action: {
			type: String,
			required: true
		},
		fileList: {
			type: Array,
			default: []
		},
    data: Object,
    size: {
      type: Number,
      default: 0,
    },
    httpRequest: {
      type: Function,
      default: uploadHelper
    },
		multiple: Boolean,
		limit: Number,
		onChange: Function,
		onBefore: Function,
		onProgress: Function,
		onSuccess: Function,
    onFinished: Function,
    onError: Function,
    onRemove: Function
  },
  computed: {
    allowFileExtension() {
      return this.accept ? this.accept : [...docFileExtension, ...imageFileExtension]
    },
    fileNum() {
      return this.fileList.length
    }
  },
  filters: {
    fileSizeToUnit(value) {
      consol.log(value, 'file size to unit')
      value = parseFloat(value)
      if (isNaN(value)) return 0
      return fileSizeToUnit(value)
    }
  },
	methods: {
		addFile({target: {files}}){
      // this.$indicator.open('正在上传中...')
			for (let i = 0, l = files.length; i < l; i++) {
        let fileId= IGuid();
				files[i].url = URL.createObjectURL(files[i]);
				files[i].status = 'ready';
        files[i].percentage = 0;
        files[i].fileId = fileId;
      }
      
      let fileList = [...this.fileList];
      console.log(fileList, files, 'dfasdfads')
			if(this.multiple){
				fileList = [...fileList, ...files];
				let l = fileList.length;
				let limit = this.limit;
				if(limit && typeof limit === "number" && Math.ceil(limit) > 0 && l > limit){
					limit = Math.ceil(limit);
//					limit = limit > 10 ? 10 : limit;
					fileList = fileList.slice(l - limit);
				}
			}else{
				fileList = [files[0]];
			}
      this.onChange(fileList);
      if (fileList) {
        this.uploadFiles(fileList)
      }
    },
    uploadFiles(postFiles) {
      if (postFiles.length === 0) return;
      postFiles.forEach((rawFile, i) => {
        if (!this.validateFileValue(rawFile)) return;
        // if (this.onBefore() && !this.onBefore(rawFile)) return;
        this.fileList.push(rawFile);
        this.doPostFile(rawFile, rawFile.fileId);
      })
    },
    doPostFile(file, fileId) {
      let options = {
        withCredentials: this.withCredentials,
        action: this.action,
        filename: this.name,
        onSuccess: (data) => {
          this.onUploadSuccess(data,fileId);
        },
        onProgress: (data) => {
          // console.log(data, file, 'progress 12354')
          this.onUploadProgress(data, file, fileId)
        },
        onError: (err) => {
          this.onUploadError(err, fileId)
        }
      }
      file.xhr = this.httpRequest(options);
    },
    onUploadSuccess(data, fileId) {
      this.onSuccess && this.onSuccess(data, fileId);
    },
    onUploadProgress(data, file, fileId) {
      // console.log(data, file, 'mui upload progress')
      file.percentage = data.percentage;
      this.onProgress && this.onProgress(file, fileId);
    },
    onUploadError(err, fileId) {
      this.remove(fileId);
      this.onError && this.onError(data);
      this.$message.error(`上传文件失败，请重新上传:${data}`)
    },
		async remove(fileId){
      // let fileList = [...this.fileList];
      let fileIndex = this.fileList.findIndex(el => el.fileId === fileId);
      if (fileIndex < 0) return;
      let file = this.fileList[fileIndex];
      if (file) {
        if (file.xhr) {
          file.xhr.abort()
        }
        try {
          this.onRemove && await this.onRemove(file)
        } catch (e) {
          console.error(e);
          return
        }
      }
      this.fileList.splice(fileIndex, 1);

			// if(fileList.length){
       
			// 	fileList.splice(fileIndex, 1);
			// 	this.onChange(fileList);
			// }
    },
    // 验证上传文件，合格则添加进uploadList数组
    validateFileValue({ fileId, name, size }) {
      console.log(fileId, size, name , 'validateFileValue   ')
      let fileType = getFileType(name)
      // 检查文件格式
      if (!this.allowFileExtension.includes(fileType)) {
        this.$message.warning('不支持的文件上传格式！')
        return false
      }
      // 检查文件大小，目前默认限制为10MB
      if (size === 0) {
        this.$message.warning('文件大小不能为0！')
        return false
      }
      if (!isExceedSizeLimit(size, this.limit, this.unit)) {
        // this.$message.warning(`文件大小超过限制, 限制大小为${this.limit + this.unit}`)
        alert(`文件大小超过限制, 限制大小为${this.limit + this.unit}`)
        return false
      }
      return true
    },
		submit(){
      // alert('submit')
			// if(this.checkIfCanUpload()){
			// 	if(this.onProgress && typeof XMLHttpRequest !== 'undefined')
			// 		this.xhrSubmit();
			// 	else
			// 		this.fetchSubmit();
			// }
		},
		fetchSubmit(){
			let keys = Object.keys(this.data), values = Object.values(this.data), action = this.action;
			const promises = this.fileList.map(each => {
				each.status = "uploading";
				let data = new FormData();
				data.append(this.name || 'file', each);
				keys.forEach((one, index) => data.append(one, values[index]));
				return fetch(action, {
				  method: 'POST',
				  headers: {
				  	"Content-Type" : "application/x-www-form-urlencoded"
				  },
				  body: data
				}).then(res => res.text()).then(res => JSON.parse(res));
			});
			Promise.all(promises).then(resArray => {
				let success = 0, failed = 0;
				resArray.forEach((res, index) => {
					if(res.code == 1){
						success++;
						this.onSuccess(index, res);
					}else if(res.code == 520){
						failed++;
						this.onFailed(index, res);
					}
				});
				return { success, failed };
			}).then(this.onFinished);
		},
		checkIfCanUpload(){
			return this.fileList.length ? (this.onBefore && this.onBefore() || !this.onBefore) : false;
		},
		xhrSubmit(){
			const _this = this;
			let options = this.fileList.map((rawFile, index) => ({
				file: rawFile,
				data: _this.data,
        filename: _this.name || "file",
        action: _this.action,
        size: _this.size,
        onProgress(e){
          _this.onProgress(index, e);
        },
        onSuccess(res){
          _this.onSuccess(index, res);
        },
        onError(err){
          _this.onFailed(index, err);
        }
			}));
			let l = this.fileList.length;
			let send = async options => {
				for(let i = 0; i < l; i++){
					await _this.sendFetch(options[i]);
				}
			};
			send(options);
		},
		getBody(xhr) {
		  var text = xhr.responseText || xhr.response;
		  if (!text) {
		    return text;
		  }
	
		  try {
		    return JSON.parse(text);
		  } catch (e) {
		    return text;
		  }
		},
		sendFetch(option){
			const _this = this;
      return upload(option);
      
			function getError(action, option, xhr) {
			  var msg = void 0;
			  if (xhr.response) {
			    msg = xhr.status + ' ' + (xhr.response.error || xhr.response);
			  } else if (xhr.responseText) {
			    msg = xhr.status + ' ' + xhr.responseText;
			  } else {
			    msg = 'fail to post ' + action + ' ' + xhr.status;
			  }
		
			  var err = new Error(msg);
			  err.status = xhr.status;
			  err.method = 'post';
			  err.url = action;
			  return err;
			}
			function upload(option) {
			  if (typeof XMLHttpRequest === 'undefined') {
			    return;
			  }
				
        
			  var xhr = new XMLHttpRequest();
			  var action = option.action;
		
			  if (xhr.upload) {
			    xhr.upload.onprogress = function progress(e) {
			    	e.status = "uploading";
			      if (e.total > 0) {
			        e.percentage = e.loaded / e.total * 100;
			      }
			      if(e.loaded == e.total || e.percentage === 100){
			      	e.status = "finish";
			      }
			      option.onProgress(e);
			    };
			  }
		
			  var formData = new FormData();
		
			  if (option.data) {
			    Object.keys(option.data).map(function (key) {
			      formData.append(key, option.data[key]);
			    });
			  }
		
			  formData.append(option.filename, option.file);
		
			  xhr.onerror = function error(e) {
			  	e.status = "error";
			    option.onError(e);
			  };
		
			  xhr.onload = function onload() {
			    if (xhr.status < 200 || xhr.status >= 300) {
			      return option.onError(getError(action, option, xhr));
			    }
		
			    option.onSuccess(_this.getBody(xhr));
			  };
		
			  xhr.open('post', action, true);
		
			  if (option.withCredentials && 'withCredentials' in xhr) {
			    xhr.withCredentials = true;
			  }
		
			  var headers = option.headers || {};
		
			  for (var item in headers) {
			    if (headers.hasOwnProperty(item) && headers[item] !== null) {
			      xhr.setRequestHeader(item, headers[item]);
			    }
			  }
			  xhr.send(formData);
			  return xhr;
			}
		}
	}
}
</script>

<style lang="scss" scoped>
div{
	display: none;
}
</style>