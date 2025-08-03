const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const publicDir = path.join(__dirname, '../public');
const videoFiles = [
  'hotel.mp4',
  'tours.mp4',
  'productlaunch.mp4',
  'exhibition.mp4',
  'concerts.mp4',
  'awards.mp4',
  'conference.mp4'
];

console.log('🎬 Starting video compression...');

videoFiles.forEach(videoFile => {
  const inputPath = path.join(publicDir, videoFile);
  const outputPath = path.join(publicDir, videoFile.replace('.mp4', '_compressed.mp4'));
  
  // Check if file exists
  if (!fs.existsSync(inputPath)) {
    console.log(`⚠️  File not found: ${videoFile}`);
    return;
  }
  
  // Check if compressed version already exists
  if (fs.existsSync(outputPath)) {
    console.log(`✅ Compressed version already exists: ${videoFile.replace('.mp4', '_compressed.mp4')}`);
    return;
  }
  
  try {
    console.log(`🔄 Compressing ${videoFile}...`);
    
    // Use ffmpeg to compress video
    // -vf scale=1280:720: force 720p resolution
    // -c:v libx264: use H.264 codec
    // -crf 28: constant rate factor for quality (18-28 is good, higher = smaller file)
    // -preset medium: compression preset
    // -c:a aac: audio codec
    // -b:a 128k: audio bitrate
    const command = `ffmpeg -i "${inputPath}" -vf scale=1280:720 -c:v libx264 -crf 28 -preset medium -c:a aac -b:a 128k "${outputPath}"`;
    
    execSync(command, { stdio: 'inherit' });
    
    // Get file sizes
    const originalSize = fs.statSync(inputPath).size;
    const compressedSize = fs.statSync(outputPath).size;
    const reduction = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ Compressed ${videoFile}: ${(originalSize / 1024 / 1024).toFixed(1)}MB → ${(compressedSize / 1024 / 1024).toFixed(1)}MB (${reduction}% reduction)`);
    
  } catch (error) {
    console.error(`❌ Error compressing ${videoFile}:`, error.message);
  }
});

console.log('🎬 Video compression complete!');

// Create a summary of all video files
console.log('\n📊 Video file summary:');
const allVideos = fs.readdirSync(publicDir).filter(file => file.endsWith('.mp4'));

allVideos.forEach(video => {
  const filePath = path.join(publicDir, video);
  const stats = fs.statSync(filePath);
  const sizeMB = (stats.size / 1024 / 1024).toFixed(1);
  console.log(`  ${video}: ${sizeMB}MB`);
});

console.log('\n💡 Optimization tips:');
console.log('  - Use compressed versions in your code');
console.log('  - Consider WebM format for better compression');
console.log('  - Implement lazy loading for videos');
console.log('  - Add fallback images for slow connections'); 