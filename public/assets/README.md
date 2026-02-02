# Video Assets

This directory should contain the following video files:

- `factory-dolly-shot.mp4` - Used in Hero section
- `ai-detection-boxes.mp4` - Used in Reva section
- `robot-arm-picking.mp4` - Used in Nara section

## Setup Instructions

Due to large file sizes, videos should be managed using Git LFS:

```bash
# Install Git LFS
git lfs install

# Track video files (already configured in .gitattributes)
git lfs track "*.mp4"

# Add your video files
cp your-videos/*.mp4 public/assets/

# Commit and push
git add public/assets/*.mp4
git commit -m "Add video assets"
git push
```

## Alternative: Use External CDN

For better performance, consider hosting videos on:
- Cloudinary
- AWS S3 + CloudFront
- Vercel Blob Storage

Then update the video source URLs in the component files.
