import localhost from './main/localhost';
import display from './elements';
import { allowUpload } from './core/upload';

allowUpload();
document.querySelector('#test')?.addEventListener('click', () => display(localhost.run()));
