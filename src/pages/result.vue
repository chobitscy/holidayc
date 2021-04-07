<template>
    <div class="container">
        <headers>
            <span class="el-icon-arrow-left icon" @click="$router.push('/notify')" slot="back"></span>
            <span>请假详情</span>
        </headers>
        <div class="center">
            <div class="info">
                <div class="applicant">
                    <div>申请人：{{applicant}}</div>
                    <div class="circle">已通过</div>
                </div>
                <div class="applicant-info">
                    <div class="info-item">
                        <div class="info-text">所在班级：</div>
                        <div class="text" v-text="cla"/>
                    </div>
                    <div class="info-item">
                        <div class="info-text">发起时间：</div>
                        <div class="text" v-text="getTime"/>
                    </div>
                    <div class="info-item">
                        <div class="info-text">请假类型：</div>
                        <div class="text" v-text="type"/>
                    </div>
                    <div class="info-item">
                        <div class="info-text">请假时长：</div>
                        <div class="text" v-text="long"/>
                    </div>
                    <div class="info-item">
                        <div class="info-text">开始时间：</div>
                        <div class="text" v-text="getStatStr"/>
                    </div>
                    <div class="info-item">
                        <div class="info-text">结束时间：</div>
                        <div class="text" v-text="getEnd"/>
                    </div>
                </div>
                <div class="applicant-other">
                    <div class="info-item">
                        <div class="info-text">请假事由：</div>
                        <div class="text" v-text="reason"/>
                    </div>
                    <div class="info-item">
                        <div class="info-text">附 件：</div>
                        <div>
                            <el-image :src="'https://img.ams1.imgbed.xyz/2021/03/12/1KTEH.png'"
                                      style="width: 70px;height: 20px;"
                                      :previewSrcList="['https://img.ams1.imgbed.xyz/2021/03/12/1KTEH.png']"/>
                        </div>
                    </div>
                </div>
                <div class="applicant-leave">
                    <div class="text" style="margin: 10px 0;">已联系学生家长及相关宿管</div>
                    <div class="info-item">
                        <div class="info-text">是否离校：</div>
                        <div class="text" v-text="'不离校'"/>
                    </div>
                    <div class="info-item">
                        <div class="info-text">承诺书：</div>
                        <el-image :src="commitment"
                                  style="width: 50px;height: 50px;"
                                  fit="contain"
                                  :previewSrcList="[commitment]"/>
                    </div>
                </div>
            </div>
            <div class="timeline">
                <el-timeline style="padding-inline-start:10px;padding: 10px">
                    <el-timeline-item
                            :color="'rgb(105, 179, 215)'"
                            :timestamp="'发起申请'">
                        <div class="timeline-content">
                            <div class="timeline-content-text">本人</div>
                            <div class="timeline-content-text" v-text="getTime"></div>
                        </div>
                    </el-timeline-item>
                    <el-timeline-item
                            :color="'rgb(105, 179, 215)'"
                            :timestamp="counselor">
                        <div class="timeline-content">
                            <div class="timeline-content-text">辅导员</div>
                            <div>
                                <div class="timeline-content-text" v-text="getAgreeTime"></div>
                            </div>
                        </div>
                    </el-timeline-item>
                </el-timeline>
            </div>
        </div>
        <div class="footer">
            <el-button style="background-color: rgb(95, 166, 218);color: white" @click="info">我要销假
            </el-button>
            <el-button style="background-color: rgb(78, 181, 152);color: white" @click="info">我要请假
            </el-button>
        </div>
    </div>
</template>

