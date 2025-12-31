class ProfileCard extends HTMLElement {
  set data(value) {
    this.render(value);
  }

  render(data) {
    const name = data?.name || "Unknown";
    const role = data?.role || "";
    const stats = data?.stats || {};
    this.innerHTML = `
      <div class="profile-card">
        <h2>${name}</h2>
        <p>${role}</p>
        <div class="stats">
          <span>STR: ${stats.str ?? "-"}</span>
          <span>INT: ${stats.int ?? "-"}</span>
        </div>
      </div>
    `;
  }
}

customElements.define("x-profile-card", ProfileCard);
