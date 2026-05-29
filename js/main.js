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

  var form = document.getElementById("demo-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var get = function (id) {
        var el = document.getElementById(id);
        return el ? (el.value || "").trim() : "";
      };

      var name = get("demo-name");
      var business = get("demo-business");
      var phone = get("demo-phone");
      var email = get("demo-email");
      var industry = get("demo-industry");
      var message = get("demo-message");

      var subject = "Demo Request — " + (business || "LyonTech AI");
      var bodyLines = [
        "Name: " + name,
        "Business: " + business,
        "Phone: " + phone,
        "Email: " + email,
        "Industry: " + industry,
        "",
        "Message:",
        message
      ];
      var body = bodyLines.join("\n");

      var mailto =
        "mailto:jack.lyontech@gmail.com" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      var confirmation = document.createElement("div");
      confirmation.className = "form-confirmation";
      confirmation.innerHTML =
        'Thanks — your email client should open. Or reach us directly at ' +
        '<a href="mailto:jack.lyontech@gmail.com">jack.lyontech@gmail.com</a>.';
      form.replaceWith(confirmation);

      window.location.href = mailto;
    });
  }
})();
