document.addEventListener('DOMContentLoaded', function() {
    // 音乐控制
    const bgm = document.getElementById('bgm');
    const musicControl = document.getElementById('musicControl');
    const musicIcon = document.getElementById('musicIcon');
    
    let isPlaying = false;
    
    // 音乐控制点击事件
    musicControl.addEventListener('click', function() {
        if (isPlaying) {
            bgm.pause();
            musicIcon.classList.remove('playing');
            musicIcon.textContent = '♪';
        } else {
            bgm.play().then(() => {
                musicIcon.classList.add('playing');
                musicIcon.textContent = '♫';
            }).catch(error => {
                console.log('音乐播放失败:', error);
                alert('音乐播放失败，请确保BGM.mp3文件存在或检查浏览器音频设置');
            });
        }
        isPlaying = !isPlaying;
    });
    
    // 创建漂浮的心形 - 使用8种不同的蓝色
    const heartsContainer = document.getElementById('hearts');
    const blueColors = [
        '#0d47a1', '#1565c0', '#1976d2', '#1e88e5',
        '#2196f3', '#42a5f5', '#64b5f6', '#90caf9'
    ];
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 8 + 8) + 's';
        heart.style.animationDelay = Math.random() * 5 + 's';
        // 随机选择蓝色系颜色
        heart.style.color = blueColors[Math.floor(Math.random() * blueColors.length)];
        heartsContainer.appendChild(heart);
    }
    
    // 心形点位数组
    let heartPoints = [];
    
    // 使用改进的心形点位生成算法 - 调整垂直位置
    function getHeartPoints(count) {
        const points = [];
        // 向左偏移，使心形中线与标题左侧对齐
        const centerX = window.innerWidth * 0.4; // 向左偏移
        // 调整垂直位置，向下移动，确保心形完整显示
        const centerY = window.innerHeight * 0.55; // 向下偏移，避免遮盖标题
        const scale = Math.min(window.innerWidth, window.innerHeight) * 0.25; // 稍微缩小心形
        
        // 使用均匀分布的角度
        const angles = [];
        for (let i = 0; i < count; i++) {
            angles.push(i * 2 * Math.PI / count);
        }
        
        // 使用心形参数方程生成点
        for (let i = 0; i < angles.length; i++) {
            const t = angles[i];
            
            // 心形参数方程
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
            
            // 将点缩放到合适大小并平移到中心
            const finalX = centerX + x * scale / 16;
            const finalY = centerY + y * scale / 16;
            
            points.push({
                x: finalX,
                y: finalY,
                index: i,
                angle: t
            });
        }
        
        return points;
    }
    
    heartPoints = getHeartPoints(24);
    
    // 日常问候内容数组 - 每种语言单独数组
    const koreanMessages = [
        "승하야, 오늘 서울 날씨 어때? 옷 따뜻하게 입고 다녀!",
        "연습은 잘 되고 있어? 무리하지 말고 휴식도 취해.",
        "오늘도 멋진 하루 보내고 있길 바라!",
        "밥은 꼭 챙겨 먹고 있어? 건강이 가장 중요해!",
        "기분이 어때? 힘들면 언제든지 이야기해.",
        "오늘 특별한 일 있었어? 나랑 공유하고 싶은 거 있으면 말해!",
        "잠은 충분히 자고 있어? 피곤해 보이면 안 되는데...",
        "너의 데뷔를 기다리고 있어! 항상 응원할게.",
        "오늘 연습室里 춥지 않아? 따뜻하게 입고 다녀!",
        "너의 하루가 행복으로 가득하길 바라!",
        "승하야, 오늘 뭐 했어? 재미있는 일 있었어?",
        "너의 미소가 내 하루를 밝게 해! 항상 웃는 모습 보여줘.",
        "건강 잘 챙기고 있어? 몸이 제일 중요하다는 거 잊지 말아줘.",
        "오늘도 수고했어! 조금만 더 힘내!",
        "너의 꿈을 향해 가는 모습이 정말 멋져!",
        "서울에 비 온다던데, 우산 챙겼어?",
        "오늘 같은 날은 따뜻한 차 한잔 어때?",
        "너와 대화할 수 있는 날을 항상 기다리고 있어!",
        "너의 목소리가 정말 그리워!",
        "오늘 기분 좋은 일 있길 바라!",
        "항상 네 편이야! 무슨 일이 있어도 말이야.",
        "너를 생각하면 내 마음이 따뜻해져!",
        "오늘 하루도 화이팅! 나는 여기서 응원하고 있을게!",
        "너와 함께할 수 있는 날을 꿈꾸고 있어!"
    ];
    
    const chineseMessages = [
        "松河，今天首尔天气怎么样？记得穿暖和点！",
        "练习还顺利吗？别太勉强，也要注意休息。",
        "希望你今天也过得愉快！",
        "有按时吃饭吗？健康是最重要的！",
        "心情怎么样？如果累了随时可以跟我聊聊。",
        "今天有什么特别的事吗？有想分享的事情可以告诉我！",
        "睡眠充足吗？可不能看起来太疲惫啊...",
        "我一直在等待你出道！会一直支持你的。",
        "今天练习室不冷吧？记得穿暖和点！",
        "希望你的一天充满幸福！",
        "松河，今天做什么了？有什么有趣的事吗？",
        "你的微笑照亮了我的一天！请一直保持笑容。",
        "有好好照顾健康吗？别忘了身体是最重要的。",
        "今天辛苦了！再坚持一下！",
        "你朝着梦想前进的样子真的很帅！",
        "听说首尔下雨了，带伞了吗？",
        "这样的日子，喝杯热茶怎么样？",
        "我一直在等待能和你对话的那天！",
        "真的很想念你的声音！",
        "希望今天有让你开心的事！",
        "我永远站在你这边！无论发生什么事。",
        "想到你，我的心就变得温暖！",
        "今天也要加油！我会在这里为你加油的！",
        "我梦想着能和你在一起的那天！"
    ];
    
    const englishMessages = [
        "Songha, how's the weather in Seoul today? Dress warmly!",
        "Is your practice going well? Don't overdo it and take breaks.",
        "I hope you're having a wonderful day today!",
        "Are you eating your meals properly? Health is the most important!",
        "How are you feeling? If you're tired, you can always talk to me.",
        "Anything special happen today? If you have anything to share, let me know!",
        "Are you getting enough sleep? You shouldn't look too tired...",
        "I'm waiting for your debut! I'll always support you.",
        "Is the practice room warm enough today? Dress warmly!",
        "I hope your day is filled with happiness!",
        "Songha, what did you do today? Anything interesting?",
        "Your smile brightens my day! Please keep smiling always.",
        "Are you taking good care of your health? Don't forget that your body is the most important.",
        "You did great today! Hang in there a bit more!",
        "You look really cool chasing your dreams!",
        "I heard it's raining in Seoul, did you bring an umbrella?",
        "How about a cup of warm tea on a day like this?",
        "I'm always waiting for the day I can talk with you!",
        "I really miss hearing your voice!",
        "I hope something nice happens to you today!",
        "I'm always on your side! No matter what happens.",
        "Thinking of you warms my heart!",
        "Fighting today too! I'll be here cheering for you!",
        "I'm dreaming of the day I can be with you!"
    ];
    
    const container = document.querySelector('.container');
    const cardHeartsContainer = document.getElementById('cardHearts');
    let allCards = []; // 存储所有卡片的数组
    let firstRoundCards = []; // 第一轮播放的卡片顺序
    let currentRound = 1; // 当前轮次
    let cardCreationIndex = 0; // 当前创建的卡片索引
    let fadeOutIndex = 0; // 当前淡出的卡片索引
    let cardCreationInterval; // 卡片创建间隔器
    let isCreatingCard = false; // 标记是否正在创建卡片
    let isPaused = false; // 标记是否暂停
    
    // 生成二分法顺序的索引数组
    function generateBinaryOrder(count) {
        const result = [];
        const queue = [{start: 0, end: count-1}];
        
        while (queue.length > 0) {
            const {start, end} = queue.shift();
            const mid = Math.floor((start + end) / 2);
            
            result.push(mid);
            
            if (start <= mid - 1) {
                queue.push({start: start, end: mid - 1});
            }
            
            if (mid + 1 <= end) {
                queue.push({start: mid + 1, end: end});
            }
        }
        
        return result;
    }
    
    // 预先生成二分法顺序的索引数组
    const binaryOrder = generateBinaryOrder(24);
    
    // 找到最佳位置 - 使用二分法顺序
    function findBestPosition() {
        // 如果已经创建了所有卡片，返回null
        if (cardCreationIndex >= 24) {
            return null;
        }
        
        // 按照二分法顺序获取下一个位置索引
        const positionIndex = binaryOrder[cardCreationIndex];
        const point = heartPoints[positionIndex];
        
        // 检查该位置是否已被占用
        if (allCards.some(card => card.positionIndex === positionIndex)) {
            // 如果已被占用，尝试下一个位置
            for (let i = cardCreationIndex + 1; i < 24; i++) {
                const nextIndex = binaryOrder[i];
                const nextPoint = heartPoints[nextIndex];
                if (!allCards.some(card => card.positionIndex === nextIndex)) {
                    return {
                        ...nextPoint,
                        index: nextIndex
                    };
                }
            }
            return null; // 没有可用位置
        }
        
        return {
            ...point,
            index: positionIndex
        };
    }
    
    // 获取未使用的消息
    function getAvailableMessage() {
        const languages = ['korean', 'chinese', 'english'];
        const randomLanguage = languages[Math.floor(Math.random() * languages.length)];
        
        let message, languageText, languageClass;
        
        switch(randomLanguage) {
            case 'korean':
                message = koreanMessages[cardCreationIndex % koreanMessages.length];
                languageText = '한국어';
                languageClass = 'korean-message';
                break;
                
            case 'chinese':
                message = chineseMessages[cardCreationIndex % chineseMessages.length];
                languageText = '中文';
                languageClass = 'chinese-message';
                break;
                
            case 'english':
                message = englishMessages[cardCreationIndex % englishMessages.length];
                languageText = 'English';
                languageClass = 'english-message';
                break;
        }
        
        return { message, languageText, languageClass };
    }
    
    // 创建卡片周围的心形特效
    function createCardHearts(x, y) {
        for (let i = 0; i < 8; i++) {
            const cardHeart = document.createElement('div');
            cardHeart.classList.add('card-heart');
            cardHeart.innerHTML = '❤';
            cardHeart.style.left = x + 'px';
            cardHeart.style.top = y + 'px';
            
            // 随机方向
            const angle = Math.random() * Math.PI * 2;
            const distance = 50 + Math.random() * 50;
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance;
            
            cardHeart.style.setProperty('--dx', dx + 'px');
            cardHeart.style.setProperty('--dy', dy + 'px');
            
            cardHeartsContainer.appendChild(cardHeart);
            
            // 动画结束后移除元素
            setTimeout(() => {
                if (cardHeart.parentNode) {
                    cardHeart.parentNode.removeChild(cardHeart);
                }
            }, 2000);
        }
    }
    
    // 创建新卡片
    function createCard() {
        if (isCreatingCard || isPaused) return; // 如果正在创建卡片或暂停，则跳过
        
        isCreatingCard = true; // 标记为正在创建卡片
        
        // 获取可用位置
        const positionData = findBestPosition();
        
        if (!positionData) {
            // 如果没有可用位置，等待下一轮
            isCreatingCard = false;
            return;
        }
        
        const { x, y, index } = positionData;
        
        // 获取可用消息
        const messageData = getAvailableMessage();
        if (!messageData) {
            // 如果没有可用消息，返回
            isCreatingCard = false;
            return;
        }
        
        const { message, languageText, languageClass } = messageData;
        
        // 创建新卡片
        const card = document.createElement('div');
        card.classList.add('card');
        card.positionIndex = index; // 存储位置索引
        card.cardIndex = cardCreationIndex; // 存储卡片索引
        
        // 直接设置卡片的目标位置，不需要偏移量
        card.style.setProperty('--target-x', `${x}px`);
        card.style.setProperty('--target-y', `${y}px`);
        
        // 添加消息内容
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.textContent = message;
        card.appendChild(messageElement);
        
        // 添加语言指示器
        const languageIndicator = document.createElement('div');
        languageIndicator.classList.add('language-indicator');
        languageIndicator.textContent = languageText;
        card.appendChild(languageIndicator);
        
        // 添加语言类
        card.classList.add(languageClass);
        
        // 添加到容器
        container.appendChild(card);
        
        // 创建卡片出现时的心形特效
        setTimeout(() => {
            createCardHearts(x, y);
        }, 100);
        
        // 第一阶段：从目标位置放大
        setTimeout(() => {
            card.classList.add('center-active');
        }, 10);
        
        // 第二阶段：在目标位置显示3秒后开始缩小
        setTimeout(() => {
            // 第三阶段：缩小到正常大小
            card.classList.remove('center-active');
            card.classList.add('move-to-heart');
            
            // 记录第一轮播放的卡片
            if (currentRound === 1) {
                firstRoundCards.push(card);
            }
            
            // 当卡片到达轮廓位置后，允许创建下一张卡片
            setTimeout(() => {
                isCreatingCard = false;
                if (currentRound === 1 && cardCreationIndex < 24 && !isPaused) {
                    createCard();
                }
            }, 3000); // 等待卡片移动完成
        }, 4200); // 1.2秒动画 + 3秒停留
        
        // 添加到卡片数组
        allCards.push(card);
        cardCreationIndex++;
        
        // 检查是否所有卡片都已创建
        if (cardCreationIndex >= 24 && currentRound === 1) {
            // 停止创建新卡片
            clearInterval(cardCreationInterval);
            
            // 所有卡片已创建，等待一段时间后开始第二轮
            setTimeout(startSecondRound, 6000);
        }
    }
    
    // 开始第二轮
    function startSecondRound() {
        if (isPaused) return;
        
        currentRound = 2;
        fadeOutIndex = 0;
        cardCreationIndex = 0; // 重置卡片索引
        
        // 开始按顺序淡出第一轮的卡片
        fadeOutNextCard();
        
        // 同时开始第二轮卡片的创建
        for (let i = 0; i < 3; i++) {
            setTimeout(() => createCard(), i * 3000);
        }
        
        // 设置自动创建卡片 - 每3秒创建一张
        cardCreationInterval = setInterval(createCard, 3000);
    }
    
    // 淡出下一张卡片
    function fadeOutNextCard() {
        if (fadeOutIndex < firstRoundCards.length && !isPaused) {
            const card = firstRoundCards[fadeOutIndex];
            
            // 确保卡片已经到达心形轮廓
            if (!card.classList.contains('move-to-heart')) {
                // 如果卡片还没有到达心形轮廓，等待一下再重试
                setTimeout(() => fadeOutNextCard(), 100);
                return;
            }
            
            // 淡出卡片
            card.classList.add('fade-out');
            
            // 从allCards中移除
            allCards = allCards.filter(c => c !== card);
            
            // 淡出后从DOM中移除
            setTimeout(() => {
                if (card.parentNode) {
                    card.parentNode.removeChild(card);
                }
            }, 1000);
            
            fadeOutIndex++;
            
            // 继续淡出下一张卡片，间隔改为4500ms
            setTimeout(fadeOutNextCard, 4500);
        }
    }
    
    // 初始创建几张卡片
    for (let i = 0; i < 3; i++) {
        setTimeout(() => createCard(), i * 3000);
    }
    
    // 设置自动创建卡片 - 每3秒创建一张
    cardCreationInterval = setInterval(createCard, 3000);
});