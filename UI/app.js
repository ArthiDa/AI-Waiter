document.addEventListener("DOMContentLoaded", function () {
  const chessboard = document.querySelector(".chessboard");
  const rows = 9;
  const cols = 9;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const square = document.createElement("div");
      square.classList.add("square");

      // Add additional classes based on the square position
      if (i === 0 && (j === 0 || j === 5 || j === 8)) {
        square.classList.add("food");
        square.id = `t${j + 1}`;
      } else if (i === 2 && (j === 0 || j === 8)) {
        square.classList.add("food");
        square.id = `t${j === 0 ? 4 : 5}`;
      } else if (i === 5 && j === 0) {
        square.classList.add("food");
        square.id = "t6";
      } else if (i === 6 && j === 7) {
        square.classList.add("food");
        square.id = "t7";
      } else if (i === 8 && (j === 0 || j === 2 || j === 6)) {
        square.classList.add("food");
        square.id = `t${j + 9}`;
      } else if (i === 4 && j === 4) {
        square.classList.add("kitchen");
        square.id = "kit";
      } else if ((i === 1 || i === 3) && (j === 4 || j === 5)) {
        square.classList.add("red");
      } else if (i % 2 === j % 2) {
        square.classList.add("white");
      } else {
        square.classList.add("black");
      }

      chessboard.appendChild(square);
    }
  }

  // Add click event listener to food squares
  const foodSquares = document.querySelectorAll(".food");
  foodSquares.forEach((square) => {
    square.addEventListener("click", () => {
      const tableNumber = square.id;
      openModal(tableNumber);
    });
  });
});

function openModal(tableNumber) {
  const modal = document.createElement("div");
  modal.classList.add("modal", "fade");
  modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Table ${tableNumber}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!-- Add your modal content here -->
            <p>This is a modal for Table ${tableNumber}.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    `;

  document.body.appendChild(modal);
  const modalInstance = new bootstrap.Modal(modal);
  modalInstance.show();

  // Add event listener to close the modal when the close button is clicked
  const closeButton = modal.querySelector(".btn-close");
  closeButton.addEventListener("click", () => {
    modalInstance.hide();
    document.body.removeChild(modal);
  });
}
