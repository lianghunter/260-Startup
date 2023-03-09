function getPlayerName() {
  msg = 'Username: ' + localStorage.getItem('userName') ?? 'Mystery player';
  output.style.display = 'block';
  output.innerHTML = msg;
}