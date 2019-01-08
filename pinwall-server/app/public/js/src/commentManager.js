var index = new Vue({
    el: '.index',
    data(){
        return{
            aoData:{limit:12,offset:0},
            groupModel:0,       //搜索筛选选项
            columns:[
                { title: '评论',key: 'content', align: 'center'},
                { title: '评论者',key: 'email', align: 'center',width:150,
                    render: (h, params) => {
                        return h('a', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.clickUserName(params.row.id)
                                    }
                                }
                            }, params.row.user.fullname);
                    }
                },
                { title: '评论作品',key: 'email', align: 'center',width:250,
                    render: (h, params) => {
                        return h('a', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.clickUserName(params.row.id)
                                    }
                                }
                            }, params.row.artifact.name);
                    }
                },
                { title: '评论时间',key: 'email', align: 'center',width:150,
                    render:(h, params)=>{
                        return h('p',{

                        },this.dataList[params.index].commentAt.split("T")[0])
                    }
                },
                { title: '操作',key: 'opt', align: 'center',width:150,
            	   render: (h, params) => {
                       return h('div', [
                           h('Button', {
                               props: {
                                   type: 'error',
                                   size: 'small'
                               },
                               style: {
                                   marginRight: '5px'
                               },
                               on: {
                                   click: () => {
                                       this.becomeVIP(params.index)
                                   }
                               }
                           }, '删除')
                       ]);
                   }
               }
            ],
            dataList:[],
            totalPage:"",



            userId:"1",
            drawerShow:false,
            modelWidth:"",
            containerStyle:{
                minHeight:"",
            },
            // 搜索弹出层
            searchModel:false,  /* 搜索弹出层model */
            searchModelValue:"",    /*搜索内容*/
            searchModelDataList:[],
            modelWidth:"",
            columns1:[
                {title:"搜索结果",key:"name"}
            ],
            // 注册弹出层
            loginModel:false,
            formItem:{
                username:"",
                email:"",
                password:""
            },
            // 忘记密码弹出层
            recoverPwdModel:false,
            // 注册弹出层
            registerModel:false,
            imgSrc:"user/getCode",	//图片验证码路径
            // 修改资料弹出层
            resetInfoModel:false,
            // 修改密码弹出层
            resetPwdModel:false,

        }
    },
    methods: {
        groupCheck(value){
            console.log(value);
        },
        pageChange(page){
            console.log(page);
            var that = this;
            this.aoData.offset = (page - 1) * 12;
            this.$Loading.start();
            this.$http({
                url: "/website/artifactComment",
                method:"GET",
                params:this.aoData
            }).then(function(res){
                if (res.body.status == 200) {
                    that.$Loading.finish();
                    that.totalPage = res.body.data.count;
                    that.dataList = res.body.data.rows;
                }else if (res.body.status == 999) {
                    that.$Notice.error({
                        title:"没有操作权限，请登录",
                        onClose(){
                            window.location.href = "/login";
                        }
                    })
                }
            },function(err){
                that.$Loading.error();
            })
        },
        clickUserName(id){
            console.log(id);
        },
        becomeVIP(value){
            console.log(value);
        },





        // 打开search弹出层
        openModel(){
            console.log("openModel");
            this.searchModel = true;
        },
        // 修改密码弹出层
        openResetInfoModel(){
            this.resetInfoModel = true;
        },
        // 修改密码弹出层
        openResetPwdModel(){
            this.resetPwdModel = true;
        },
        // 回车搜索
        searchModelData(){
            console.log("searchModelData");
            this.searchModelDataList = [
                {id:1,name:"11111111111"},
                {id:2,name:"22222222222"},
                {id:3,name:"33333333333"},
                {id:4,name:"44444444444"},
                {id:5,name:"55555555555"}
            ]
        },
        // 搜索结果字段选择
        selectItem(index){
            console.log("selectItem",index);
        },
        // 打开登陆弹出层
        openLogin(){
            this.loginModel = true;
        },
        // 忘记密码
        onRecoverPwd(){
            this.loginModel = false;
            this.recoverPwdModel = true;
        },
        // 注册
        onRegister(){
            this.loginModel = false;
            this.registerModel = true;
        },
        tapClick() {
            var timeStamp = '?' + new Date().getTime() + 'r' + Math.random();
            this.imgSrc = "user/getCode"+timeStamp;
        },
        userManager(){

        },
        workManager(){

        },
        commentManager(){

        }
    },
    created(){
        this.containerStyle.minHeight = document.documentElement.clientHeight - 150 + "px";
        if(document.documentElement.clientWidth > 1200){
            this.modelWidth = "768px";
        }else if(document.documentElement.clientWidth < 1200){
            this.modelWidth = "70%";
        }else if(document.documentElement.clientWidth < 992){
            this.modelWidth = "80%";
        }

        var that = this;
        this.$Loading.start();
        this.$http({
            url: "/website/artifactComment",
            method:"GET",
            params:this.aoData
        }).then(function(res){
            console.log("--------",res.body.data.rows[0]);
            if (res.body.status == 200) {
                that.$Loading.finish();
                that.totalPage = res.body.data.count;
                that.dataList = res.body.data.rows;
            }else if (res.body.status == 999) {
                that.$Notice.error({
                    title:"没有操作权限，请登录",
                    onClose(){
                        window.location.href = "/login";
                    }
                })
            }
        },function(err){
            that.$Loading.error();
        })
    }
})
