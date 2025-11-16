// Data structure with both 50% and 80% horizons
const modelData = {
    frontier: [
        { name: 'GPT-5', horizon50: 137.3, horizon80: 26.4, date: '2025-08-07' },
        { name: 'O3', horizon50: 92.2, horizon80: 20.4, date: '2025-04-16' },
        { name: 'Grok-4', horizon50: 110.1, horizon80: 14.9, date: '2025-07-09' },
        { name: 'Claude 3.7 Sonnet', horizon50: 54.2, horizon80: 15.2, date: '2025-02-24' },
        { name: 'O1 Elicited', horizon50: 39.2, horizon80: 6.0, date: '2024-12-05' },
        { name: 'Gemini 2.5 Pro', horizon50: 38.7, horizon80: 9.2, date: '2025-06-05' }
    ],
    nonFrontier: [
        { name: 'Claude 4.1 Opus', horizon50: 105.5, horizon80: 21.1, date: '2025-01-15' },
        { name: 'O4-Mini', horizon50: 77.6, horizon80: 15.0, date: '2025-03-10' },
        { name: 'DeepSeek R1 0528', horizon50: 31.2, horizon80: 3.8, date: '2024-05-28' },
        { name: 'Claude 3.5 Sonnet', horizon50: 29.0, horizon80: 4.6, date: '2024-10-01' }
    ]
};

let currentScale = 'linear';
let currentProbability = '50';
let chart;

function prepareChartData() {
    const horizonKey = currentProbability === '50' ? 'horizon50' : 'horizon80';

    // Sort all models by date
    const allModels = [
        ...modelData.frontier.map(m => ({ ...m, type: 'frontier' })),
        ...modelData.nonFrontier.map(m => ({ ...m, type: 'nonFrontier' }))
    ].sort((a, b) => new Date(a.date) - new Date(b.date));

    // Create datasets
    const frontierPoints = [];
    const nonFrontierPoints = [];

    allModels.forEach((model, index) => {
        const point = {
            x: index,
            y: model[horizonKey],
            label: model.name,
            date: model.date
        };

        if (model.type === 'frontier') {
            frontierPoints.push(point);
        } else {
            nonFrontierPoints.push(point);
        }
    });

    return {
        labels: allModels.map(m => m.name),
        datasets: [
            {
                label: 'Frontier Models',
                data: frontierPoints,
                backgroundColor: 'rgba(39, 174, 96, 0.8)',
                borderColor: 'rgba(39, 174, 96, 1)',
                borderWidth: 2,
                pointRadius: 8,
                pointHoverRadius: 10
            },
            {
                label: 'Non-Frontier Models',
                data: nonFrontierPoints,
                backgroundColor: 'rgba(149, 165, 166, 0.8)',
                borderColor: 'rgba(149, 165, 166, 1)',
                borderWidth: 2,
                pointRadius: 8,
                pointHoverRadius: 10
            }
        ]
    };
}

function createChart() {
    const ctx = document.getElementById('taskChart').getContext('2d');
    const chartData = prepareChartData();

    chart = new Chart(ctx, {
        type: 'scatter',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: { size: 14, weight: 'bold' },
                    bodyFont: { size: 13 },
                    callbacks: {
                        title: function(context) {
                            return context[0].raw.label;
                        },
                        label: function(context) {
                            const minutes = context.parsed.y;
                            const hours = (minutes / 60).toFixed(1);
                            return [
                                `${currentProbability}% Success Horizon: ${minutes.toFixed(1)} min (${hours} hrs)`,
                                `Release: ${context.raw.date}`
                            ];
                        }
                    }
                },
                title: {
                    display: false
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    title: {
                        display: true,
                        text: 'Models (chronological order)',
                        font: { size: 13, weight: 'bold' }
                    },
                    ticks: {
                        callback: function(value, index) {
                            return chartData.labels[Math.floor(value)] || '';
                        },
                        autoSkip: true,
                        maxRotation: 45,
                        minRotation: 45
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                y: {
                    type: currentScale,
                    title: {
                        display: true,
                        text: 'Time Horizon (minutes)',
                        font: { size: 13, weight: 'bold' }
                    },
                    min: currentScale === 'logarithmic' ? 1 : 0,
                    ticks: {
                        callback: function(value) {
                            if (currentScale === 'logarithmic') {
                                return value.toFixed(0) + ' min';
                            }
                            return value + ' min';
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            }
        }
    });
}

function setScale(scale) {
    currentScale = scale;

    // Update button states
    document.getElementById('btnLinear').classList.toggle('active', scale === 'linear');
    document.getElementById('btnLog').classList.toggle('active', scale === 'logarithmic');

    // Update chart
    chart.options.scales.y.type = scale;
    chart.options.scales.y.min = scale === 'logarithmic' ? 1 : 0;
    chart.update();
}

function setProbability(probability) {
    currentProbability = probability;

    // Update button states
    document.getElementById('btn50').classList.toggle('active', probability === '50');
    document.getElementById('btn80').classList.toggle('active', probability === '80');

    // Update chart data
    chart.data = prepareChartData();
    chart.update();
}

// Initialize chart on load
window.addEventListener('load', createChart);
