(() => {
  const quickLinks = Array.from(document.querySelectorAll("[data-url]"));
  const form = document.getElementById("customRedirectForm");
  const urlInput = document.getElementById("customUrl");
  const message = document.getElementById("formMessage");

  const setMessage = (text, type) => {
    if (!message) {
      return;
    }

    message.textContent = text;
    message.dataset.type = type;
  };

  const normalizeUrl = (value) => {
    const trimmed = value.trim();
    if (!trimmed) {
      return null;
    }

    const hasProtocol = /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(trimmed);
    const candidate = hasProtocol ? trimmed : `https://${trimmed}`;

    try {
      const parsed = new URL(candidate);
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        return null;
      }
      return parsed.toString();
    } catch {
      return null;
    }
  };

  const redirectSameTab = (rawUrl) => {
    const normalized = normalizeUrl(rawUrl);
    if (!normalized) {
      setMessage("Enter a valid http or https URL.", "error");
      return;
    }

    setMessage("Redirecting...", "success");
    window.location.assign(normalized);
  };

  quickLinks.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.url || "";
      redirectSameTab(target);
    });
  });

  if (form && urlInput) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      redirectSameTab(urlInput.value);
    });
  }
})();
