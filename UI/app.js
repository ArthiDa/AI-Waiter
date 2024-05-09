
const foodItem = [
  {
    id: 1,
    name: 'burger',
    time: 5
  },
  {
    id: 2,
    name: 'pizza',
    time: 10
  },
  {
    id: 3,
    name: 'pasta',
    time: 15
  },
  {
    id: 4,
    name: 'sushi',
    time: 20
  },

]
const orderStorage = [

];

// submit order to an API endpoint
function submitOrder() {
  // Check if there is an order
  if (orderStorage.length > 0) {
    // Send the order to the API

    console.log("Order submitted!", orderStorage);
  }
  const path = [{ row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 }, { row: 0, col: 3 }, { row: 0, col: 4 }, { row: 0, col: 4 }, { row: 0, col: 3 }, { row: 0, col: 2 }, { row: 0, col: 1 }, { row: 0, col: 0 }, { row: 1, col: 0 }, { row: 2, col: 0 }, { row: 3, col: 0 }, { row: 4, col: 0 }, { row: 5, col: 0 }, { row: 6, col: 0 }, { row: 7, col: 0 }, { row: 8, col: 0 }, { row: 8, col: 1 }, { row: 8, col: 2 }, { row: 8, col: 3 }, { row: 8, col: 4 }, { row: 8, col: 5 }, { row: 8, col: 6 }, { row: 8, col: 7 }, { row: 8, col: 8 }, { row: 7, col: 8 }, { row: 6, col: 8 }, { row: 5, col: 8 }, { row: 4, col: 8 }, { row: 3, col: 8 }, { row: 2, col: 8 }, { row: 1, col: 8 }, { row: 0, col: 8 }, { row: 0, col: 7 }, { row: 0, col: 6 }, { row: 0, col: 5 }];

  // suffle the path
  const path1 = [...path]
  const path2 = [...path]

  startAnimation(path1.sort((a, b) => a.col - b.col), 400)






}

// Add order to the orderStorage
function addOder(tableNumber, foodItemId) {
  // Check if the table already has an order
  const order = orderStorage.find((order) => order.tableNumber === tableNumber);

  if (order) {

    // Check if the food item is already in the order
    const foodItem = order.foodItems.find((item) => item.id === foodItemId);
    if (foodItem) {
      foodItem.quantity++;
    }
    else {
      order.foodItems.push({ id: foodItemId, quantity: 1 });
    }

  } else {
    orderStorage.push({ tableNumber, foodItems: [{ id: foodItemId, quantity: 1 }] });
  }

  // clear the order list and re-render
  const orderList = document.getElementById("orderList");
  orderList.innerHTML = "";
  orderStorage.forEach((order) => {
    order.foodItems.forEach((item) => {
      const food = foodItem.find((food) => food.id === Number(item.id));

      const li = document.createElement("li");
      li.textContent = `${food.name} x ${item.quantity} - ${order.tableNumber}`;
      orderList.appendChild(li);
    }
    )
  });




  console.log(orderStorage)
}

document.addEventListener("DOMContentLoaded", function () {
  const chessboard = document.querySelector(".chessboard");
  const rows = 9;
  const cols = 9;
  let tableNumber = 1;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const square = document.createElement("div");
      square.classList.add("square");
      // add data attributes to the square
      square.dataset.row = i;
      square.dataset.col = j;

      // Add additional classes based on the square position
      if (i === 0 && (j === 0 || j === 5 || j === 8)) {
        square.classList.add("food");
        square.id = `t${tableNumber}`;
        tableNumber++
      } else if (i === 2 && (j === 0 || j === 8)) {
        square.classList.add("food");
        square.id = `t${tableNumber}`;
        tableNumber++
      } else if (i === 5 && j === 0) {
        square.classList.add("food");
        square.id = `t${tableNumber}`;
        tableNumber++
      } else if (i === 6 && j === 7) {
        square.classList.add("food");
        square.id = `t${tableNumber}`;
        tableNumber++
      } else if (i === 8 && (j === 0 || j === 2 || j === 6)) {
        square.classList.add("food");
        square.id = `t${tableNumber}`;
        tableNumber++
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
    square.addEventListener("click", (e) => {

      const tableNumber = square.id;
      console.log(`Table ${tableNumber} clicked!`)
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
         
            ${foodItem.map((item) => {
    return `<span class="badge bg-primary mx-1" onClick="addOder('${tableNumber}','${item.id}')">${item.name}</span>`
  }).join('')} 
            
          </div>
          <div class="modal-body">
            <h5>Order List</h5>
            <ul id="orderList">
              ${orderStorage.map((order) => {
    return order.foodItems.map((item) => {
      const food = foodItem.find((food) => food.id === Number(item.id));
      return `<li>${food.name} x ${item.quantity} - ${order.tableNumber} </li>`;
    }
    ).join('');

  }
  ).join('')}
            </ul>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            
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


const startAnimation = (path, timeDelay = 1000) => {

  // get row+col+1 th square and add class active and remove it after 1s and go to next path
  let i = 0;
  const interval = setInterval(() => {
    const square = document.querySelector(`.square[data-row="${path[i].row}"][data-col="${path[i].col}"]`);
    square.classList.add("active-waiter");
    setTimeout(() => {
      square.classList.remove("active-waiter");
    }, timeDelay);
    i++;
    if (i === path.length) {
      clearInterval(interval);
    }
  }, timeDelay);

}