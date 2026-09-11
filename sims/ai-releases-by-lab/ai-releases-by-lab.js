// AI Model Releases by Lab - Chart.js
// CANVAS_HEIGHT: 560
document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('main');

    const wrapper = document.createElement('div');
    wrapper.style.width = '100%';
    wrapper.style.maxWidth = '900px';
    wrapper.style.margin = '0 auto';
    wrapper.style.padding = '10px 16px 0 16px';
    wrapper.style.boxSizing = 'border-box';
    container.appendChild(wrapper);

    const canvasHolder = document.createElement('div');
    canvasHolder.style.position = 'relative';
    canvasHolder.style.height = '470px';
    wrapper.appendChild(canvasHolder);

    const canvas = document.createElement('canvas');
    canvas.id = 'labTotalsChart';
    canvasHolder.appendChild(canvas);

    const source = document.createElement('p');
    source.style.textAlign = 'center';
    source.style.fontSize = '12px';
    source.style.color = '#888';
    source.style.margin = '6px 0 4px 0';
    wrapper.appendChild(source);

    fetch('../ai-release-data/data.json')
        .then(response => response.json())
        .then(config => {
            const labs = [...config.labTotals].sort((a, b) => a.value - b.value);
            const labels = labs.map(l => l.lab);
            const data = labs.map(l => l.value);
            const total = config.meta.totalReleases;

            source.innerHTML = 'Data source: <a href="' + config.source.url +
                '" target="_blank" rel="noopener" style="color:#888;">' +
                config.source.name + ' (aireleasetracker.com)</a>';

            const ctx = canvas.getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Major AI model releases',
                        data: data,
                        backgroundColor: 'rgba(54, 162, 235, 0.85)',
                        borderColor: 'rgb(54, 162, 235)',
                        borderWidth: 1,
                        borderRadius: 4,
                        maxBarThickness: 28
                    }]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: { duration: 800 },
                    layout: { padding: { right: 40 } },
                    plugins: {
                        title: {
                            display: true,
                            text: 'AI Model Releases by Lab',
                            font: { size: 18, weight: 'bold' },
                            padding: { top: 8, bottom: 2 }
                        },
                        subtitle: {
                            display: true,
                            text: 'Total major model releases per lab since November 2022 (' + total + ' tracked in all)',
                            font: { size: 12, style: 'normal' },
                            color: '#666',
                            padding: { bottom: 12 }
                        },
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    const pct = ((context.parsed.x / total) * 100).toFixed(1);
                                    return context.parsed.x + ' releases (' + pct + '% of all releases)';
                                }
                            }
                        },
                        datalabels: {
                            anchor: 'end',
                            align: 'end',
                            color: '#333',
                            font: { weight: 'bold', size: 12 },
                            formatter: function (value) { return value; }
                        }
                    },
                    scales: {
                        x: {
                            beginAtZero: true,
                            title: { display: true, text: 'Major model releases' },
                            grace: '10%',
                            ticks: { precision: 0 }
                        },
                        y: {
                            ticks: { font: { size: 12 } }
                        }
                    }
                },
                plugins: [ChartDataLabels]
            });
        })
        .catch(err => {
            console.error('Failed to load data.json:', err);
        });
});
