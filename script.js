const cursor = document.querySelector('.custom-cursor');

function updateCursor(e) {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
}

function cursorClick() {
  cursor.classList.add('click');
  setTimeout(() => {
    cursor.classList.remove('click');
  }, 300);
}

window.addEventListener('mousemove', updateCursor);
window.addEventListener('mousedown', cursorClick);

// Create a new function that wraps the scrambleText function and initializes the observer
const observeScramble = (element, text, duration, delay) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          scrambleText(element, text, duration, delay);
          observer.disconnect();
        }
      });
    }, {
      threshold: 0.1
    });
  
    observer.observe(element);
  };
  
  // The scrambleText function remains the same as before
  const scrambleText = (element, text, duration, delay) => {
    const scramblePool = "!<>-_\\/[]{}—=+*^?#abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let output = "";
    let counter = 0;
  
    const randomChar = () => {
      return scramblePool[Math.floor(Math.random() * scramblePool.length)];
    };
  
    const update = () => {
      output = "";
      let i = 0;
      while (i < text.length) {
        const currentChar = text[i];
        if (counter > i) {
          output += currentChar;
        } else if (counter === i) {
          output += randomChar();
        } else {
          output += " ";
        }
        i++;
      }
      element.innerText = output;
      if (counter < text.length) {
        counter++;
        setTimeout(update, delay);
      }
    };
  
    setTimeout(() => {
      update();
    }, duration);
  };
  
  // Use the observeScramble function instead of the scrambleText function
  const targetText = "Let's transform your ideas into something extraordinary. Contact me.";
  const scrambleElem = document.querySelector(".scramble-text");
  scrambleElem.innerText = "";
  observeScramble(scrambleElem, targetText, 500, 30); // duration: 500ms (0.5s), delay: 30ms
  
// Select the parallax element
const parallax = document.querySelector('.parallax');
const viewProjectButton = document.querySelector('.view-project');

// Add the event listener for the scroll event
window.addEventListener('scroll', () => {
  // Calculate the scroll position percentage (0-100%)
  const scrollPercentage = (window.pageYOffset / (document.body.scrollHeight - window.innerHeight)) * 80;

  // Update the translateY value based on the scroll position percentage
  parallax.style.transform = `translateY(${scrollPercentage * 0.9 - 5}%)`;

    // Show the button if the scrollPercentage is between 45 and 55, otherwise hide it
    if (scrollPercentage > 15 && scrollPercentage < 25) {
      viewProjectButton.style.opacity = '1';
    } else {
      viewProjectButton.style.opacity = '0';
    }
});
