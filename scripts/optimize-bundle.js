const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Analyzing bundle size...');

// Run bundle analyzer if available
try {
  execSync('npm run analyze', { stdio: 'inherit' });
  console.log('✅ Bundle analysis completed');
} catch (error) {
  console.log('⚠️ Bundle analyzer not available, skipping...');
}

// Check for large dependencies
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };

console.log('\n📦 Large dependencies (>1MB estimated):');
Object.entries(dependencies).forEach(([name, version]) => {
  // This is a simplified check - in reality you'd need to analyze actual bundle sizes
  const largePackages = [
    'framer-motion',
    'lottie-react',
    '@supabase/supabase-js',
    'next-cloudinary',
    'recharts'
  ];
  
  if (largePackages.includes(name)) {
    console.log(`  - ${name}@${version}`);
  }
});

console.log('\n💡 Optimization recommendations:');
console.log('  1. Use dynamic imports for large components');
console.log('  2. Implement code splitting for routes');
console.log('  3. Optimize images with next/image');
console.log('  4. Use React.memo for expensive components');
console.log('  5. Implement lazy loading for non-critical content');

// Check for unused dependencies
console.log('\n🔍 Checking for potential unused dependencies...');
const srcFiles = getAllFiles('./app');
const srcContent = srcFiles.map(file => fs.readFileSync(file, 'utf8')).join(' ');

Object.keys(dependencies).forEach(dep => {
  if (!srcContent.includes(dep) && !srcContent.includes(dep.replace('@', ''))) {
    console.log(`  ⚠️  Potentially unused: ${dep}`);
  }
});

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

console.log('\n✅ Bundle optimization analysis complete!'); 