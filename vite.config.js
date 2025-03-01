import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        articles: resolve(__dirname, 'articles.html'),
        projects: resolve(__dirname, 'projects.html'),
        resources: resolve(__dirname, 'resources.html'),
        contact: resolve(__dirname, 'contact.html'),
        books: resolve(__dirname, 'books.html'),

        header: resolve(__dirname, '/components/header.html'),
        footer: resolve(__dirname, '/components/footer.html'),
        loader: resolve(__dirname, '/components/loader.html'),
      }
    }
  }
});
