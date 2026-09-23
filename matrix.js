//метод, що генерує двовимірний масив (матрицю) цілих випадкових чисел заданої розмірності m x n в заданому діапазоні значень.
function generateMatrix(m, n, min, max) {
  const matrix = [];
  for (let i = 0; i < m; i++) {
    const row = [];
    for (let j = 0; j < n; j++) {
      row.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    matrix.push(row);
  }
  return matrix;
}

//метод, що виводить матрицю в наступному вигляді: 
//стовпець 1 	стовпець 2 	…	стовпець n 
//рядок 1	2	1	…	10 
//рядок 2	4	0	…	1
//…	…	…	…	…
//рядок m	1	3	…	9 

function printMatrix(matrix, title = "") {
  if (title) console.log(`\n${title}`);
  if (matrix.length === 0 || matrix[0].length === 0) {
    console.log("(матриця порожня)");
    return;
  }
  const fmt = (x) => (Number.isInteger(x) ? String(x) : x.toFixed(2));
  const W = 12; 
  const header = [
    "".padEnd(W),
    ...matrix[0].map((_, j) => `стовпець ${j + 1}`.padEnd(W)),
  ];
  console.log(header.join(""));
  matrix.forEach((row, i) => {
    console.log(
      [`рядок ${i + 1}`.padEnd(W), ...row.map((x) => fmt(x).padEnd(W))].join("")
    );
  });
}
const cloneMatrix = (matrix) => matrix.map((row) => [...row]);

//Завдання
//1. Відняти від елементів кожного рядка матриці середнє арифметичне цього рядка
function subtractRowMean(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    let sum = 0;
    for (let j = 0; j < matrix[i].length; j++) sum += matrix[i][j];
    const mean = sum / matrix[i].length;
    for (let j = 0; j < matrix[i].length; j++) matrix[i][j] -= mean;
  }
  return matrix;
}

//Виконати циклічний зсув матриці на k позицій вправо та на k догори. 
function cyclicShift(matrix, k) {
  const m = matrix.length;
  const n = matrix[0].length;
  const result = Array.from({ length: m }, () => new Array(n));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const newI = (((i - k) % m) + m) % m; 
      const newJ = (((j + k) % n) + n) % n; 
      result[newI][newJ] = matrix[i][j];
    }
  }
  return result;
}

//Знайти максимальні елементи в матриці та видалити з матриці всі рядки та стовпці, що містять їх.
function removeMaxRowsAndCols(matrix) {
  let max = -Infinity;
  for (const row of matrix) for (const x of row) if (x > max) max = x;

  const badRows = new Set();
  const badCols = new Set();
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === max) {
        badRows.add(i);
        badCols.add(j);
      }
    }
  }
  const result = [];
  for (let i = 0; i < matrix.length; i++) {
    if (badRows.has(i)) continue;
    const row = [];
    for (let j = 0; j < matrix[i].length; j++) {
      if (!badCols.has(j)) row.push(matrix[i][j]);
    }
    result.push(row);
  }
  return { max, result };
}

//Реалізуйте обертання матриці на 90 градусів (транспонування) за годинниковою стрілкою без використання додаткового масиву (in-place) та без використання спеціалізованих бібліотек роботи із матрицями
function rotate90InPlace(a) {
  const n = a.length;
  if (a.some((row) => row.length !== n)) {
    throw new Error("In-place обертання можливе лише для квадратної матриці");
  }
  for (let layer = 0; layer < Math.floor(n / 2); layer++) {
    const first = layer;
    const last = n - 1 - layer;
    for (let i = first; i < last; i++) {
      const offset = i - first;
      const top = a[first][i];
      a[first][i] = a[last - offset][first]; 
      a[last - offset][first] = a[last][last - offset]; 
      a[last][last - offset] = a[i][last]; 
      a[i][last] = top; 
    }
  }
  return a;
}

//Додаткове завдання
//Розклад студентів на тиждень (Тривимірний масив)
//Сюжет: Університетська система розкладу для 3 груп на 5 навчальних днів по 4 пари на день.
//Завдання:
//Опишіть масив розмірністю [3][5][4] (Групи × Дні × Пари), де зберігаються назви предметів (або "Вільне вікно").
const FREE = "Вільне вікно";
const GROUPS = ["Група 1", "Група 2", "Група 3"];
const DAYS = ["Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця"];

