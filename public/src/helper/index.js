import { BASE_HEALTH } from '../constants/index.js';
import context2D from '../context2D/index.js';
import gameData from '../data/gameMaps/index.js';
function calculateDistanceTwoPoint(pointA, pointB) {
    const dx = pointA.x - pointB.x;
    const dy = pointA.y - pointB.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance;
}
function calFullHealthWidth(health) {
    const width = (health * 15) / BASE_HEALTH;
    return width > 120 ? 120 : width;
}
function calculateHoldTime({ maxX, maxY, moveSpeed }) {
    const holdTime = parseInt(((maxX * maxY) / 2 / moveSpeed).toString());
    return holdTime <= 0 ? 1 : holdTime;
}
function updateHealthBars({ sprite, health, remainHealth }) {
    const drawOption = {
        lineWidth: 2,
        height: 8,
        borderRadius: 4,
        strokeStyle: 'white',
    };
    const fullHealthWidth = calFullHealthWidth(health);
    const remainHealthWidth = (remainHealth * fullHealthWidth) / health;
    drawHealthBarFull({ sprite, drawOption, fullHealthWidth, remainHealth, fillStyle: 'red' });
    if (fullHealthWidth === remainHealthWidth) {
        drawHealthBarFull({ sprite, drawOption, remainHealth, fullHealthWidth, fillStyle: 'green' });
    }
    else {
        drawRemainHealthBar({ sprite, drawOption, fullHealthWidth, remainHealthWidth, fillStyle: 'green' });
    }
}
function drawRemainHealthBar({ sprite, remainHealthWidth, fullHealthWidth, drawOption, fillStyle, }) {
    if (context2D) {
        const center = (sprite.width - 2 * sprite.offset.x - fullHealthWidth) / 2;
        const x = sprite.position.x + center;
        const y = sprite.position.y - sprite.height + 2 * sprite.offset.y;
        // start draw
        context2D.beginPath();
        // draw top
        context2D.moveTo(x + drawOption.borderRadius, y);
        context2D.lineTo(x + remainHealthWidth, y);
        context2D.arcTo(x + remainHealthWidth, y, x + remainHealthWidth, y + drawOption.borderRadius, drawOption.borderRadius);
        // draw right
        context2D.lineTo(x + remainHealthWidth, y + drawOption.height);
        // draw bottom
        context2D.arcTo(x + remainHealthWidth, y + drawOption.height, x + remainHealthWidth - drawOption.borderRadius, y + drawOption.height, drawOption.borderRadius);
        context2D.lineTo(x + drawOption.borderRadius, y + drawOption.height);
        // draw left border radius
        context2D.arcTo(x, y + drawOption.height, x, y + drawOption.borderRadius, drawOption.borderRadius);
        context2D.lineTo(x, y + drawOption.borderRadius);
        // draw left border radius
        context2D.arcTo(x, y, x + drawOption.borderRadius, y, drawOption.borderRadius);
        context2D.closePath();
        context2D.strokeStyle = drawOption.strokeStyle;
        context2D.fillStyle = fillStyle;
        context2D.lineWidth = drawOption.lineWidth;
        context2D.stroke();
        context2D.fill();
    }
}
function drawHealthBarFull({ sprite, remainHealth, fullHealthWidth, drawOption, fillStyle, }) {
    if (context2D) {
        const center = (sprite.width - 2 * sprite.offset.x - fullHealthWidth) / 2;
        const x = sprite.position.x + center;
        const y = sprite.position.y - sprite.height + 2 * sprite.offset.y;
        context2D.beginPath();
        // draw top rectangle
        context2D.moveTo(x + drawOption.borderRadius, y);
        context2D.lineTo(x + fullHealthWidth - drawOption.borderRadius, y);
        context2D.arcTo(x + fullHealthWidth, y, x + fullHealthWidth, y + drawOption.borderRadius, drawOption.borderRadius);
        // draw right rectangle
        context2D.lineTo(x + fullHealthWidth, y + drawOption.height - drawOption.borderRadius);
        context2D.arcTo(x + fullHealthWidth, y + drawOption.height, x + fullHealthWidth - drawOption.borderRadius, y + drawOption.height, drawOption.borderRadius);
        // draw bottom rectangle
        context2D.lineTo(x + drawOption.borderRadius, y + drawOption.height);
        context2D.arcTo(x, y + drawOption.height, x, y + drawOption.height - drawOption.borderRadius, drawOption.borderRadius);
        // draw left rectangle
        context2D.lineTo(x, y + drawOption.borderRadius);
        context2D.arcTo(x, y, x + drawOption.borderRadius, y, drawOption.borderRadius);
        // end draw
        context2D.closePath();
        // draw stroke and color
        context2D.strokeStyle = drawOption.strokeStyle;
        context2D.fillStyle = fillStyle;
        context2D.lineWidth = drawOption.lineWidth;
        context2D.stroke();
        context2D.fill();
        drawHealthText({ x, y }, fullHealthWidth, remainHealth);
    }
}
function drawHealthText(position, fullHealthWidth, remainHealth) {
    if (context2D) {
        context2D.font = '16px Arial';
        context2D.fillStyle = 'white';
        const remainHealthString = remainHealth.toString();
        const textWidth = context2D.measureText(remainHealthString).width;
        context2D.fillText(remainHealthString, position.x + fullHealthWidth / 2 - textWidth / 2, position.y - 8);
    }
}
function calAngleFromPointAToPointB(pointA, pointB) {
    const dx = pointB.x - pointA.x;
    const dy = pointB.y - pointA.y;
    const angleRad = Math.atan2(dy, dx);
    const angleDeg = angleRad * (180 / Math.PI);
    return angleDeg;
}
function getVectorNomalized(startPointLocation, endPointLocation) {
    const v = {
        x: endPointLocation.x - startPointLocation.x,
        y: endPointLocation.y - startPointLocation.y,
    };
    const v_normalized = {
        x: v.x / Math.sqrt(v.x * v.x + v.y * v.y),
        y: v.y / Math.sqrt(v.x * v.x + v.y * v.y),
    };
    return v_normalized;
}
function createImage(sourceString) {
    const image = new Image();
    image.src = sourceString;
    return image;
}
function createFrames({ initFrames, moveSpeed, }) {
    const frames = new Map();
    const behaviorKeys = Object.keys(initFrames);
    for (let behaviorKey of behaviorKeys) {
        const angelKeys = Object.keys(initFrames[behaviorKey]);
        const currentFrame = new Map();
        for (let angelKey of angelKeys) {
            const currentInitFrame = initFrames[behaviorKey][angelKey];
            const image = createImage(currentInitFrame.imageSourceString);
            const maxX = currentInitFrame.maxX;
            const maxY = currentInitFrame.maxY;
            const holdTime = moveSpeed
                ? calculateHoldTime({ maxX, maxY, moveSpeed })
                : currentInitFrame.holdTime;
            currentFrame.set(angelKey, { image, maxX, maxY, holdTime });
        }
        frames.set(behaviorKey, currentFrame);
    }
    return frames;
}
function getGameMapData(gameMapType) {
    const data = gameData.get(gameMapType);
    if (data) {
        return {
            rounds: deepClone(data.rounds),
            placementTiles2D: deepClone(data.placementTiles2D),
            backgroundImage: data.backgroundImage,
            waypoints: deepClone(data.waypoints),
            limitAttacks: data.limitAttacks,
            startCoins: data.startCoins,
        };
    }
    return undefined;
}
function deepClone(data) {
    if (typeof data !== 'object' || data === null) {
        return data;
    }
    const clone = Array.isArray(data) ? [] : {};
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            clone[key] = deepClone(data[key]);
        }
    }
    return clone;
}
function randomNumberInRange(min, max) {
    return Math.random() * (max - min) + min;
}
export { calAngleFromPointAToPointB, calFullHealthWidth, calculateDistanceTwoPoint, calculateHoldTime, createFrames, createImage, deepClone, getGameMapData, getVectorNomalized, randomNumberInRange, updateHealthBars, };
