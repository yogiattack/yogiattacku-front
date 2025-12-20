import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async headers() {
    const cspHeader = [
      "default-src 'self';",

      // [Script]
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://dapi.kakao.com https://t1.daumcdn.net https://*.daumcdn.net;",

      // [Style]
      "style-src 'self' 'unsafe-inline';",

      // [Image]
      "img-src 'self' data: https://t1.daumcdn.net https://*.daumcdn.net https://map.kakao.com;",

      // [Font]
      "font-src 'self' data:;",

      "connect-src 'self' https://yogiattacku.n-e.kr https://dapi.kakao.com https://*.kakao.com https://*.daum.net https://t1.daumcdn.net https://*.daumcdn.net;",
    ].join(" ");

    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
          },
        ],
      },
    ];
  },
};

export default nextConfig;