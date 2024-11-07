const HISTORICAL_EVENTS = [
    // 各人物とその関連イベントを持つデータ構造
    {
        person: { name: 'image1', image: 'image\image1.jpg' },
        events: [
            { title: 'image2', image: 'image\image2.jpg' },
            { title: 'image3', image: 'image\image3.jpg' },
            { title: 'image4', image: 'image\image4.jpg' }
        ]
    },
    {
        person: { name: 'image5', image: 'image\image5.jpg' },
        events: [
            { title: 'image6', image: 'image\image6.jpg' },
            { title: 'image7', image: 'image\image7.jpg' },
            { title: 'image8', image: 'image\image8.jpg' }
        ]
    },
    {
        person: { name: 'image9', image: 'image\image9.jpg' },
        events: [
            { title: 'image10', image: 'image\image10.jpg' },
            { title: 'image11', image: 'image\image11.jpg' },
            { title: 'image12', image: 'image\image12.jpg' }
        ]
    },
    {
        person: { name: 'image13', image: 'image\image13.jpg' },
        events: [
            { title: 'image14', image: 'image\image14.jpg' },
            { title: 'image15', image: 'image\image15.jpg' },
            { title: 'image16', image: 'image\image16.jpg' }
        ]
    },
    {
        person: { name: 'image17', image: 'image\image17.jpg' },
        events: [
            { title: 'image18', image: 'image\image18.jpg' },
            { title: 'image19', image: 'image\image19.jpg' },
            { title: 'image20', image: 'image\image20.jpg' }
        ]
    },
    {
        person: { name: 'image21', image: 'image\image21.jpg' },
        events: [
            { title: 'image22', image: 'image\image22.jpg' },
            { title: 'image23', image: 'image\image23.jpg' },
            { title: 'image24', image: 'image\image24.jpg' }
        ]
    },
    {
        person: { name: 'image25', image: 'image\image25.jpg' },
        events: [
            { title: 'image26', image: 'image\image26.jpg' },
            { title: 'image27', image: 'image\image27.jpg' },
            { title: 'image28', image: 'image\image28.jpg' }
        ]
    },
    {
        person: { name: 'image29', image: 'image\image29.jpg' },
        events: [
            { title: 'image30', image: 'image\image30.jpg' },
            { title: 'image31', image: 'image\image31.jpg' },
            { title: 'image32', image: 'image\image32.jpg' }
        ]
    },
    {
        person: { name: 'image33', image: 'image\image33.jpg' },
        events: [
            { title: 'image34', image: 'image\image34.jpg' },
            { title: 'image35', image: 'image\image35.jpg' },
            { title: 'image36', image: 'image\image36.jpg' }
        ]
    },
    {
        person: { name: 'image37', image: 'image\image37.jpg' },
        events: [
            { title: 'image38', image: 'image\image38.jpg' },
            { title: 'image39', image: 'image\image39.jpg' },
            { title: 'image40', image: 'image\image40.jpg' }
        ]
    },
    {
        person: { name: 'image41', image: 'image\image41.jpg' },
        events: [
            { title: 'image42', image: 'image\image42.jpg' },
            { title: 'image43', image: 'image\image43.jpg' },
            { title: 'image44', image: 'image\image44.jpg' }
        ]
    },
    {
        person: { name: 'image45', image: 'image\image45.jpg' },
        events: [
            { title: 'image46', image: 'image\image46.jpg' },
            { title: 'image47', image: 'image\image47.jpg' },
            { title: 'image48', image: 'image\image48.jpg' }
        ]
    }
    // 他の人物と出来事を追加できる
];

// 難易度ごとのペア数と制限時間を設定
const DIFFICULTY_SETTINGS = {
    easy: { pairs: 6, timeLimit: 60 },  // 簡単な難易度で6ペア、制限時間60秒
    medium: { pairs: 8, timeLimit: 90 },  // 中級難易度で8ペア、制限時間90秒
    hard: { pairs: 12, timeLimit: 120 }  // 難しい難易度で12ペア、制限時間120秒
};

