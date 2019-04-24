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
   * @method findEmulatePattern
   * @param {String}
   * @return {String}
   */
  static findEmulatePattern(argPattern) {
    let emulateName = EmulatePatternData.find(emulatePattern => {
      return emulatePattern.id === argPattern
    });

    return emulateName.name
  }
}

module.exports = EmulatePatternList;