const schedule = [
  [
    ["Дискретна математика", "ІПЗ", FREE, "Програмування"],
    ["Програмування", FREE, "Англійська", "Алгоритми"],
    ["Дискретна математика", "Алгоритми", "ІПЗ", FREE],
    [FREE, FREE, "Англійська", FREE],
    ["Програмування", "Дискретна математика", "Алгоритми", "ІПЗ"],
  ],
  [
    ["Дискретна математика", "Людино-машинна взаємодія", "Цінності громадянського суспільства ", FREE],
    ["Програмування", "Англійська", FREE, "Алгоритми"],
    [FREE, "Алгоритми", "Людино-машинна взаємодія", "Цінності громадянського суспільства "],
    ["Цінності громадянського суспільства ", FREE, FREE, "Англійська"],
    ["Програмування", "Дискретна математика", FREE, FREE],
  ],
  [
    ["Дискретна математика", "Групова динаміка та комунікація", FREE, FREE],
    ["Програмування", "Групова динаміка та комунікація", "Англійська", FREE],
    ["Групова динаміка та комунікація", "Алгоритми", FREE, "Людино-машинна взаємодія"],
    [FREE, "Цінності громадянського суспільства ", FREE, "Цінності громадянського суспільства "],
    ["Програмування", FREE, FREE, "Дискретна математика"],
  ],
];

const isLesson = (s) => s !== FREE;
//Знайдіть день із найбільшим навантаженням (найбільшою кількістю пар) для обраної групи.

function findBusiestDay(sched, g) {
  const counts = sched[g].map((day) => day.filter(isLesson).length);
  const max = Math.max(...counts);
  const days = counts.flatMap((c, d) => (c === max ? [d] : []));
  return { max, days };
}

//Знайдіть день із незручним розкладом (день, де в розкладі є «вікна»)
function findDaysWithWindows(sched, g) {
  const result = [];
  sched[g].forEach((day, d) => {
    const first = day.findIndex(isLesson);
    const last = day.length - 1 - [...day].reverse().findIndex(isLesson);
    if (first === -1) return; 
    const windows = [];
    for (let p = first + 1; p < last; p++) {
      if (!isLesson(day[p])) windows.push(p + 1); 
    }
    if (windows.length > 0) result.push({ day: d, windows });
  });
  return result;
}

//Перевірте, чи є в розкладі заняття для “потоку (коли заняття з одного предмету відбуваються в кількох групах в один і той самий час).
function findStreamLessons(sched) {
  const result = [];
  for (let d = 0; d < sched[0].length; d++) {
    for (let p = 0; p < sched[0][d].length; p++) {
      const bySubject = new Map();
      for (let g = 0; g < sched.length; g++) {
        const subject = sched[g][d][p];
        if (!isLesson(subject)) continue;
        if (!bySubject.has(subject)) bySubject.set(subject, []);
        bySubject.get(subject).push(g);
      }
      for (const [subject, groups] of bySubject) {
        if (groups.length > 1) result.push({ day: d, pair: p, subject, groups });
      }
    }
  }
  return result;
}


function main() {
  const m = 4;
  const n = 5;
  const original = generateMatrix(m, n, -10, 10);
  printMatrix(original, "Початкова матриця:");

  const t1 = subtractRowMean(cloneMatrix(original));
  printMatrix(t1, "1) Після віднімання середнього арифметичного рядка:");

  const k = 2;
  const t2 = cyclicShift(original, k);
  printMatrix(t2, `2) Циклічний зсув на k = ${k} вправо та догори:`);

  const { max, result: t3 } = removeMaxRowsAndCols(original);
  printMatrix(t3, `3) Після видалення рядків і стовпців з максимумом (${max}):`);

  const square = generateMatrix(4, 4, 1, 9);
  printMatrix(square, "4) Квадратна матриця до обертання:");
  rotate90InPlace(square);
  printMatrix(square, "   Після обертання на 90° за годинниковою стрілкою:");

  console.log("\n===== Розклад (додаткове завдання) =====");
  const g = 0;
  const busiest = findBusiestDay(schedule, g);
  console.log(
    `${GROUPS[g]}: найбільше навантаження — ${busiest.days
      .map((d) => DAYS[d])
      .join(", ")} (${busiest.max} пар)`
  );

  const windows = findDaysWithWindows(schedule, g);
  if (windows.length === 0) {
    console.log(`${GROUPS[g]}: днів із «вікнами» немає`);
  } else {
    windows.forEach(({ day, windows: w }) =>
      console.log(`${GROUPS[g]}: «вікно» у ${DAYS[day]}, пара(и) №${w.join(", ")}`)
    );
  }

  const streams = findStreamLessons(schedule);
  if (streams.length === 0) {
    console.log("Потокових занять немає");
  } else {
    console.log("Потокові заняття:");
    streams.forEach(({ day, pair, subject, groups }) =>
      console.log(
        `  ${DAYS[day]}, пара ${pair + 1}: ${subject} — ${groups
          .map((x) => GROUPS[x])
          .join(", ")}`
      )
    );
  }
}

main();