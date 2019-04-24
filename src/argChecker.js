class ArgChecker {
  /**
   * @method hasImageOpt
   * @param {Array} コマンドライン引数のリスト
   * @return {Boolean} 存在有無の情報
   */
  static hasImageOpt(args) {
    return args.indexOf('-I') !== -1 || args.indexOf('--withImage') !== -1;
  }

  /**
   * @method hasEmulateOpt
   * @param {Array} コマンドライン引数のリスト
   * @return {Boolean} 存在有無の情報
   */
  static hasEmulateOpt(args) {
    return args.indexOf('-e') !== -1 || args.indexOf('--emulate') !== -1;
  }

  /**
   * @method getEmulateArg
   * @param {Array} コマンドライン引数のリスト
   * @return {Boolean} 存在有無の情報
   */
  static getEmulateArg(args) {
    const index = args.findIndex(arg => {
      return arg === '-e' || arg === '--emulate';
    });

    if (args.length > index + 1) {
      return args[index + 1];
    } else {
      return null;
    }
  }
}

module.exports = ArgChecker;
