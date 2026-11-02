(() => {
  const trigger = document.getElementById('detailPhotoOpen');
  const dialog = document.getElementById('detailPhotoDialog');
  const image = document.getElementById('detailMainImage');
  if (!trigger || !dialog || !image) return;

  trigger.addEventListener('click', () => {
    const enlarged = document.getElementById('detailPhotoLarge');
    enlarged.src = image.currentSrc || image.src;
    enlarged.alt = image.alt;
    document.getElementById('detailPhotoTitle').textContent = image.alt;
    dialog.showModal();
    document.body.classList.add('modal-open');
  });
  document.getElementById('detailPhotoClose').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) {
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    }
  });
  // Native dialog handles Escape, focus trapping and restoring trigger focus.
  dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
})();
