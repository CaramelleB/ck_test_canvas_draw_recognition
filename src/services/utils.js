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

const sum = arr => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
};

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

const movingAverage = (arr, size) => {
  let tmp = sum(arr.slice(0, size));
  const res = [tmp / size];
  for (let i = size; i < arr.length; i++) {
    tmp += arr[i] - arr[i - size];
    res.push(tmp / size);
  }
  return res;
};

const findpeek = (head, mid, tail) => {

  if (head < mid && mid > tail) {
    return 1;
  }
  if (head > mid && mid < tail) {
    return 2;
  }
  return 0;
};

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

export const guess = res => {

  let result = null;
  let min = null;

  if (res === 'dpoint') {
    res = 'point';
  } else {
    for (const str in MODEL) {
      const dist = editdist(res, str);

      if (min === null || dist < min) {
        min = dist;
        result = MODEL[str];
      }
    }
  }

  const circle = result === 'circle';
  const line = result === 'line';

  if (circle) {
    return 'circle';
  }

  if (line) {
    return 'line';
  }

  return 'unrecognized';

};
