class ArgChecker {
  /**
   * @method hasImageOpt
   * @param {Array} コマンドライン引数のリスト
   * @return {Boolean} 存在有無の情報 
   */
  static hasImageOpt(args) {
    return (args.indexOf("-I") !== -1 || args.indexOf("--withImage") !== -1)
  }
}

module.exports = ArgChecker;
