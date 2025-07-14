import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Listbox, ListboxItem, ListboxSection } from '@heroui/listbox';
import { ScrollShadow } from '@heroui/scroll-shadow';
import { Chip } from '@heroui/chip';
import { Avatar } from '@heroui/avatar';
import { motion } from 'framer-motion';
import { 
  HiHome, 
  HiCollection,
  HiSparkles,
  HiLightningBolt,
  HiGlobeAlt,
  HiUserGroup,
  HiStar,
  HiCube,
  HiPuzzle
} from 'react-icons/hi';
import { FiSettings } from 'react-icons/fi';
import { Character } from '@/config/characters';
import characters from '@/config/characters';

interface SidebarProps {
  isCompact?: boolean;
  onCharacterSelect?: (character: Character) => void;
  onSettingsClick?: () => void;
}

const Sidebar = ({ isCompact = false, onCharacterSelect, onSettingsClick }: SidebarProps) => {
  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set(['home']));

  // Get character data
  const characterList = Object.values(characters);
  
  // Get recently talked characters (mock data - should come from context/storage)
  const recentCharacters = characterList.slice(0, 5);
  
  // Filter characters based on search
  const filteredCharacters = characterList;

  // Group characters by category
  const charactersByCategory = characterList.reduce((acc, char) => {
    const category = char.category || 'other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(char);
    return acc;
  }, {} as Record<string, Character[]>);

  const handleNavigation = (key: string) => {
    setSelectedKeys(new Set([key]));
    
    switch(key) {
      case 'home':
        navigate('/');
        break;
      case 'favorites':
        navigate('/?filter=favorites');
        break;
      case 'games':
        navigate('/games');
        break;
      case 'settings':
        onSettingsClick?.();
        break;
      default:
        // Handle character selection
        const character = characterList.find(c => c.id === key);
        if (character) {
          navigate(`/character/${character.id}`);
          onCharacterSelect?.(character);
        }
    }
  };

  const categoryIcons: Record<string, React.ReactNode> = {
    fantasy: <HiSparkles className="w-4 h-4" />,
    adventure: <HiLightningBolt className="w-4 h-4" />,
    educational: <HiGlobeAlt className="w-4 h-4" />,
    animals: <HiUserGroup className="w-4 h-4" />,
    heroes: <HiStar className="w-4 h-4" />,
    games: <HiCube className="w-4 h-4" />,
    disney: <HiSparkles className="w-4 h-4" />,
    pixar: <HiLightningBolt className="w-4 h-4" />,
    marvel: <HiStar className="w-4 h-4" />,
    cartoon: <HiCollection className="w-4 h-4" />
  };

  const categoryNames: Record<string, string> = {
    fantasy: 'Fantasy',
    adventure: 'Adventure',
    educational: 'Educational',
    animals: 'Animal Friends',
    heroes: 'Superheroes',
    games: 'Game Characters',
    disney: 'Disney',
    pixar: 'Pixar',
    marvel: 'Marvel',
    cartoon: 'Cartoons'
  };

  // Sections to render
  const mainNavSection = (
    <ListboxSection key="main-nav" title={!isCompact ? "" : ""} className="mb-4">
      <ListboxItem
        key="home"
        startContent={<HiHome className="w-5 h-5 text-white/80" />}
      >
        {!isCompact ? "Home" : ""}
      </ListboxItem>
      <ListboxItem
        key="library"
        startContent={<HiCollection className="w-5 h-5 text-white/80" />}
        endContent={!isCompact ? <Chip size="sm" variant="flat" className="bg-white/10 text-white/60">Pro</Chip> : null}
      >
        {!isCompact ? "Your Library" : ""}
      </ListboxItem>
      <ListboxItem
        key="favorites"
        startContent={<HiStar className="w-4 h-4 text-yellow-500" />}
      >
        {!isCompact ? "Favorites" : ""}
      </ListboxItem>
      <ListboxItem
        key="games"
        startContent={<HiPuzzle className="w-5 h-5 text-purple-500" />}
      >
        {!isCompact ? "Games" : ""}
      </ListboxItem>
    </ListboxSection>
  );

  const quickAccessSection = null; // Removed

  const searchResultsSection = false && !isCompact ? (
    <ListboxSection 
      key="search-results"
      title={`Search Results (${filteredCharacters.length})`}
      className="mb-4"
    >
      {filteredCharacters.slice(0, 10).map((character) => (
        <ListboxItem
          key={character.id}
          startContent={
            <Avatar
              src={character.background?.slides?.[0]?.src}
              size="sm"
              className="w-8 h-8"
            />
          }
          description={character.personality.split('.')[0]}
        >
          {character.name}
        </ListboxItem>
      ))}
    </ListboxSection>
  ) : null;

  const recentCharactersSection = !isCompact ? (
    <ListboxSection key="recent-chars" title="Recent Characters" className="mb-4">
      {recentCharacters.map((character) => (
        <ListboxItem
          key={character.id}
          startContent={
            <Avatar
              src={character.background?.slides?.[0]?.src}
              size="sm"
              className="w-8 h-8"
              style={{ borderColor: character.color }}
              classNames={{
                base: "ring-2",
              }}
            />
          }
          description={character.category ? categoryNames[character.category] : 'Character'}
        >
          {character.name}
        </ListboxItem>
      ))}
    </ListboxSection>
  ) : null;

  const categoriesSection = !isCompact ? (
    <ListboxSection key="categories" title="Categories" className="mb-4">
      {Object.entries(charactersByCategory).map(([category, chars]) => (
        <ListboxItem
          key={`category-${category}`}
          startContent={
            <div className="p-2 rounded-lg bg-white/10">
              {categoryIcons[category] || <HiCollection className="w-4 h-4" />}
            </div>
          }
          endContent={
            <span className="text-xs text-white/60">{chars.length}</span>
          }
          onPress={() => navigate(`/?category=${category}`)}
        >
          {categoryNames[category] || category}
        </ListboxItem>
      ))}
    </ListboxSection>
  ) : null;

  // Collect all sections
  const sections = [
    mainNavSection,
    quickAccessSection,
    searchResultsSection,
    recentCharactersSection,
    categoriesSection
  ].filter(Boolean);

  return (
    <motion.aside
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="h-full bg-black/95 backdrop-blur-xl border-r border-white/10 flex flex-col"
      style={{ width: isCompact ? '80px' : '280px' }}
    >
      {/* Logo/Header */}
      <div className="p-6 pb-2">
        <motion.div 
          className="flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate('/')}
        >
          <img 
            src="https://storage.googleapis.com/toy-vox-public-assets/public-assets/logo.png" 
            alt="ToyVox" 
            className={isCompact ? "w-12 h-auto" : "w-full max-w-[150px] h-auto"}
          />
        </motion.div>
      </div>

      {/* Navigation */}
      <ScrollShadow className="flex-1 px-2">
        <Listbox
          aria-label="Navigation"
          selectedKeys={selectedKeys}
          onAction={(key: any) => handleNavigation(key as string)}
          className="p-0 gap-0"
          itemClasses={{
            base: "px-3 rounded-lg gap-3 h-12 data-[hover=true]:bg-white/10",
            title: "text-white/90 text-sm font-medium",
            description: "text-white/60 text-xs"
          }}
        >
          {sections}
        </Listbox>
      </ScrollShadow>

      {/* Footer with Settings */}
      <div className="border-t border-white/10">
        <Listbox
          aria-label="Settings"
          onAction={(key: any) => handleNavigation(key as string)}
          className="p-2"
          itemClasses={{
            base: "px-3 rounded-lg gap-3 h-12 data-[hover=true]:bg-white/10",
            title: "text-white/90 text-sm font-medium"
          }}
        >
          <ListboxItem
            key="settings"
            startContent={<FiSettings className="w-5 h-5 text-white/80" />}
          >
            {!isCompact ? "Settings" : ""}
          </ListboxItem>
        </Listbox>
        <div className="p-4 pt-2">
          <div className="text-xs text-white/40 text-center">
            {isCompact ? '©' : '© 2024 ToyVox'}
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;