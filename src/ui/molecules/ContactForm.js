export class ContactForm extends HTMLElement {
  connectedCallback() {
    this.render();
    this.bindEvents();
  }

  render() {
    this.innerHTML = `
      <section class="contact-card">
        <h2 class="contact-title">OPEN SECURE CHANNEL</h2>
        <p class="contact-subtitle">Send an encrypted payload and we will respond ASAP.</p>
        <form class="contact-form">
          <label class="contact-label">
            Name / Alias
            <input class="contact-input" name="name" type="text" placeholder="Neo" required />
          </label>
          <label class="contact-label">
            Secure Email
            <input class="contact-input" name="email" type="email" placeholder="neo@matrix.io" required />
          </label>
          <label class="contact-label">
            Message
            <textarea class="contact-textarea" name="message" rows="4" placeholder="Trace route, send payload..." required></textarea>
          </label>
          <button class="contact-submit" type="submit">Transmit</button>
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

      status.textContent = "Payload transmitted. Await response.";
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
