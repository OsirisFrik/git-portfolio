// Components
import repos from './components/repos';
import user from './components/user';

// Styles
import '../style/index.scss';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';

window.onload = async function () {
  let loading = document.getElementById('loading');

  await user();
  await repos();

  document.body.removeChild(loading);
}
