<template>
  <div>
    <avue-crud
      :data="data.data"
      v-if="option.column"
      :option="option"
      :page="page"
      @row-save="create"
      @row-update="update"
      @row-del="remove"
      @on-load="changePage"
      @sort-change="changeSort"
      @search-change="search"
    ></avue-crud>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class ResourceList extends Vue {
  @Prop(String) resource!: string
  data: any = {}
  option: any = {}
  query: any = {}

  page: any = {
    total: 0,
    pageSize: 2,
    pageSizes: [2, 5, 10],
  }

  async create(row, done) {
    await this.$http.post(`${this.resource}`, row)
    this.$message.success('创建成功')
    this.fetch()
    done()
  }
  async update(row, index, done) {
    const data = JSON.parse(JSON.stringify(row))
    delete data.$index
    await this.$http.put(`${this.resource}/${row._id}`, data)
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
  async changePage({ pageSize, currentPage }) {
    this.query.page = currentPage
    this.query.limit = pageSize
    this.fetch()
  }
  async changeSort({ prop, order }) {
    if (!order) {
      this.query.sort = null
    } else {
      this.query.sort = {
        [prop]: order === 'ascending'?1:-1,
      }
    }
    this.fetch()
  }
  async search(where,done){
    for (let k in where) {
      const field=this.option.column.find(v=>v.prop===k)
      if(field&&field.regex){
        where[k]={$regex:where[k]}
      }
    }
    this.query.where=where
    this.fetch()
    done()
  }
  async fetch() {
    const res = await this.$http.get(`${this.resource}`, {
      params: {
        query: this.query,
      },
    })
    this.page.total = res.data.total
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
