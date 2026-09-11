// AI Release Frequency Per Month - Chart.js
// CANVAS_HEIGHT: 470
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
    canvasHolder.style.height = '380px';
    wrapper.appendChild(canvasHolder);

    const canvas = document.createElement('canvas');
    canvas.id = 'monthlyChart';
    canvasHolder.appendChild(canvas);

    const note = document.createElement('p');
    note.style.textAlign = 'center';
    note.style.fontSize = '13px';
    note.style.color = '#555';
    note.style.margin = '6px 0 2px 0';
    wrapper.appendChild(note);

    const source = document.createElement('p');
    source.style.textAlign = 'center';
    source.style.fontSize = '12px';
    source.style.color = '#888';
    source.style.margin = '0 0 4px 0';
    wrapper.appendChild(source);

    fetch('../ai-release-data/data.json')
        .then(response => response.json())
        .then(config => {
            const months = config.months;
            const labels = months.map(m => m.label);
            const data = months.map(m => m.value);
            const latest = months[months.length - 1];

            note.textContent = latest.partial
                ? latest.label + ' is partial (still in progress).'
                : '';
            source.innerHTML = 'Data source: <a href="' + config.source.url +
                '" target="_blank" rel="noopener" style="color:#888;">' +
                config.source.name + ' (aireleasetracker.com)</a>';

            const ctx = canvas.getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Model releases',
                        data: data,
                        borderColor: 'rgb(255, 159, 64)',
                        backgroundColor: 'rgba(255, 159, 64, 0.15)',
                        fill: true,
                        tension: 0.3,
                        pointRadius: 0,
                        pointHoverRadius: 5,
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: { duration: 800 },
                    layout: { padding: { top: 20 } },
                    interaction: { mode: 'index', intersect: false },
                    plugins: {
                        title: {
                            display: true,
                            text: 'AI Release Frequency Per Month',
                            font: { size: 18, weight: 'bold' },
                            padding: { top: 8, bottom: 2 }
                        },
                        subtitle: {
                            display: true,
                            text: 'New AI models shipped each calendar month',
                            font: { size: 12, style: 'normal' },
                            color: '#666',
                            padding: { bottom: 12 }
                        },
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    return context.parsed.y + ' releases';
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: { display: true, text: 'Model releases' },
                            grace: '10%',
                            ticks: { precision: 0 }
                        },
                        x: {
                            title: { display: true, text: 'Month' },
                            ticks: { maxTicksLimit: 12, maxRotation: 45, minRotation: 45 }
                        }
                    }
                }
            });
        })
        .catch(err => {
            console.error('Failed to load data.json:', err);
            note.textContent = 'Unable to load chart data (data.json).';
        });
});
