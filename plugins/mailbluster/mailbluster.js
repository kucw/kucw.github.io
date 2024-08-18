// written by myself
function initNewsletterForm(divId, mailBlusterFormId, inMaintenance) {
  const e = document.querySelector(divId);

  // skip if this div is not found
  if (e == null) {
    return;
  }

  const success = e.querySelector(".success")
    , error = e.querySelector(".error")
    , maintenance = e.querySelector(".maintenance")
    , form = (e.querySelector(".popup"), e.querySelector(".popup-close-button"), e.querySelector("form"))
    , submitButton = form.querySelector("[type=submit]")
    , originalText = submitButton.innerHTML;

  if (inMaintenance) {
    submitButton.setAttribute("disabled", "disabled");
    maintenance.style.display = "block";
    form.style.display = "none";

  } else {
    form.addEventListener("submit", (async t => {
        t.preventDefault(),
          t.stopPropagation(),
          t.stopImmediatePropagation(),
          submitButton.setAttribute("disabled", "disabled"),
          submitButton.innerHTML = "<div class=\"loading\"></div>";

        const e = new FormData(t.target), r = {};
        for (const [t, d] of e.entries())
          Object.keys(r).includes(t) ? r[t] = r[t] + ", " + d : r[t] = d;

        const mailBlusterApi = "https://api.mailbluster.com/v1/forms/" + mailBlusterFormId;
        const result = await fetch(mailBlusterApi, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(r)
        });
        if (result.ok)
          success.style.display = "block",
            error.style.display = "none",
            form.style.display = "none",
            submitButton.innerHTML = originalText,
            submitButton.removeAttribute("disabled");
        else {
          error.style.display = "block",
            submitButton.innerHTML = originalText,
            submitButton.removeAttribute("disabled");
        }
      }
    ))
  }
}