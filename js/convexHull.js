function calculateConvexHull(points) {
    // �ھ�y���Ч��̧C�I�A�p�G���h�ӡA�h��̥ܳ��䪺����
    points.sort((a, b) => a.y - b.y || a.x - b.x);
    const start = points.shift(); // �����ê�^�Ĥ@�Ӥ���

    // ��Ѿl���I���ӻP�_�l�I�������i��Ƨ�
    points.sort((a, b) => {
        const angleA = Math.atan2(a.y - start.y, a.x - start.x);
        const angleB = Math.atan2(b.y - start.y, b.x - start.x);
        return angleA - angleB;
    });

    // Graham���y��k���֤߳���
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

// �p��e�n�A�Ω�P�_�T���I����V
function crossProduct(p1, p2, p3) {
    return (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);
}

function drawConvexHull(points, hull) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // ø��Ҧ��I
    points.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        ctx.fill();
    });

    // ø��Y�]
    ctx.beginPath();
    ctx.moveTo(hull[0].x, hull[0].y);
    for (let i = 1; i < hull.length; i++) {
        ctx.lineTo(hull[i].x, hull[i].y);
    }
    ctx.closePath();
    ctx.stroke();
}

// ���w�ڭ̦��@���I
const points = [{x: 100, y: 200}, {x: 300, y: 100}, ];
const hull = calculateConvexHull(points);
drawConvexHull(points, hull);
