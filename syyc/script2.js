// 示例扇底数据
const fanBases = [
    { id: 'fan1', name: '"千恋万花"系列扇底', url: 'fan1.png' },
    { id: 'fan2', name: '"竹之情"系列扇底', url: 'fan2.png' },
    { id: 'fan3', name: '"大美牡丹"系列扇底', url: 'fan3.png' },
    { id: 'fan4', name: '"黑色"系列扇底', url: 'fan4.png' }
];

// 示例元素数据
const elements = [
    { id: 'element1', name: '', url: 'yuan1.png' },
    { id: 'element2', name: '', url: 'yuan2.png' },
    { id: 'element3', name: '', url: 'yuan3.png' },
    { id: 'element4', name: '', url: 'yuan4.png' }
];

// 获取DOM元素
const fanGrid = document.getElementById('fanGrid');
const elementGrid = document.getElementById('elementGrid');
const preview = document.getElementById('preview');
const orderButton = document.getElementById('orderButton');

// 当前选中的扇底和元素
let currentFan = null;
let currentElement = null;

// 生成扇底项目
fanBases.forEach(fan => {
    const fanItem = document.createElement('div');
    fanItem.className = 'fan-item';
    fanItem.dataset.id = fan.id;
    fanItem.innerHTML = `
        <img src="${fan.url}" alt="${fan.name}">
        <div class="fan-name">${fan.name}</div>
    `;
    fanItem.addEventListener('click', () => selectFan(fan));
    fanGrid.appendChild(fanItem);
});

// 生成元素项目
elements.forEach(element => {
    const elementItem = document.createElement('div');
    elementItem.className = 'element-item';
    elementItem.dataset.id = element.id;
    elementItem.innerHTML = `
        <img src="${element.url}" alt="${element.name}">
        <div class="element-name">${element.name}</div>
    `;
    elementItem.addEventListener('click', () => selectElement(element));
    elementGrid.appendChild(elementItem);
});

// 选择扇底
function selectFan(fan) {
    // 移除所有扇底的选中状态
    document.querySelectorAll('.fan-item').forEach(item => {
        item.classList.remove('selected');
    });

    // 添加选中状态
    const selectedFanItem = document.querySelector(`.fan-item[data-id="${fan.id}"]`);
    selectedFanItem.classList.add('selected');

    // 更新预览区域
    currentFan = fan;
    updatePreview();
}

// 选择元素
function selectElement(element) {
    // 移除所有元素的选中状态
    document.querySelectorAll('.element-item').forEach(item => {
        item.classList.remove('selected');
    });

    // 添加选中状态
    const selectedElementItem = document.querySelector(`.element-item[data-id="${element.id}"]`);
    selectedElementItem.classList.add('selected');

    // 更新当前元素
    currentElement = element;

    // 更新预览区域
    updatePreview();
}

// 更新预览区域
// 更新预览区域
function updatePreview() {
    // 清空预览区域
    preview.innerHTML = '';

    // 如果有选中的扇底，则显示扇底并使其充满整个预览区域
    if (currentFan) {
        const fanImg = document.createElement('img');
        fanImg.src = currentFan.url;
        fanImg.alt = currentFan.name;
        fanImg.style.width = '100%'; // 设置扇底图片宽度为100%
        fanImg.style.height = 'auto'; // 设置扇底图片高度为100%
        fanImg.style.maxHeight='100%'
        fanImg.style.objectFit = 'cover'; // 保持图片比例并覆盖整个区域
        preview.appendChild(fanImg);
    }

    // 如果有选中的元素，则显示元素并确保其只渲染在扇面上
    if (currentElement) {
        const elementImg = document.createElement('img');
        elementImg.src = currentElement.url;
        elementImg.alt = currentElement.name;
        elementImg.className = 'element';
        elementImg.style.width = '120px'; // 设置元素的宽度
        elementImg.style.height = '120px'; // 设置元素的高度
        elementImg.style.left = '50%'; // 元素水平居中
        elementImg.style.top = '32%'; // 元素垂直居中
        elementImg.style.transform = 'translate(-50%, -50%)'; // 元素居中对齐
        preview.appendChild(elementImg);
    }
}

// 定制完成按钮点击事件
orderButton.addEventListener('click', () => {
    if (!currentFan || !currentElement) {
        alert('请先选择扇底和一个元素');
        return;
    }
    alert('定制完成，订单已发送！');
});