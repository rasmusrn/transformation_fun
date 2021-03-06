function MyGraph(canvas) {
  var transformation;

  this.backend = new Graph(canvas, 40, 600, 400);

  var originalHouse = this.createHouseMesh();
  originalHouse.color = 'red';

  var translatedHouse = originalHouse.getCopy();
  translatedHouse.color = 'green';
  transformation = Matrix3.translation(-13, -4);
  translatedHouse.transform(transformation);

  var rotatedHouse = originalHouse.getCopy();
  rotatedHouse.color = 'blue';

  var translation1 = Matrix3.translation(-5, -3); // moving to origin
  var rotation = Matrix3.rotation(Math.PI/4); // rotating
  var translation2 = Matrix3.translation(5, 3); // moving back to original coordinate

  // Because I'm using column vectors and post-multiplication, matrix transformations should
  // be concatenated backwards.
  transformation = (translation2.multiply(rotation)).multiply(translation1);


  rotatedHouse.transform(transformation);

  this.backend.meshes.push(originalHouse);
  this.backend.meshes.push(translatedHouse);
  this.backend.meshes.push(rotatedHouse);
}

MyGraph.prototype = {
  render: function() {
    this.backend.render();
  },
  createHouseMesh: function() {
    var mesh = new Mesh();

    var bottomLeft = new Vector2(2, 0);
    mesh.points.push(bottomLeft);

    var bottomRight = new Vector2(8, 0);
    mesh.points.push(bottomRight);

    var topLeft = new Vector2(2, 6);
    mesh.points.push(topLeft);

    var topRight = new Vector2(8, 6);
    mesh.points.push(topRight);

    var tip = new Vector2(5, 8);
    mesh.points.push(tip);

    var bottom = new Edge(bottomRight, bottomLeft);
    mesh.edges.push(bottom);

    var top = new Edge(topRight, topLeft);
    mesh.edges.push(top);

    var left = new Edge(topLeft, bottomLeft);
    mesh.edges.push(left);

    var right = new Edge(topRight, bottomRight);
    mesh.edges.push(right);

    var roofLeft = new Edge(topLeft, tip);
    mesh.edges.push(roofLeft);

    var roofRight = new Edge(topRight, tip);
    mesh.edges.push(roofRight);

    return mesh;
  }
};