// ゲーム全体のロジックを管理するクラス
class MemoryGame {
    constructor() {
        // ゲームの状態を管理するための変数を初期化
        this.cards = [];  // カードの情報を管理する配列
        this.flipped = [];  // 現在めくられているカードのインデックスを保存
        this.solved = [];  // 解答済みのカードのインデックスを格納
        this.moves = 0;  // プレイヤーの手数をカウント
        this.timeRemaining = 60;   // 残り時間を管理
        this.gameStarted = false;  // ゲームが開始されているかを確認
        this.isGameOver = false;  // ゲーム終了を示すフラグ
        this.soundEnabled = true;  // 音声のオンオフ設定
        this.timer = null;  // タイマーを管理する変数

        // ゲーム画面のDOM要素を取得して変数に格納
        this.gameBoard = document.getElementById('game-board');   // カードが並ぶエリア
        this.timeDisplay = document.getElementById('time-remaining');  // 残り時間表示
        this.movesDisplay = document.getElementById('moves-count');  // 手数表示
        this.difficultySelect = document.getElementById('difficulty');  // 難易度選択メニュー
        this.soundToggle = document.getElementById('sound-toggle');  // 音声オン・オフボタン
        this.resetButton = document.getElementById('reset-button');  // リセットボタン
        this.scoreBoard = document.getElementById('score-board');  // スコアボード
        this.startMessage = document.getElementById('start-message');  // ゲーム開始メッセージ
        this.finalScoreDisplay = document.getElementById('final-score');  // 最終スコア表示
        this.highScoresList = document.getElementById('high-scores');  // ハイスコアリスト

        // 音声ファイルをDOMから取得して変数に格納
        this.flipSound = document.getElementById('flip-sound');  // カードめくり音
        this.matchSound = document.getElementById('match-sound');  // ペアが一致したときの音
        this.victorySound = document.getElementById('victory-sound');  // 勝利音
        this.gameoverSound = document.getElementById('gameover-sound');  // ゲームオーバー音

        // イベントリスナーの設定（ボタンのクリックなどに対応）
        this.initializeEventListeners();
        // ハイスコアを読み込んで表示する
        this.loadHighScores();
    }

    // ゲームでの各種イベント（難易度選択、音声トグル、リセット）のリスナーを設定
    initializeEventListeners() {
        this.difficultySelect.addEventListener('change', () => this.initializeGame()); // 難易度が選ばれたときにゲームを初期化
        this.soundToggle.addEventListener('click', () => this.toggleSound());  // サウンドトグルボタンがクリックされたときに音声をオン/オフ
        this.resetButton.addEventListener('click', () => this.initializeGame());  // リセットボタンが押されたときにゲームを再スタート
    }

    // ゲームを開始またはリセットする
    initializeGame() {
        const difficulty = this.difficultySelect.value;  // 選択された難易度を取得
        const settings = DIFFICULTY_SETTINGS[difficulty];  // 難易度に対応する設定を取得

        // ゲームの状態をリセット
        this.cards = [];
        this.flipped = [];
        this.solved = [];
        this.moves = 0;
        this.timeRemaining = settings.timeLimit;  // 難易度ごとの制限時間
        this.isGameOver = false;
        this.gameStarted = true;  // ゲームを開始状態にする

        this.updateDisplay();  // 画面上の手数や残り時間を初期化して表示
        this.createCards(settings.pairs);  // カードを生成し、シャッフルして並べる
        this.startTimer();  // タイマーを開始

        // スタートメッセージとスコアボードを非表示にする
        this.startMessage.classList.add('hidden');
        this.scoreBoard.classList.add('hidden');
        // 難易度に応じてボードのスタイルを変更
        this.gameBoard.className = `game-board ${difficulty}`;
    }

    // カードを生成し、ゲームボードに追加する
    createCards(pairs) {  // 選択されたペア数だけHISTORICAL_EVENTSから取得
        const selectedPairs = HISTORICAL_EVENTS.slice(0, pairs);
        // 人物とそのイベントからカードを作成し、シャッフル
        const cardImages = selectedPairs.flatMap(pair => [
            { title: pair.person.name, image: pair.person.image, type: 'person' },// 人物カード
            { title: pair.events[0].title, image: pair.events[0].image, type: 'event' } // イベントカード
        ]).sort(() => Math.random() - 0.5);


        this.gameBoard.innerHTML = '';  // 既存のカードをすべて削除
        cardImages.forEach((item, index) => {
            const card = document.createElement('div');  // 新しいカード要素を作成
            card.className = 'card';  // CSSで見た目を設定するためのクラスを追加
            card.dataset.index = index;
            card.dataset.image = item.image;  // カードのインデックスをデータ属性として設定

            // カードに画像を追加し、隠した状態にする
            const img = document.createElement('img');  // カード内に画像要素を作成
            img.src = item.image;
            img.classList.add('card-image', 'hidden');  // 画像は非表示（隠された状態）から始める
            card.appendChild(img);  // カードに画像を追加

            // カードがクリックされたときのイベントリスナーを追加
            card.addEventListener('click', () => this.handleCardClick(index));  // カードクリック時に反応する
            this.gameBoard.appendChild(card);  // ゲームボードにカードを追加
            this.cards.push({ index, image: item.image, title: item.title, type: item.type });  // カード情報を管理する配列に追加
        });
    }

