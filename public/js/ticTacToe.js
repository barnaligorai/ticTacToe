const makeRequest = (req, cb) => {
  const { url, method, body, headers } = req;
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    cb(xhr);
    return;
  };

  xhr.open(method, url);

  for (const header in headers) {
    xhr.setRequestHeader(header, headers[header]);
  }

  xhr.send(body);
};

const markMove = (event) => {
  const { id } = event.target;
  const formData = new FormData();
  formData.append('pos', id);
  const req = {
    url: '/mark-move',
    method: 'POST',
    body: new URLSearchParams(formData)
  };

  makeRequest(req, (xhr) => {
    console.log(xhr.response);
    const { result } = JSON.parse(xhr.response);
    const messageArea = document.getElementById('status');
    messageArea.innerText = result;

  });
};

const displayPage = (intervalId, gridElement) =>
  (xhr) => {
    console.log(xhr.response);
    const { moves, isWon, isDrawn } = JSON.parse(xhr.response);

    const messageArea = document.getElementById('status');

    for (let index = 0; index < moves.length; index++) {
      const symbol = moves[index];
      const cell = document.getElementById(`${index + 1}`);
      cell.innerText = symbol;
    }

    if (isWon) {
      console.log(`game won by ${isWon}`);
      messageArea.innerText = `game won by ${isWon}!!!`;
      clearInterval(intervalId);

      gridElement.removeEventListener('click', markMove, false);
      return;
    }

    if (isDrawn) {
      console.log('game drawn');
      messageArea.innerText = 'Game drawn!!!';
      clearInterval(intervalId);
      gridElement.removeEventListener('click', markMove, false);
      return;
    }

    messageArea.innerText = 'All the best!';
  };

const refreshPage = (gridElement) => {
  const statusReq = {
    url: '/game/stats',
    method: 'GET',
  };

  const intervalId = setInterval(() => {
    makeRequest(statusReq, displayPage(intervalId, gridElement));
  }, 500);
};

const main = () => {
  const gridElement = document.getElementById('grid');
  gridElement.addEventListener('click', markMove);
  refreshPage(gridElement);
};

window.onload = main;
