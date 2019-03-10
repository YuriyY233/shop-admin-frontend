//专门存储用户的数据，和修改用户的数据
import axios from "axios";

export default {
    namespaced: "user",
    state: {
        username: localStorage.getItem("username") || "",
        identity: localStorage.getItem("identity") || ""
    },
    actions: {
        login({
            state
        }, data) {
            return new Promise((resolve) => {
                axios({
                    url: "/admin/account/login",
                    method: 'post',
                    data,
                    withCredentials: true,
                }).then(res => {
                    const {
                        status,
                        message
                    } = res.data;
                    if (status == 1) {
                        this.$message.error(message)
                    } else {
                        state.username = message.uname;
                        state.identity = message.realname;
                        localStorage.setItem('username', message.uname);
                        localStorage.setItem('identity', message.realname);
                        resolve();
                    }
                })
            })

        },
        logout({state}){
            new Promise((resolve)=>{
                axios({
                    url:"/admin/account/logout",
                    withCredentials: true,
                }).then(res=>{
                    const {status}=res.data;
                    if(status==0){
                        state.username="";
                        state.identity="";
                        localStorage.removeItem("username");
                        localStorage.removeItem("identity");
                        resolve();
                    }
                })
            })
        },
    }
}