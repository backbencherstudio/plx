// Shared utility functions for avatar generation
// This ensures consistency across all components

// Generate initials from customer name
export function getInitials(name: string): string {
  const words = name.trim().split(' ');
  if (words.length >= 2) {
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  } else if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }
  return 'U';
}

// Generate consistent gradient background based on user ID
export function getGradientBackground(userId: string): string {
  const gradients = [
    // Palette 1: Plum/Pink Tones - Soft and sophisticated
    'bg-gradient-to-br from-purple-300 via-pink-200 to-orange-100',
    'bg-gradient-to-br from-purple-200 via-pink-100 to-orange-50',
    
    // Palette 2: Teal/Blue Tones - Calm and fresh
    'bg-gradient-to-br from-teal-300 via-blue-200 to-sky-100',
    'bg-gradient-to-br from-teal-200 via-blue-100 to-sky-50',
    
    // Palette 3: Navy/Lavender/Orange Tones - Warm and elegant
    'bg-gradient-to-br from-indigo-200 via-purple-100 to-orange-100',
    'bg-gradient-to-br from-indigo-100 via-purple-50 to-orange-50',
    
    // Palette 4: Navy/Red Tones - Rich but soft
    'bg-gradient-to-br from-slate-200 via-orange-100 to-red-200',
    'bg-gradient-to-br from-slate-100 via-orange-50 to-red-100',
    
    // Palette 5: Blue/Pink Tones - Gentle and serene
    'bg-gradient-to-br from-blue-200 via-purple-100 to-pink-100',
    'bg-gradient-to-br from-blue-100 via-purple-50 to-pink-50',
    
    // Palette 6: Plum/Orange/Pink Tones - Warm and inviting
    'bg-gradient-to-br from-purple-200 via-orange-100 to-pink-100',
    'bg-gradient-to-br from-purple-100 via-orange-50 to-pink-50',
    
    // Additional soft combinations
    'bg-gradient-to-br from-emerald-200 via-teal-100 to-cyan-100',
    'bg-gradient-to-br from-rose-200 via-pink-100 to-purple-100',
    'bg-gradient-to-br from-violet-200 via-purple-100 to-pink-100',
    'bg-gradient-to-br from-sky-200 via-blue-100 to-indigo-100'
  ];
  
  // Use user ID to consistently assign the same gradient to the same user
  const hash = userId.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  return gradients[Math.abs(hash) % gradients.length];
}
