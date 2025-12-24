"use client";

import Image from "next/image";
import { KakaoLoginButton } from "@/components/auth/KakaoLoginButton";

export default function LoginPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background">
            <div className="text-center space-y-6 p-8">
                <div className="space-y-2">
                    <div className="flex flex-col items-center gap-4">
                        <Image
                            src="/logo_yogi.png"
                            alt="여기어때유 로고"
                            width={150}
                            height={50}
                            className="h-12 w-auto"
                            priority
                        />
                        <h1 className="text-4xl font-bold tracking-tight">여기어때유</h1>
                    </div>
                    <p className="text-muted-foreground text-lg">
                        AI 기반 맞춤형 여행지 추천 서비스
                    </p>
                </div>

                <div className="flex justify-center">
                    <KakaoLoginButton />
                </div>
            </div>
        </div>
    );
}
