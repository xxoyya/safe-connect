import { useState } from "react";
import Title from "../components/Title";
import Button from "../components/Button";
import "./edu.css";

import Account from "../assets/Account.png";
import rank1 from "../assets/rank1.png";
import rank2 from "../assets/rank2.png";
import rank3 from "../assets/rank3.png";
import profil1 from "../assets/profil/profil1.jpg";
import profil2 from "../assets/profil/profil2.jpg";
import profil3 from "../assets/profil/profil3.jpg";
import profil4 from "../assets/profil/profil4.jpg";
import profil5 from "../assets/profil/profil5.jpg";

import page1 from "../assets/card_news/page1.png";
import page2 from "../assets/card_news/page2.png";
import page3 from "../assets/card_news/page3.png";
import page4 from "../assets/card_news/page4.png";

import Phone from "../assets/Phone.png";

type OxQ = { text: string; answer: "O" | "X" };

const OX_QUESTIONS: OxQ[] = [
  { text: "가정폭력으로 신고하면 곧바로 이혼이 된다.", answer: "X" },
  {
    text: "가정폭력 피해자는 자녀들을 생각해서 참고 살아야 한다.",
    answer: "X",
  },
  { text: "부부싸움은 칼로 물 베기. 집안에서 해결해야 한다. ", answer: "X" },
  { text: "맞을 짓을 했으니 맞는다. 몇 대 때릴 수도 있다.", answer: "X" },
  { text: "우리나라의 가정폭력은 갈수록 줄어들고 있다.", answer: "X" },
  {
    text: "폭력이 있을 때 경찰이나 이웃에 알리게 되면 창피하고 남부끄러운 일이므로 참는다. ",
    answer: "X",
  },
  {
    text: "부부관계라 처리가 안된다. 사실혼관계에 있는 사람은 법적인 조치가 더욱 안된다. ",
    answer: "X",
  },
  {
    text: "여자가 어떻게 남편을 고소하나, 아버지를 신고하는 자식은 호로자식이다. ",
    answer: "X",
  },
  { text: "가정폭력은 흔히 있을 수 있는 일이다.", answer: "X" },
  { text: "맞고 사는 아내에게 문제가 있다.", answer: "X" },
  {
    text: "가정폭력방지법은 성별과 나이 관계를 불문하고 가정에서 일어나는 신체·정서·언어·경제 등 모든 폭력에 적용된다.",
    answer: "O",
  },
  {
    text: "가정폭력 신고는 112 및 가까운 지구대, 파출소 등의 수사기관이나, 여성긴급전화 국번없이1366에 전화 또는 직접 찾아가 신고하면 된다.",
    answer: "O",
  },
  {
    text: "가정폭력 방지법은 처벌이 아니라 부부를 포함한 가족 간의 폭력을 제지하고 예방 교육하는 것이 목적이다.",
    answer: "O",
  },
  {
    text: "1998년 7월 1일부터 시행중인 가정폭력특례법은 가정폭력 방지 및 피해자 보호 등에 관한 법률과 가정폭력 범죄의 처벌 등에 관한 특례법이다.",
    answer: "O",
  },
  {
    text: "가정폭력을 피해 집을 나와 당장 집으로 돌아가기도 어렵고, 남의 도움을 받기도 어렵다면 보호시설을 이용하실 수 있다.",
    answer: "O",
  },
  {
    text: "가정폭력 범죄로 신고 되더라도 모두 형사처벌을 받아 전과자가 되는것은 아니며, 가정보호 사건으로 처리되는 경우에는 범죄경력이 남지 않는다.",
    answer: "O",
  },
  {
    text: "강제적으로 돈과 재산을 가져가거나 통제하며 일을 못하게 하고 경제권을 남편이 통제, 관리하는 등의 행위도 가정폭력이다.",
    answer: "O",
  },
  {
    text: "가정폭력은 우리 모두가 힘을 모아 뿌리 뽑아야 할 사회악이다.",
    answer: "O",
  },
  {
    text: "정서적인 학대도 폭력에 속한다. 즉, 모욕을 준다던지 굴욕과 비난, 무시, 욕설등도 포함된다. ",
    answer: "O",
  },
  { text: "가정폭력은 어쨌든 부부싸움이다.", answer: "X" },
  { text: "자식이 잘못하면 때려서라도 가르쳐야 한다.", answer: "X" },
  { text: "가정폭력은 가난한 집안에서 많다. ", answer: "X" },
  { text: "남편은 스트레스가 쌓여서 아내를 구타한다.", answer: "X" },
  {
    text: "아내가 아무리 남편에게 잘 해주어도 남편의 폭력은 중단될 수 없다. ",
    answer: "O",
  },
  {
    text: "비록 남편이 아내를 구타하기는 하지만, 정신적인 문제는 전혀 없다.  ",
    answer: "O",
  },
  { text: "학대를 당하는 아내에게도 문제가 있을 수 있다.", answer: "X" },
];

