function main()
{


    //retrieve canvas element
    var canvas = document.getElementById('webgl');
    var gl = WebGLUtils.setupWebGL(canvas);
    var inputFile;
    //Get rendering context
    if(!gl)
    {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    // function drawingData(){
    //
    // }
    //initialize shaders
    program = initShaders(gl, "vshader", "fshader");
    gl.useProgram(program);

    //make viewport
    gl.viewport(0, 0, canvas.width, canvas.height);

    //define positions of points
    var points = [];

    var pBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    //define colors of points
    var colors = [];

    for(i = 0; i<points.length; i++){
        colors[i] = [0.0, 0.0, 0.0, 1.0];
    }

    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program,  "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    //set clear color
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    //clear color buffer
    gl.clear(gl.COLOR_BUFFER_BIT);

    //draw
    gl.drawArrays(gl.POINTS, 0, points.length);


    var fileString="";
    var file;
    document.getElementById('input').addEventListener('change', receiveFile, false);


    function receiveFile(event)
    {
        file = event.target.files[0]; //file
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(e){
            fileString = reader.result; //Actual string
            parseFile(fileString);
            console.log(points);
        }

    }

    function parseFile(string)
    {
        points=fileString.trim().split(/\s+/);
    }

}