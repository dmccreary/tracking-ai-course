// AI Model Releases by Day of Week - Chart.js
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
    canvas.id = 'dayOfWeekChart';
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
            const days = config.dayOfWeek;
            const labels = days.map(d => d.day);
            const data = days.map(d => d.value);

            const weekdayFill = 'rgba(54, 162, 235, 0.85)';
            const weekendFill = 'rgba(153, 102, 255, 0.85)';
            const weekdayBorder = 'rgb(54, 162, 235)';
            const weekendBorder = 'rgb(153, 102, 255)';

            const backgroundColors = days.map(d => d.weekend ? weekendFill : weekdayFill);
            const borderColors = days.map(d => d.weekend ? weekendBorder : weekdayBorder);

            note.textContent = 'Purple bars: weekend (Saturday/Sunday).';
            source.innerHTML = 'Data source: <a href="' + config.source.url +
                '" target="_blank" rel="noopener" style="color:#888;">' +
                config.source.name + ' (aireleasetracker.com)</a>';

            const total = data.reduce((a, b) => a + b, 0);

            const ctx = canvas.getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Major AI model releases',
                        data: data,
                        backgroundColor: backgroundColors,
                        borderColor: borderColors,
                        borderWidth: 1,
                        borderRadius: 4,
                        maxBarThickness: 60
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: { duration: 800 },
                    layout: { padding: { top: 20 } },
                    plugins: {
                        title: {
                            display: true,
                            text: 'AI Model Releases by Day of Week',
                            font: { size: 18, weight: 'bold' },
                            padding: { top: 8, bottom: 2 }
                        },
                        subtitle: {
                            display: true,
                            text: 'Which days of the week labs ship major model releases on',
                            font: { size: 12, style: 'normal' },
                            color: '#666',
                            padding: { bottom: 12 }
                        },
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    const pct = ((context.parsed.y / total) * 100).toFixed(1);
                                    return context.parsed.y + ' releases (' + pct + '% of all releases)';
                                }
                            }
                        },
                        datalabels: {
                            anchor: 'end',
                            align: 'top',
                            color: '#333',
                            font: { weight: 'bold', size: 13 },
                            formatter: function (value) { return value; }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: { display: true, text: 'Major model releases' },
                            grace: '10%',
                            ticks: { precision: 0 }
                        },
                        x: {
                            title: { display: true, text: 'Day of Week' }
                        }
                    }
                },
                plugins: [ChartDataLabels]
            });
        })
        .catch(err => {
            console.error('Failed to load data.json:', err);
            note.textContent = 'Unable to load chart data (data.json).';
        });
});
