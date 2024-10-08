document.getElementById('getModelsButton').onclick = async function() {
    const proxyUrl = document.getElementById('proxyUrl').value;
    const apiKey = document.getElementById('apiKey').value;
    const loading = document.getElementById('loading');
    const modelList = document.getElementById('modelList');
    
    if (!proxyUrl || !apiKey) {
        alert('请输入代理URL和API密钥');
        return;
    }

    // 确保代理链接以 /v1 结尾，并兼容 /v1/completions 和 /v1/chat/completions
    let apiUrl = proxyUrl;
    if (!apiUrl.endsWith('/v1') && !apiUrl.endsWith('/v1/completions') && !apiUrl.endsWith('/v1/chat/completions')) {
        if (apiUrl.endsWith('/')) {
            apiUrl += 'v1';
        } else {
            apiUrl += '/v1';
        }
    }

    loading.classList.remove('hidden');
    modelList.value = '';

    try {
        const response = await fetch(apiUrl + '/models', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            const modelNames = data.data.map(model => model.id).join(',');
            modelList.value = modelNames;
        } else {
            alert('获取模型列表失败，请检查代理URL和API密钥。');
        }
    } catch (error) {
        alert('发生错误：' + error.message);
    } finally {
        loading.classList.add('hidden');
    }
};

document.getElementById('copyButton').onclick = function() {
    const modelList = document.getElementById('modelList');
    modelList.select();
    modelList.setSelectionRange(0, 99999); // for mobile devices
    document.execCommand('copy');
    alert('模型列表已复制到剪贴板');
};