const EXPLANATIONS: string[] = [
  "가정폭력으로 신고 했다고 해서 이혼이 되는 것은 아니고 이혼은 가정폭력특례법상의 절차와는 별도로 당사자들의 자유로운 의사나 재판절차에 따라 이루어지는 것이다.",
  "자녀도 건강한 가정을 원한다. 매일 싸우면서 폭력을 휘두르고 폭언으로 상처를 입히는 자녀들의 가슴은 멍들고 분노가 쌓여가고 있다. 폭력을 보고 자란 자녀들은 은연중에 폭력을 학습 받게 되어 부모와 같은 삶을 세습하게 되는 경우가 대다수 있다.",
  "가정폭력은 살인을 부르기까지 하는 심각한 인권침해이며, 개인의 성장을 해치고 폭력사회를 조장하는 범죄 행위이며자존감을 저하시키고 황폐화시키는 주요인이 될 수 있다.",
  "어떤 경우에도 폭력은 용인될 수 없으며 모든 인간은 존엄하며 맞을 짓이란 없다. 아무리 큰 죄를 지었다하더라도 죄에대한 댓가는 법에서 내려줄 것이며 폭력으로 해결되는 것은 없다.",
  "가정폭력은 갈수록 늘어나고 있는 추세에 있으며 가정폭력범죄의 처벌에 관한 특례법도 강화되고 있다. 여성긴급전화「1366」은  가정폭력피해 시 적극적으로 대처하는 방법과 건강한 가정의 중요성에 대해 예방교육 및 홍보를 통해 알리고 있다.",
  "가정폭력은 참는다고 결코 해결되지 않는다. 가해자들은 아내가 참고 수용하는 태도를 보일때 혹은 가해자의 기분에 따라서 트집을 잡고 구실을 만들어 폭력을 행사하므로 평생토록 폭력에서 벗어나기 힘들다.",
  "가정폭력방지법은 부부를 포함한 가족 간의 폭력을 제지하고 예방 교육하는 것이 목적이다. 현재의 법적인 가족만이 아니라 과거의 사실혼 및 양자관계등도 포함된다.",
  " 모든사람은 인간답게 살 권리가 있다. 가정폭력은 피해자·가해자 모두를 황폐하게 만들고 사회전반에 폭력을 확산하게 되므로 112에 신고하여 공권력의 개입과 도움을 받도록 적극적으로 격려하고 지원해야 한다.",
  '이것은 아내와 아이를 자신의 소유물로 생각하는 가부장 사회의 산물입니다."못된 아내는 때려서라도 길들여야 한다." "남편이 화가 나면 손찌검 정도는 해도 괜찮다." "아이는 때려서 가르쳐야 한다." 위와 같은 잘못된 사회 통념 때문에 아내 구타가 용납되고 정당화되어 만연되는 것입니다. 그러나 아내폭력, 아동폭력은 한 가정을 폭력의 도가니로 만들어 가정폭력의 피해자들은 그 속에서 불안과 공포에 떨며 폭력의 노예가 되어 갑니다. 설혹 어떤 문제가 생겼을 때 가벼운 손찌검일지라도 아내나 아동에게 폭력을 사용하는 것은 올바른 가족관계가 아니다.',
  "폭력을 당하는 아내는 반복된 폭력으로 인해 헤어나지 못할 정도로 무기력해지고 폭력에 대한 극심한 공포 속에서 나날을 보내게  된다. 그럼에도 그들이 폭력상황을 벗어나지 못하는 가장 큰 이유는 아이들의 문제, 경제적 독립의 불가능, 맞을 짓을 했기 때문이라고 보는 사회적 편견 때문이다. 따라서 아내에 대한 폭력은 개개인의 잘잘못의 문제가 아니라 사회적 문제로 인식해야 한다.",
  "성별·나이와 무관하게 모든 폭력에 적용됩니다.",
  "112 또는 1366 등으로 도움을 요청할 수 있습니다.",
  "목적은 처벌뿐 아니라 폭력 제지와 예방 교육이에요.",
  "1998년부터 방지·보호와 처벌 특례가 시행됐습니다.",
  "보호시설을 통해 긴급 대피가 가능합니다.",
  "모든 사건이 전과로 남는 건 아니고, 가정보호사건은 범죄경력으로 남지 않습니다.",
  "경제적 통제·강제 역시 가정폭력에 포함됩니다.",
  "사회 전체가 함께 근절해야 할 문제예요.",
  "모욕·욕설·무시 등 정서적 학대도 폭력에 포함됩니다.",
  '"부부싸움은 칼로 물 베기"라는 속담도 있듯 우리는 "아내폭력도 칼로 물 베기"라고 생각하거나, 가정 내 문제라고 생각합니다. 그러나 가정폭력은 피해자에게 치명적 신체적 손상을 야기한다는 점에서 부부싸움이나 사랑의 매와는 다릅니다',
  "우리 사회는 아이들에 대한 체벌을 정당화해 왔습니다. 통계에 의하면 아이에 대한 구타 시작 시기가 훈육의 가능성을 찾을 나이가 아니라고 합니다. 이것은 바로 그 구타가 훈육과 교육의 목적이 아니라는 것을 잘 보여주는 일이며 아이들은 때려서 가르쳐야 한다는 것은 잘못된 생각입니다",
  "일반적으로 학력과 사회계층이 높을수록 가정폭력이 적을 것으로 생각되나 전문직 종사자, 성직자에서부터 직종, 교육 정도에 상관없이 가정폭력이 발생하고 있습니다.",
  "폭력행위를 합리화하기 위한 하나의 변명입니다. 스트레스는 누구에게나 있습니다. 직장상사에게 질책을 당했다고, 실직을 했으니까..등등 가정폭력을 스트레스 탓으로 이해해 버리는 경향이 많습니다",
  "가정폭력은 아내의 성품과 행위에 상관없이 일어납니다. 변해야 하는 사람은 아내가 아니라 폭력을 행사하는 남편입니다. 폭력행위에 대한 책임을 가해자가 전적으로 수용해야 합니다.",
  "많은 부분이 사실입니다. 법적인 처벌을 피하기 위하여 정신병 때문에 아내를 구타한다고 합리화시켜서는 안 됩니다",
  "폭력 당하는 아내는 반복된 폭력으로 인해 헤어나지 못할 정도로 무기력해지고, 폭력에 대한 극심한 공포 속에서 살아가게 됩니다. 그럼에도 그들이 폭력상황을 벗어나지 못하는 가장 큰 이유는 아이들 문제, 경제적 독립의 불가능, 맞을 짓을 했기 때문이라고 보는 사회적 편견 때문입니다.",
];

