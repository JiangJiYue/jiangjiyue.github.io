function onMatch() {
    // 获取用户输入的正则表达式
    var pattern = $('.tarea').val();
    // 检查全局搜索和忽略大小写复选框是否选中
    var globalSearch = $('#optionGlobal').is(':checked');
    var ignoreCase = $('#optionIgnoreCase').is(':checked');
    // 构建正则表达式的标志字符串
    var flags = '';
    if (globalSearch) {
        flags += 'g';
    }
    if (ignoreCase) {
        flags += 'i';
    }

    // 创建正则表达式对象
    var regex = new RegExp(pattern, flags);
    // 获取可编辑div里的文本内容
    var content = $('.tarea1').val();
    var newContent = content.replace(regex, function (match) {
        return '<span class="highlight">' + match + '</span>';
    });
    console.log(newContent);
    // 将新内容设置回div

    // 将新内容设置回div，以便可以显示HTML格式（包括span标签）
    $('.output').html(newContent);

    // 阻止a标签默认行为
    return false;
}


function removeDuplicates() {
    // 从 textarea 获取内容
    var textarea = document.getElementsByClassName('tarea1')[0];
    var textarea1 = document.getElementsByClassName('tarea')[0];
    var content = textarea.value.trim();  // 移除内容前后的空白

    // 假设内容为逗号分隔的值，先将其分割成数组
    var contentArray = content.split('\n').map(item => item.trim());  // 移除每个元素前后的空白

    // 计算去重前的数据量
    var beforeCount = contentArray.length;

    // 使用 Set 去除数组中的重复项
    var uniqueContentArray = [...new Set(contentArray)];

    // 计算去重后的数据量
    var afterCount = uniqueContentArray.length;

    // 计算去重的数据量
    var removedCount = beforeCount - afterCount;

    // 生成更新信息
    var updateInfo = `去重前的数据量: ${beforeCount}\n去重后的数据量: ${afterCount}\n去重的数据量: ${removedCount}\n\n`;

    // 将去重后的数组内容再次转换为逗号分隔的字符串
    var uniqueContent = uniqueContentArray.join('\n');

    // 更新 textarea 的内容，加上去重信息
    textarea1.value = updateInfo + uniqueContent;
}

