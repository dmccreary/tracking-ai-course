// Combined Cumulative AI Model Releases - Chart.js
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
    canvas.id = 'cumulativeChart';
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
            const data = months.map(m => m.cumulative);
            const latest = months[months.length - 1];

            note.textContent = 'As of ' + latest.label + ': ' + latest.cumulative +
                ' total major AI model releases tracked.';
            source.innerHTML = 'Data source: <a href="' + config.source.url +
                '" target="_blank" rel="noopener" style="color:#888;">' +
                config.source.name + ' (aireleasetracker.com)</a>';

            const ctx = canvas.getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Cumulative releases',
                        data: data,
                        borderColor: 'rgb(54, 162, 235)',
                        backgroundColor: 'rgba(54, 162, 235, 0.15)',
                        fill: true,
                        tension: 0.25,
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
                            text: 'Combined Cumulative AI Model Releases',
                            font: { size: 18, weight: 'bold' },
                            padding: { top: 8, bottom: 2 }
                        },
                        subtitle: {
                            display: true,
                            text: 'The compounding total of major model releases across all tracked labs',
                            font: { size: 12, style: 'normal' },
                            color: '#666',
                            padding: { bottom: 12 }
                        },
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    return context.parsed.y + ' total releases to date';
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: { display: true, text: 'Cumulative model releases' },
                            grace: '5%',
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
