<template>
  <Card title="基本设置">
    <Form :model="user" v-if="isStudent===true"
          label-width="70"
          label-position="left">
      <FormItem label="姓名：">
        <Input v-model="user.stuName"/>
      </FormItem>
      <FormItem label="班级：">
        <Input v-model="user.stuClass"/>
      </FormItem>
      <FormItem label="性别：">
        <Input v-model="user.stuSex"/>
      </FormItem>
      <FormItem label="头像">
        <div>
          <Upload
            :before-upload="handleBeforeUpload"
            action="/pic">
            <avatar class="headimg" size="large" :src="url"/>
          </Upload>
        </div>
      </FormItem>
    </Form>

    <Form :model="user" v-else
          label-width="70"
          label-position="left">
    <FormItem label="姓名：">
      <Input v-model="user.teacherName"/>
    </FormItem>
    <!--      <FormItem label="班级：">-->
    <!--        <Input v-model="user.stuClass"/>-->
    <!--      </FormItem>-->
    <FormItem label="性别：">
      <Input v-model="user.teacherSex"/>
    </FormItem>
    <FormItem label="头像">
      <div>
        <Upload
          :before-upload="handleBeforeUpload"
          action="/pic">
          <avatar size="large" :src="url"/>
        </Upload>
      </div>
    </FormItem>
  </Form>
    <Button @click="save">保存</Button>
  </Card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Icons from '../../../../components/icons/icons'

export default {
  name: 'info-card',
  components: { Icons },
  data () {
    return {
      user: {},
      image: {},
      url: ''
    }
  },
  methods: {
    ...mapActions([
      'handleUpdateStudentInfo',
      'handleUpdateTeacherInfo',
      'handleUploadPic'
    ]),
    handleBeforeUpload (file) {
      // this.handleGetPicUrl(this.user.picId).then(res =>{
      //   this.url = res.data.body;
      // });
      this.image = file
      let formData = new FormData()
      formData.append('file', this.image)
      this.handleUploadPic({ formData }).then(res => {
        res.flag
          ? this.$Message.info('上传图片成功')
          : this.$Message.info('上传图片失败')
      })
    },
    save () {
      console.info(this.isStudent)
      if (this.isStudent === true) {
        this.handleUpdateStudentInfo({ student: this.user }).then(res => {
          if (res) {
            this.$Message.success('成功')
          }
        })
      } else {
        this.handleUpdateTeacherInfo({ teacher: this.teacher }).then(res => {
          if (res) {
            this.$Message.success('成功')
          }
        })
      }
    }
  },
  computed: {
    ...mapGetters([
      'getUserInfo',
      'getIsStudent'
    ]),
    isStudent () {
      return this.getIsStudent
    }
  },
  watch: {
    getUserInfo: {
      handler (val) {
        this.user = val
      },
      deep: true,
      immediate: true
    },
    getPicUrl: {
      handler (val) {
        this.url = val
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
