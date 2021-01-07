import render from './render';
import './style.css';

render.init();
render.animate();
window.addEventListener('resize', render.resize);
