const EmulatePatternData = [
  {
    id: 'SP',
    name: 'iPhone X'
  },
  {
    id: 'SP-iPhone',
    name: 'iPhone X'
  },
  {
    id: 'SP-iPhone-X',
    name: 'iPhone X'
  },
  {
    id: 'SP-iPhone-SE',
    name: 'iPhone SE'
  },
  {
    id: 'SP-Android',
    name: 'Nexus 6'
  }
];

class EmulatePatternList {
  /**
   * @method findEmulatePattern Argをもとに選択しているデバイスの設定名を取得
   * @param {String} Arg（コマンドライン引数で設定した文字列） 
   * @return {String} デバイスの設定名
   */
  static findEmulatePattern(argPattern) {
    let emulateName = EmulatePatternData.find(emulatePattern => {
      return emulatePattern.id === argPattern
    });

    return emulateName.name
  }
}

module.exports = EmulatePatternList;
