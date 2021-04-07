<template>
    <div class="container">
        <Headers>
            <span class="el-icon-arrow-left icon" @click="$router.push('/result')" slot="back"></span>
            <span>请假通知</span>
            <span slot="right" class="read-text">全部已读</span>
        </Headers>
        <div class="item" @click="$message.info('系统正在维护')">
            <div class="date" v-text="getAgreeTime"></div>
            <div class="content">
                <div class="title">请假通知</div>
                <div class="detail">
                    <p v-text="getContent"></p>
                    <span class="el-icon-arrow-right"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Headers from "../components/headers";

    export default {
        name: "notify",
        components: {Headers},
        data() {
            return {
                applicant: 'xxx',
                counselor: 'xxx'
            }
        },
        computed:{
            getContent(){
                const values = JSON.parse(localStorage.getItem('values'));
                return '亲爱的' + values.applicant + '同学，你的请假申请已由' + values.counselor +'审批完成'
            },
            getAgreeTime(){
                return localStorage.getItem('agreeTime');
            }
        }
    }
</script>

<style scoped>

    .container{
        height: 100%;
        width: 100%;
        background-color: rgb(247, 248, 252);
    }

    .item {
        margin: 10px 10px;
    }

    .date {
        margin: 5px 0;
        color: #8c939d;
        text-align: center;
        font-size: 0.8rem;
        transform: scale(0.8, 0.8);
    }

    .content{
        background-color: white;
        padding: 5px 10px;
    }

    .title{
        font-size: 0.8rem;
        border-bottom: 1px #dcdfe6 solid;
        padding: 10px 5px;
        color: #606266;
    }

    .detail{
        font-size: 0.7rem;
        padding: 3px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #999;
    }

    .el-icon-arrow-right:before {
        font-weight: 900;
        color: #999;
    }

    .read-text{
        font-size: 0.8rem;
        color: #999;
    }
</style>
