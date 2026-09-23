//  Метод генерації масиву необхідної довжини в заданому діапазоні
function generateArray(length, min, max) {
    const arr = [];
    for (let i = 0; i < length; i++) {
        arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return arr;
}

//  Метод виведення елементів масиву у вказаному вигляді
function printFormattedArray(arr) {
    arr.forEach((value, index) => {
        console.log(`[елемент_${index + 1}_значення_${value}]`);
    });
}

// Порахувати кількість та суму парних елементів масиву, що знаходяться в заданому діапазоні.
function task1CountAndSumEvenInRange(arr, minRange, maxRange) {
    let count = 0;
    let sum = 0;
    for (let num of arr) {
        if (num >= minRange && num <= maxRange && num % 2 === 0) {
            count++;
            sum += num;
        }
    }
    return { count, sum };
}

// Визначити середнє арифметичне елементів масиву та кількість елементів, що є більшими за середнє арифметичне
function task2AverageAndGreater(arr) {
    const total = arr.reduce((acc, val) => acc + val, 0);
    const avg = total / arr.length;
    const countGreater = arr.filter(val => val > avg).length;
    return { average: avg, countGreater };
}

// Утворити третій масив як попарну суму елементів двох масивів однакової довжини.
function task3PairwiseSum(arr1, arr2) {
    return arr1.map((val, idx) => val + arr2[idx]);
}

// Утворити третій масив як конкатенацію двох масивів різної довжини.
function task4Concatenate(arr1, arr2) {
    return arr1.concat(arr2);
}

// В масиві поміняти місцями максимум та мінімум.
function task5SwapMinMax(arr) {
    const result = [...arr];
    const maxVal = Math.max(...result);
    const minVal = Math.min(...result);
    const maxIdx = result.indexOf(maxVal);
    const minIdx = result.indexOf(minVal);

    result[maxIdx] = minVal;
    result[minIdx] = maxVal;
    return result;
}

// Масив поділити на два масиви: з додатніх та від’ємних елементів.
function task6SplitPositiveNegative(arr) {
    const positive = arr.filter(x => x > 0);
    const negative = arr.filter(x => x < 0);
    return { positive, negative };
}

// З масиву видалити дублікати максимума та мінімума
function task7RemoveMinMaxDuplicates(arr) {
    const maxVal = Math.max(...arr);
    const minVal = Math.min(...arr);
    let seenMin = false;
    let seenMax = false;

    return arr.filter(val => {
        if (val === minVal) {
            if (!seenMin) { seenMin = true; return true; }
            return false;
        }
        if (val === maxVal) {
            if (!seenMax) { seenMax = true; return true; }
            return false;
        }
        return true;
    });
}

// Визначити середні арифметичні двох масивів. Утворити третій масив з елементів обидвох масивів, що знаходяться в межах між значеннями середніх арифметичних.
function task8ElementsBetweenAverages(arr1, arr2) {
    const avg1 = arr1.reduce((a, b) => a + b, 0) / arr1.length;
    const avg2 = arr2.reduce((a, b) => a + b, 0) / arr2.length;

    const lowerBound = Math.min(avg1, avg2);
    const upperBound = Math.max(avg1, avg2);

    const combined = [...arr1, ...arr2];
    return combined.filter(x => x > lowerBound && x < upperBound);
}


const sampleArray = generateArray(8, -20, 50);
console.log("Згенерований масив:");
printFormattedArray(sampleArray);

console.log("\n1. Парні в діапазоні [0, 40]:", task1CountAndSumEvenInRange(sampleArray, 0, 40));
console.log("2. Середнє та більші за нього:", task2AverageAndGreater(sampleArray));

const arrA = [1, 2, 3];
const arrB = [10, 20, 30];
console.log("3. Попарна сума:", task3PairwiseSum(arrA, arrB));

const arrShort = [100, 200];
console.log("4. Конкатенація:", task4Concatenate(sampleArray, arrShort));

console.log("5. Обмін min/max:", task5SwapMinMax(sampleArray));
console.log("6. Додатні/від'ємні:", task6SplitPositiveNegative(sampleArray));

const arrWithDuplicates = [50, 50, 10, -5, -5, 25];
console.log("7. Видалення дублікатів min/max:", task7RemoveMinMaxDuplicates(arrWithDuplicates));

console.log("8. Між середніми:", task8ElementsBetweenAverages([2, 4, 6], [10, 20, 30]));

// Додаткові завдання
// Симуляція ігрового інвентарю
// Створіть масив рядків, де порожні слоти позначені як "Empty"

const inventory = ["Sword", "Shield", "Potion", "Empty", "Gold"];

// Реалізуйте функції: додавання предмета у першу вільну комірку, видалення предмета за замовленням гравця та ущільнення інвентарю (переміщення всіх предметів на початок масиву, щоб порожні слоти опинилися в кінці)

function addItem(inventory, item) {
    const emptySlot = inventory.indexOf("Empty");

    if (emptySlot === -1) {
        return false;
    }

    inventory[emptySlot] = item;
    return true;
}

function removeItem(inventory, item) {
    const itemIndex = inventory.indexOf(item);

    if (itemIndex === -1) {
        return false;
    }

    inventory[itemIndex] = "Empty";
    return true;
}

function compactInventory(inventory) {
    const items = inventory.filter(item => item !== "Empty");
    const emptySlots = inventory.length - items.length;

    inventory.splice(0, inventory.length, ...items, ...Array(emptySlots).fill("Empty"));
    return inventory;
}

console.log("Початковий інвентар:", inventory);
addItem(inventory, "Bow");
console.log("Після додавання предмета:", inventory);
removeItem(inventory, "Shield");
console.log("Після видалення предмета:", inventory);
console.log("Після ущільнення:", compactInventory(inventory));