function sumOccurrencesByCountry() {
    var textarea = document.getElementsByClassName('tarea1')[0];
    var textarea1 = document.getElementsByClassName('tarea')[0];
    // 分割输入成单行
    var content = textarea.value.trim();  // 移除内容前后的空白
    var lines = content.split('\n').map(item => item.trim());  // 移除每个元素前后的空白

    const countryList = [
        '阿富汗', '阿尔巴尼亚', '阿尔及利亚', '安道尔', '安哥拉', '安提瓜和巴布达', '阿根廷', '亚美尼亚', '澳大利亚', '奥地利', '阿塞拜疆',
        '巴哈马', '巴林', '孟加拉国', '巴巴多斯', '白俄罗斯', '比利时', '伯利兹', '贝宁', '不丹', '玻利维亚', '波黑', '博茨瓦纳', '巴西', '文莱',
        '保加利亚', '布基纳法索', '布隆迪', '柬埔寨', '喀麦隆', '加拿大', '佛得角', '中非', '乍得', '智利', '中国', '哥伦比亚', '科摩罗', '刚果（布）',
        '刚果（金）', '哥斯达黎加', '克罗地亚', '古巴', '塞浦路斯', '捷克', '丹麦', '吉布提', '多米尼克', '多米尼加', '东帝汶', '厄瓜多尔', '埃及',
        '萨尔瓦多', '赤道几内亚', '厄立特里亚', '爱沙尼亚', '斯威士兰', '埃塞俄比亚', '斐济', '芬兰', '法国', '加蓬', '冈比亚', '格鲁吉亚', '德国',
        '加纳', '希腊', '格林纳达', '危地马拉', '几内亚', '几内亚比绍', '圭亚那', '海地', '洪都拉斯', '匈牙利', '冰岛', '印度', '印度尼西亚', '伊朗',
        '伊拉克', '爱尔兰', '以色列', '意大利', '牙买加', '日本', '约旦', '哈萨克斯坦', '肯尼亚', '基里巴斯', '韩国', '科威特', '吉尔吉斯斯坦', '老挝',
        '拉脱维亚', '黎巴嫩', '莱索托', '利比里亚', '利比亚', '列支敦士登', '立陶宛', '卢森堡', '马达加斯加', '马拉维', '马来西亚', '马尔代夫',
        '马里', '马耳他', '马绍尔群岛', '毛里塔尼亚', '毛里求斯', '墨西哥', '密克罗尼西亚', '摩尔多瓦', '摩纳哥', '蒙古', '黑山', '摩洛哥', '莫桑比克',
        '缅甸', '纳米比亚', '瑙鲁', '尼泊尔', '荷兰', '新西兰', '尼加拉瓜', '尼日尔', '尼日利亚', '北马其顿', '挪威', '阿曼', '巴基斯坦', '帕劳',
        '巴勒斯坦', '巴拿马', '巴布亚新几内亚', '巴拉圭', '秘鲁', '菲律宾', '波兰', '葡萄牙', '卡塔尔', '罗马尼亚', '俄罗斯', '卢旺达', '圣基茨和尼维斯',
        '圣卢西亚', '圣文森特和格林纳丁斯', '萨摩亚', '圣马力诺', '圣多美和普林西比', '沙特阿拉伯', '塞内加尔', '塞尔维亚', '塞舌尔', '塞拉利昂',
        '新加坡', '斯洛伐克', '斯洛文尼亚', '所罗门群岛', '索马里', '南非', '南苏丹', '西班牙', '斯里兰卡', '苏丹', '苏里南', '瑞典', '瑞士', '叙利亚',
        '塔吉克斯坦', '坦桑尼亚', '泰国', '多哥', '汤加', '特立尼达和多巴哥', '突尼斯', '土耳其', '土库曼斯坦', '图瓦卢', '乌干达', '乌克兰', '阿联酋',
        '英国', '美国', '乌拉圭', '乌兹别克斯坦', '瓦努阿图', '梵蒂冈', '委内瑞拉', '越南', '也门', '赞比亚', '津巴布韦', '亚太地区', '欧盟'
    ];

    const countryOccurrences = { '其他': 0 };

    lines.forEach(line => {
        var parts = line.split('\t'); // 假设每行是由制表符分隔的两部分
        var place = parts[0].trim();
        var count = parseInt(parts[1], 10);

        // 查找与当前行匹配的国家名
        var matchingCountry = countryList.find(country => place.startsWith(country));

        if (matchingCountry) {
            if (!countryOccurrences[matchingCountry]) {
                countryOccurrences[matchingCountry] = 0;
            }
            countryOccurrences[matchingCountry] += count;
        } else {
            // 无法识别的地名累加到“其他”类别
            countryOccurrences['其他'] += count;
        }
    });

    // 将结果对象转换为一个数组，以便排序
    var sortedCountryOccurrences = Object.keys(countryOccurrences)
        .map(key => [key, countryOccurrences[key]])
        .sort((a, b) => b[1] - a[1]); // 降序排序

    var resultString = sortedCountryOccurrences
        .map(([country, count]) => `${country}\t${count}`)
        .join('\n');

    textarea1.value = resultString;
}
function formatThreats() {
    var textarea = document.getElementsByClassName('tarea1')[0];
    var textarea1 = document.getElementsByClassName('tarea')[0];
    // 分割输入成单行
    var content = textarea.value.trim(); // 移除内容前后的空白
    var lines = content.split('\n').map(item => item.trim()); // 移除每个元素前后的空白
    // 移除总计行
    lines.pop();

    // 将每行数据转换为描述文本
    var descriptions = lines.map((line, index) => {
        // 分割行为事件和次数
        var parts = line.split('\t');
        var threat = parts[0].trim();
        var count = parseInt(parts[1], 10);

        // 格式化描述，最后一个事件后面不加逗号
        // 移除了事件和次数之间的空格
        return `${threat}${index === lines.length - 1 ? '' : ''}${count}次`;
    });

    // 加入描述文本间的连接词
    textarea1.value = descriptions.join('、');
}

$(document).ready(function () {
    // 使用事件委托简化代码
    $('.button-group').on('click', 'button.insert-btn', function () {
        var pattern = $(this).data('pattern');
        insertText(pattern);
    });

    // 将插入文本的逻辑抽象到一个函数中
    function insertText(text) {
        var textarea = $('.tarea')[0]; // 选择第一个匹配的textarea元素
        // 标准浏览器及IE9+
        if (textarea.selectionStart || textarea.selectionStart === '0') {
            var startPos = textarea.selectionStart;
            var endPos = textarea.selectionEnd;
            textarea.value = textarea.value.substring(0, startPos)
                + text
                + textarea.value.substring(endPos, textarea.value.length);
            textarea.focus();
            textarea.selectionStart = startPos + text.length;
            textarea.selectionEnd = startPos + text.length;
            // IE8及以下
        } else if (document.selection) {
            textarea.focus();
            var sel = document.selection.createRange();
            sel.text = text;
            textarea.focus();
        } else {
            textarea.value += text;
            textarea.focus();
        }
    }

    // 绑定测试匹配按钮的点击事件
    $('.btn-primary').click(onMatch);
    $('.removeDuplicates').click(removeDuplicates);
    $('.sumOccurrencesByCountry').click(sumOccurrencesByCountry);
    $('.formatThreats').click(formatThreats);
});

