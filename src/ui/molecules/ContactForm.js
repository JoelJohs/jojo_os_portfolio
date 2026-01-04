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
        <form class="contact-form" action="https://api.web3forms.com/submit" method="POST">
          <input type="hidden" name="access_key" value="a1638a16-79f0-405b-bff8-551a46d4ed24">
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

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const data = new FormData(form);

      // Show loading status
      status.textContent = "Sending...";
      status.style.color = "var(--accent-cyan)";

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: data,
        });

        const result = await response.json();

        if (response.ok && result.success) {
          status.textContent = t("contactForm.status_sent");
          status.style.color = "#00ff41";
          form.reset();
          
          // Play success sound
          const audio = new Audio('assets/sounds/success_chime.mp3');
          audio.volume = 0.3;
          audio.play().catch(() => {});
        } else {
          throw new Error(result.message || 'Form submission failed');
        }
      } catch (error) {
        status.textContent = "Error: Failed to send message";
        status.style.color = "var(--danger-scarlet)";
        console.error('Error submitting form:', error);
      }

      // Clear status after 5 seconds
      setTimeout(() => {
        status.textContent = "";
      }, 5000);
    });
  }
}

customElements.define("x-contact-form", ContactForm);
