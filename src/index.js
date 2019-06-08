/**
 * The entry point
 */

import App from './components/app/app'

window.addEventListener('load', () => {
    const app = new App(document.getElementById('app'))

    app.getDevotional()
      .then(results => {
        app.render(results);
      })
      .catch(console.error.bind(console));
});
