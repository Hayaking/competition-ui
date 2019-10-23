<template>
  <div>
    <Modal :fullscreen="fullscreen"
           :mask-closable="false"
           :width="width"
           @on-cancel="cancel"
           v-model="show"
    >
      <!--头部-->
      <div slot="header">
        <span>上传图片</span>
        <Button @click="full"
                icon="md-qr-scanner"
                size="small"
                style="float: right;margin-right: 30px">
        </Button>
      </div>
        <!--表格-->
        <div v-if="PAGE_INDEX">
          <Button @click="toggle">添加</Button>
          <Table :border="true"
                 :columns="tb_head"
                 :data="tb_res"
          />
          <Page :current.sync="page.current"
                :page-size="page.page_size"
                :total="page.records.length"
                @on-change="pageChange"
                @on-page-size-change="pageSizeChange"
                show-elevator
                show-sizer
          />
        </div>
        <!--表单-->
        <div v-else>
          <Form ref="form" :model="process" :rule="rules">
            <FormItem prop="description" label="描述">
              <Input type="textarea" v-model="process.description" />
            </FormItem>
            <FormItem prop="time" label="时间">
              <DatePicker v-model="process.time" />
            </FormItem>
            <FormItem prop="persons" label="参赛人员">
              <Input v-model="process.persons"/>
            </FormItem>
          </Form>
          <div style="float: left;margin-top: 20px">
            <p>选择图片：</p>
          </div>
          <br>
          <Upload
            :before-upload="handleBeforeUpload"
            accept="image/jpeg,image/gif,image/png"
            action="/pics/uploadFiles"
            style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;">
              <Icon size="20" type="ios-camera"></Icon>
            </div>
          </Upload>
          <div >
            上传图片名字:{{ file.name }}
            <Button :loading="loadingStatus"
                    @click="cancelImage(file)"
                    type="text">
              {{ loadingStatus ? '取消':'Uploading' }}
            </Button>
          </div>
        </div>
      <!--尾部-->
      <div v-if="PAGE_INDEX" slot="footer">
        <Button :disabled="loading" @click="cancel(false)" type="default">取消</Button>
        <Button :loading="loading" @click="cancel(true)" type="primary">确定</Button>
      </div>
      <div v-else slot="footer">
        <Button :loading="loading" @click="save" type="primary">开始上传</Button>
        <Button :disabled="loading" @click="toggle()" type="default">返回</Button>
      </div>
    </Modal>

    <!--预览-->
    <modal height="600" v-model="watchImage" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>{{ image.name }}</span>
      </p>
      <div style="text-align:center;">
        <img :src="url + image.path" style="width: 300px;height: 200px;"/>
      </div>
    </Modal>

  </div>
</template>
<script>
import { mapActions } from 'vuex'
import axios from '@/libs/axios'

export default {
  name: 'uploadImage',
  data () {
    return {
      url: axios.baseUrl,
      PAGE_INDEX: true,
      fullscreen: false,
      watchImage: false,
      removeModal: false,
      loadingStatus: false,
      file: {},
      tb_head: [
        { title: '编号', key: 'id', sortable: false },
        { title: '描述', key: 'description', editable: false },
        { title: '时间', key: 'time', sortable: false },
        { title: '参与者', key: 'persons', sortable: false },
        { title: '竞赛', key: 'competitionId', sortable: false },
        { title: '图片', key: 'picId', sortable: false },
        {
          title: '操作',
          key: 'action',
          width: 260,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: { type: 'primary', size: 'small' },
                style: { marginRight: '5px' },
                on: {
                  click: () => {
                    this.getImagePathById(params.row.id)
                  }
                }
              }, '查看'),
              h('Button', {
                props: { type: 'error', size: 'small' },
                on: {
                  click: () => {
                    this.removeObject = {
                      obj: params.row,
                      index: params.index
                    }
                    this.removeModal = true
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      tb_res: [],
      page: {
        current: 1,
        page_size: 10,
        total: 0,
        records: []
      },
      removeObject: null,
      image: '',
      width: 1000,
      process: {
        description: '',
        time: new Date(),
        persons: '',
        competitionId: ''
      },
      rules: {
        description: [{ required: true, message: '不为空' }],
        time: [{ required: true, message: '不为空' }],
        persons: [{ required: true, message: '不为空' }]
      }
    }
  },
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    competitionId: {
      type: Number,
      default: 0
    }
  },
  methods: {
    ...mapActions([
      'handleCreateProcess',
      'handleGetProcessListByCompetitionId',
      'handleUploadPic'
    ]),
    full () {
      this.fullscreen = !this.fullscreen
    },
    /**
     * 上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传
     * @param file
     * @returns {boolean}
     */
    handleBeforeUpload (file) {
      this.loadingStatus = false
      this.file = file
      return false
    },
    cancel (up = false) {
      // 重置data
      Object.assign(this.$data, this.$options.data)
      this.$emit('cancel', up)
    },
    getProcessPage (id) {
      this.handleGetProcessListByCompetitionId({
        pageNum: this.page.current,
        pageSize: this.page.page_size,
        competitionId: id
      }).then(res => {
        this.page = res
        this.tb_res = res.records
      })
    },
    /**
       * 根据图片id获取一张图片
       * */
    getImagePathById (id) {
      // this.handleGetImagePath({ id }).then(res => {
      //   this.image = res.data
      //   this.watchImage = true
      // })
    },
    // 取消选择的图片
    cancelImage (file) {
      // let index = this.files.indexOf(file)
      // this.files.splice(index, 1)
      // this.insideSrc.splice(index, 1)
    },
    /**
       * @description 分页更换事件回调
       */
    pageChange (p) {
      this.dataFilter.page = p
      if (this.type) {
        this.getData()
      } else {
        // this.getOperationData()
      }
    },
    /**
     * @description 分页每页显示数量改变事件回调
     * @param p
     */
    pageSizeChange (p) {
      this.dataFilter.pageSize = p
      if (this.type) {
        this.getData()
      } else {
        // this.getOperationData()
      }
    },
    toggle () {
      this.PAGE_INDEX = !this.PAGE_INDEX
      this.PAGE_INDEX ? this.width = 1000 : this.width = 500
    },
    save () {
      this.$refs.form.validate(valid => {
        if (valid) {
          let formData = new FormData()
          formData.append('file', this.file)
          this.handleUploadPic({ formData }).then(res => {
            this.MESSAGE_BOX(res !== -1).then(() => {
              this.$Message.success('成功')
              this.process.picId = res
              this.process.competitionId = this.competitionId
              this.handleCreateProcess({ process: this.process }).then(res => {
                this.MESSAGE_BOX(res)
              })
            })
          })
        }
      })
    },
    MESSAGE_BOX (flag) {
      return new Promise(resolve => {
        if (flag) {
          this.$Message.success('成功')
        } else {
          this.$Message.error('失败')
        }
        resolve(flag)
      })
    }
  },
  computed: {
    show: {
      get () {
        return this.showModal
      },
      set (val) {
        console.info(val)
      }
    }
  },
  watch: {
    competitionId (val) {
      this.getProcessPage(val)
    }
  }
}
</script>

<style scoped>

</style>
