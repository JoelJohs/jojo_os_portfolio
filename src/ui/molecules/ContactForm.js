import { t, onLanguageChange } from "../../core/i18n/i18n.js";

export class ContactForm extends HTMLElement {
  connectedCallback() {
    this.render();
    this.bindEvents();
    this._unsubscribe = onLanguageChange(() => {
      this.render();
      this.bindEvents();
    });
  }

  disconnectedCallback() {
    if (typeof this._unsubscribe === "function") this._unsubscribe();
  }

  render() {
    this.innerHTML = `
      <section class="contact-card">
        <h2 class="contact-title">${t("contactForm.title")}</h2>
        <p class="contact-subtitle">${t("contactForm.subtitle")}</p>
        <form class="contact-form">
          <label class="contact-label">
            ${t("contactForm.name")}
            <input class="contact-input" name="name" type="text" placeholder="${t(
              "contactForm.placeholder_name"
            )}" required />
          </label>
          <label class="contact-label">
            ${t("contactForm.email")}
            <input class="contact-input" name="email" type="email" placeholder="${t(
              "contactForm.placeholder_email"
            )}" required />
          </label>
          <label class="contact-label">
            ${t("contactForm.message")}
            <textarea class="contact-textarea" name="message" rows="4" placeholder="${t(
              "contactForm.placeholder_message"
            )}" required></textarea>
          </label>
          <button class="contact-submit" type="submit">${t(
            "contactForm.submit"
          )}</button>
        </form>
        <div class="contact-status" role="status" aria-live="polite"></div>
      </section>
    `;
  }

  bindEvents() {
    const form = this.querySelector(".contact-form");
    const status = this.querySelector(".contact-status");

    if (!form) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const data = new FormData(form);
      const payload = {
        name: data.get("name")?.toString().trim(),
        email: data.get("email")?.toString().trim(),
        message: data.get("message")?.toString().trim(),
      };

      status.textContent = t("contactForm.status_sent");
      this.dispatchEvent(
        new CustomEvent("contact:submit", {
          detail: payload,
          bubbles: true,
        })
      );

      form.reset();
    });
  }
}

customElements.define("x-contact-form", ContactForm);
