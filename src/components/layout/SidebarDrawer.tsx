import { Drawer, DrawerContent, DrawerHeader, DrawerBody } from '@heroui/drawer';
import { Button } from '@heroui/button';
import { HiX } from 'react-icons/hi';
import Sidebar from './Sidebar';
import { Character } from '@/config/characters';

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCharacterSelect?: (character: Character) => void;
}

const SidebarDrawer = ({ isOpen, onClose, onCharacterSelect }: SidebarDrawerProps) => {
  const handleCharacterSelect = (character: Character) => {
    onCharacterSelect?.(character);
    onClose(); // Close drawer after selection
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement="left"
      size="sm"
      classNames={{
        base: "bg-black/95 backdrop-blur-xl",
        closeButton: "text-white/60 hover:text-white"
      }}
    >
      <DrawerContent>
        <DrawerHeader className="flex items-center justify-between border-b border-white/10">
          <h2 className="text-xl font-bold text-white">🎭 ToyVox</h2>
          <Button
            isIconOnly
            size="sm"
            variant="light"
            onPress={onClose}
            className="text-white/60 hover:text-white"
          >
            <HiX size={20} />
          </Button>
        </DrawerHeader>
        <DrawerBody className="p-0">
          <Sidebar onCharacterSelect={handleCharacterSelect} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default SidebarDrawer;