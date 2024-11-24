import './style.css';

import { loadComponent } from './scripts/componentLoader.js';
import { formatDate } from './scripts/utils.js';

loadComponent('#header', './components/header.html');
loadComponent('#footer', './components/footer.html');
loadComponent('#loader', './components/loader.html');
