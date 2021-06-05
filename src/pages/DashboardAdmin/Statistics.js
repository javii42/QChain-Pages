/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-undef */
import React from 'react';

import Chart from 'chart.js';

Chart.defaults.global.defaultFontFamily = 'Roboto, sans-serif';

// Data generation
function getRandomArray(numItems) {
    // Create random array of objects
    const names = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const data = [];
    for (let i = 0; i < numItems; i++) {
        data.push({
            label: names[i],
            value: Math.round(20 + 80 * Math.random())
        });
    }
    return data;
}

function getRandomDateArray(numItems) {
    // Create random array of objects (with date)
    const data = [];
    const baseTime = new Date('2018-05-01T00:00:00').getTime();
    const dayMs = 24 * 60 * 60 * 1000;
    for (let i = 0; i < numItems; i++) {
        data.push({
            time: new Date(baseTime + i * dayMs),
            value: Math.round(20 + 80 * Math.random())
        });
    }
    return data;
}

function getData() {
    const data = [];

    data.push({
        title: 'Usuarios',
        data: getRandomDateArray(150)
    });

    data.push({
        title: 'Reportes',
        data: getRandomArray(20)
    });

    data.push({
        title: 'Online',
        data: getRandomArray(10)
    });

    data.push({
        title: 'Tareas completadas',
        data: getRandomArray(6)
    });

    return data;
}


// BarChart
class BarChart extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    componentDidUpdate() {
        this.myChart.data.labels = this.props.data.map(d => d.label);
        this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
        this.myChart.update();
    }

    componentDidMount() {
        this.myChart = new Chart(this.canvasRef.current, {
            type: 'bar',
            options: {
	      maintainAspectRatio: false,
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                min: 0,
                                max: 100
                            }
                        }
                    ]
                }
            },
            data: {
                labels: this.props.data.map(d => d.label),
                datasets: [{
                    label: this.props.title,
                    data: this.props.data.map(d => d.value),
                    backgroundColor: this.props.color
                }]
            }
        });
    }

    render() {
        return (
            <canvas ref={this.canvasRef}/>
        );
    }
}


// LineChart
class LineChart extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    componentDidUpdate() {
        this.myChart.data.labels = this.props.data.map(d => d.time);
        this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
        this.myChart.update();
    }

    componentDidMount() {
        this.myChart = new Chart(this.canvasRef.current, {
            type: 'line',
            options: {
                maintainAspectRatio: false,
                scales: {
                    xAxes: [
                        {
                            type: 'time',
                            time: {
                                unit: 'week'
                            }
                        }
                    ],
                    yAxes: [
                        {
                            ticks: {
                                min: 0
                            }
                        }
                    ]
                }
            },
            data: {
                labels: this.props.data.map(d => d.time),
                datasets: [{
                    label: this.props.title,
                    data: this.props.data.map(d => d.value),
                    fill: 'none',
                    backgroundColor: this.props.color,
                    pointRadius: 2,
                    borderColor: this.props.color,
                    borderWidth: 1,
                    lineTension: 0
                }]
            }
        });
    }

    render() {
        return <canvas ref={this.canvasRef}/>;
    }
}


// Doughnut
class DoughnutChart extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    componentDidUpdate() {
        this.myChart.data.labels = this.props.data.map(d => d.label);
        this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
        this.myChart.update();
    }

    componentDidMount() {
        this.myChart = new Chart(this.canvasRef.current, {
            type: 'doughnut',
            options: {
	            maintainAspectRatio: false
            },
            data: {
                labels: this.props.data.map(d => d.label),
                datasets: [{
                    data: this.props.data.map(d => d.value),
                    backgroundColor: this.props.colors
                }]
            }
        });
    }


    render() {
        return <canvas ref={this.canvasRef}/>;
    }
}


// App
class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: getData()
        };
    }

    componentDidMount() {
        window.setInterval(() => {
            this.setState({
                data: getData()
            });
        }, 5000);
    }

    render() {
        return (
            <div className="App">
                <div className="main chart-wrapper">
                    <LineChart
                        data={this.state.data[0].data}
                        title={this.state.data[0].title}
                        color="#7d2a84"
                    />
                </div>
                <div className="sub chart-wrapper">
                    <BarChart
                        data={this.state.data[1].data}
                        title={this.state.data[1].title}
                        color="#7d2a84"
                    />
                </div>
                <div className="sub chart-wrapper">
                    <BarChart
                        data={this.state.data[2].data}
                        title={this.state.data[2].title}
                        color="#7d2a84"
                    />
                </div>
                <div className="sub chart-wrapper">
                    <DoughnutChart
                        data={this.state.data[3].data}
                        title={this.state.data[3].title}
                        colors={['#7d2a84', '#7d2a84', '#7d2a84', '#7d2a84', '#7d2a84', '#7d2a84']}
                    />
                </div>
            </div>
        );
    }
}

export default App;