    // カードがクリックされたときの処理
    handleCardClick(index) {
        // ゲームの進行中にクリック可能か確認
        if (
            !this.gameStarted ||   // ゲームが始まっているか
            this.flipped.length === 2 ||  // 2枚までしか同時にめくらないよう制限
            this.flipped.includes(index) ||  // すでにめくられているカードは無視
            this.solved.includes(index) ||  // 解答済みのカードは無視
            this.isGameOver    // ゲームが終了していないか
        ) {
            return;// 条件が不適ならクリックを無視
        }

        // クリック音を再生し、手数をカウント
        this.playSound(this.flipSound);  // カードをめくる音を再生
        this.flipped.push(index);  // めくったカードのインデックスを記録
        this.moves++;  // 手数をカウント
        this.updateDisplay();  // 画面上の手数と残り時間を更新

        // カードをめくって表示する
        const card = this.gameBoard.children[index];  // クリックしたカードを取得
        const img = card.querySelector('.card-image');  // カード内の画像を取得
        img.classList.remove('hidden');  // 画像を表示
        card.classList.add('flipped');  // CSSクラスを追加し、フリップアニメーションを適用

        // 2枚のカードがめくられたときに一致するか確認
        if (this.flipped.length === 2) {
            this.checkMatch();
        }
    }

    checkMatch() {
        // めくられた2枚のカードのインデックスを取得
        const [first, second] = this.flipped;  // めくられた2枚のインデックスを取得
        const firstCard = this.cards[first];  // 最初のカード情報を取得
        const secondCard = this.cards[second];  // 2枚目のカード情報を取得

        // 2枚が異なるタイプ（personとevent）で、ペアかどうか確認
        if (
            firstCard.type !== secondCard.type &&
            this.isMatchingPair(firstCard.title, secondCard.title)
        ) {
            // ペアが一致した場合、解答済みに追加し音を再生
            this.playSound(this.matchSound);  // 正解音を再生
            this.solved.push(...this.flipped);  // 解答済みカードとして保存

            // すべてのペアが揃ったらゲーム勝利
            if (this.solved.length === this.cards.length) {
                this.handleGameWin();
            }
        }
        // 1秒後にカードを隠すかそのままにする処理
        setTimeout(() => {
            this.flipped.forEach(index => {
                if (!this.solved.includes(index)) {
                    const card = this.gameBoard.children[index];
                    const img = card.querySelector('.card-image');
                    img.classList.add('hidden');  // 画像を再び隠す
                    card.classList.remove('flipped');  // フリップ状態をリセット
                }
            });
            this.flipped = [];  // めくったカードのリストをリセット
        }, 1000);
    }

    isMatchingPair(personTitle, eventTitle) {
        // 2つのタイトルが正しいペアであるかを確認
        return HISTORICAL_EVENTS.some(pair =>
            (pair.person.name === personTitle && pair.events[0].title === eventTitle) ||
            (pair.person.name === eventTitle && pair.events[0].title === personTitle)
        );
    }

    playSound(sound) {
        // サウンドが有効な場合のみ再生
        if (this.soundEnabled && sound) {  // サウンドが有効な場合のみ再生
            sound.currentTime = 0;  // 再生位置をリセット
            sound.play();  // サウンドを再生
        }
    }

    updateDisplay() {
        // 残り時間と手数を画面に表示
        this.timeDisplay.textContent = this.timeRemaining;  // 残り時間を表示
        this.movesDisplay.textContent = this.moves;  // 手数を表示
    }

