"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/apis/utils/constants";

export function KakaoLoginButton() {
  const handleLogin = () => {
    window.location.href = `${BASE_URL}/oauth2/authorization/kakao`;
  };

  return (
    <Button
      onClick={handleLogin}
      className="bg-[#FEE500] text-[#000000] hover:bg-[#FEE500]/90 font-medium flex items-center gap-2 px-6"
    >
      <div className="relative w-5 h-5">
        <Image
          src="/kakao_symbol.png"
          alt="카카오"
          fill
          className="object-contain"
        />
      </div>
      카카오 로그인
    </Button>
  );
}
