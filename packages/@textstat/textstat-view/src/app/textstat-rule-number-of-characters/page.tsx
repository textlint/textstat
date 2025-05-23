"use client";
// 上記の 'use client' は、このコンポーネントがクライアントコンポーネントであることを示します。

import * as React from "react";
import { StatContext } from "../../context/StatContext";
import { NumberOfCharactersView } from "../../components/NumberOfCharactersView/NumberOfCharactersView";

export default function Page() {
    // Changed function name to Page for Next.js convention
    return <StatContext.Consumer>{({ results }) => <NumberOfCharactersView results={results} />}</StatContext.Consumer>;
}
