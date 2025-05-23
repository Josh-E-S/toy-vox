import { useRef, useEffect } from 'react';

interface WorkingVisualizerProps {
  className?: string;
}

const WorkingVisualizer = ({ className = '' }: WorkingVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  
  // Set up audio visualization
  useEffect(() => {
    // Create canvas context
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Function to set up audio analysis
    const setupAudio = async () => {
      try {
        // Use screen capture with system audio
        const stream = await navigator.mediaDevices.getDisplayMedia({ 
          video: { width: 1, height: 1 }, // Minimal video to reduce resources
          audio: true 
        });
        
        // Extract only audio tracks
        const audioTracks = stream.getAudioTracks();
        if (audioTracks.length === 0) {
          console.error('No audio track found in screen capture');
          return;
        }
        
        // Create a new stream with only audio
        const audioStream = new MediaStream(audioTracks);
        
        // Set up audio context and analyzer
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        analyser.smoothingTimeConstant = 0.8;
        analyser.minDecibels = -70;
        analyser.maxDecibels = 0;
        
        const source = audioContext.createMediaStreamSource(audioStream);
        source.connect(analyser);
        
        // Create data array for analyzer
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        // Store references
        audioContextRef.current = audioContext;
        analyserRef.current = analyser;
        sourceRef.current = source;
        dataArrayRef.current = dataArray;
        
        // Stop video tracks to save resources
        stream.getVideoTracks().forEach(track => track.stop());
        
        // Start visualization
        startVisualization();
        
        console.log('Audio visualization started successfully');
      } catch (error) {
        console.error('Error setting up audio visualization:', error);
      }
    };
    
    // Function to draw the visualization
    const drawVisualization = () => {
      if (!ctx || !analyserRef.current || !dataArrayRef.current) return;
      
      // Get frequency data
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      
      // Calculate average volume
      let sum = 0;
      for (let i = 0; i < dataArrayRef.current.length; i++) {
        sum += dataArrayRef.current[i];
      }
      const average = sum / dataArrayRef.current.length;
      
      // Normalize to 0-1 range
      const volume = average / 255;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Set line style
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
      
      // Draw the horizontal line at the bottom third of the screen
      const lineY = canvas.height * 0.7; // Position at 70% from the top
      const amplitude = volume * canvas.height * 0.25; // 25% of canvas height max
      
      ctx.beginPath();
      
      // Draw a line with wave effect
      for (let x = 0; x < canvas.width; x += 2) {
        // Calculate y position based on volume and position
        const y = lineY + Math.sin(x * 0.01 + Date.now() * 0.002) * amplitude;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.stroke();
      
      // Continue animation
      animationRef.current = requestAnimationFrame(drawVisualization);
    };
    
    // Start the visualization loop
    const startVisualization = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      animationRef.current = requestAnimationFrame(drawVisualization);
    };
    
    // Start audio capture
    setupAudio();
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      if (sourceRef.current) {
        sourceRef.current.disconnect();
      }
      
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);
  
  return (
    <div className={`absolute inset-0 z-0 ${className}`}>
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
        style={{ background: 'transparent' }}
      />
    </div>
  );
};

export default WorkingVisualizer;
