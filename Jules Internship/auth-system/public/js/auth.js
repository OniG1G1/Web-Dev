document.addEventListener("DOMContentLoaded", () => {
  // Grab forms (if they exist on the page)
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  // Attach event listeners
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      handleAuthForm(loginForm, "/login");
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      handleAuthForm(signupForm, "/signup");
    });
  }
});

// Helper to process form submission
async function handleAuthForm(form, endpoint) {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  //console.log("Submitting to", endpoint, "with data:", data);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log("Server response:", result);
    // Step 4 will display this inline instead of console.log
  } catch (error) {
    console.error("Error submitting form:", error);
  }
}
