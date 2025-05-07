'use client";'

import { useConvexAuth } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-10 bg-background p-4 border-b-2 border-slate-200 dark:border-slate-800 flex flex-row justify-between items-center">
            Tarifa Kite Hostel
            <SignOutButton />
        </header>
    );
}

function SignOutButton() {
    const { isAuthenticated } = useConvexAuth();
    const { signOut } = useAuthActions();
    const router = useRouter();
    return (
        <>
            {isAuthenticated && (
                <button
                    className="border rounded-md rounded-md px-2 py-1"
                    onClick={() =>
                        void signOut().then(() => {
                            router.push("/signin");
                        })
                    }
                >
                    Sign out
                </button>
            )}
        </>
    );
}
