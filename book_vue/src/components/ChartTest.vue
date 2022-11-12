<template>
  <div>
    <div style="{height:'100px'}"></div>
    <el-button @click="connect" type="primary">点击链接</el-button>
    <el-button @click="sendMessage" type="primary">发送消息</el-button>
  </div>
</template>

<!-- <script src="https://cdn.socket.io/3.1.2/socket.io.js"></script> -->
<script>
export default {
  data() {
    return {};
  },
  methods: {
    // 连接socket
    connect() {
      this.$socket.open(); // 开始连接socket

      // 订阅事件
      this.sockets.subscribe("relogin", (data) => {
        console.log("客户端返回数据:"+data.msg);
      });
    },

    // 发送消息
    sendMessage() {
      this.$socket.emit("login",{
        userName:"Cherry"
      });
    },
  },

  sockets: {
    relogin(data){
        console.log("客户端返回数据:"+data.msg);
    },
    connecting() {
      console.log('正在连接')
    },
    disconnect() {
      console.log("Socket 断开");
    },
    connect_failed() {
      cosnole.log('连接失败')
    },
    connect() {
      console.log('socket connected')
    },
    err(){
      console.log("错误发生");
    }
  },
};
</script>

<style>
</style>