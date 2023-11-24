const CELL_SIZE = 30;
const NUM_ROWS  = 40;
const NUM_COLS  = 90;

let startGrid = null;
let destinationGrid = null;

document.addEventListener('DOMContentLoaded', function () {
    const gridContainer = document.getElementById('grid-container');

    function createGrid(){

        const CELL_SIZE = 30;

        // Adjust the grid dimensions as needed
        const NUM_ROWS = 40;
        const NUM_COLS = 90;

        gridContainer.innerHTML = '';

        // Create the grid
        for (let row = 0; row < NUM_ROWS; row++) {
            for (let col = 0; col < NUM_COLS; col++) {
                const gridItem = document.createElement('div');
                gridItem.classList.add('grid-item');
                gridItem.setAttribute('data-row', row);
                gridItem.setAttribute('data-col', col);

                // Add event listeners or any other functionality as needed
                gridItem.addEventListener('click', function(){
                    if(startGrid === null){
                        this.style.backgroundColor = 'green';
                        startGrid = this;
                    }else if(destinationGrid === null && this!== startGrid){
                        this.style.backgroundColor = 'red';
                        destinationGrid = this;
                    }else{

                        if (this.style.backgroundColor === 'skyblue') {
                            this.style.backgroundColor = ''; // Reset to default
                        } else {
                            if(!(this.style.backgroundColor === 'green' || this.style.backgroundColor === 'red'))
                            this.style.backgroundColor = 'skyblue'; // Change the color as needed
                        }

                    }

                });


                // Add drag-and-drop functionality
                gridItem.draggable = true;

                gridItem.addEventListener('dragstart', function (e) {
                    e.dataTransfer.setData('text/plain', '');
                });

                gridItem.addEventListener('dragover', function (e) {
                    e.preventDefault();
                });

                gridItem.addEventListener('drop', function () {
                    if (this !== startGrid && this !== destinationGrid) {
                        // Add logic for adjusting other grids as needed
                        // For example, swap positions with start or destination grid
                        if (startGrid) {
                            const tempColor = startGrid.style.backgroundColor;
                            startGrid.style.backgroundColor = this.style.backgroundColor;
                            this.style.backgroundColor = tempColor;
                            startGrid = this;
                        } else if (destinationGrid) {
                            const tempColor = destinationGrid.style.backgroundColor;
                            destinationGrid.style.backgroundColor = this.style.backgroundColor;
                            this.style.backgroundColor = tempColor;
                            destinationGrid = this;
                        }
                    }
                });



                gridContainer.appendChild(gridItem);
            }
        }

    }

    createGrid();
});


document.addEventListener('keydown',function(event){

    if(event.key === 'Enter'){
        if(startGrid && destinationGrid){
            visualizeBFS();
        }else{
            alert('Set start and destination grids first!');
        }

    }

});


function visualizeBFS(){

    const queue = [];
    const visited = new Set();

    queue.push(startGrid);

    const intervalId = setInterval(() => {

        if(queue.length === 0){
            clearInterval(intervalId);
            return;
        }
    
        const currentGrid = queue.shift();
        if(currentGrid === destinationGrid){
            clearInterval(intervalId);
            alert("reached destination grid!");
            return;
        }

        const neighbors = getNeighbors(currentGrid);
        for (const neighbor of neighbors){

            if(!visited.has(neighbor)){
                queue.push(neighbor);
                visited.add(neighbor);
                neighbor.style.backgroundColor = 'gray';
            }

        }

    },10);

}


function getNeighbors(gridItem){

    const row = parseInt(gridItem.getAttribute('data-row'));
    const col = parseInt(gridItem.getAttribute('data-col'));

    const neighbors = [];

    const directions = [
      {row: row-1, col},
      {row, col: col+1},
      {row: row+1, col},
      {row, col: col-1}  
    ];

    for (const direction of directions){
        const neighbor = document.querySelector(`[data-row="${direction.row}"][data-col="${direction.col}"]`);
        if(neighbors && !neighbor.style.backgroundColor){
            neighbors.push(neighbor);
        }
    }

    return neighbors;
}   
