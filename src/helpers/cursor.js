const cursor = document.querySelector(".cursor");

let rotation = 0;

// track mouse movement to update cursor position
document.addEventListener("mousemove", (e) => {
  cursor.style.top = `${e.pageY - 10}px`;
  cursor.style.left = `${e.pageX - 15}px`;
});

document.addEventListener("mousedown", (e) => {
  cursor.style.top = `${e.pageY - 10}px`;
  cursor.style.left = `${e.pageX - 15}px`;
});

// toggle custom cursor on and off when it leaves window
document.addEventListener("mouseleave", (e) => {
  cursor.style.visibility = "hidden";
});

document.addEventListener("mouseenter", (e) => {
  cursor.style.visibility = "visible";
});

// continuously rotate cursor
setInterval(() => {
  rotation += 2; // Increment rotation angle
  cursor.style.transform = `rotate(${rotation}deg)`;
}, 16);

// // add circle effect on mouse click
// document.addEventListener("click", () => {
//   cursorRing.classList.add("click");
//   setTimeout(() => {
//     cursorRing.classList.remove("click");
//   }, 500);
// });

// Create a ring animation on click
document.addEventListener("click", (event) => {
  // Get the cursor's current position
  const cursorRect = cursor.getBoundingClientRect();
  const cursorX = cursorRect.left + cursorRect.width / 2;
  const cursorY = cursorRect.top + cursorRect.height / 2;

  // Create a new ring element
  const ring = document.createElement("div");
  ring.classList.add("cursor-ring");

  // Position the ring at the center of the cursor
  ring.style.top = `${cursorY - 15}px`; // Adjust for ring size (radius)
  ring.style.left = `${cursorX - 15}px`;

  // Add the ring to the body
  document.body.appendChild(ring);

  // Remove the ring after animation completes
  ring.addEventListener("animationend", () => {
    ring.remove();
  });
});