type RankUser = { name: string; score: number };

const RANK: RankUser[] = [
  { name: "랭킹헌터", score: 26 },
  { name: "점수는내꺼", score: 25 },
  { name: "골든벨러", score: 23 },
  { name: "최고점찍자", score: 20 },
  { name: "챌린저", score: 19 },
];

const AVATARS: Record<string, string> = {
  랭킹헌터: profil1,
  점수는내꺼: profil2,
  골든벨러: profil3,
  최고점찍자: profil4,
  챌린저: profil5,
};

export default function Edu() {
  const images = [page1, page2, page3, page4];
  const [nickname, setNickname] = useState("");
  const getAvatar = (name: string) => AVATARS[name] ?? Account;
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((n) => (n - 1 + images.length) % images.length);
  const next = () => setIdx((n) => (n + 1) % images.length);

  type Mode = "start" | "quiz" | "feedback" | "result";
  const [mode, setMode] = useState<Mode>("start");
  const [qIndex, setQIndex] = useState(0);
  const [qScore, setQScore] = useState(0);
  const [lastChoice, setLastChoice] = useState<"O" | "X" | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  
  const startQuiz = () => {
    setMode("quiz");
    setQIndex(0);
    setQScore(0);
    setLastChoice(null);
    setIsCorrect(null);
  };

  const choose = (choice: "O" | "X") => {
    const cur = OX_QUESTIONS[qIndex];
    if (!cur) return;
    const correct = choice === cur.answer;
    setLastChoice(choice);
    setIsCorrect(correct);
    if (correct) setQScore((s) => s + 1);
    setMode("feedback");
  };

  const goNext = () => {
    const nextIdx = qIndex + 1;
    if (nextIdx >= OX_QUESTIONS.length) {
      setMode("result");
    } else {
      setQIndex(nextIdx);
      setMode("quiz");
      setLastChoice(null);
      setIsCorrect(null);
    }
  };

  const restart = () => {
    setMode("start");
    setQIndex(0);
    setQScore(0);
    setLastChoice(null);
    setIsCorrect(null);
  };

  const total = OX_QUESTIONS.length;

  return (
    <>
      <Title text="교육 콘텐츠" />

      <div className="edu-slider">
        <button
          type="button"
          className="arrow left"
          onClick={prev}
          aria-label="이전"
        >
          ❮
        </button>
        <img src={images[idx]} alt={`slide-${idx + 1}`} className="slide-img" />
        <button
          type="button"
          className="arrow right"
          onClick={next}
          aria-label="다음"
        >
          ❯
        </button>
      </div>

      <div className="quiz">
        <Title text="퀴즈" />

        <section className="rank">
          <div className="rank-pill">순위</div>
          <ul className="rank-row" role="list">
            {RANK.map((u, i) => {
              const medalSrc =
                i === 0 ? rank1 : i === 1 ? rank2 : i === 2 ? rank3 : null;
              return (
                <li key={i} className="rank-item">
                  <div className="medal-slot">
                    {medalSrc && <img src={medalSrc} alt={`${i + 1}위`} />}
                  </div>
                  <div className="avatar">
                    <img src={getAvatar(u.name)} alt={`${u.name} 아바타`} />
                  </div>

                  <div className="nick">{u.name}</div>
                  <div className="score">{u.score}</div>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="q-card q-card--fixed">
          {mode === "start" && (
            <div className="q-start">
              <Button onClick={startQuiz} text="시작하기" />
            </div>
          )}

          {mode === "quiz" && (
            <div className="q-body">
              <div className="q-head">
                <span className="q-pill">문제 {qIndex + 1}</span>
                <span className="q-progress">
                  {qIndex + 1} / {total}
                </span>
              </div>

              <div className="q-question">{OX_QUESTIONS[qIndex].text}</div>

              <div className="q-choices">
                <button
                  type="button"
                  className="q-choice q-o"
                  onClick={() => choose("O")}
                  aria-label="O"
                >
                  O
                </button>
                <button
                  type="button"
                  className="q-choice q-x"
                  onClick={() => choose("X")}
                  aria-label="X"
                >
                  X
                </button>
              </div>
            </div>
          )}

          {mode === "feedback" && (
            <div className="q-body">
              <div className="q-head">
                <span className="q-pill">문제 {qIndex + 1}</span>
                <span className="q-progress">
                  {qIndex + 1} / {total}
                </span>
              </div>
              <div
                className={`q-badge ${isCorrect ? "is-correct" : "is-wrong"}`}
              >
                {isCorrect ? "정답!" : "오답"}
              </div>
              <p>내 선택: {lastChoice}</p>
              <p className="q-explain">{EXPLANATIONS[qIndex]}</p>
              <button type="button" className="q-next-arrow" onClick={goNext}>
                ❯
              </button>
            </div>
          )}

          {mode === "result" && (
            <div className="q-result">
              <h3 className="q-result-title">결과</h3>
              <p className="q-result-score">
                맞춘 개수 <b>{qScore}</b> / {total}
              </p>

              <div className="q-nickname">
                <input
                  id="nickname-input"
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="닉네임을 입력하세요"
                />
                <Button onClick={() => alert("저장했습니다")} text="저장하기" />
              </div>

              <div className="q-actions">
                <Button onClick={restart} text="다시 시작" />
              </div>
            </div>
          )}
        </section>
      </div>

      <div className="legal-help">
        <div className="lh-row">
          <div className="lh-left">
            <h3 className="lh-title">무료 법률자문 전화번호</h3>
            <div className="lh-box">
              <div className="lh-icon">
                <img src={Phone} alt="전화" />
              </div>
              <ul className="lh-list">
                <li>
                  <span>대한법률구조공단</span>
                  <b>132</b>
                </li>
                <li>
                  <span>한국가정법률 상담소</span>
                  <b>1644-7077</b>
                </li>
                <li>
                  <span>대한변협법률구조재단</span>
                  <b>02-3476-6515</b>
                </li>
                <li>
                  <span>한국여성폭력위기센터</span>
                  <b>02-883-9284</b>
                </li>
                <li>
                  <span>한국여성변호사회</span>
                  <b>02-2087-7865</b>
                </li>
              </ul>
            </div>
          </div>
          <div className="lh-rect" aria-hidden />
        </div>
      </div>
    </>
  );
}
