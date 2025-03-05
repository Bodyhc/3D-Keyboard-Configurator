'use client';

import { KeyboardConfig } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Keyboard, Palette, RotateCcw, Languages, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface CustomizationPanelProps {
  config: KeyboardConfig;
  onChange: (config: KeyboardConfig) => void;
}

export function CustomizationPanel({ config, onChange }: CustomizationPanelProps) {
  const [imageError, setImageError] = useState<string | null>(null);

  const handleBackgroundImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImageError(null);
    
    // If URL is empty, just clear it
    if (!url) {
      onChange({
        ...config,
        backgroundImage: '',
      });
      return;
    }
    
    // Check if URL is valid
    try {
      new URL(url);
      
      // Test if image loads
      const img = new Image();
      img.onload = () => {
        onChange({
          ...config,
          backgroundImage: url,
        });
      };
      img.onerror = () => {
        setImageError('Unable to load image. Please check the URL.');
      };
      img.src = url;
    } catch (e) {
      setImageError('Please enter a valid URL');
    }
  };

  const resetConfig = () => {
    setImageError(null);
    onChange({
      layout: '60percent',
      switches: 'cherry-red',
      keycaps: 'pbt-black',
      backgroundImage: '',
      language: 'en',
      color: 'black',
    });
  };

  return (
    <Card className="w-96 p-6 m-4 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/50">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Keyboard className="h-5 w-5" />
              <h2 className="text-xl font-bold">Keyboard Customizer</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={resetConfig} title="Reset to defaults">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Customize your keyboard's layout, switches, and appearance.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select
              value={config.language}
              onValueChange={(value: 'en' | 'ar') => onChange({ ...config, language: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English (QWERTY)</SelectItem>
                <SelectItem value="ar">Arabic (عربي)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="layout">Layout</Label>
            <Select
              value={config.layout}
              onValueChange={(value) => onChange({ ...config, layout: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select layout" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="60percent">60% Compact</SelectItem>
                <SelectItem value="75percent">75% Professional</SelectItem>
                <SelectItem value="tkl">Tenkeyless</SelectItem>
                <SelectItem value="full">Full Size</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="switches">Switches</Label>
            <Select
              value={config.switches}
              onValueChange={(value) => onChange({ ...config, switches: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select switches" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cherry-red">Cherry MX Red (Linear)</SelectItem>
                <SelectItem value="cherry-blue">Cherry MX Blue (Clicky)</SelectItem>
                <SelectItem value="cherry-brown">Cherry MX Brown (Tactile)</SelectItem>
                <SelectItem value="gateron-yellow">Gateron Yellow (Smooth)</SelectItem>
                <SelectItem value="gateron-green">Gateron Green (Heavy)</SelectItem>
                <SelectItem value="gateron-black">Gateron Black (Silent)</SelectItem>
                <SelectItem value="kailh-box-white">Kailh Box White (Crisp)</SelectItem>
                <SelectItem value="optical-purple">Optical Purple (Fast)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="keycaps">Keycaps</Label>
            <Select
              value={config.keycaps}
              onValueChange={(value) => onChange({ ...config, keycaps: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select keycaps" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pbt-black">PBT Black (Matte)</SelectItem>
                <SelectItem value="abs-white">ABS White (Classic)</SelectItem>
                <SelectItem value="pudding">Pudding (Translucent)</SelectItem>
                <SelectItem value="doubleshot">Doubleshot (Premium)</SelectItem>
                <SelectItem value="metal-silver">Metal Silver</SelectItem>
                <SelectItem value="metal-gold">Metal Gold</SelectItem>
                <SelectItem value="crystal">Crystal (Clear)</SelectItem>
                <SelectItem value="rgb">RGB (Illuminated)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="color">Keyboard Color</Label>
            <Select
              value={config.color}
              onValueChange={(value) => onChange({ ...config, color: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select keyboard color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="black">Black</SelectItem>
                <SelectItem value="white">White</SelectItem>
                <SelectItem value="silver">Silver</SelectItem>
                <SelectItem value="space-gray">Space Gray</SelectItem>
                <SelectItem value="navy">Navy Blue</SelectItem>
                <SelectItem value="rose-gold">Rose Gold</SelectItem>
                <SelectItem value="mint">Mint Green</SelectItem>
                <SelectItem value="purple">Purple</SelectItem>
                <SelectItem value="red">Red</SelectItem>
                <SelectItem value="blue">Blue</SelectItem>
                <SelectItem value="green">Green</SelectItem>
                <SelectItem value="yellow">Yellow</SelectItem>
                <SelectItem value="orange">Orange</SelectItem>
                <SelectItem value="pink">Pink</SelectItem>
                <SelectItem value="teal">Teal</SelectItem>
                <SelectItem value="gold">Gold</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="background">Background Image URL</Label>
            <Input
              id="background"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={config.backgroundImage}
              onChange={handleBackgroundImage}
              className={imageError ? "border-red-500" : ""}
            />
            {imageError && (
              <div className="text-red-500 text-sm flex items-center mt-1">
                <AlertCircle className="h-4 w-4 mr-1" />
                {imageError}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Try these example URLs:
              <br />
              https://images.unsplash.com/photo-1550745165-9bc0b252726f
              <br />
              https://images.unsplash.com/photo-1563089145-599997674d42
            </p>
          </div>

          <Button className="w-full" onClick={() => console.log('Save configuration')}>
            <Palette className="mr-2 h-4 w-4" />
            Save Configuration
          </Button>
        </div>
      </div>
    </Card>
  );
}
