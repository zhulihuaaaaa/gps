/**
 * 上传组件
 */

define(['ajax'], function (ajax) {
	return {
		name: 'component-upload',
		template: `
			<el-upload
			  class="upload-demo"
			  ref="upload"
			  name="file"
			  :action="action"
			  :multiple="multiple"
			  :accept="accept"
			  :file-list="fileList"
			  :on-success="handleSuccess"
			  :auto-upload="autoUpload"
			  :data="params"
			  :before-remove="beforeRemove"
			  >
			  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
			</el-upload>
		`,
		props: {
			// 是否自动上传
			autoUpload: {
				type: Boolean,
				default: false
			},
			accept: {
				type: String,
				default: 'image/vnd.ms-excel'
			},
			multiple: {
				type: Boolean,
				default: true
			},
			uploadData: [String, Number, Object],
			fileList: Array
		},
		data () {
			return {
				action: ctx+"/base/upload",
				params: {data: null}
			}
		},
		methods: {
			  clearFile(){
				  this.$refs.upload.clearFiles();
			  },
		      beforeRemove(file, fileList) {
		        return this.$confirm(`确定移除 ${ file.name }？`);
		      },
		      handleSuccess(response, file, fileList) {
			    	this.$emit('success', response)
			  }
		},
		mounted() {
		}
	}
})