const blocker = document.createElement('div');
blocker.classList.add('ui-blocker');
blocker.innerHTML = `<i class="fad fa-spinner-third fa-spin"></i>`;

export function lockUI(waitFor?: Promise<any>) {
  try {
    document?.body?.appendChild(blocker);
    waitFor?.finally(() => unlockUI());
  } catch (e) {}
}

export function unlockUI() {
  try {
    document?.body?.removeChild(blocker);
  } catch (e) {}
}
