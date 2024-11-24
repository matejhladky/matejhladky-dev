import './style.css';

import { loadComponent } from './scripts/componentLoader.js';
import { formatDate, setActiveLink } from './scripts/utils.js';

async function initPage() {
    try {
      await Promise.all([
        loadComponent('#header', './components/header.html'),
        loadComponent('#footer', './components/footer.html'),
        loadComponent('#loader', './components/loader.html')
      ]);
      
      setActiveLink();
      document.querySelector('main').classList.remove('hidden');
    } catch (error) {
      console.error("Error initializing page:", error);
    }
  }
  
  initPage();