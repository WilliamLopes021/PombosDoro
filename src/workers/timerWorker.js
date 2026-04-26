let isRunning = false; // verifica se tem só um worker rodando

self.onmessage = function (event) {
  if (isRunning) return;
  isRunning = true;

  // Usando função recursiva porque o setInterval pode ser incerto e para no meio do processo

  const state = event.data;
  const { activeTask, secondsRemaining } = state;

  const endDate = activeTask.startDate + secondsRemaining * 1000;
  const now = Date.now();
  let countDownSeconds = Math.ceil((endDate - now) / 1000);

  function tick() {
    self.postMessage(countDownSeconds);

    const now = Date.now();
    countDownSeconds = Math.floor((endDate - now) / 1000);
    setTimeout(tick, 1000);
  }

  tick();
};
