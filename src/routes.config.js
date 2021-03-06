import Login from "./pages/Login.vue";
import Admin from "./pages/Admin.vue";
import GoodsList from "./pages/goods/GoodsList.vue";
import CategoryList from "./pages/category/CategoryList.vue";
import GoodListAdd from "./pages/goods/GoodListAdd.vue";
import GoodsEdit from "./pages/goods/GoodsEdit.vue";
import CategoryAdd from "./pages/category/CategoryAdd.vue";
import CategoryEdit from "./pages/category/CategoryEdit.vue"

//引入vuex的仓库
var routes = [{
    path: "/",
    redirect: "/admin"
  },
  {
    path: "/admin",
    redirect: "/admin/goods-list",
    component: Admin,
    meta: "首页",
    children: [{
        path: "goods-list",
        component: GoodsList,
        meta: "商品管理"
      },
      {
        path: "category-list",
        component: CategoryList,
        meta: "栏目管理"
      },
      {
        path: "add/goods-add",
        component: GoodListAdd,
        meta: "新增列表"
      },
      {
        path: "/admin/goods/edit/:id",
        component: GoodsEdit,
        meta: "编辑商品"
      },
      {
        path: "/admin/category-add",
        component: CategoryAdd,
        meta: "新增栏目"
      },
      {
        path: "/admin/category-edit/:id",
        component: CategoryEdit,
        meta: "编辑分类"
      }
    ]
  },
  {
    path: "/login",
    component: Login,
    meta: "登录页面"
  }
]
export default routes