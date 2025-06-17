// welcome confetti for new subscriber
function welcomeConfetti() {
  const colors = ["#2E90D9", "#FEC700", "#FE117E", "#43AB8C"];

  confetti({
    particleCount: 100,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    ticks: 150,
    colors: colors
  });

  confetti({
    particleCount: 100,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    ticks: 150,
    colors: colors
  });
}