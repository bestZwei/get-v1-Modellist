document.getElementById('getModelsButton').onclick = async function() {
    const proxyUrl = document.getElementById('proxyUrl').value;
    const apiKey = document.getElementById('apiKey').value;
    const loading = document.getElementById('loading');
    const modelList = document.getElementById('modelList');
    
    if (!proxyUrl || !apiKey) {
        alert('请输入代理URL和API密钥');
        return;
    }

    loading.classList.remove('hidden');
    modelList.value = '';

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

document.getElementById('checkModelsButton').onclick = async function() {
    const proxyUrl = document.getElementById('proxyUrl').value;
    const apiKey = document.getElementById('apiKey').value;
    const availableModels = document.getElementById('availableModels');
    const loading = document.getElementById('loading');
    
    if (!proxyUrl || !apiKey) {
        alert('请输入代理URL和API密钥');
        return;
    }

    loading.classList.remove('hidden');
    availableModels.value = '';

    try {
        // Step 1: 获取所有模型列表
        const response = await fetch(proxyUrl + '/v1/models', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            const modelIds = data.data.map(model => model.id);
            const available = [];

            // Step 2: 检测每个模型
            for (const modelId of modelIds) {
                const checkResponse = await fetch(proxyUrl + '/v1/models/' + modelId, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${apiKey}`
                    }
                });

                // Step 3: 如果请求成功，说明模型可用
                if (checkResponse.ok) {
                    available.push(modelId);
                }
            }
            
            // 显示可用的模型
            availableModels.value = available.join(', ');
        } else {
            alert('获取模型列表失败，请检查代理URL和API密钥。');
        }
    } catch (error) {
        alert('发生错误：' + error.message);
    } finally {
        loading.classList.add('hidden');
    }
};
