/*Nguyen Vu
npvu@ucsc.edu*/
var ctx;
var canvas;
var v1;
var v2;

// DrawRectangle.js
function main() 
{
// Retrieve <canvas> element <- (1)
    canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }

    // Get the rendering context for 2DCG <- (2)
    ctx = canvas.getContext('2d');

    ctx.fillStyle = 'black'; // Set a black color
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill a rectangle with the color
}

function drawVector(vector, color)
{
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(canvas.width/2, canvas.height/2);
    ctx.lineTo(canvas.width/2+vector.elements[0]*20, canvas.height/2-vector.elements[1]*20);
    ctx.stroke();
}

function handleDrawEvent() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Read x and y values from the input fields
    var x1 = parseFloat(document.getElementById('x1-coord').value);
    var y1 = parseFloat(document.getElementById('y1-coord').value);
    v1 = new Vector3([x1, y1, 0]);

    var x2 = parseFloat(document.getElementById('x2-coord').value);
    var y2 = parseFloat(document.getElementById('y2-coord').value);
    v2 = new Vector3([x2, y2, 0.0]);
    
    // Create and draw vector
    drawVector(v1, "red");
    drawVector(v2, "blue");
}

function handleDrawOperationEvent() {
    var v3 = new Vector3(v1.elements);
    var v4 = new Vector3(v2.elements);
    var operation = document.getElementById('operation').value;
    var scalar = parseFloat(document.getElementById('scalar').value);

    switch (operation) {
        case "add":
            v3.add(v2);
            break;

        case "sub":
            v3.sub(v2);
            break;

        case "mul":
            v3.mul(scalar);
            v4.mul(scalar);
            drawVector(v4, "green");
            break;

        case "div":
            v3.div(scalar);
            v4.div(scalar);
            drawVector(v4, "green");
            break;

        case "magnitude":
            console.log(`Magnitude of v1: ${v1.magnitude()}`);
            console.log(`Magnitude of v2: ${v2.magnitude()}`);
            return;

        case "normalize":
            v3.normalize();
            v4.normalize();
            drawVector(v4, "green");
            break;

        case "angleBetween":
            let angle = angleBetween(v1, v2);
            if (angle !== null) {
                console.log(`Angle: ${angle.toFixed(0)} degrees`);
            }
            return;

        case "area":
            let area = areaTriangle(v1, v2);
            return;

        default:
            console.log("Invalid operation");
            return;
    }

    drawVector(v3, "green");
}


function angleBetween(v1, v2) {
    let dotProd = Vector3.dot(v1, v2);
    let magV1 = v1.magnitude();
    let magV2 = v2.magnitude();

    if (magV1 === 0 || magV2 === 0) {
        console.log("Has vector with 0 magnitude.");
        return null;
    }

    let cosAngle = dotProd / (magV1 * magV2);
    let RadAngle = Math.acos(cosAngle);
    let angle = RadAngle * (180 / Math.PI);
    return angle;
}

function areaTriangle(v1, v2) {
    let crossProduct = Vector3.cross(v1, v2);
    let magnitude = crossProduct.magnitude();

    let area = 0.5 * magnitude;

    console.log(`Area of the triangle: ${area}`);
    return area;
}
