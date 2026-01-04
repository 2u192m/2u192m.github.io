/* Simple single-page tab switcher + podcast interactions */
document.addEventListener('DOMContentLoaded', () => {
  const tabs = Array.from(document.querySelectorAll('.tab'));
  const pages = Array.from(document.querySelectorAll('.page'));

  function activate(targetId) {
    tabs.forEach(t => {
      const is = t.dataset.target === targetId;
      t.classList.toggle('active', is);
      t.setAttribute('aria-selected', is ? 'true' : 'false');
    });
    pages.forEach(p => {
      const is = p.id === targetId;
      p.classList.toggle('active', is);
      p.setAttribute('aria-hidden', is ? 'false' : 'true');
    });
  }

  tabs.forEach(t => {
    t.addEventListener('click', () => activate(t.dataset.target));
  });

  // keyboard navigation for tabs (left/right)
  document.querySelector('.tabs').addEventListener('keydown', (e) => {
    const idx = tabs.findIndex(t => t.classList.contains('active'));
    if (e.key === 'ArrowRight') {
      const next = tabs[(idx + 1) % tabs.length];
      next.focus(); next.click();
    } else if (e.key === 'ArrowLeft') {
      const prev = tabs[(idx - 1 + tabs.length) % tabs.length];
      prev.focus(); prev.click();
    }
  });

  // contact actions (buttons show canned messages)
  const removeBtn = document.getElementById('removeBtn');
  const addBtn = document.getElementById('addBtn');
  const otherBtn = document.getElementById('otherBtn');
  const contactMessage = document.getElementById('contactMessage');

  removeBtn.addEventListener('click', () => {
    contactMessage.textContent = "We're sorry that we uploaded your content; if you want it removed please contact us at this email: 2u192m@proton.me";
    contactMessage.classList.add('visible');
  });

  addBtn.addEventListener('click', () => {
    contactMessage.textContent = "Email us so we can maybe add your creator/video to Spotify — our email: 2u192m@proton.me";
    contactMessage.classList.add('visible');
  });

  otherBtn.addEventListener('click', () => {
    contactMessage.textContent = "Email us: 2u192m@proton.me";
    contactMessage.classList.add('visible');
  });

  // podcast list interactions
  const spotifyUrl = 'https://open.spotify.com/show/7Gw9QMaHAxdbGE25CYPdVg';
  const minecraftUrl = 'https://open.spotify.com/show/1EdrKl9sJT7KCBtCHhQ78r';
  const robloxUrl = 'https://open.spotify.com/show/5Vleirlm3mYmac0hinOKe4';
  const shortsUrl = 'https://open.spotify.com/show/6IYjfRxMhCblQg1hsFbnzV';
  const idjotsSpotifyUrl = 'https://open.spotify.com/show/4VZuOkg4SC5Us7htUApL26';
  const podcastList = document.querySelectorAll('.podcast-item.clickable');

  // Bachablox popup elements
  const popup = document.getElementById('popupMenu');
  const popupClose = document.getElementById('popupClose');
  const bachYoutube = document.getElementById('bachYoutube');
  const bachSpotify = document.getElementById('bachSpotify');

  // Idjots popup elements
  const popupIdjots = document.getElementById('popupMenuIdjots');
  const popupCloseIdjots = document.getElementById('popupCloseIdjots');
  const idjotsYoutube = document.getElementById('idjotsYoutube');
  const idjotsSpotify = document.getElementById('idjotsSpotify');

  podcastList.forEach(item => {
    item.addEventListener('click', (e) => {
      const id = item.dataset.id;
      if (id === '2u192m') {
        // open Spotify show in new tab
        window.open(spotifyUrl, '_blank', 'noopener');
      } else if (id === 'bachablox') {
        // show Bachablox popup menu
        popup.setAttribute('aria-hidden', 'false');
        // focus first button for keyboard users
        setTimeout(() => bachYoutube.focus(), 50);
      } else if (id === 'minecraft') {
        // open Minecraft Spotify show
        window.open(minecraftUrl, '_blank', 'noopener');
      } else if (id === 'roblox') {
        // open Roblox Spotify show
        window.open(robloxUrl, '_blank', 'noopener');
      } else if (id === 'shorts') {
        // open Shorts Spotify show
        window.open(shortsUrl, '_blank', 'noopener');
      } else if (id === 'idjots') {
        // show Idjots popup menu
        popupIdjots.setAttribute('aria-hidden', 'false');
        // focus first button for keyboard users
        setTimeout(() => idjotsYoutube.focus(), 50);
      }
    });
  });

  // popup button actions for Bachablox
  bachYoutube.addEventListener('click', () => {
    window.open('https://youtube.com/@bachablox', '_blank', 'noopener');
    popup.setAttribute('aria-hidden', 'true');
  });
  bachSpotify.addEventListener('click', () => {
    window.open('https://open.spotify.com/show/4520ZOsa6cRpO5el7aKwq2', '_blank', 'noopener');
    popup.setAttribute('aria-hidden', 'true');
  });

  // popup button actions for Idjots Roblox
  idjotsYoutube.addEventListener('click', () => {
    window.open('https://www.youtube.com/@idjotsroblox', '_blank', 'noopener');
    popupIdjots.setAttribute('aria-hidden', 'true');
  });
  idjotsSpotify.addEventListener('click', () => {
    window.open(idjotsSpotifyUrl, '_blank', 'noopener');
    popupIdjots.setAttribute('aria-hidden', 'true');
  });

  // close popup handlers
  popupClose.addEventListener('click', () => popup.setAttribute('aria-hidden', 'true'));
  popup.addEventListener('click', (e) => {
    if (e.target === popup) popup.setAttribute('aria-hidden', 'true');
  });

  popupCloseIdjots.addEventListener('click', () => popupIdjots.setAttribute('aria-hidden', 'true'));
  popupIdjots.addEventListener('click', (e) => {
    if (e.target === popupIdjots) popupIdjots.setAttribute('aria-hidden', 'true');
  });

  // escape to close both popups
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      popup.setAttribute('aria-hidden', 'true');
      popupIdjots.setAttribute('aria-hidden', 'true');
    }
  });
});
