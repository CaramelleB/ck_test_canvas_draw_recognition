/**
 * Return the sum of values in an array.
 *
 * @param {Array} arr An array of numbers.
 * @return {Number}
 */
const sum = arr => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
};

/**
 * Calculate the Levenshten distance (Wagner-Fischer)
 *
 * @param {String} str1 An input string.
 * @param {String} str2 An input string.
 * @return {Number}
 */
const editdist = (str1, str2) => {
  let i, j;
  const matrix = [];

  for (i = 0; i <= str1.length; i++) {
    matrix[i] = [i];
  }
  for (j = 0; j <= str2.length; j++) {
    matrix[0][j] = j;
  }

  for (j = 0; j < str2.length; j++) {
    for (i = 0; i < str1.length; i++) {
      if (str1.charAt(i) === str2.charAt(j)) {
        matrix[i + 1][j + 1] = matrix[i][j];
      } else {
        matrix[i + 1][j + 1] = Math.min(
          matrix[i][j + 1],
          matrix[i + 1][j],
          matrix[i][j]
        ) + 1;
      }
    }
  }
  return matrix[i - 1][j - 1];
};

/**
 * Compute the moving average of a sequence.
 *
 * @param {Array} arr An array of numbers.
 * @param {Number} size The window size
 * @return {Array}
 */
const movingAverage = (arr, size) => {
  let tmp = sum(arr.slice(0, size));
  const res = [tmp / size];
  for (let i = size; i < arr.length; i++) {
    tmp += arr[i] - arr[i - size];
    res.push(tmp / size);
  }
  return res;
};

/**
 * Check if the sequence has a local maximum or minimum.
 *
 * @param {Number} head The left point.
 * @param {Number} mid  The middle point.
 * @param {Number} tail The right point.
 * @return {Number}
 */

const findpeek = (head, mid, tail) => {

  // if (arguments.length !== 3) return 0;

  if (head < mid && mid > tail) {
    return 1;
  }
  if (head > mid && mid < tail) {
    return 2;
  }
  return 0;
};

/**
 * Predefined strokes for each signature.
 * @const
 */
const MODEL = {
  point: 'point',
  du: 'line',
  dyu: 'line',
  dy: 'line',
  dxYXd: 'circle',
  yXYxy: 'circle',
  dyXxY: 'Unknown',
  dXxY: 'Unknown',
  dyXx: 'Unknown',
  dXxYyX: 'Unknown',
  dXxX: 'Unknown',
  dyXxX: 'Unknown',
  dyXYxyX: 'Unknown',
  dyXxYyXY: 'Unknown',
  dyXxXY: 'Unknown',
  dxYd: 'Unknown',
  dxy: 'Unknown',
  dYd: 'Unknown',
  dyx: 'Unknown',
  ddYyX: 'Unknown',
  dyX: 'Unknown',
  dxyX: 'Unknown',
  dyXd: 'Unknown',
  dX: 'Unknown',
  dyxXYx: 'Unknown',
  dxXYxX: 'Unknown',
  dyxYyX: 'Unknown',
  dyxYy: 'Unknown',
  dyxYd: 'Unknown',
  dxYyX: 'Unknown',
};

const THRESHOLD = 10;

const MOVINGAVG = 5;

// /**
//  * Class for processing handwritten signatures.
//  *
//  * @param {HTMLCanvasElement} $canvas The area to draw a character.
//  * @param {HTMLElement} $reset A reset button.
//  * @constructor
//  */
// const Charlec = ($canvas, $reset) => {
//   this.$canvas = $canvas;
//   this.$reset = $reset;
//   this.ctx = $canvas.getContext('2d');
//   this.init();
//   this.reset();
//   const up = 0;
//   this.up = up;
// };
//
// Charlec.prototype = {

// init: () => {
//   this.$canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
//   this.$canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
//   this.$canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
//   this.$reset.addEventListener('click', this.reset.bind(this));
// },

