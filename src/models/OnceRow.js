export default class OnceRow {
  constructor(answer, size = 5) {
    this.as = answer; // answerString
    this.size = size;
    this.d = true; // disabled
    this.ga = Array(size).fill(''); // guessesArray
    this.cp = Array(size).fill(''); // CorrectPart
    this.ci = []; // CorrectIndex
    this.ui = []; // UnsureIndex
  }

  // answerArray
  get aa() {
    return this.as.split('');
  }

  // guessesString
  get gs() {
    return this.ga.join('');
  }

  // 設定 disabled
  setDisabled(bool) {
    this.d = bool;
  }

  // 檢查並提示 - 得出完全正確的部分 or 字母正確但位置不正確的部分
  check() {
    for (let i = 0; i < this.size; i++) {
      if (this.ga[i] === this.aa[i]) {
        this.cp[i] = this.aa[i];
        this.ci.push(i);
      } else if (this.aa.includes(this.ga[i])) {
        this.ui.push(i);
      }
    }
    return this.cp;
  }

  // clearCorrectPart - 清除正確提示
  clearCP() {
    this.cp = Array(this.size).fill('');
  }

  // 比較答案是否完全一致
  compare() {
    return this.gs === this.as;
  }
}
