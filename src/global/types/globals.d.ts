declare global {
    interface Window {
        ai: {
            canCreateTextSession: () => Promise<"yes" | "no">
        }
        google: {
            charts: {
                load: (v:string, o:{ packages: string[] }) => void
                setOnLoadCallback: (c:Function) => void
            }
        }
    }
}