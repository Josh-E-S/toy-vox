import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from '@heroui/input';
import { Select, SelectItem } from '@heroui/select';
import { RadioGroup, Radio } from '@heroui/radio';
import AppLayout from '../layouts/AppLayout';
import vapiService from '../services/vapiService';
import characters from '../config/characters';
import { preloadSounds, preloadVoiceClip } from '../services/soundService';
import CharacterCard from '../components/cards/CharacterCard';
import BlurredBackground from '../components/layout/BlurredBackground';
import PopoverFilter from '../components/filters/PopoverFilter';
import { HiSearch } from 'react-icons/hi';
import { PrizeWheel, PrizeWheelButton, VoxTokenDisplay } from '../components/prizeWheel';
import { GamesButton } from '../components/games';

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [showPrizeWheel, setShowPrizeWheel] = useState(false);
  
  // Get filter params
  const categoryParam = searchParams.get('category');
  const filterParam = searchParams.get('filter');
  
  // Get character data
  const allCharacters = Object.values(characters);
  
  // Filter characters based on params
  const characterList = useMemo(() => {
    let filtered = allCharacters;
    
    // Category filter - use selectedCategory if no URL param
    const categoryToFilter = categoryParam || selectedCategory;
    if (categoryToFilter && categoryToFilter !== 'all') {
      filtered = filtered.filter(char => char.category === categoryToFilter);
    }
    
    // Special filters
    if (filterParam === 'favorites') {
      // TODO: Implement favorites from local storage
      filtered = filtered.filter(char => char.popularity && char.popularity > 90);
    } else if (filterParam === 'recent') {
      // TODO: Implement recent from context/storage
      filtered = filtered.slice(0, 5);
    }
    
    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(char => 
        char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        char.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Sort
    if (sortBy === 'alphabetical') {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'popular') {
      filtered = [...filtered].sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    }
    
    return filtered;
  }, [categoryParam, filterParam, selectedCategory, searchQuery, sortBy, allCharacters]);
  
  // Category data
  const categories = [
    { key: 'all', title: 'All Characters' },
    { key: 'disney', title: 'Disney' },
    { key: 'pixar', title: 'Pixar' },
    { key: 'marvel', title: 'Marvel' },
    { key: 'heroes', title: 'Superheroes' },
    { key: 'games', title: 'Game Characters' },
    { key: 'cartoon', title: 'Cartoons' },
    { key: 'fantasy', title: 'Fantasy' },
    { key: 'adventure', title: 'Adventure' },
    { key: 'animals', title: 'Animal Friends' },
    { key: 'educational', title: 'Educational' }
  ];
  
  // End any active Vapi calls when returning to home page
  useEffect(() => {
    vapiService.endVapiCall();
    preloadSounds();
    
    // Preload voice clips for characters that have them
    characterList.forEach(character => {
      if (character.voiceClip) {
        preloadVoiceClip(character.voiceClip);
      }
    });
  }, [characterList]);
  
  // Update selected category from URL
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);
  
  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };
  
  return (
    <AppLayout 
      background={
        <BlurredBackground intensity="low" animated={false}>
          <div />
        </BlurredBackground>
      }
    >
      <div className="flex flex-col min-h-screen">

        {/* Game Controls - Top Right */}
        <div className="absolute top-4 right-4 lg:top-8 lg:right-8 z-20 flex items-center gap-4">
          <VoxTokenDisplay />
          <GamesButton />
          <PrizeWheelButton onClick={() => setShowPrizeWheel(true)} />
        </div>

        {/* Main Content */}
        <div className="flex-1 px-4 lg:px-8 py-8 pt-24">
          {/* Greeting Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {getGreeting()}
            </h1>
            <p className="text-lg text-white/70">
              {filterParam === 'favorites' ? 'Your favorite characters' :
               filterParam === 'recent' ? 'Recently talked to' :
               categoryParam ? `${categories.find(c => c.key === categoryParam)?.title || 'Characters'}` :
               'Choose a character and start a magical conversation'}
            </p>
          </motion.div>
          
          {/* Search and Filters Section */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="max-w-2xl">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search characters..."
                startContent={<HiSearch className="text-white/60" />}
                classNames={{
                  base: "bg-white/5 backdrop-blur-sm",
                  inputWrapper: "bg-white/5 border-white/20 hover:bg-white/10 data-[hover=true]:bg-white/10 group-data-[focus=true]:bg-white/10",
                  input: "text-white placeholder:text-white/50",
                }}
              />
            </div>
            
            {/* Filters Row - only show on main view */}
            {!filterParam && (
              <div className="flex flex-wrap items-center gap-3">
                {/* Category Filter */}
                <PopoverFilter title="Category">
                  <RadioGroup
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                    className="gap-2"
                  >
                    {categories.map((category) => (
                      <Radio
                        key={category.key}
                        value={category.key}
                        classNames={{
                          base: "text-white/80",
                          label: "text-white/80",
                        }}
                      >
                        {category.title}
                      </Radio>
                    ))}
                  </RadioGroup>
                </PopoverFilter>
                
                {/* Sort By */}
                <Select
                  aria-label="Sort by"
                  selectedKeys={[sortBy]}
                  onSelectionChange={(keys) => setSortBy(Array.from(keys)[0] as string)}
                  className="max-w-[200px]"
                  classNames={{
                    trigger: "bg-white/5 border-white/20 hover:bg-white/10 data-[hover=true]:bg-white/10",
                    value: "text-white/80",
                    popoverContent: "bg-gray-900 border-white/10",
                  }}
                  placeholder="Sort by"
                  variant="bordered"
                >
                  <SelectItem key="popular">Most Popular</SelectItem>
                  <SelectItem key="alphabetical">Alphabetical</SelectItem>
                  <SelectItem key="newest">Newest First</SelectItem>
                </Select>
              </div>
            )}
          </div>

          {/* Character Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {characterList.map((character, index) => (
              <CharacterCard 
                key={character.id}
                character={character}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Prize Wheel Modal */}
      <PrizeWheel 
        isOpen={showPrizeWheel} 
        onClose={() => setShowPrizeWheel(false)} 
      />
    </AppLayout>
  );
};

export default HomePage;
