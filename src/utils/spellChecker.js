import words from 'an-array-of-english-words';

class WordleGame {
  constructor(difficulty = 'normal') {
    this.difficulty = difficulty;
    this.config = WordleGame.difficulties[this.difficulty];
    this.length = this.config.length;
    this.name = this.config.name;
  }

  // 難度配置
  static difficulties = {
    newbie: { length: 3, name: '新手' },
    easy: { length: 4, name: '簡單' },
    normal: { length: 5, name: '普通' },
    hard: { length: 6, name: '困難' },
  };

  // 按長度分組單詞
  static groupWordsByLength() {
    if (!words || !Array.isArray(words)) {
      throw new Error('無法載入單詞列表');
    }

    const grouped = {};
    words.forEach((word) => {
      // 添加字串驗證
      if (typeof word === 'string' && word.length > 0) {
        const length = word.length;
        if (!grouped[length]) {
          grouped[length] = [];
        }
        grouped[length].push(word.toLowerCase());
      }
    });

    // 轉換為 Set 以提高查詢效率
    Object.keys(grouped).forEach((length) => {
      grouped[length] = {
        words: grouped[length],
        wordSet: new Set(grouped[length]),
      };
    });
    return grouped;
  }

  static get wordsByLength() {
    if (!this._wordsByLength) {
      this._wordsByLength = this.groupWordsByLength();
    }
    return this._wordsByLength;
  }

  get difficulties() {
    return Object.entries(WordleGame.difficulties).map(([key, config]) => ({
      key,
      name: config.name,
      length: config.length,
      availableWords:
        WordleGame.wordsByLength[config.length]?.words.length || 0,
    }));
  }

  /**
   * 將日期轉換為種子值
   */
  static dateToSeed(date = new Date()) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // 創建一個基於日期的唯一種子，這樣每天都會有不同但固定的種子
    return year * 10000 + month * 100 + day;
  }

  /**
   * 基於日期的偽隨機數生成器 (Seeded Random)
   * 使用簡單的線性同餘生成器 (LCG)
   */
  static seededRandom(seed) {
    let state = seed;
    return function () {
      state = (state * 1664525 + 1013904223) % Math.pow(2, 32);
      return state / Math.pow(2, 32);
    };
  }

  /**
   * 檢查單詞是否有效
   */
  isValidWord(word) {
    const wordLower = word.toLowerCase();
    return (
      WordleGame.wordsByLength[this.length]?.wordSet.has(wordLower) || false
    );
  }

  /**
   * 獲取每日挑戰單詞
   */
  getDailyWord(date = new Date()) {
    const wordsForLength = WordleGame.wordsByLength[this.length];
    if (!wordsForLength || wordsForLength.words.length === 0) {
      throw new Error(`沒有找到長度為 ${this.length} 的單詞`);
    }

    // 基於日期和難度創建種子
    const baseSeed = WordleGame.dateToSeed(date);
    const difficultySeed = this.difficulty
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const finalSeed = baseSeed + difficultySeed;

    // 使用種子隨機數選擇單詞
    const random = WordleGame.seededRandom(finalSeed);
    const randomIndex = Math.floor(random() * wordsForLength.words.length);

    return {
      word: wordsForLength.words[randomIndex].toLowerCase(),
      difficulty: this.name,
      length: this.length,
      date: new Date().toISOString().slice(0, 10).replace(/-/g, ''),
    };
  }

  /**
   * 獲取隨機單詞（用於練習模式）
   */
  getRandomWord() {
    const wordsForLength = WordleGame.wordsByLength[this.length];
    if (!wordsForLength || wordsForLength.words.length === 0) {
      throw new Error(`沒有找到長度為 ${this.length} 的單詞`);
    }

    const randomIndex = Math.floor(Math.random() * wordsForLength.words.length);
    return {
      word: wordsForLength.words[randomIndex].toLowerCase(),
      difficulty: this.name,
      length: this.length,
    };
  }
}

export default WordleGame;
