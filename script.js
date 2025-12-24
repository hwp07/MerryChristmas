const loveTaps = new Set();
let userName = "";

function createSnowflakes() {
  const container = document.getElementById("snow-container");
  if (!container) return;

  for (let i = 0; i < 70; i++) {
    const flake = document.createElement("div");
    flake.className = "snowflake";
    flake.textContent = ["❄", "❅", "❆", "✦", "✧"][Math.floor(Math.random() * 5)];

    const size = Math.random() * 18 + 10;
    flake.style.fontSize = `${size}px`;
    flake.style.left = `${Math.random() * 100}%`;
    flake.style.animationDuration = `${Math.random() * 10 + 10}s`;
    flake.style.animationDelay = `${Math.random() * 5}s`;
    flake.style.opacity = Math.random() * 0.4 + 0.6;

    container.appendChild(flake);
  }
}

function startApp() {
  document.getElementById("startStage").style.display = "none";
  const music = document.getElementById("bgMusic");
  music?.play().catch(() => console.log("Autoplay bị chặn, người dùng cần tương tác trước"));
  inipesan();
}

function typeWriterEffect(text, elementId, callback) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  element.textContent = "";
  let i = 0;
  const speed = 60;

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      callback?.();
    }
  }
  type();
}

function switchStage(fromId, toId) {
  const from = document.getElementById(fromId);
  const to = document.getElementById(toId);
  if (!from || !to) return;

  from.style.opacity = "0";
  setTimeout(() => {
    from.style.display = "none";
    to.style.display = "block";
    setTimeout(() => to.style.opacity = "1", 50);
  }, 800);
}

function tapLove(id) {
  if (loveTaps.has(id)) return;

  const icon = document.querySelector(`#loveIcons .love-icon:nth-child(${id})`);
  icon?.classList.add("tapped");
  loveTaps.add(id);

  if (loveTaps.size === 4) {
    Swal.fire({
      title: "Đủ 4 cây thông rồi nè! 🎄🎄🎄🎄",
      text: "Sẵn sàng nhận lời chúc đặc biệt chưa? 💝",
      icon: "success",
      timer: 1800,
      showConfirmButton: false,
      background: "#fff",
      backdrop: "rgba(255, 251, 231, 0.9)",
    }).then(() => {
      switchStage("loveStage", "cardStage");

      const greetingEl = document.getElementById("greeting");
      const msgEl = document.getElementById("loveMsg");

      greetingEl.textContent = "";
      msgEl.textContent = "";

      typeWriterEffect(`Gửi ${userName} thân mến! 💌\n\n`, "greeting", () => {
        typeWriterEffect(
          `Giáng Sinh 2025 tới rùi nèee! 🌲✨

Chúc ${userName} thật nhiều khoảnh khắc ấm áp,
trái tim luôn rực rỡ như đèn Giáng sinh,
và nụ cười thì phải "sáng hơn cả ánh sao" luôn nha ♡

Mong mọi điều tốt đẹp nhất sẽ tìm đến ${userName},
mọi muộn phiền được "nghỉ phép dài hạn",
và bình yên ở lại thật thật lâu bên bạn 🤍

Merry Christmas & Happy New Year!!! 🎁❄️💖`,
          "loveMsg",
          () => {
            const fromTag = document.createElement("div");
            fromTag.id = "fromTag";
            fromTag.innerHTML = "From: Ngoc Lan💕";
            msgEl.appendChild(fromTag);

            setTimeout(() => {
              fromTag.style.opacity = "1";
            }, 400);
          }
        );
      });
    });
  }
}

async function inipesan() {
  const { value: name } = await Swal.fire({
    title: "Cho mình biết tên bạn nhaaa 😘",
    input: "text",
    inputPlaceholder: "Tên của bạn...",
    allowOutsideClick: false,
    allowEscapeKey: false,
    confirmButtonText: "Gửi đi nào! →",
    confirmButtonColor: "#e91e63",
    background: "#fff",
    backdrop: "rgba(255, 251, 231, 0.92)",
    customClass: {
      popup: "christmas-popup",
      title: "christmas-title",
      input: "christmas-input",
      confirmButton: "christmas-confirm",
    },
    inputValidator: (value) => {
      if (!value?.trim()) return "Bạn chưa nhập tên kìa 🥺";
    }
  });

  if (name) {
    userName = name.trim();
    switchStage("inputStage", "loveStage");
  }
}

window.addEventListener("load", () => {
  createSnowflakes();
});