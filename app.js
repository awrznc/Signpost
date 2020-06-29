/**
 * 経路情報を取得します。
 * @return {{ route: { line: { name: string; point: { from: { name: string; x: number; y: number; }; to: { name: string; x: number; y: number; }; }; section: { from_x: number; from_y: number; to_x: number; to_y: number; }[]; }[]; }; }}} JSON route data.
 */
function getRouteData() {

  return {
    "route": {
      "line": [
        {
          "name": "A street",
          "point": {
            "from":{
              "name": "Point A",
              "x": 610,
              "y": 800
            },
            "to": {
              "name": "Point B",
              "x": 350,
              "y": 910
            },
          },
          "section": [
            { "from_x": 610, "from_y": 800, "to_x": 588, "to_y": 773 },
            { "from_x": 588, "from_y": 773, "to_x": 520, "to_y": 765 },
            { "from_x": 520, "from_y": 765, "to_x": 500, "to_y": 765 },
            { "from_x": 500, "from_y": 765, "to_x": 445, "to_y": 803 },
            { "from_x": 445, "from_y": 803, "to_x": 400, "to_y": 806 },
            { "from_x": 400, "from_y": 806, "to_x": 365, "to_y": 820 },
            { "from_x": 365, "from_y": 820, "to_x": 395, "to_y": 910 },
            { "from_x": 400, "from_y": 910, "to_x": 350, "to_y": 910 },
          ]
        }
      ]
    }
  }
}

/**
 * 文字列を描画します。
 * @return {number} Number 0.
 */
function drawText() {
  return 0;
}

/**
 * 地図を描画します。
 * @param  {any}    Leaflet Leaflet Object.
 * @param  {string} mapid   Element id string to draw.
 * @return {number}         Number 0.
 */
function drawMap(Leaflet, mapid) {
  var image = {
    url:    '0.png',
    width:  1000,
    height: 1000
  };

  var imageBounds = Leaflet.latLngBounds(
    [0, 0],
    [image.height, image.width]
  );

  var map = Leaflet.map(mapid, {
    crs: Leaflet.CRS.Simple,
    maxBounds: imageBounds.pad(0),  // 中心に固定する
    minZoom: -1,                    // 最小サイズ
    maxZoom: 0                      // 最大サイズ
  });

  map.fitBounds(imageBounds);

  // 線とマーカーの描画
  getRouteData().route.line.forEach(line => {
    line.section.forEach(section => {
      Leaflet.polyline([[section.from_x, section.from_y], [section.to_x, section.to_y]], {
        color: '#ff00db',
        weight: 5
      }).addTo(map);
    });

    var from = line.point.from;
    var to = line.point.to;

    // Set marker & Add popup
    Leaflet.marker([from.x, from.y])
      .addTo(map)
      .bindPopup(from.name, {autoClose:false})
      .openPopup();

    // Set marker & Add popup
    Leaflet.marker([to.x, to.y])
      .addTo(map)
      .bindPopup(to.name, {autoClose:false})
      .openPopup();
  });

  Leaflet.imageOverlay(image.url, imageBounds).addTo(map);
  return 0;
}


/**
 * 子要素のidを返します。
 * @param  {any}            document  Document Object.
 * @param  {string}         id        Element id string.
 * @return {Array<string>}            Number 0.
 */
function getChildIds(document, id) {
  return Array.from(document.getElementById(id).children).map( (child) => {
    return child.id;
  });
}

/**
 * 経路文字列を描画します。
 * @param  {any}            document  Document Object.
 * @return {number}                   Number 0.
 */
function drawTerminal(document) {

  var terminal = document.getElementById('terminal');

  terminal.value =  "    _____ _                              __  \n" +
                    "   / ___/(_)___ _____  ____  ____  _____/ /_ \n" +
                    "   \\__ \\/ / __ `/ __ \\/ __ \\/ __ \\/ ___/ __/ \n" +
                    "  ___/ / / /_/ / / / / /_/ / /_/ (__  ) /_   \n" +
                    " /____/_/\\__, /_/ /_/ .___/\\____/____/\\__/   \n" +
                    "        /____/     /_/                       \n" +
                    "\n" +
                    " > signpost PointA PointB\n" +
                    "\n" +
                    "    10:00 PointA\n" +
                    "     | walk 10min\n" +
                    "    10:10 PointB\n" +
                    "\n" +
                    " > "
  return 0;
}


/**
 * 経路を描画します。
 * @param  {any}            document  Document Object.
 * @param  {Array<string>}  idList    Element id string list.
 * @param  {number}         num       Element Number to draw.
 * @return {number}                   Number 0.
 */
function switchingElement(document, idList, num) {
  idList.forEach((id, index) => {
    document.getElementById(id).style.display = (index == num ? 'block' : 'none');
  });
  return 0;
}
