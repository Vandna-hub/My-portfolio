/* ================================
   Portfolio JavaScript
   ================================ */

/* -------- Footer Dynamic Year -------- */
// Automatically updates the footer year to the current year
document.getElementById('year').textContent = new Date().getFullYear();

/* -------- Smooth Scroll for Nav Links -------- */
// Enables smooth scrolling when clicking navigation links
document.querySelectorAll('a.nav-link[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault(); // Prevent default jump
    document.querySelector(a.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

/* -------- Fade-in Animation on Scroll -------- */
// Adds fade-in animation effect when elements appear in viewport
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.2 }; // Trigger animation when 20% of element is visible

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('appear'); // Add animation class
      observer.unobserve(entry.target); // Stop observing once element is visible
    }
  });
}, appearOptions);

// Observe all elements with "fade-in" class
faders.forEach(fader => appearOnScroll.observe(fader));

/* -------- Contact Form (Formspree AJAX) -------- */
// Handles contact form submission using AJAX (no page reload)
const form = document.getElementById('contactForm');
const successAlert = document.getElementById('formSuccess');
const errorAlert = document.getElementById('formError');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent form redirect
    successAlert.classList.add('d-none'); // Hide alerts initially
    errorAlert.classList.add('d-none');

    const formData = new FormData(form); // Collect form data

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        successAlert.classList.remove('d-none'); // Show success alert
        form.reset(); // Reset form fields
      } else {
        errorAlert.classList.remove('d-none'); // Show error alert
      }
    } catch (error) {
      errorAlert.classList.remove('d-none'); // Show error on network failure
    }
  });
}

/* -------- Skills Progress Bar Animation -------- */
// Animates progress bars when skills section becomes visible
document.addEventListener("DOMContentLoaded", () => {
  const skillSection = document.querySelector("#skills");
  const progressBars = document.querySelectorAll(".progress-bar");

  // Function to animate each progress bar
  const animateSkills = () => {
    progressBars.forEach(bar => {
      const skillLevel = parseInt(bar.getAttribute("data-skill")); // Get skill percentage
      let current = 0;

      // Set final bar width
      bar.style.width = skillLevel + "%";

      // Animate percentage count-up inside bar
      const percentSpan = bar.querySelector(".percent");
      const interval = setInterval(() => {
        if (current >= skillLevel) {
          clearInterval(interval); // Stop at target value
        } else {
          current++;
          percentSpan.textContent = current + "%"; // Update number
        }
      }, 20); // Speed of percentage increment
    });
  };

  // Trigger animation when skills section enters viewport
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkills();
        observer.disconnect(); // Run only once
      }
    });
  }, { threshold: 0.5 });

  if (skillSection) observer.observe(skillSection);
});
