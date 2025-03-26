export function bezier(resInput, ppp, canvasContext, ...points) {
  if (points.length < 2)
    throw new Error("reached minimum points. Minimum points needed is 2");
  if (resInput < 4)
    throw new Error("Minimum resolution reached, minimum resInput is 4");
  let t = 0;
  const resolution = 1 / resInput;
  const result = [];
  const coeff = points.length - 1;
  const pow = coeff;
  const last = points.length - 1;
  //build
  while (t <= 1 + resolution) {
    let px =
      Math.pow(1 - t, pow) * points[0].x + Math.pow(t, pow) * points[last].x;
    let py =
      Math.pow(1 - t, pow) * points[0].y + Math.pow(t, pow) * points[last].y;
    for (let i = 1; i < points.length - 1; i++) {
      px += coeff * Math.pow(1 - t, pow - i) * Math.pow(t, i) * points[i].x;
      py += coeff * Math.pow(1 - t, pow - i) * Math.pow(t, i) * points[i].y;
    }
    result.push({ x: px, y: py, t: t });
    t += resolution;
  }
  //equalize
  let subPoints = [];
  for (let i = 0; i < result.length - 1; i++) {
    let res = Math.round(Math.pow(resolution, -1) / 10);
    let pointA = result[i];
    let pointB = result[i + 1];
    if (!pointB) break;
    let distance = Math.sqrt(
      Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2)
    );
    let n = Math.floor(distance / ppp);
    let pointNum = n * res;
    for (let j = 0; j < pointNum; j++) {
      let x = pointA.x + ((pointB.x - pointA.x) / pointNum) * j;
      let y = pointA.y + ((pointB.y - pointA.y) / pointNum) * j;
      let tAVG = (pointA.t + pointB.t) / 2;
      subPoints.push({ x: x, y: y, t: tAVG });
    }
  }
  result.push(...subPoints);
  result.sort((a, b) => a.t - b.t);
  let curve = {
    points: result,
    res: 1 / resolution,
    deg: coeff,
    inputs: points,
    draw: function (timeOffset, width, color) {
      if (timeOffset == 0) {
        this.points.forEach((current) => {
          if (typeof color != "string")
            throw new Error("invalid type of COLOR");
          canvasContext.fillStyle = color.toString().toLowerCase();
          canvasContext.fillRect(
            current.x - Math.round(width / 2),
            current.y - Math.round(width / 2),
            width,
            width
          );
          canvasContext.stroke();
        });
      } else {
        for (let i = 0; i < this.points.length; i++) {
          setTimeout(
            () => {
              if (typeof color != "string")
                throw new Error("invalid type of COLOR");
              canvasContext.fillStyle = color.toString().toLowerCase();
              canvasContext.fillRect(
                this.points[i].x - Math.round(width / 2),
                this.points[i].y - Math.round(width / 2),
                width,
                width
              );
              canvasContext.stroke();
            },
            timeOffset * i,
            canvasContext,
            this.points[i]
          );
        }
      }
    },
    showCTRL: function (width, color) {
      this.inputs.forEach((current) => {
        if (typeof color != "string")
          throw new Error("invalid type of CTRLCOL");
        canvasContext.fillStyle = color.toString().toLowerCase();
        canvasContext.fillRect(
          current.x - Math.round(width / 2),
          current.y - Math.round(width / 2),
          width,
          width
        );
        canvasContext.stroke();
      });
    },
  };
  return curve;
}
