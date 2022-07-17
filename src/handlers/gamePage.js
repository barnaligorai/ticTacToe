const gamePage = (playerName, roomNo, message) => {
  const page = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>TicTacToe</title>
  <script src="js/ticTacToe.js"></script>
  <link rel="stylesheet" href="styles/style.css">
</head>

<body>
  <div class="page">
    
    <header>
      <h1>TIC-TAC-TOE</h1>
      
      <h2>
        <p>${playerName}</p>
        <p>room : ${roomNo}</p>
      </h2>
    </header>

    <div class="game">
    
      <div id="grid">
        <div class="row">
          <div class="cell" id="1"></div>
          <div class="cell" id="2"></div>
          <div class="cell" id="3"></div>
        </div>
        <div class="row">
          <div class="cell" id="4"></div>
          <div class="cell" id="5"></div>
          <div class="cell" id="6"></div>
        </div>
        <div class="row">
          <div class="cell" id="7"></div>
          <div class="cell" id="8"></div>
          <div class="cell" id="9"></div>
        </div>
      </div>
    
      <div id="status">
        <h2>${message}</h2>
      </div>
      
    </div>
  </div>
</body>
</html>`
  return page;
};

module.exports = { gamePage };