function main()
{
    //retrieve canvas element
    var canvas = document.getElementById('webgl');
    var gl = WebGLUtils.setupWebGL(canvas);

    //Get rendering context
    if(!gl)
    {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

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
    var colors = [0.0, 0.0, 0.0, 1.0];

    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program,  "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    //set clear color
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, points.length);


    // window.onclick = function(event) {
    //     var i = index;
    //     x=2*event.clientX/canvas.width-1;
    //     y=2*(canvas.height-event.clientY)/canvas.height-1;
    //     var pts = [x, y];
    //     console.log(x, y);
    //     points.push(pts);
    //
    //     gl.bindBuffer(gl.ARRAY_BUFFER, pBuffer);
    //     gl.bufferSubData(gl.ARRAY_BUFFER, i, new Float32Array(pts));
    //     gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    //     gl.bufferSubData(gl.ARRAY_BUFFER, i, new Float32Array(colors));
    //     index++;
    // }
    //
    // window.onkeypress = function(event)
    // {
    //     var key = String.fromCharCode(event.keyCode);
    //     switch(key)
    //     {
    //         case 'a':
    //             canvas.width = 200;
    //             gl.clear(gl.COLOR_BUFFER_BIT);
    //             gl.drawArrays(gl.TRIANGLES, 0, points.length);
    //             window.alert('Key pressed is ' + key);
    //             break;
    //     }
    // }

}