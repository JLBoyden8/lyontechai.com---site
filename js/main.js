(function () {
  var toggle = document.querySelector(".nav-toggle");
  var mobileNav = document.querySelector(".nav-mobile");

  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      mobileNav.classList.toggle("is-open", !expanded);
    });

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        mobileNav.classList.remove("is-open");
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mobileNav.classList.contains("is-open")) {
        toggle.setAttribute("aria-expanded", "false");
        mobileNav.classList.remove("is-open");
      }
    });
  }
})();

(function () {
  var form = document.getElementById("demo-form");
  var submitBtn = form ? form.querySelector('[type="submit"]') : null;

  if (!form || !submitBtn) return;

  var industrySelect = document.getElementById("demo-industry");
  var otherField = document.getElementById("industry-other-field");
  var otherInput = document.getElementById("demo-industry-other");

  if (industrySelect && otherField && otherInput) {
    industrySelect.addEventListener("change", function () {
      var isOther = industrySelect.value === "Other";
      otherField.style.display = isOther ? "" : "none";
      otherInput.disabled = !isOther;
      if (isOther) otherInput.focus();
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var formData = new FormData(form);
    var data = Object.fromEntries(formData);

    if (data.industry === "Other" && data.industry_other) {
      data.industry = data.industry_other;
    }
    delete data.industry_other;

    submitBtn.disabled = true;
    var originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending…";

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      if (result.success) {
        form.innerHTML = '<div style="text-align:center;padding:2rem;"><h2 style="font-family:var(--font-display);font-size:1.5rem;font-weight:700;text-transform:uppercase;margin-bottom:1rem;color:var(--text);">REQUEST RECEIVED</h2><p style="color:var(--text-muted);font-size:1rem;line-height:1.6;">Thanks — we\'ll be in touch within one business day. Need us sooner? Email <a href="mailto:jack.lyontech@gmail.com" style="color:var(--accent);">jack.lyontech@gmail.com</a> or call/text directly.</p></div>';
      } else {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        var errorMsg = document.createElement("div");
        errorMsg.style.color = "var(--accent)";
        errorMsg.style.marginTop = "1rem";
        errorMsg.style.fontSize = "0.9375rem";
        errorMsg.textContent = "Something went wrong. Please email jack.lyontech@gmail.com directly.";
        form.appendChild(errorMsg);
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      var errorMsg = document.createElement("div");
      errorMsg.style.color = "var(--accent)";
      errorMsg.style.marginTop = "1rem";
      errorMsg.style.fontSize = "0.9375rem";
      errorMsg.textContent = "Something went wrong. Please email jack.lyontech@gmail.com directly.";
      form.appendChild(errorMsg);
    });
  });
})();
