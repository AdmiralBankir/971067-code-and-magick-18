'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 15;
var FONT_GAP = 16;

var BAR_WIDTH = 40;
var MAX_BAR_HEIGHT = 150;
var BETWEEN_BARS = 50;

var barX = CLOUD_X + 2 * GAP;
var barY = CLOUD_HEIGHT - GAP;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var randomInt = function (min, max) {
  var rand = min + Math.random() * (max - min);

  return Math.floor(rand);
};

var renderBar = function (ctx, coordX, coordY, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(coordX, coordY, width, height);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';

  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP * 2);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var barHeight = Math.floor(MAX_BAR_HEIGHT * times[i] / maxTime);
    var xCoord = barX + i * (BAR_WIDTH + BETWEEN_BARS);
    var yCoord = barY - GAP - barHeight;

    ctx.fillStyle = '#000';
    ctx.fillText(names[i], xCoord, barY);
    ctx.fillText(Math.floor(times[i]), xCoord, yCoord - GAP);

    var barColor = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'hsl(240,' + String(randomInt(0, 100)) + '%' + ', 54%)';
    renderBar(ctx, xCoord, yCoord, BAR_WIDTH, barHeight, barColor);
  }
};
