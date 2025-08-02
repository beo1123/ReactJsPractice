export default function LoadingScreen() {
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-cyan-300 to-cyan-500 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                <p className="text-white text-lg font-semibold animate-pulse">Đang tải dữ liệu...</p>
            </div>
        </div>
    );
}
