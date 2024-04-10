function calculateConvexHull(points) {
    // 根據y坐標找到最低點，如果有多個，則選擇最左邊的那個
    points.sort((a, b) => a.y - b.y || a.x - b.x);
    const start = points.shift(); // 移除並返回第一個元素

    // 對剩餘的點按照與起始點的極角進行排序
    points.sort((a, b) => {
        const angleA = Math.atan2(a.y - start.y, a.x - start.x);
        const angleB = Math.atan2(b.y - start.y, b.x - start.x);
        return angleA - angleB;
    });

    // Graham掃描算法的核心部分
    const stack = [start, points[0], points[1]];
    for (let i = 2; i < points.length; i++) {
        let top = stack.pop();
        while (stack.length >= 1 && crossProduct(stack[stack.length - 1], top, points[i]) <= 0) {
            top = stack.pop();
        }
        stack.push(top, points[i]);
    }

    return stack;
}

// 計算叉積，用於判斷三個點的轉向
function crossProduct(p1, p2, p3) {
    return (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);
}

function drawConvexHull(points, hull) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // 繪制所有點
    points.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        ctx.fill();
    });

    // 繪制凸包
    ctx.beginPath();
    ctx.moveTo(hull[0].x, hull[0].y);
    for (let i = 1; i < hull.length; i++) {
        ctx.lineTo(hull[i].x, hull[i].y);
    }
    ctx.closePath();
    ctx.stroke();
}

// 假定我們有一些點
const points = [{x: 100, y: 200}, {x: 300, y: 100}, ];
const hull = calculateConvexHull(points);
drawConvexHull(points, hull);
