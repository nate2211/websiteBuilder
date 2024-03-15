import React, {useState, useEffect, useRef} from 'react';
import { Button, Slider, Box, Typography } from '@mui/material';

function MusicPlayer({src}) {
    const [audioContext, setAudioContext] = useState(null);
    const [sourceNode, setSourceNode] = useState(null);
    const [gainNode, setGainNode] = useState(null);
    const [filterNode, setFilterNode] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioBuffer, setAudioBuffer] = useState(null);
    const [analyserNode, setAnalyserNode] = useState(null);
    const [showVolume, setShowVolume] = useState(false);
    const [showPlaybackRate, setShowPlaybackRate] = useState(false);
    const [showFilterFrequency, setShowFilterFrequency] = useState(false);
    const [duration, setDuration] = useState(0);

    const audioStartRef = useRef(0); // Add this line to keep track of when the playback starts
    const [playbackPosition, setPlaybackPosition] = useState(0); // This state will be used to control the slider and update it

    const canvasRef = useRef(null);
    const intervalRef = useRef(null);


    const [filter, setFilter] = useState(5000)
    const [volume, setVolume] = useState(.5)
    const [playback, setPlaybackRate] = useState(1)
    const [isFilterActive, setIsFilterActive] = useState(false);
    useEffect(() => {
        const ac = new (window.AudioContext || window.webkitAudioContext)();
        const gn = ac.createGain();
        const fn = ac.createBiquadFilter();
        const an = ac.createAnalyser();

        fn.type = "bandpass";
        fn.frequency.value = 5000; // Default frequency
        gn.connect(an);
        an.connect(ac.destination);

        setAudioContext(ac);
        setGainNode(gn);
        setFilterNode(fn);
        setAnalyserNode(an);

        loadAudioFile(ac, src);

        visualize(an);

        return () => {
            clearInterval(intervalRef.current);
        };
    }, [src]);

    // All other effects and functions remain unchanged...

    const toggleFilter = () => {
        if (!isFilterActive) {
            // Activate filter: Connect gain node -> filter node -> analyser node
            gainNode.disconnect(analyserNode); // Disconnect from analyser directly if it was connected
            gainNode.connect(filterNode); // Connect gain to filter
            filterNode.connect(analyserNode); // Make sure filter is connected to analyser
        } else {
            // Deactivate filter: Connect gain node -> analyser node directly
            filterNode.disconnect(analyserNode); // Disconnect filter from analyser
            gainNode.disconnect(filterNode); // Disconnect gain from filter
            gainNode.connect(analyserNode); // Connect gain directly to analyser
        }
        setIsFilterActive(!isFilterActive);
    };


    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = setInterval(() => {
                // Update based on the difference between the audio context's current time and the start time of the playback
                setPlaybackPosition(audioContext.currentTime - audioStartRef.current);
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }
    }, [isPlaying, audioContext]);

    // Previous functions remain unchanged

    const visualize = (analyser) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const WIDTH = canvas.width;
        const HEIGHT = canvas.height;
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
            requestAnimationFrame(draw);
            analyser.getByteFrequencyData(dataArray);

            ctx.fillStyle = 'rgb(0, 0, 0)';
            ctx.fillRect(0, 0, WIDTH, HEIGHT);

            const barWidth = (WIDTH / bufferLength) * 2.5;
            let barHeight;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i];
                ctx.fillStyle = `rgb(${barHeight + 100},50,50)`;
                ctx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);

                x += barWidth + 1;
            }
        };

        draw();
    };

    const loadAudioFile = async (audioContext, url) => {
        try {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
                setAudioBuffer(audioBuffer);
                setDuration(audioBuffer.duration); // Update the state with the audio duration
            });
        } catch (error) {
            console.error("Error loading audio file:", error);
        }
    }

    const togglePlayPause = () => {
        if (!audioContext || !audioBuffer) {
            return;
        }

        if (isPlaying) {
            if (sourceNode) {
                sourceNode.stop();
                sourceNode.disconnect();
                setIsPlaying(false)
            }
        } else {
            playFromPosition(playbackPosition);
        }
    };

    const handleSliderChange = (event, newValue) => {
        setPlaybackPosition(newValue);
        // If the audio is playing, seek to the new position immediately.
        if (isPlaying) {
            playFromPosition(newValue);
        } else {
            // If not playing, just update the position. Playback will start from this position when played next.
            audioStartRef.current = audioContext.currentTime - newValue;
        }
    };

    const playFromPosition = (positionInSeconds) => {
        // Check if a source node is currently playing and stop it
        if (sourceNode) {
            sourceNode.stop();
            sourceNode.disconnect();
        }

        // Create a new source node for the audio
        const newSourceNode = audioContext.createBufferSource();
        newSourceNode.buffer = audioBuffer;
        newSourceNode.playbackRate.value = playback;

        // Connect the new source node based on whether the filter is active
        if (isFilterActive) {
            // If the filter is active, pass the audio through the filter node
            newSourceNode.connect(gainNode);
            gainNode.connect(filterNode);
            filterNode.connect(analyserNode); // Assuming you want to always connect to the analyserNode for visualization
            analyserNode.connect(audioContext.destination);
        } else {
            // If the filter is not active, bypass the filter node
            newSourceNode.connect(gainNode);
            gainNode.connect(analyserNode); // Assuming you want to always connect to the analyserNode for visualization
            analyserNode.connect(audioContext.destination);
        }

        newSourceNode.start(0, positionInSeconds);
        setSourceNode(newSourceNode); // Update the state with the new source node
        audioStartRef.current = audioContext.currentTime - positionInSeconds;

        setIsPlaying(true);
    };



    const changeVolume = (event, newValue) => {
        gainNode.gain.setValueAtTime(newValue, audioContext.currentTime);
        setVolume(newValue)
    };

    const changePlaybackRate = (event, newValue) => {
        if (sourceNode) {
            sourceNode.playbackRate.value = newValue;
        }
        setPlaybackRate(newValue)
    };

    const changeFilterFrequency = (event, newValue) => {
        if (filterNode) {
            filterNode.frequency.value = newValue;
        }
        setFilter(newValue)
    };
    const toggleVolumeControl = () => setShowVolume(!showVolume);
    const togglePlaybackRateControl = () => setShowPlaybackRate(!showPlaybackRate);
    const toggleFilterFrequencyControl = () => setShowFilterFrequency(!showFilterFrequency);

    return (
        <Box sx={{ width: 300, margin: 'auto', textAlign: 'center' }}>
            <Button variant="contained" onClick={togglePlayPause}>
                {isPlaying ? 'Pause' : 'Play'}
            </Button>
            <Button variant="contained" onClick={toggleFilter}>
                {isFilterActive ? 'Disable Filter' : 'Enable Filter'}
            </Button>

            <Button variant="text" onClick={toggleVolumeControl}>Volume</Button>
            {showVolume && (
                <Slider min={0} max={2} step={0.01} value={volume} defaultValue={1} onChange={changeVolume} />
            )}

            <Button variant="text" onClick={togglePlaybackRateControl}>Playback Rate</Button>
            {showPlaybackRate && (
                <Slider min={0.5} max={1.5} step={0.1} value={playback} defaultValue={1} onChange={changePlaybackRate} />
            )}

            <Button variant="text" onClick={toggleFilterFrequencyControl}>Filter Frequency</Button>
            {showFilterFrequency && (
                <Slider min={0} max={10000} step={100} value={filter} defaultValue={5000} onChange={changeFilterFrequency} />
            )}

            <Typography>Track Progress</Typography>
            <Slider
                min={0}
                max={duration}

                value={playbackPosition} // Updated to use playbackPosition
                onChange={handleSliderChange} // Updated to use the new handler
            />

            <canvas ref={canvasRef} width="300" height="150"></canvas>
        </Box>
    );
}

export default MusicPlayer;