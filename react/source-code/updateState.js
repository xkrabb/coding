// 触发状态更新
//   |
//   v
// 创建Update对象
//   |
//   v
// 从fiber到root
//   |
//   v
// 调度更新
//   |
//   v
// render阶段 - performSyncWorkOnRoot 或 performConcurrentWorkOnRoot
//   |
//   v
// commit阶段 - commitRoot
