// 示例扇底数据
const fanBases = [
    { id: 'fan1', name: '"千恋万花"系列扇底', url: '\syyc\fan1.png' },
    { id: 'fan2', name: '"竹之情"系列扇底', url: '\syyc\fan2.png' },
    { id: 'fan3', name: '"大美牡丹"系列扇底', url: '\syyc\fan3.png' },
    { id: 'fan4', name: '"烟墨"系列扇底', url: '\syyc\fan4.png' }
];

// 示例元素数据
const elements = [
    { id: 'element1', name: '', url: '\syyc\yuan1.png' },
    { id: 'element2', name: '', url: '\syyc\yuan2.png' },
    { id: 'element3', name: '', url: '\syyc\yuan3.png' },
    { id: 'element4', name: '', url: '\syyc\yuan4.png' }
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

function updatePreview() {
    // 清空预览区域
    preview.innerHTML = '';

    // 如果有选中的扇底，则显示扇底并使其充满整个预览区域
    if (currentFan) {
        const fanImg = document.createElement('img');
        fanImg.src = currentFan.url;
        fanImg.alt = currentFan.name;
        fanImg.style.width = '100%';
        fanImg.style.height = 'auto';
        fanImg.style.maxHeight = '100%';
        fanImg.style.objectFit = 'cover'; // 保持图片比例并覆盖整个区域
        preview.appendChild(fanImg);
    }

    // 如果有选中的元素，则显示元素并使其可拖动和调整大小
    if (currentElement) {
        const elementImg = document.createElement('img');
        elementImg.src = currentElement.url;
        elementImg.alt = currentElement.name;
        elementImg.className = 'element';
        elementImg.style.width = '120px';
        elementImg.style.height = '120px';
        elementImg.style.left = '50%';
        elementImg.style.top = '32%';
        elementImg.style.transform = 'translate(-50%, -50%)';
        elementImg.style.position = 'absolute';
        elementImg.style.cursor = 'move';
        elementImg.style.userSelect = 'none';

        // 添加拖动和调整大小功能
        setupElementInteractions(elementImg);

        // 添加到预览区域
        preview.appendChild(elementImg);
    }
}

// 设置元素的交互功能
function setupElementInteractions(element) {
    let isDragging = false;
    let isResizing = false;
    let dragX, dragY;
    let startX, startY, startWidth, startHeight;

    // 长按拖动
    let pressTimer;

    // 鼠标按下事件
    element.addEventListener('mousedown', function (e) {
        // 开始长按计时
        pressTimer = setTimeout(() => {
            isDragging = true;
            dragX = e.clientX - element.getBoundingClientRect().left;
            dragY = e.clientY - element.getBoundingClientRect().top;
            document.addEventListener('mousemove', handleDrag);
        }, 250); // 长按500毫秒触发拖动

        // 阻止事件默认行为和冒泡
        e.preventDefault();
        e.stopPropagation();
    });

    // 处理拖动
    function handleDrag(e) {
        if (!isDragging) return;
        let left = e.clientX - preview.getBoundingClientRect().left - dragX;
        let top = e.clientY - preview.getBoundingClientRect().top - dragY;

        // 确保元素不会拖出预览区域
        left = Math.max(0, Math.min(left, preview.clientWidth - element.clientWidth));
        top = Math.max(0, Math.min(top, preview.clientHeight - element.clientHeight));

        element.style.left = left + 'px';
        element.style.top = top + 'px';
        element.style.transform = 'none'; // 重置transform以便拖动
    }

    // 停止拖动
    document.addEventListener('mouseup', function () {
        clearTimeout(pressTimer);
        isDragging = false;
        document.removeEventListener('mousemove', handleDrag);
    });

    // 点击调整大小
    element.addEventListener('mousedown', function (e) {
        if (isDragging) { // 左键点击且未拖动
            // 停止长按计时
            clearTimeout(pressTimer);
}
            if (!isResizing) {
                isResizing = true;
                element.style.cursor = 'nwse-resize';
                startX = e.clientX;
                startY = e.clientY;
                startWidth = parseFloat(element.style.width);
                startHeight = parseFloat(element.style.height);

                document.addEventListener('mousemove', handleResize);
            }
         
    });

    // 处理调整大小
    function handleResize(e) {
        if (!isResizing) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        const newWidth = startWidth + dx;
        const newHeight = startHeight + dy;

        // 确保元素不会超过预览区域大小或小于最小尺寸
        const maxWidth = preview.clientWidth * 0.8;
        const maxHeight = preview.clientHeight * 0.8;
        const minWidth = 50;
        const minHeight = 50;

        element.style.width = Math.min(Math.max(newWidth, minWidth), maxWidth) + 'px';
        element.style.height = Math.min(Math.max(newHeight, minHeight), maxHeight) + 'px';
    }

    // 停止调整大小
    element.addEventListener('contextmenu', function (e) {
        if (isResizing) {
            isResizing = false;
            element.style.cursor = 'move';
            document.removeEventListener('mousemove', handleResize);
            e.preventDefault(); // 阻止右键菜单弹出
        }
    });
}

// 定制完成按钮点击事件
orderButton.addEventListener('click', () => {
    if (!currentFan || !currentElement) {
        alert('请先选择扇底和一个元素');
        return;
    }
    alert('定制完成，订单已发送！');
});