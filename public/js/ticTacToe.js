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
  });
};

const main = () => {
  const gridElement = document.getElementById('grid');
  gridElement.addEventListener('click', markMove);
};

window.onload = main;