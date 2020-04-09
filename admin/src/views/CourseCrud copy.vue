<template>
  <div>
    <avue-crud :data="data.data" 
    v-if="option.column"
    :option="option" 
    @row-save="create"
    @row-update="update"
    @row-del="remove"
    ></avue-crud>
  </div>
</template>

<script lang="ts">
import { Vue, Component ,Prop} from 'vue-property-decorator'

@Component({})
export default class ResourceList extends Vue {

  @Prop(String) resource!:string
  data = {}
  option = {}

  async create(row,done){
    await this.$http.post(`${this.resource}`,row)
    this.$message.success('创建成功')
    this.fetch()
    done()
  }
  async update(row,index,done){
    const data=JSON.parse(JSON.stringify(row))
    delete data.$index
    await this.$http.put(`${this.resource}/${row._id}`,data)
    this.$message.success('更新成功')
    this.fetch()
    done()
  }
  async remove(row) {
    try {
      await this.$confirm('是否确认删除')
    } catch (e) {
      return
    }
    await this.$http.delete(`${this.resource}/${row._id}`)
    this.$message.success('删除成功')
    this.fetch()
  }
  async fetch() {
    const res = await this.$http.get(`${this.resource}`)
    this.data = res.data
  }
  async fetchOption() {
    const res = await this.$http.get(`${this.resource}/option`)
    this.option = res.data
  }
  created() {
    this.fetchOption()
    this.fetch()
  }
}
</script>

<style scoped></style>
