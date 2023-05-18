const buttonInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
const handleBeforeInstallPrompt = (event) => {
  window.deferredPrompt = event;
  buttonInstall.classList.remove('hidden');
};

const handleClickInstall = async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  promptEvent.prompt();

  window.deferredPrompt = null;
  buttonInstall.classList.add('hidden');
};

const handleAppInstalled = (event) => {
  window.deferredPrompt = null;
};

// Add event handlers
window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
buttonInstall.addEventListener('click', handleClickInstall);
window.addEventListener('appinstalled', handleAppInstalled);
