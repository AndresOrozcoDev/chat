export default function Loader() {
    return (
        <div className="fixed inset-0 bg-black/10 flex flex-col items-center justify-center z-2 backdrop-blur-sm">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-black dark:border-white"></div>
            <p className="text-black text-lg font-medium dark:text-white">Cargando...</p>
        </div>
    )
}