// reset: () => {
//   this.res = '';
//   this.traced = false;
//   this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
//   this.up = 0;
// },
//
// onMouseDown: evt => {
//   this.traced = true;
//
//   const x = evt.pageX - this.$canvas.offsetLeft;
//   const y = evt.pageY - this.$canvas.offsetTop;
//
//   this.res += 'd';
//
//   this.dataX = [x];
//   this.dataY = [y];
//
//   this.ctx.beginPath();
//   this.ctx.moveTo(x, y);
//
// },
//
// onMouseUp: evt => {
//   this.traced = false;
//
//   this.res += this.encode();
//   this.up += 1;
//
//   if (this.res === 'dpoint') {
//     this.res = 'point';
//   } else {
//     this.res += 'u';
//   }
//   this.guess();
//
//   this.res = '';
//
// },
//
// onMouseMove: evt => {
//   if (!this.traced) return;
//
//   const x = evt.pageX - this.$canvas.offsetLeft;
//   const y = evt.pageY - this.$canvas.offsetTop;
//
//   this.dataX.push(x);
//   this.dataY.push(y);
//   this.ctx.lineWidth = 20;
//   this.ctx.lineCap = 'round';
//
//   this.ctx.strokeStyle = '#f321e9';
//   this.ctx.fillStyle = '#f321e9';
//   this.ctx.lineTo(x, y);
//   this.ctx.stroke();
// },

export const encode = (x, y) => {
  const dataX = movingAverage(x, MOVINGAVG);
  const dataY = movingAverage(y, MOVINGAVG);

  let res = '';
  const bufX = [dataX[0]];
  const bufY = [dataY[0]];

  for (let i = 0; i < dataX.length; i++) {
    const deltaX = Math.abs(bufX[bufX.length - 1] - dataX[i]);
    const deltaY = Math.abs(bufY[bufY.length - 1] - dataY[i]);

    if (deltaX >= THRESHOLD) {
      bufX.push(dataX[i]);
      // console.log(findpeek.apply(null, bufX.slice(-3)));
      // if (findpeek.apply(null, bufX.slice(-3)) !== 0){
      //     res += 'point';

      // } else {
      // res += ['', 'X', 'x'][findpeek.apply(null, bufX.slice(-3))];
      // }
      res += ['', 'X', 'x'][findpeek.apply(null, bufX.slice(-3))];
    }
    if (deltaY >= THRESHOLD) {
      bufY.push(dataY[i]);
      res += ['', 'Y', 'y'][findpeek.apply(null, bufY.slice(-3))];
    }
  }
  if (dataX.length < 2) {
    res = 'point';
  }

  return res;

};

export const guess = (res, up) => {

  let result = null;
  let str = null;
  let dist = null;
  let min = null;

  if (res === 'dpoint') {
    res = 'point';
  } else {
    for (str in MODEL) {
      dist = editdist(res, str);

      if (min === null || dist < min) {
        min = dist;
        result = MODEL[str];
      }
    }
  }

  const circle = result === 'circle';
  const line = result === 'line';
  const condition1 = up === 1 && circle;
  const condition2 = up === 2 && line;
  const condition3 = up === 3 && line;
  const condition4 = up === 4 && line;
  const condition5 = up === 5 && line;
  const condition6 = up === 6 && line;
  const condition7 = up === 7 && line;
  const condition8 = up === 8 && line;
  const condition9 = up === 9 && line;

  let answer;
  let step1 = true;
  let step2 = true;
  let step3 = true;
  let step4 = true;
  let step5 = true;
  let step6 = true;
  let step7 = true;
  let step8 = true;
  let step9;

  // const popup = document.getElementById('popup');

  condition1 ? step1 = true : step9 = false;
  condition2 ? step2 = true : step9 = false;
  condition3 ? step3 = true : step9 = false;
  condition4 ? step4 = true : step9 = false;
  condition5 ? step5 = true : step9 = false;
  condition6 ? step6 = true : step9 = false;
  condition7 ? step7 = true : step9 = false;
  condition8 ? step8 = true : step9 = false;
  condition9 ? step1 && step2 && step3 && step4 && step5 && step6 && step7 && step8 ? answer = true : answer = false : step9 = false;

  answer ? console.log('true') : console.log('false');
};
