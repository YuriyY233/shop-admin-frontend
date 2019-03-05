<template>
  <div>
    <el-row type="flex" class="row-bg md" justify="space-between">
      <div>
        <el-button @click="handleAddGoods">新增</el-button>
        <el-button @click="handleDelete(idStr)">删除</el-button>
      </div>
      <div>
        <el-input placeholder="请输入内容" v-model="searchvalue" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
      </div>
    </el-row>
    <el-table
      :data="tableData"
      stripe
      height="480"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column fixed prop="title" label="标题" width="200"></el-table-column>
      <el-table-column prop="categoryname" label="类型" width="200"></el-table-column>
      <el-table-column label="价格" width="200">
        <template slot-scope="scope">{{scope.row.market_price | tofixed}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block mt20">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick(row) {
      console.log(row);
    }
  },

  data() {
    return {
      tableData: [],
      pageIndex: 1,
      pageSize: 5,
      searchvalue: "",
      totalCount: 0,
      idStr:''
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.$axios
        .get(
          `http://localhost:8899/admin/goods/getlist?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}&searchvalue=${this.searchvalue}`
        )
        .then(res => {
          // console.log(res);
          const { data } = res;
          // console.log(data);
          this.tableData = data.message;
          this.totalCount = data.totalcount;
        });
    },
    handleSelectionChange(selection) {
      //   console.log(selection);
      var idArr = selection.map(v => {
        return v.id;
      });
      this.idStr=idArr.join(",");
    //   console.log(ids);

    },
    handleEdit(id) {
      // console.log(id);
      this.$router.push(`http://localhost:8899/admin/goods/edit/${id}`);
    },
    handleDelete(ids) {
      //   console.log(ids);
      //   console.log(this.$message);

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .get(`http://localhost:8899/admin/goods/del/${ids}`)
            .then(res => {
              console.log(res);
              const { message } = res.data;
              const { status } = res.status;
              if (!status) {
                this.$message({
                  message: message,
                  type: "success"
                });
                this.getList();
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSizeChange(pages) {
      // console.log(pages);
      this.pageSize = pages;
      this.getList();
    },
    handleCurrentChange(num) {
      // console.log(num);
      this.pageIndex = num;
      // console.log(this.pageIndex);
      this.getList();
    },
    handleSearch() {
      //   console.log(this.searchvalue);
      this.pageIndex = 1;
      this.getList();
    },
    handleAddGoods(){
        this.$router.push(`http://localhost:8899/admin/add/goods`)
    },
    
  },

  filters: {
    tofixed: function(data) {
      return Number(data).toFixed(2);
    }
  }
};
</script>

<style>
</style>
