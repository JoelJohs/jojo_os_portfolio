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
        
        <div class="contact-form-section">
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
        </div>

        <div class="contact-info-section">
          <h3 class="contact-info-title">${t(
            "contactForm.direct_contact_title"
          )}</h3>
          
          <div class="contact-info-grid">
            <div class="contact-info-item">
              <span class="contact-info-icon">📧</span>
              <div>
                <div class="contact-info-label">Email</div>
                <a href="mailto:jojohersa21@gmail.com" class="contact-info-link">${t(
                  "contactForm.email"
                )}</a>
              </div>
            </div>
            
            <div class="contact-info-item">
              <span class="contact-info-icon">💼</span>
              <div>
                <div class="contact-info-label">${t(
                  "contactForm.linkedin"
                )}</div>
                <a href="https://www.linkedin.com/in/joel-johs" target="_blank" class="contact-info-link">Joel Hernández</a>
              </div>
            </div>
            
            <div class="contact-info-item">
              <span class="contact-info-icon">🌐</span>
              <div>
                <div class="contact-info-label">${t("contactForm.github")}</div>
                <a href="https://github.com/JoelJohs" target="_blank" class="contact-info-link">github.com/JoelJohs</a>
              </div>
            </div>
            
            <div class="contact-info-item">
              <span class="contact-info-icon">⏰</span>
              <div>
                <div class="contact-info-label">Timezone</div>
                <span class="contact-info-text">${t(
                  "contactForm.timezone"
                )}</span>
              </div>
            </div>
          </div>

          <div class="contact-hint hint-note">
            <span class="hint-icon">📡</span>
            <span>${t("achievementHints.contact")}</span>
          </div>
          
          <div class="availability-note">
            <span class="availability-icon">🚀</span>
            <span>${t("contactForm.availability")}</span>
          </div>
        </div>
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
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: data,
        });

        const result = await response.json();

        if (response.ok && result.success) {
          status.textContent = t("contactForm.status_sent");
          status.style.color = "#00ff41";
          form.reset();

          // Play success sound
          const audio = new Audio("assets/sounds/success_chime.mp3");
          audio.volume = 0.3;
          audio.play().catch(() => {});
        } else {
          throw new Error(result.message || "Form submission failed");
        }
      } catch (error) {
        status.textContent = "Error: Failed to send message";
        status.style.color = "var(--danger-scarlet)";
        console.error("Error submitting form:", error);
      }

      // Clear status after 5 seconds
      setTimeout(() => {
        status.textContent = "";
      }, 5000);
    });
  }
}

customElements.define("x-contact-form", ContactForm);
