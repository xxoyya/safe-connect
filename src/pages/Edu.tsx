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

type RankUser = { name: string; score: number };

const RANK: RankUser[] = [
  { name: "닉네임", score: 18 },
  { name: "닉네임", score: 16 },
  { name: "닉네임", score: 14 },
  { name: "닉네임", score: 12 },
  { name: "닉네임", score: 10 },
];

export default function Edu() {
  const images = [img1, img2, img3];
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((n) => (n - 1 + images.length) % images.length);
  const next = () => setIdx((n) => (n + 1) % images.length);

  return (
    <>
      <Title text="데이터 대시보드" />

      <div className="edu-slider">
        <button type="button" className="arrow left" onClick={prev} aria-label="이전">
          ❮
        </button>
        <img src={images[idx]} alt={`slide-${idx + 1}`} className="slide-img" />
        <button type="button" className="arrow right" onClick={next} aria-label="다음">
          ❯
        </button>
      </div>





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
                  {/* 1~3위만 메달, 4~5위는 빈공간 확보 */}
                  <div className="medal-slot">
                    {medalSrc && <img src={medalSrc} alt={`${i + 1}위`} />}
                  </div>

                  {/* 공통 아바타 */}
                  <div className="avatar">
                    <img src={Account} alt="아바타" />
                  </div>

                  <div className="nick">{u.name}</div>
                  <div className="score">{u.score}</div>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="quiz-start">
        <div className="quiz-start__inner">
          <Button text="시작하기" onClick={() => console.log("Start Clicked")} />
        </div>
      </section>

      <section className="helpline">
        <h3 className="help-title">무료 법률자문 전화번호</h3>

        <div className="help-box">
          <ul className="help-list">
            <li>대한법률구조공단: <b>132</b></li>
            <li>한국가정법률 상담소: <b>1644-7077</b></li>
            <li>대한변협법률구조재단: <b>02-3476-6515</b></li>
            <li>한국여성폭력위기센터: <b>02-883-9284</b></li>
            <li>한국여성변호사회: <b>02-2087-7865</b></li>
          </ul>

          <div className="help-rectangle"></div>
        </div>
      </section>

      </div>
    </>
  );
}