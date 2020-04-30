// 全局通信总线
// 呼叫中心
// 作用：可以让任何组件之间相互通信

import Vue from 'vue'

// 直接导出一个空的 Vue 实例
export default new Vue()

// // 1、 a 组件给b组件发送数据

// // b注册通信事件
// import globbalBus from '@/utils/global-bus'
// globbalBus.$on('foo', (data) =>{
//     // 处理函数
// })

// // a发布通信事件
// import globbalBus from '@/utils/globbal-bus'
// globbalBus.$emit('foo', 123)

// // 注意事项：通信两端所使用的事件名称必须一致，否则是无效的

// // 反之 如果 b要给 a发送数据
// // 那肯定是 a注册事件，b来发布
