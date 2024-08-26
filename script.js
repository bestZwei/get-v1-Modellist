document.getElementById('getModelsButton').onclick = async function() {
    const proxyUrl = document.getElementById('proxyUrl').value;
    const apiKey = document.getElementById('apiKey').value;

    try {
        const response = await fetch(proxyUrl + '/v1/models', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            const modelNames = data.data.map(model => model.id).join(', ');
            document.getElementById('modelList').value = modelNames;
        } else {
            document.getElementById('modelList').value = '获取模型列表失败，请检查代理URL和API密钥。';
        }
    } catch (error) {
        document.getElementById('modelList').value = '发生错误：' + error.message;
    }
};

document.getElementById('copyButton').onclick = function() {
    const modelList = document.getElementById('modelList');
    modelList.select();
    modelList.setSelectionRange(0, 99999); // for mobile devices
    document.execCommand('copy');
    alert('模型列表已复制到剪贴板');
};
