import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { useVisualizerSettings } from '../context/VisualizerSettingsContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const { settings, updateSetting, resetToDefaults } = useVisualizerSettings();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <div className="bg-black bg-opacity-40 backdrop-blur-md p-4 sm:p-6 rounded-xl text-white w-[90vw] max-w-md sm:w-96 max-h-[80vh] overflow-y-auto mx-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-bold">Orb Settings</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Settings */}
              <div className="space-y-3 sm:space-y-4">
                {/* Intensity */}
                <div>
                  <label className="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium">
                    Intensity: {settings.intensity.toFixed(1)}x
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="2.0"
                    step="0.1"
                    value={settings.intensity}
                    onChange={(e) => updateSetting('intensity', parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-[11px] sm:text-xs text-gray-400 mt-1">
                    How aggressively the orb responds to audio
                  </div>
                </div>

                {/* Line Thickness */}
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Line Thickness: {settings.wireframeThickness}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={settings.wireframeThickness}
                    onChange={(e) => updateSetting('wireframeThickness', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-xs text-gray-400 mt-1">
                    Thickness of the wireframe lines
                  </div>
                </div>

                {/* Detail Level */}
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Detail Level: {settings.detail}
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    step="5"
                    value={settings.detail}
                    onChange={(e) => updateSetting('detail', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-xs text-gray-400 mt-1">
                    Geometric complexity (more = smoother)
                  </div>
                </div>

                {/* Orb Size */}
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Orb Size: {settings.size.toFixed(1)}
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="8"
                    step="0.5"
                    value={settings.size}
                    onChange={(e) => updateSetting('size', parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-xs text-gray-400 mt-1">
                    Overall size of the orb
                  </div>
                </div>

                {/* Audio Sensitivity */}
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Audio Sensitivity: {settings.sensitivity}
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="200"
                    step="10"
                    value={settings.sensitivity}
                    onChange={(e) => updateSetting('sensitivity', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-xs text-gray-400 mt-1">
                    How sensitive to audio input
                  </div>
                </div>

                {/* Reset Button */}
                <button
                  onClick={resetToDefaults}
                  className="w-full p-2 sm:p-3 bg-red-600 bg-opacity-50 hover:bg-opacity-70 rounded-lg transition-colors font-medium text-sm sm:text-base"
                >
                  Reset to Defaults
                </button>
              </div>

              <div className="mt-3 sm:mt-4 text-[11px] sm:text-xs text-gray-400 text-center">
                Changes apply instantly to the orb behind this modal
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SettingsModal;