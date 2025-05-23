import "../index.css";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "textstat-viewer",
    description: "Web site created with Next.js."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <div id="root">{children}</div>
            </body>
        </html>
    );
}
