import "./home.css";
import chat_bubble from "../assets/chat_bubble.png";
import link from "../assets/link.png";
import arrow from "../assets/arrow.png";

export default function Home() {
  return (
    <div className="home">
      <section className="banner">
        <div className="site-container banner-row">
          <div className="banner-left">
            <img src={chat_bubble} alt="말풍선" className="img-bubble" />
          </div>
          <div className="banner-right">
            <p className="banner-eyebrow">
              <strong>당신과 함께하는</strong> 든든한 연결
            </p>
          </div>
        </div>
      </section>

      <section className="site-container hero">
        <div className="hero-grid">
          <div className="hero-text">
            <h1 className="title">Safe Connect</h1>
            <p className="subtitle">
              가정폭력 없는 사회, 당신의 작은 참여로 시작됩니다. <br />
              지금 함께해 주세요!
            </p>
          </div>

          <div className="hero-visual">
            <img src={link} alt="연결 체인" className="chain-img" />
          </div>
        </div>
      </section>


    <section id="background" className="site-container background">
    <div className="section-pill">개발 배경</div>


    <div className="bg-row">
        <div className="bg-label"><span>문제 상황</span></div>
        <div className="bg-leader" aria-hidden />
        <div className="bg-content">
        <ul className="dot-list">
            <li>매년 가정폭력 신고 건수 증가 / 피해자 지원시설 지역별 편차 심화</li>
            <li>내 상황이 위험한지, 어디서 도움을 받을 수 있는지 즉시 알기 어려움</li>
            <li>사회 전반적으로 가정폭력에 대한 인식이 부족해 은폐된 피해가 존재</li>
        </ul>
        </div>
    </div>


    <div className="bg-row">
    <div className="bg-label"><span>문제 정의</span></div>
    <div className="bg-leader" aria-hidden />
    <div className="bg-content">
        <p className="definition">
        ” 가정폭력 문제는 데이터로 드러나는 
        <span className="highlight-blue"> 신고 · 시설 격차 </span>
        뿐만 아니라,<br/>
        <span className="highlight-red"> 인지 부족 → 도움 미흡 → 법률적 공백 </span>
        이 연결된 복합적 문제 ”
        </p>
    </div>
    </div>

    <div className="bg-bottom">
        <img src={arrow} alt="" className="arrow-img" />
        <p className="bg-summary">
            따라서 데이터 기반 정책 지원 + 시민 자가진단 + 상담/법률 연결 + 인식 개선 교육을 <br />
            모두 아우르는 통합 플랫폼이 필요
        </p>
    </div>
    </section>
    </div>
  );
}
