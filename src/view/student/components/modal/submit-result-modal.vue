<template>
  <Modal
    @on-cancel="cancel"
    @on-ok="submitResult"
    width="500"
    v-model="modalShow">
    <div slot="header">
      <Row>
        <Col span="8"><h2>提交比赛结果</h2></Col>
      </Row>
    </div>
    <Form ref="form" label-position="left">
      <FormItem  label = "是否得奖：">
        <i-switch size="large" v-model="form.isWinThePrice">
          <span slot="open">是</span>
          <span slot="close">否</span>
        </i-switch>
      </FormItem>
      <FormItem  label = "获奖类型：" >
        <Select :disabled="!form.isWinThePrice" v-model="form.price.typeId">
          <Option v-for="(item,index) in PRICE_TYPE" :key="index" :value="item.id">
            {{item.typeName}}
          </Option>
        </Select>
      </FormItem>
      <FormItem  label = "获奖时间：" >
        <DatePicker :disabled="!form.isWinThePrice" v-model="form.price.priceTime"/>
      </FormItem>
      <FormItem  label = "证书：" >
        <Upload
          :disabled="!form.isWinThePrice"
          :before-upload="handleBeforeUpload"
          accept="image/jpeg,image/gif,image/png"
          action="/pics/uploadFiles"
          style="display: inline-block;width:58px;">
          <div style="width: 58px;height:58px;line-height: 58px;">
            <Icon v-if="form.isWinThePrice" size="40" type="ios-camera" />
            <Icon v-else size="40" type="md-close" />
          </div>
        </Upload>
      </FormItem>
      <FormItem  label = "证书编号：" >
        <Input type="text" :disabled="!form.isWinThePrice" v-model="form.certificate.certificateNo"/>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'submit-result',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    id: { Number }
  },
  data () {
    return {
      list: [],
      image: {},
      form: {
        isWinThePrice: false,
        price: {
          typeId: 0,
          priceTime: new Date(),
          joinInProgressId: 0
        },
        certificate: {
          certificateNo: 0,
          picId: 0
        }
      },
      PRICE_TYPE: []
    }
  },
  methods: {
    ...mapActions([
      'handleGetProgressListByCompetitionId',
      'handleUploadPic',
      'handleCreatePrice',
      'handleGetType'
    ]),
    /**
     * 上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传
     * @param file
     * @returns {boolean}
     */
    handleBeforeUpload (file) {
      this.image = file
      return false
    },
    cancel () {
      this.$emit('cancel')
    },
    getProgressList (id) {
      this.handleGetProgressListByCompetitionId({ competitionId: id }).then(res => {
        this.list = res.body
      })
    },
    submitResult () {
      this.form.price.joinInProgressId = this.id
      if (this.form.isWinThePrice) {
        let formData = new FormData()
        formData.append('file', this.image)
        /* 先上传证书图片 */
        this.handleUploadPic({ formData }).then(res => {
          if (res.flag) {
            /* 返回图片Id */
            this.form.certificate.picId = res.body
          }
          this.handleCreatePrice({ form: this.form }).then(res => {
            res.flag
              ? this.$Message.info('成功')
              : this.$Message.info('失败')
          })
        })
      } else {
        this.handleCreatePrice(this.form).then(res => {
          res.flag
            ? this.$Message.info('成功')
            : this.$Message.info('失败')
        })
      }
    },
    getPriceType () {
      this.handleGetType({ type: 'price' }).then(res => {
        this.PRICE_TYPE = res.body
      })
    }
  },
  computed: {
    modalShow: {
      get () {
        this.getPriceType()
        return this.show
      },
      set (val) {
        console.info(val)
      }
    }
  }
}
</script>

<style scoped>

</style>
