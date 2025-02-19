// 当弹出窗口加载完成时初始化
document.addEventListener('DOMContentLoaded', async () => {
  // 自动填充现有输入框
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    // 使用已有 filmUrl 输入框
    document.getElementById('filmUrl').value = tab.url;
    // 在原有 productCode 输入框后添加标题信息
    document.getElementById('productCode').value = tab.title;
  } catch (error) {
    console.error('自动填充失败:', error);
    showError('自动获取网页信息失败');
  }

  // 获取保存按钮元素
  const saveBtn = document.getElementById('saveBtn');

  // 为保存按钮添加点击事件监听
  saveBtn.addEventListener('click', async () => {
    // 先隐藏错误提示
    document.getElementById('errorMessage').style.display = 'none';

    // 保持原有字段结构
    const data = {
      actress: document.getElementById('actressName').value.trim(),
      productCode: document.getElementById('productCode').value.trim(),
      pageTitle: document.querySelector('.input-hint')?.innerText.replace('检测到网页标题：', '') || '',
      url: document.getElementById('filmUrl').value.trim(),
    };

    if (!data.actress) {
      showError('请输入女优名称');
      return;
    }

    try {
      // 保存数据
      saveToLocal(data);
      window.close();  // 关闭弹出窗口
    } catch (error) {
      showError(`保存失败：${error.message}`);
    }
  });
});


// 本地保存功能实现
function saveToLocal(data) {
  // 将数据转换为格式化的JSON Blob
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  // 生成临时下载链接
  const url = URL.createObjectURL(blob);
  // 使用Chrome下载API保存文件
  chrome.downloads.download({
    url: url,
    filename: `av-data/${data.actress}_${Date.now()}.json`, // 按女优名称和时间戳命名
    saveAs: false  // 不显示保存对话框
  });
}

// 显示报错消息
function showError(message) {
  const errorBox = document.getElementById('errorMessage');
  errorBox.querySelector('.alert-text').textContent = message;
  errorBox.style.display = 'flex';
}
