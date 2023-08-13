function resolveImagePath(relativePath) {
    const baseURL = import.meta.url; // Current module's URL
    const absolutePath = new URL(relativePath, baseURL).href;
    return absolutePath;
  }

export default resolveImagePath;