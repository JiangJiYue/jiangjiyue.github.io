function removeDuplicates() {
    // 从 input框 获取内容
    var input = document.getElementsByClassName('input')[0];
    var output = document.getElementsByClassName('output')[0];
    var content = input.value.trim(); // 移除内容前后的空白
    // 假设内容为逐行分隔的值，先将其分割成数组，并移除空行
    var contentArray = content.split('\n').filter(item => item.trim() !== '');
    // 移除非IP行，使用正则表达式匹配标准的IPv4地址
    var ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    var validContentArray = contentArray.filter(item => ipRegex.test(item));
    // 计算去重前的数据量
    var beforeCount = validContentArray.length;
    // 使用 Set 去除数组中的重复项
    var uniqueContentArray = [...new Set(validContentArray)];
    // 计算去重后的数据量
    var afterCount = uniqueContentArray.length;
    // 计算去重的数据量
    var removedCount = beforeCount - afterCount;
    // 生成更新信息
    var updateInfo = `去重前的数据量: ${beforeCount}\n去重后的数据量: ${afterCount}\n去重的数据量: ${removedCount}\n\n`;
    // 将去重后的数组内容再次转换为逐行分隔的字符串
    var uniqueContent = uniqueContentArray.join('\n');
    // 更新 output 的内容，加上去重信息
    output.value = updateInfo + uniqueContent;
}
function sumOccurrencesByCountry() {
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


    const countryOccurrences = {};

    // 获取输入文本框
    var input = document.getElementsByClassName('input')[0];

    // 处理输入内容
    var content = input.value.trim();
    var lines = content.split('\n').map(item => item.trim()); // 将输入文本按行分割并移除每行前后的空白
    lines = lines.filter(line => line !== ''); // 去除空行
    lines.shift(); // 删除第一行
    // 遍历每行数据
    lines.forEach(line => {
        var matchingCountry = countryList.find(country => line.includes(country)); // 在国家列表中查找与国家名称匹配的国家

        if (matchingCountry) {
            if (!countryOccurrences[matchingCountry]) {
                countryOccurrences[matchingCountry] = 0;
            }
            countryOccurrences[matchingCountry]++; // 统计国家出现的次数
        } else {
            // 如果没有匹配到任何国家，那么将其归类到'其他'
            var otherKey = '其他';
            if (!countryOccurrences[otherKey]) {
                countryOccurrences[otherKey] = 0;
            }
            countryOccurrences[otherKey]++;
        }
    });

    // 将结果转换成字符串形式并显示
    var output = Object.entries(countryOccurrences)
        .sort((a, b) => b[1] - a[1]) // 按出现次数降序排序
        .map(([country, count]) => `${country}\t${count}`)
        .join('\n');

    // 获取输出文本框并将结果赋值
    var resultOutput = document.getElementsByClassName('output')[0];
    resultOutput.value = output;
}
function formatThreats() {
    var input = document.getElementsByClassName('input')[0];
    var output = document.getElementsByClassName('output')[0];
    // 分割输入成单行
    var content = input.value.trim(); // 移除内容前后的空白
    var lines = content.split('\n').map(item => item.trim()); // 移除每个元素前后的空白
    lines = lines.filter(line => line !== ''); // 去除空行
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
    output.value = descriptions.join('、');
}
function parseIpAndOutput() {
    var input = document.getElementsByClassName('input')[0];
    var output = document.getElementsByClassName('output')[0];

    // 定义输出文本区域
    var outputText = '';

    // 分割输入文本为多行
    var lines = input.value.split('\n');

    // 遍历每一行
    lines.forEach(function (line) {
        // 使用正则表达式匹配IP地址和端口号
        var match = line.match(/([\d.]+)\s+(\d+)/);
        if (match) {
            // 获取IP地址和端口号
            var ip = match[1];
            var port = match[2];
            // 格式化为'IP:端口'的形式
            var result = ip + ':' + port;
            // 添加到输出文本
            outputText += result + '\n';
        }
    });

    // 将结果写入输出文本区域
    output.value = outputText;
}
function generateTable() {
    var input = document.getElementsByClassName('input')[0];
    var output = document.getElementsByClassName('output')[0];
    // 解析JSON数据
    var jsonData = JSON.parse(input.value);
    // 获取日期数据
    var dates = jsonData.data.dataName;
    // 获取外部攻击数据
    var externalAttacks = jsonData.data.dataValue[0].value;
    // 获取入侵主机数据
    var intrusionHosts = jsonData.data.dataValue[1].value;
    // 创建表格头部
    var table = "时间\t外部攻击\t入侵主机\n";
    // 遍历日期数据并生成表格内容
    for (var i = 0; i < dates.length; i++) {
        var row = dates[i] + "\t" + externalAttacks[i] + "\t" + intrusionHosts[i] + "\n";
        table += row;
    }
    output.value = table;
}












$(document).ready(function () {
    // 使用事件委托简化代码
    $('.button-group').on('click', 'button.insert-btn', function () {
        var pattern = $(this).data('pattern');
        insertText(pattern);
    });

    // 将插入文本的逻辑抽象到一个函数中
    function insertText(text) {
        var textarea = $('.output')[0]; // 选择第一个匹配的textarea元素
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
    $('.parseIpAndOutput').click(parseIpAndOutput);


    // 周报
    $('.generateTable').click(generateTable);
    $('.sumOccurrencesByCountry').click(sumOccurrencesByCountry);
    $('.formatThreats').click(formatThreats);
    $('.removeDuplicates').click(removeDuplicates);


});

