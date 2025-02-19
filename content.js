// 在文件顶部添加获取标签页信息的函数
function getCurrentTabInfo(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (chrome.runtime.lastError || !tabs || tabs.length === 0) {
      console.error('无法获取标签页:', chrome.runtime.lastError);
      return;
    }

    const tab = tabs[0];

    callback({
      title: tab.title,
      url: tab.url
    });
  });
}

//女优直接等待用户输入即可


// 新增本地保存函数
function saveToLocal(data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  chrome.downloads.download({
    url: url,
    filename: data.actress + '_' + Date.now() + '.json',
    saveAs: false
  });

  // 释放对象URL（可选）
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
