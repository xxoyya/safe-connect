import { useState } from "react";
import Title from "../components/Title";
import Button from "../components/Button";
import "./edu.css";

import Account from "../assets/Account.png";
import rank1 from "../assets/rank1.png";
import rank2 from "../assets/rank2.png";
import rank3 from "../assets/rank3.png";

import img1 from "../assets/sample.png";
import img2 from "../assets/sample.png";
import img3 from "../assets/sample.png";

import Phone from "../assets/Phone.png";

type OxQ = { text: string; answer: "O" | "X" };

const OX_QUESTIONS: OxQ[] = [
  { text: "가정폭력으로 신고하면 곧바로 이혼이 된다.", answer: "X" },
  { text: "가정폭력 피해자는 자녀들을 생각해서 참고 살아야 한다.", answer: "X" },
  { text: "부부싸움은 집안에서 해결해야 한다.", answer: "X" },
  { text: "맞을 짓을 했으니 맞는다. 몇 대 때릴 수도 있다.", answer: "X" },
  { text: "우리나라의 가정폭력은 갈수록 줄어들고 있다.", answer: "X" },
  { text: "폭력이 있어도 창피하니 참아야 한다.", answer: "X" },
  { text: "부부·사실혼 관계면 법적 조치가 더 안 된다.", answer: "X" },
  { text: "가정폭력을 고소/신고하면 불효다.", answer: "X" },
  { text: "가정폭력은 흔히 있을 수 있는 일이다.", answer: "X" },
  { text: "맞고 사는 아내에게 문제가 있다.", answer: "X" },
  { text: "가정폭력방지법은 성별·나이 무관, 가정 내 모든 폭력에 적용된다.", answer: "O" },
  { text: "가정폭력방지법은 성별·나이 무관, 가정 내 모든 폭력에 적용된다.(동일문항)", answer: "O" },
  { text: "가정폭력 신고는 112 또는 여성긴급전화 1366 등에 전화/방문하면 된다.", answer: "O" },
  { text: "가정폭력 방지법의 목적은 처벌이 아니라 폭력 제지·예방 교육이다.", answer: "O" },
  { text: "1998.07.01 시행된 특례법은 ‘방지·피해자 보호’와 ‘처벌 특례’로 구성된다.", answer: "O" },
  { text: "가정폭력을 피해 집을 나왔을 때는 보호시설을 이용할 수 있다.", answer: "O" },
  { text: "가정폭력 사건이 모두 형사처벌로 전과가 남는 것은 아니다(가정보호사건 가능).", answer: "O" },
  { text: "경제권 통제·강제적 재산관리 등도 가정폭력에 해당할 수 있다.", answer: "O" },
  { text: "가정폭력은 모두가 힘을 모아 뿌리 뽑아야 할 사회악이다.", answer: "O" },
  { text: "모욕·욕설·무시 등 정서적 학대도 폭력에 속한다.", answer: "O" },
];

type RankUser = { name: string; score: number };

const RANK: RankUser[] = [
  { name: "닉네임", score: 18 },
  { name: "닉네임", score: 16 },
  { name: "닉네임", score: 14 },
  { name: "닉네임", score: 12 },
  { name: "닉네임", score: 10 },
];

export default function Edu() {
  // 이미지 슬라이더
  const images = [img1, img2, img3];
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((n) => (n - 1 + images.length) % images.length);
  const next = () => setIdx((n) => (n + 1) % images.length);

  // 퀴즈 모드: start | quiz | result
  const [mode, setMode] = useState<"start" | "quiz" | "result">("start");
  const [qIndex, setQIndex] = useState(0);
  const [qScore, setQScore] = useState(0);

  const startQuiz = () => {
    setMode("quiz");
    setQIndex(0);
    setQScore(0);
  };

  const choose = (choice: "O" | "X") => {
    const cur = OX_QUESTIONS[qIndex];
    if (!cur) return;
    if (choice === cur.answer) setQScore((s) => s + 1);

    const nextIdx = qIndex + 1;
    if (nextIdx >= OX_QUESTIONS.length) {
      setMode("result");
    } else {
      setQIndex(nextIdx);
    }
  };

  const restart = () => {
    setMode("start");
    setQIndex(0);
    setQScore(0);
  };

  const total = OX_QUESTIONS.length;

  return (
    <>
      <Title text="교육 콘텐츠" />

      {/* 이미지 슬라이더 */}
      <div className="edu-slider">
        <button type="button" className="arrow left" onClick={prev} aria-label="이전">
          ❮
        </button>
        <img src={images[idx]} alt={`slide-${idx + 1}`} className="slide-img" />
        <button type="button" className="arrow right" onClick={next} aria-label="다음">
          ❯
        </button>
      </div>

      {/* 퀴즈 섹션 */}
      <div className="quiz">
        <Title text="퀴즈" />

        {/* 순위 */}
        <section className="rank">
          <div className="rank-pill">순위</div>
          <ul className="rank-row" role="list">
            {RANK.map((u, i) => {
              const medalSrc = i === 0 ? rank1 : i === 1 ? rank2 : i === 2 ? rank3 : null;
              return (
                <li key={i} className="rank-item">
                  <div className="medal-slot">{medalSrc && <img src={medalSrc} alt={`${i + 1}위`} />}</div>
                  <div className="avatar"><img src={Account} alt="아바타" /></div>
                  <div className="nick">{u.name}</div>
                  <div className="score">{u.score}</div>
                </li>
              );
            })}
          </ul>
        </section>

        {/* 고정 카드(시작→문제→결과 모두 동일 프레임) */}
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
                <span className="q-progress">{qIndex + 1} / {total}</span>
              </div>

              <div className="q-question">
                {OX_QUESTIONS[qIndex].text}
              </div>

              <div className="q-choices">
                <button type="button" className="q-choice q-o" onClick={() => choose("O")} aria-label="O">
                  O
                </button>
                <button type="button" className="q-choice q-x" onClick={() => choose("X")} aria-label="X">
                  X
                </button>
              </div>
            </div>
          )}

          {mode === "result" && (
            <div className="q-result">
              <h3 className="q-result-title">결과</h3>
              <p className="q-result-score">
                맞춘 개수 <b>{qScore}</b> / {total}
              </p>
              <div className="q-actions">
                <Button onClick={restart} text="다시 시작" />
              </div>
            </div>
          )}
        </section>
      </div>

      {/* 무료 법률자문 */}
      <div className="legal-help">
        <div className="lh-row">
          <div className="lh-left">
            <h3 className="lh-title">무료 법률자문 전화번호</h3>
            <div className="lh-box">
              <div className="lh-icon">
                <img src={Phone} alt="전화" />
              </div>
              <ul className="lh-list">
                <li><span>대한법률구조공단</span><b>132</b></li>
                <li><span>한국가정법률 상담소</span><b>1644-7077</b></li>
                <li><span>대한변협법률구조재단</span><b>02-3476-6515</b></li>
                <li><span>한국여성폭력위기센터</span><b>02-883-9284</b></li>
                <li><span>한국여성변호사회</span><b>02-2087-7865</b></li>
              </ul>
            </div>
          </div>
          <div className="lh-rect" aria-hidden />
        </div>
      </div>
    </>
  );
}
