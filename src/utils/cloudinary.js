// Cloudinary image URL helper
// Usage: getCloudinaryUrl('signup_hjfr4w') or getCloudinaryUrl('autoserve/register-mechanic')

export const getCloudinaryUrl = (imagePublicId) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  
  if (!cloudName) {
    console.warn('Cloudinary cloud name not set in environment variables');
    return '';
  }
  
  // Construct Cloudinary URL
  // imagePublicId can be: 'image-name' or 'folder/image-name'
  return `https://res.cloudinary.com/${cloudName}/image/upload/${imagePublicId}`;
};

// Example usage:
// getCloudinaryUrl('signup_hjfr4w')
// Returns: https://res.cloudinary.com/ds8hmsirb/image/upload/signup_hjfr4w

// getCloudinaryUrl('autoserve/register-mechanic')
// Returns: https://res.cloudinary.com/ds8hmsirb/image/upload/autoserve/register-mechanic