    toggleSound() {
         // サウンドのオンオフを切り替え、ボタン表示を変更
        this.soundEnabled = !this.soundEnabled;  // サウンド設定を反転
        this.soundToggle.textContent = this.soundEnabled ? '🔊' : '🔇';   // ボタンの表示を更新
    }

    startTimer() {
        // タイマーを開始し、1秒ごとに残り時間を減らす
        if (this.timer) clearInterval(this.timer);  // 既存のタイマーがある場合はクリア

        // 1秒ごとに残り時間を減らして表示を更新
        this.timer = setInterval(() => {
            this.timeRemaining--;
            this.updateDisplay();

            // 時間切れになったらゲームオーバー
            if (this.timeRemaining <= 0) {
                this.handleGameOver();
            }
        }, 1000);
    }

    handleGameWin() {
        // ゲーム終了とし、勝利サウンドを再生しスコアを計算
        this.isGameOver = true;  // ゲームを終了状態に設定
        clearInterval(this.timer);  // タイマーを止める
        this.playSound(this.victorySound);  // 勝利音を再生
        const score = this.calculateScore();  // スコアを計算
        this.updateHighScores(score);  // ハイスコアを更新
        this.showScoreBoard(true);  // スコアボードを表示
    }

    // ゲームオーバーの処理（時間切れ）
    handleGameOver() {
        this.isGameOver = true;  // ゲームを終了状態に設定
        clearInterval(this.timer);  // タイマーを止める
        this.playSound(this.gameoverSound);  // ゲームオーバー音を再生
        this.showScoreBoard(false);  // スコアボードを表示
    }

     // スコアを計算する
    calculateScore() {
        const baseScore = this.solved.length * 100;  // 解答済みペアに基づく基本スコア
        const timeBonus = this.timeRemaining * 10;  // 残り時間に応じたボーナス
        const movesPenalty = this.moves * 5;  // 手数に応じたペナルティ
        return Math.max(0, baseScore + timeBonus - movesPenalty);  // スコアが0未満にならないように調整
    }

    // ハイスコアを更新するメソッド
    updateHighScores(score) {
        const difficulty = this.difficultySelect.value;  // 現在の難易度を取得
        const highScores = this.loadHighScores();  // ハイスコアをロード

        highScores[difficulty].push({ // 新しいスコアをハイスコアに追加し、上位5つのみを保存
            score,
            moves: this.moves,
            timeRemaining: this.timeRemaining
        });

        highScores[difficulty].sort((a, b) => b.score - a.score);  // スコアを降順で並べ替え
        highScores[difficulty] = highScores[difficulty].slice(0, 5); // 上位5つに限定

        localStorage.setItem('memoryGameHighScores', JSON.stringify(highScores));  // 更新後のハイスコアを保存
    }

    // ローカルストレージからハイスコアを読み込む
    loadHighScores() {
        const saved = localStorage.getItem('memoryGameHighScores');  // 保存されたハイスコアを取得
        return saved ? JSON.parse(saved) : { easy: [], medium: [], hard: [] };  // 保存データがあれば解析し、なければ空データ
    }

    // スコアボードを表示するメソッド（勝利/敗北メッセージ）
    showScoreBoard(won) {
        const difficulty = this.difficultySelect.value; // 現在の難易度を取得
        const highScores = this.loadHighScores(); // ハイスコアを読み込む
        const finalScore = this.calculateScore(); // 最終スコアを計算

        // 勝利時または敗北時のメッセージを表示
        this.finalScoreDisplay.textContent = won
            ? `おめでとうございます！スコア: ${finalScore}点 (${this.moves}手 / 残り${this.timeRemaining}秒)`
            : 'タイムアップ！';

        // ハイスコアリストを表示
        this.highScoresList.innerHTML = highScores[difficulty]
            .map((score, index) => `
                <div>
                    ${index + 1}位: ${score.score}点
                    (${score.moves}手 / 残り${score.timeRemaining}秒)
                </div>
            `)
            .join('');

        this.scoreBoard.classList.remove('hidden');// スコアボードを表示
    }
}

// ページが完全に読み込まれたらゲームを初期化して開始準備を整える
document.addEventListener('DOMContentLoaded', () => {
    new MemoryGame();  MemoryGameクラスのインスタンスを作成してゲームを準備
});