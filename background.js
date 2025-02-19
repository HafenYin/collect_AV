// 基础后台服务脚本（必须存在）
chrome.runtime.onInstalled.addListener(() => {
  console.log('扩展已安装');
});

// 保持后台服务活跃
chrome.runtime.onStartup.addListener(() => {
  console.log('浏览器启动');
}); 