let array = [];
let sortingSpeed = 50;

document.getElementById('speed').addEventListener('input', (e) => {
    sortingSpeed = e.target.value;
    document.getElementById('speed-value').textContent = `${sortingSpeed}ms`;
});

function generateArray() {
    array = [];
    for (let i = 0; i < 30; i++) {
        array.push(Math.floor(Math.random() * 100) + 10);
    }
    displayArray();
}

function displayArray() {
    const container = document.getElementById('array-container');
    container.innerHTML = '';
    array.forEach(height => {
        const bar = document.createElement('div');
        bar.style.height = `${height}px`;
        bar.classList.add('bar');
        container.appendChild(bar);
    });
}

function startSorting(algorithm) {
    document.getElementById('algorithm-info').textContent = `${algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} in progress...`;
    switch (algorithm) {
        case 'bubble':
            bubbleSort();
            break;
        case 'selection':
            selectionSort();
            break;
        case 'insertion':
            insertionSort();
            break;
    }
}

function resetArray() {
    generateArray();
    document.getElementById('algorithm-info').textContent = '';
}

async function bubbleSort() {
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            const bars = document.querySelectorAll('.bar');
            bars[j].style.backgroundColor = 'red';
            bars[j + 1].style.backgroundColor = 'red';

            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }

            await new Promise(resolve => setTimeout(resolve, sortingSpeed));
            displayArray();

            bars[j].style.backgroundColor = '#4CAF50';
            bars[j + 1].style.backgroundColor = '#4CAF50';
        }
    }
    document.getElementById('algorithm-info').textContent = 'Sorting Completed!';
}

async function selectionSort() {
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        const bars = document.querySelectorAll('.bar');

        for (let j = i + 1; j < n; j++) {
            bars[j].style.backgroundColor = 'red';
            if (array[j] < array[minIdx]) {
                minIdx = j;
            }
            await new Promise(resolve => setTimeout(resolve, sortingSpeed));
            bars[j].style.backgroundColor = '#4CAF50';
        }

        if (minIdx !== i) {
            [array[i], array[minIdx]] = [array[minIdx], array[i]];
            displayArray();
        }
    }
    document.getElementById('algorithm-info').textContent = 'Sorting Completed!';
}

async function insertionSort() {
    const n = array.length;
    for (let i = 1; i < n; i++) {
        let key = array[i];
        let j = i - 1;
        const bars = document.querySelectorAll('.bar');

        bars[i].style.backgroundColor = 'red';
        await new Promise(resolve => setTimeout(resolve, sortingSpeed));

        while (j >= 0 && array[j] > key) {
            bars[j].style.backgroundColor = 'red';
            array[j + 1] = array[j];
            j--;
            displayArray();
            await new Promise(resolve => setTimeout(resolve, sortingSpeed));
            bars[j + 1].style.backgroundColor = '#4CAF50';
        }
        array[j + 1] = key;
        displayArray();
        bars[i].style.backgroundColor = '#4CAF50';
    }
    document.getElementById('algorithm-info').textContent = 'Sorting Completed!';
}

generateArray();  // Initial array generation
