"use client";

import dynamic from "next/dynamic";

// Appコンポーネントを動的にインポートし、SSRを無効にします。
// パスはプロジェクト構造に合わせて調整してください。
const App = dynamic(() => import("../App"), { ssr: false });

export function ClientOnly() {
    return <App />;
}
