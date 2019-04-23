class Converter {
  /**
   * @method convertToJson
   * @param {string} CSVから読み出したテキスト
   * @return {Object} 変換されたJSオブジェクト
   */
  static convertToJson(csvText) {
    // データの変換
    let jsObject = csvText.split('\n').map((row) => {
      row = row.split(',');
      let tmpObj = {};
      tmpObj['url'] = row[0];
      tmpObj['title'] = row[1];

      return tmpObj
    });

    jsObject.shift()

    // 変換後データの返却
    return jsObject
  }
}

module.exports = Converter;
