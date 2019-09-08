export default function(text) {
  const el = document.createElement('input');
  el.value = text;
  el.style.opacity = 0;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}