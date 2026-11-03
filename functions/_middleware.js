// 접속자 언어 분기 — 국문·영문 짝이 있는 페이지에서만 실행(_routes.json).
// 한국어 브라우저(첫 언어 ko) 또는 한국 접속(CF-IPCountry KR) → 한국어, 그 밖은 기본 영어(/en/…).
// ?lang=ko|en 으로 고르면 쿠키에 1년 기억. 검색·미리보기 봇은 넘기지 않음(hreflang으로 연결).
// 영문 페이지(/en/…)는 정적 그대로 — 거기서 "한국어"를 누르면 국문 경로 + ?lang=ko 로 온다.
const BOT = /bot|crawl|spider|slurp|yeti|daum|bingpreview|facebookexternalhit|kakaotalk-scrap|slack|twitter|linkedin|whatsapp|telegram|discord|embedly|lighthouse|headless|curl|wget|python|httpclient/i;

// 국문 경로 → 영문 짝
const PAIRS = {
  "/": "/en/",
  "/index.html": "/en/",
  "/about": "/en/about/",
  "/about/": "/en/about/",
  "/about.html": "/en/about/",
  "/solution": "/en/solution/",
  "/solution/": "/en/solution/",
  "/service": "/en/service/",
  "/service/": "/en/service/",
  "/service.html": "/en/service/",
  "/cases": "/en/cases/",
  "/cases/": "/en/cases/",
};

function pickLang(request, url) {
  const q = url.searchParams.get("lang");
  if (q === "ko" || q === "en") return { lang: q, remember: true };
  const m = (request.headers.get("Cookie") || "").match(/(?:^|;\s*)lang=(ko|en)\b/);
  if (m) return { lang: m[1] };
  const first = (request.headers.get("Accept-Language") || "").split(",")[0].trim().toLowerCase();
  if (first.startsWith("ko")) return { lang: "ko" };
  if ((request.headers.get("CF-IPCountry") || "").toUpperCase() === "KR") return { lang: "ko" };
  return { lang: "en" };
}

export async function onRequest(context) {
  const { request } = context;
  if (request.method !== "GET" && request.method !== "HEAD") return context.next();
  const url = new URL(request.url);
  const en = PAIRS[url.pathname];
  if (!en) return context.next();
  const ua = request.headers.get("User-Agent") || "";
  if (!ua || BOT.test(ua)) return context.next();

  const { lang, remember } = pickLang(request, url);
  const cookie = remember ? `lang=${lang}; Path=/; Max-Age=31536000; SameSite=Lax; Secure` : null;

  if (lang === "en") {
    // ?lang 은 쿠키로 옮겼으니 떼고, ref·utm 같은 나머지 쿼리는 넘긴다.
    url.searchParams.delete("lang");
    const qs = url.searchParams.toString();
    const res = new Response(null, { status: 302, headers: { Location: en + (qs ? "?" + qs : ""), "Cache-Control": "private, no-store", Vary: "Accept-Language, Cookie" } });
    if (cookie) res.headers.append("Set-Cookie", cookie);
    return res;
  }
  const res = await context.next();
  const out = new Response(res.body, res);
  out.headers.set("Vary", "Accept-Language, Cookie");
  out.headers.set("Cache-Control", "private, no-cache");
  if (cookie) out.headers.append("Set-Cookie", cookie);
  return out;
}
