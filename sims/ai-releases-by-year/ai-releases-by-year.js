// AI Model Releases by Year - Chart.js
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
    canvas.id = 'releasesChart';
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
            const years = config.years;
            const labels = years.map(y => y.label);
            const data = years.map(y => y.value);

            const solidFill = 'rgba(54, 162, 235, 0.85)';
            const partialFill = 'rgba(255, 159, 64, 0.85)';
            const solidBorder = 'rgb(54, 162, 235)';
            const partialBorder = 'rgb(255, 159, 64)';

            const backgroundColors = years.map(y => y.partial ? partialFill : solidFill);
            const borderColors = years.map(y => y.partial ? partialBorder : solidBorder);

            const partialYear = years.find(y => y.partial);
            note.textContent = partialYear
                ? `Orange bar: ${partialYear.label} is partial (through ${partialYear.asOf}).`
                : '';

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
                        backgroundColor: backgroundColors,
                        borderColor: borderColors,
                        borderWidth: 1,
                        borderRadius: 4,
                        maxBarThickness: 70
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
                            text: config.title,
                            font: { size: 18, weight: 'bold' },
                            padding: { top: 8, bottom: 2 }
                        },
                        subtitle: {
                            display: true,
                            text: config.subtitle,
                            font: { size: 12, style: 'normal' },
                            color: '#666',
                            padding: { bottom: 12 }
                        },
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    const year = years[context.dataIndex];
                                    return year.partial
                                        ? year.value + ' releases (through ' + year.asOf + ' — partial year)'
                                        : year.value + ' releases';
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
                            title: { display: true, text: config.yAxisLabel },
                            grace: '10%',
                            ticks: { precision: 0 }
                        },
                        x: {
                            title: { display: true, text: config.xAxisLabel }
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