<script>

    import Headers from "../components/headers";
    import {check} from "../utils/api";
    import FingerprintJS from "@fingerprintjs/fingerprintjs";
    import moment from "moment";

    export default {
        name: 'result',
        components: {Headers},
        props: ['values'],
        data() {
            return {
                applicant: 'xxx',
                cla: '',
                type: '事假',
                long: '03 时 00 分',
                reason: '外出办事',
                counselor: null,
                commitment: null
            }
        },
        created() {
            let data = localStorage.getItem('values');
            if (data === null) this.$router.replace('/');
            else data = JSON.parse(data);
            FingerprintJS.load().then(fp => {
                fp.get().then(result => {
                    const visitorId = result.visitorId;
                    check({
                        'name': data.applicant,
                        'visitorId': visitorId
                    }).then(res => {
                        if (res !== 1) {
                            localStorage.removeItem('values');
                            this.$router.replace('/');
                        }
                    });
                });
            });
            this.applicant = data['applicant'];
            this.cla = data['cla'];
            this.counselor = data['counselor'];
            const commitment = localStorage.getItem('commitment');
            this.commitment = commitment === null ? data['commitment'] : JSON.parse(commitment);
        },
        mounted() {
            let timestamp = document.getElementsByClassName('el-timeline-item__timestamp').item(1);
            const div = document.createElement('div');
            div.className = 'agree';
            div.innerText = '已同意';
            timestamp.appendChild(div)
        },
        computed: {
            getTime() {
                let date = new Date();
                date.setHours(date.getHours() - 3);
                date.setMinutes(date.getMinutes() + Math.ceil(Math.random() * 10));
                return moment(date).format('YYYY-MM-DD HH:MM:SS');
            },
            getEnd() {
                let date = this.getStart;
                date.setHours(date.getHours() + 3);
                return moment(date).format('YYYY-MM-DD HH:mm:ss');
            },
            getAgreeTime() {
                let date = new Date();
                date.setMinutes(date.getMinutes() + Math.ceil(Math.random() * 10));
                date.setSeconds(date.getSeconds() + Math.ceil(Math.random() * 10));
                const dateStr = moment(date).format('YYYY-MM-DD HH:MM:SS');
                localStorage.setItem('agreeTime', dateStr);
                return dateStr;
            },
            getStart() {
                let date = new Date();
                date.setMinutes(date.getMinutes() - Math.ceil(Math.random() * 60));
                date.setSeconds(date.getSeconds() - Math.ceil(Math.random() * 60));
                return date;
            },
            getStatStr(){
                return moment(this.getStart).format('YYYY-MM-DD HH:MM:SS');
            }
        },
        methods: {
            info() {
                this.$confirm('当前网络不稳定', '提示', {
                    type: 'warning'
                }).then(() => {
                }).catch(() => {
                });
            }
        }
    }
</script>

<style>
    .container {
        display: flex;
        height: 100%;
        flex-direction: column;
        width: 100%;
        background-color: rgb(247, 248, 252);
        overflow: hidden;
    }

    .center {
        flex: 1;
        overflow-y: scroll;
    }

    .info {
        padding: 1px 15px;
        background-color: white;
        margin: 15px;
    }

    .applicant {
        border-bottom: 1px solid #e4e4e4;
        padding: 15px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .info-item {
        display: flex;
        margin: 10px 0;
    }

    .info-text {
        color: rgb(193, 193, 191);
        font-size: 0.8rem;
        white-space: nowrap;
    }

    .text {
        font-size: 0.8rem;
        display: flex;
        align-items: center;
    }

    .applicant-info {
        border-bottom: 1px solid #e4e4e4;
    }

    .applicant-other {
        border-bottom: 1px solid #e4e4e4;
    }

    .timeline {
        background-color: white;
        margin: 15px;
    }

    .timeline-content {
        display: flex;
        justify-content: space-between;
    }

    .timeline-content-text {
        font-size: 10px;
        color: #999;
    }

    .el-timeline-item__timestamp {
        color: black !important;
    }

    .footer {
        display: flex;
        justify-content: space-around;
        margin: 15px;
        color: white;
    }

    .el-button {
        border-radius: 8px !important;
        width: 140px !important;
    }

    .agree {
        color: rgb(50, 193, 221);
    }

    .el-timeline-item__timestamp {
        display: flex;
        justify-content: space-between;
    }

    .circle {
        width: 28px;
        height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        text-align: center;
        word-break: break-all;
        border-radius: 50%;
        color: rgb(50 193 221);
        box-shadow: 0 0 0 3px #ffffff, 0 0 0 0 rgb(50 193 221), 0 0 0 6px #fff, 0 0 0 7px rgba(52,175,199,0.28), 0 0 0 16px #fff, 0 0 0 18px rgb(50 193 221);
        font-size: 0.5rem;
        transform: rotate(
                -30deg
        ) scale(0.8, 0.8);
    }
</style>
