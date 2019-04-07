import React, { Component } from 'react';
import './Metronome.css';
import click1 from './click1.wav';
import click2 from './click2.wav';

class Metronome extends Component {
	
	constructor(props) {
		super(props);
		this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
		this.state = {
			bpm: 100,
			playing: false,
			count: 0,
			beatsPerMeasure: 4
		}
		this.handleBpmChange = this.handleBpmChange.bind(this);
		this.startStop = this.startStop.bind(this);
	}
	
	handleBpmChange = (event) => {
		if(this.state.playing) {
			clearInterval(this.timer);
			this.timer = setInterval(
				this.playClick, 
				(60 / this.state.bpm) * 1000
			);
			this.setState({ 
				count: 0,
				bpm: event.target.value
			});
		} else {
			this.setState({bpm: event.target.value});
		}
	}
	
	startStop = () => {
		if(this.state.playing) {
			clearInterval(this.timer);
			this.setState({ 
				playing: false 
			});
		} else {
			this.timer = setInterval(
				this.playClick, 
				(60 / this.state.bpm) * 1000
			);
			this.setState({ 
				playing: true,
				count: 0
			}, this.playClick);
		}
	}
	
	playClick = () => {
		const { count, beatsPerMeasure } = this.state;

		if (count % beatsPerMeasure === 0) {
		  this.click2.play();
		} else {
		  this.click1.play();
		}

		this.setState(state => ({
		  count: (state.count + 1) % state.beatsPerMeasure
		}));
	};
	
	render() {

		return(
			<div className="metronome">
				<div className="bpm-slider">
					<div>{this.state.bpm} BPM</div>
					<input type="range" min="60" max="240" value={this.state.bpm} onChange={this.handleBpmChange}/>
				</div>
				<button onClick={this.startStop}>{this.state.playing ? 'Stop' : 'Start'}</button>
			</div>
		);
	}
}

export default Metronome;
