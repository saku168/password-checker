const input = document.querySelector("#password");
const bar = document.querySelector("#bar");
const strength = document.querySelector("#strength");
const items = [...document.querySelectorAll("[data-check]")];

function checkPassword() {
  if (!input) return;
  const password = input.value;
  const rules = {
    length: password.length >= 12,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /\d/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password)
  };
  const score = Object.values(rules).filter(Boolean).length;

  items.forEach((item) => {
    const passed = Boolean(rules[item.dataset.check]);
    item.classList.toggle("valid", passed);
    item.setAttribute("aria-label", `${item.textContent}: ${passed ? "met" : "not met"}`);
  });

  if (bar) {
    bar.style.width = `${score * 20}%`;
    bar.style.backgroundColor = score < 3 ? "#d95b5b" : score < 5 ? "#e0a33c" : "#239568";
  }
  if (strength) {
    strength.textContent = password.length === 0
      ? "Waiting for input…"
      : score < 3 ? "A few more criteria could be met"
      : score < 5 ? "Good start — some criteria are still missing"
      : "All listed criteria are met";
  }
}

input?.addEventListener("input", checkPassword);
checkPassword();