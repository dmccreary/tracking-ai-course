// AI Model Releases by Lab Over Time - Chart.js
// CANVAS_HEIGHT: 560
document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('main');

    const wrapper = document.createElement('div');
    wrapper.style.width = '100%';
    wrapper.style.maxWidth = '950px';
    wrapper.style.margin = '0 auto';
    wrapper.style.padding = '10px 16px 0 16px';
    wrapper.style.boxSizing = 'border-box';
    container.appendChild(wrapper);

    const canvasHolder = document.createElement('div');
    canvasHolder.style.position = 'relative';
    canvasHolder.style.height = '470px';
    wrapper.appendChild(canvasHolder);

    const canvas = document.createElement('canvas');
    canvas.id = 'labOverTimeChart';
    canvasHolder.appendChild(canvas);

    const source = document.createElement('p');
    source.style.textAlign = 'center';
    source.style.fontSize = '12px';
    source.style.color = '#888';
    source.style.margin = '6px 0 4px 0';
    wrapper.appendChild(source);

    const LAB_COLORS = {
        'OpenAI': '#4e79a7',
        'Mistral': '#f28e2b',
        'Google': '#e15759',
        'Anthropic': '#76b7b2',
        'Qwen': '#59a14f',
        'DeepSeek': '#edc948',
        'SpaceXAI': '#b07aa1',
        'Meta': '#ff9da7',
        'Z.ai': '#9c755f',
        'Moonshot AI': '#bab0ac',
        'NVIDIA': '#17becf'
    };

    fetch('../ai-release-data/data.json')
        .then(response => response.json())
        .then(config => {
            const quarters = config.quarters;
            const labs = config.meta.labs;
            const labels = quarters.map(q => q.label);
            const totals = quarters.map(q => q.total);

            source.innerHTML = 'Data source: <a href="' + config.source.url +
                '" target="_blank" rel="noopener" style="color:#888;">' +
                config.source.name + ' (aireleasetracker.com)</a>';

            const labDatasets = labs.map(lab => ({
                label: lab,
                data: quarters.map(q => q.byLab[lab] || 0),
                backgroundColor: LAB_COLORS[lab] + 'cc',
                borderColor: LAB_COLORS[lab],
                borderWidth: 1,
                fill: true,
                tension: 0.3,
                pointRadius: 0,
                stack: 'labs'
            }));

            const trend = totals.map((_, i) => {
                if (i < 2) return null;
                return Math.round(((totals[i] + totals[i - 1] + totals[i - 2]) / 3) * 10) / 10;
            });

            const trendDataset = {
                label: 'Trend (3-qtr avg)',
                data: trend,
                borderColor: '#222',
                borderDash: [5, 4],
                borderWidth: 2,
                fill: false,
                pointRadius: 0,
                tension: 0.3,
                stack: undefined,
                order: 0
            };

            const ctx = canvas.getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [...labDatasets, trendDataset]
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
                            text: 'AI Model Releases by Lab Over Time',
                            font: { size: 18, weight: 'bold' },
                            padding: { top: 8, bottom: 2 }
                        },
                        subtitle: {
                            display: true,
                            text: 'Models shipped each quarter, stacked by lab — the field is getting more crowded',
                            font: { size: 12, style: 'normal' },
                            color: '#666',
                            padding: { bottom: 12 }
                        },
                        legend: {
                            position: 'bottom',
                            labels: { boxWidth: 12, font: { size: 11 }, padding: 8 }
                        },
                        tooltip: {
                            callbacks: {
                                footer: function (items) {
                                    const idx = items[0].dataIndex;
                                    return 'Total: ' + totals[idx] + ' releases';
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            stacked: true,
                            title: { display: true, text: 'Model releases' },
                            ticks: { precision: 0 }
                        },
                        x: {
                            title: { display: true, text: 'Quarter' },
                            ticks: { maxRotation: 45, minRotation: 45 }
                        }
                    }
                }
            });
        })
        .catch(err => {
            console.error('Failed to load data.json:', err);
        });
});
