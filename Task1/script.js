document.getElementById('item-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const input = document.getElementById('item-input');
  const itemText = input.value.trim();
  if (itemText !== '') {
    addItem(itemText);
    input.value = '';
  }
});

function addItem(text) {
  const li = document.createElement('li');
  li.textContent = text;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.onclick = () => li.remove();

  li.appendChild(deleteBtn);
  document.getElementById('item-list').appendChild(li);
}
