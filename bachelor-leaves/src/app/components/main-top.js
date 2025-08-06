export default function MainTop({ leaveType }) {


    return (
        <div className="flex flex-col items-start justify-between w-full mb-8">
            <div className="flex items-center justify-between p-4 bg-gray-800 text-white w-full rounded-lg">
                <h1 className="text-2xl font-bold">{leaveType}</h1>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-start gap-4 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" className="self-center rounded-md" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0" />
                    </svg>
                    Шинэ хүсэлт
                </button>
            </div>
        </div>
    );
}
