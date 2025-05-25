import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Character } from '../../config/characters';
import { vertexShader } from './shaders/vertexShader';
import { fragmentShader } from './shaders/fragmentShader';
import { getCharacterConfig } from './visualizerConfig';
import { registerSpeechEventHandlers, unregisterSpeechEventHandlers } from '../../services/vapiService';
import { useVisualizerSettings } from '../../context/VisualizerSettingsContext';

interface AudioVisualizerProps {
  character?: Character | null;
  audioLevel?: number;
  className?: string;
}

const AudioVisualizer = ({ 
  character, 
  audioLevel = 0, 
  className = ''
}: AudioVisualizerProps) => {
  const { settings } = useVisualizerSettings();
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const clockRef = useRef<THREE.Clock | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  
  // Store current audio level from Vapi
  const currentAudioLevelRef = useRef<number>(0);
  
  // Register Vapi event handlers for audio visualization
  useEffect(() => {
    if (!character) return;
    
    // Register handlers to receive audio levels from Vapi
    registerSpeechEventHandlers({
      onVolumeLevel: (volume: number) => {
        // Store the volume level for use in animation
        currentAudioLevelRef.current = volume;
      }
    });
    
    return () => {
      // Cleanup Vapi event handlers
      unregisterSpeechEventHandlers();
    };
  }, [character]);

  // Initialize and cleanup Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;

    // Get config for current character with user settings
    const config = getCharacterConfig(character, settings);

    // Initialize Three.js components
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    containerRef.current.appendChild(renderer.domElement);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 14);
    camera.lookAt(0, 0, 0);

    // Add a subtle glow to the scene
    scene.fog = new THREE.FogExp2(0x000000, 0.001);
    
    // Create shader uniforms
    const uniforms = {
      u_time: { value: 0.0 },
      u_frequency: { value: 0.0 },
      u_red: { value: config.red },
      u_green: { value: config.green },
      u_blue: { value: config.blue }
    };

    // Create shader material
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader
    });
    
    // Set line width for wireframe mode
    renderer.getContext().lineWidth(settings.wireframeThickness);

    // Create geometry and mesh
    const geometry = new THREE.IcosahedronGeometry(config.size, config.detail);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.material.wireframe = config.wireframe;
    scene.add(mesh);

    // Initialize clock for animation
    const clock = new THREE.Clock();

    // Store references
    rendererRef.current = renderer;
    sceneRef.current = scene;
    cameraRef.current = camera;
    meshRef.current = mesh;
    clockRef.current = clock;

    // Animation function
    const animate = () => {
      if (!clockRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current || !meshRef.current) return;

      // Update time uniform
      const uniforms = (meshRef.current.material as THREE.ShaderMaterial).uniforms;
      uniforms.u_time.value = clockRef.current.getElapsedTime();
      
      // Update frequency uniform based on Vapi audio level or fallback to prop
      const currentLevel = currentAudioLevelRef.current || audioLevel;
      uniforms.u_frequency.value = currentLevel * settings.sensitivity;
      
      // Debug logging
      if (currentLevel > 0 && Math.random() < 0.01) {
        console.log("🎨 Visualizer level:", currentLevel, "Scaled:", currentLevel * 100);
      }

      // Add subtle rotation to the mesh
      meshRef.current.rotation.y += 0.001;

      // Render scene
      rendererRef.current.render(sceneRef.current, cameraRef.current);

      // Request next frame
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();

      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }

      if (meshRef.current && sceneRef.current) {
        sceneRef.current.remove(meshRef.current);
        meshRef.current.geometry.dispose();
        (meshRef.current.material as THREE.Material).dispose();
      }

      rendererRef.current?.dispose();
    };
  }, [character, settings]); // Recreate visualizer when character or settings change

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 -z-5 ${className}`}
      aria-hidden="true"
    />
  );
};

export default AudioVisualizer;
