import { BASE_HEALTH } from '../constants/index.js';
import context2D from '../context2D/index.js';
import gameData from '../data/index.js';
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
function createImageSources(sources) {
    const imageSources = [];
    sources.forEach((src) => {
        const image = new Image();
        image.src = src;
        imageSources.push(image);
    });
    return imageSources;
}
function createBackground({ backgroundImage }) {
    if (context2D)
        context2D.drawImage(backgroundImage, 0, 0);
}
function getGameMapData(gameMapType) {
    const data = gameData.get(gameMapType);
    if (data) {
        return {
            rounds: deepClone(data.rounds),
            placementTiles2D: deepClone(data.placementTiles2D),
            backgoundImage: data.backgoundImage,
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
export { calAngleFromPointAToPointB, calFullHealthWidth, calculateDistanceTwoPoint, calculateHoldTime, createBackground, createImageSources, deepClone, getGameMapData, getVectorNomalized, randomNumberInRange, };
