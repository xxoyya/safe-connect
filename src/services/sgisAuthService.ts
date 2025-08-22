class SgisAuthService {
  private consumerKey: string;
  private consumerSecret: string;
  private accessToken: string | null = null;
  private tokenExpiresAt: number = 0;
  private tokenPromise: Promise<string> | null = null;

  constructor(consumerKey: string, consumerSecret: string) {
    if (!consumerKey || !consumerSecret) {
      throw new Error("SGIS Consumer Key and Secret must be provided.");
    }
    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
  }

  /**
   * 새로운 AccessToken을 발급받는 내부 함수
   */
  private async fetchNewToken(): Promise<string> {
    try {
      console.log("새로운 AccessToken 발급을 시도합니다...");
      const response = await fetch(
        `https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`
      );
      if (!response.ok) {
        throw new Error(`인증 서버 오류: ${response.statusText}`);
      }
      const data = await response.json();
      if (data.errCd !== 0) {
        throw new Error(`인증 토큰 발급 실패: ${data.errMsg}`);
      }

      this.accessToken = data.result.accessToken;
      const expiresInSeconds = 4 * 60 * 60 - 300; // 3시간 55분
      this.tokenExpiresAt = Date.now() + expiresInSeconds * 1000;

      console.log("AccessToken이 성공적으로 발급되었습니다.");
      return this.accessToken!;
    } catch (error) {
      // 실패 시 토큰 정보 초기화
      this.accessToken = null;
      this.tokenExpiresAt = 0;
      console.error(error);
      throw error;
    }
  }

  /**
   * 유효한 AccessToken을 반환하는 메인 함수
   * 토큰이 없거나 만료되었다면 자동으로 갱신
   */
  public async getToken(): Promise<string> {
    // 토큰이 유효한 경우, 기존 토큰 즉시 반환
    if (this.accessToken && Date.now() < this.tokenExpiresAt) {
      return this.accessToken;
    }

    // 토큰이 만료되었고, 현재 다른 곳에서 갱신 요청 중인 경우, 그 요청이 끝날 때까지 기다림
    if (this.tokenPromise) {
      return this.tokenPromise;
    }

    // 새로운 토큰 발급
    this.tokenPromise = this.fetchNewToken().finally(() => {
      this.tokenPromise = null;
    });

    return this.tokenPromise;
  }
}

// --- 싱글톤(Singleton)으로 인스턴스 생성 및 내보내기 ---
const authService = new SgisAuthService(
  import.meta.env.VITE_SGIS_CONSUMER_KEY,
  import.meta.env.VITE_SGIS_CONSUMER_SECRET
);

export default authService;
