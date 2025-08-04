const fs = require('fs');
const path = require('path');

console.log('🧹 Cleaning up unused dependencies...');

// Read package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };

// Dependencies that are actually used in the project
const usedDependencies = [
  'react',
  'react-dom',
  'next',
  'typescript',
  '@types/node',
  '@types/react',
  '@types/react-dom',
  'tailwindcss',
  'postcss',
  'autoprefixer',
  'lucide-react',
  '@supabase/supabase-js',
  'framer-motion',
  'aos',
  'next-cloudinary',
  'lottie-react',
  'embla-carousel-react',
  'class-variance-authority',
  'clsx',
  'tailwind-merge',
  'tailwindcss-animate',
  '@radix-ui/react-slot',
  '@radix-ui/react-dialog',
  '@radix-ui/react-dropdown-menu',
  '@radix-ui/react-select',
  '@radix-ui/react-tabs',
  '@radix-ui/react-toast',
  '@radix-ui/react-tooltip',
  '@radix-ui/react-popover',
  '@radix-ui/react-label',
  '@radix-ui/react-checkbox',
  '@radix-ui/react-radio-group',
  '@radix-ui/react-switch',
  '@radix-ui/react-separator',
  '@radix-ui/react-scroll-area',
  '@radix-ui/react-avatar',
  '@radix-ui/react-aspect-ratio',
  '@radix-ui/react-progress',
  '@radix-ui/react-slider',
  '@radix-ui/react-toggle',
  '@radix-ui/react-toggle-group',
  '@radix-ui/react-menubar',
  '@radix-ui/react-navigation-menu',
  '@radix-ui/react-hover-card',
  '@radix-ui/react-context-menu',
  '@radix-ui/react-collapsible',
  '@radix-ui/react-accordion',
  '@radix-ui/react-alert-dialog',
  'react-hook-form',
  '@hookform/resolvers',
  'zod',
  'date-fns',
  'react-day-picker',
  'sonner',
  'vaul',
  'cmdk',
  'input-otp',
  'react-resizable-panels',
  'recharts',
  'react-icons',
  'react-intersection-observer',
  'react-country-flag',
  'next-themes',
  'cobe',
  '@use-gesture/react',
  '@react-spring/web',
  'motion',
  'critters'
];

// Find unused dependencies
const unusedDependencies = Object.keys(dependencies).filter(dep => {
  return !usedDependencies.includes(dep);
});

console.log('\n📦 Unused dependencies found:');
unusedDependencies.forEach(dep => {
  console.log(`  - ${dep}@${dependencies[dep]}`);
});

console.log(`\n📊 Summary:`);
console.log(`  Total dependencies: ${Object.keys(dependencies).length}`);
console.log(`  Used dependencies: ${usedDependencies.length}`);
console.log(`  Unused dependencies: ${unusedDependencies.length}`);
console.log(`  Potential bundle size reduction: ~${unusedDependencies.length * 50}KB`);

// Create cleanup script
const cleanupScript = `#!/bin/bash
echo "🧹 Removing unused dependencies..."

# Remove unused dependencies
npm uninstall ${unusedDependencies.join(' ')}

echo "✅ Cleanup completed!"
echo "📦 Removed ${unusedDependencies.length} unused dependencies"
`;

fs.writeFileSync('scripts/cleanup.sh', cleanupScript);
fs.chmodSync('scripts/cleanup.sh', '755');

console.log('\n💡 To remove unused dependencies, run:');
console.log('  bash scripts/cleanup.sh');
console.log('\n⚠️  Warning: Make sure to test thoroughly after removing dependencies!');

// Create optimized package.json
const optimizedPackageJson = {
  ...packageJson,
  dependencies: Object.fromEntries(
    Object.entries(packageJson.dependencies).filter(([key]) => 
      usedDependencies.includes(key)
    )
  ),
  devDependencies: Object.fromEntries(
    Object.entries(packageJson.devDependencies).filter(([key]) => 
      usedDependencies.includes(key)
    )
  )
};

fs.writeFileSync('package.optimized.json', JSON.stringify(optimizedPackageJson, null, 2));

console.log('\n📄 Created optimized package.json as package.optimized.json');
console.log('You can review and replace the original if satisfied with the changes.'); 