import React, { useState } from "react";
import NewRequest from "../classes/new-request";

// Example data, replace with your actual data source
const requestsData = [
    {
        id: 40,
        createdAt: "5/10/2025 2:37 PM",
        durationType: "Хоног",
        duration: 4,
        startDate: "5/14/2025",
        reason: "Эрүүл мэндийн оношлогоо",
        status: "Хүлээгдэж буй",
        phoneNumber: "99347472",
        name: "Бат"
    },
    {
        id: 41,
        createdAt: "5/10/2025 2:43 PM",
        durationType: "Хоног",
        duration: 4,
        startDate: "5/13/2025",
        reason: "Эцгийн чөлөө",
        status: "Зөвшөөрсөн",
        phoneNumber: "99347472",
        name: "Дорж"
    },
    {
        id: 43,
        createdAt: "5/10/2025 3:23 PM",
        durationType: "Хоног",
        duration: 4,
        startDate: "5/13/2025",
        reason: "Ар гэрийн гачигдал",
        status: "Зөвшөөрсөн",
        phoneNumber: "99347472",
        name: "Сараа"
    },
    {
        id: 44,
        createdAt: "5/10/2025 4:37 PM",
        durationType: "Хоног",
        duration: 4,
        startDate: "5/13/2025",
        reason: "Эрүүл мэндийн оношлогоо",
        status: "Хүлээгдэж буй",
        phoneNumber: "99347472",
        name: "Бат"
    },
    {
        id: 45,
        createdAt: "5/10/2025 4:41 PM",
        durationType: "Хоног",
        duration: 4,
        startDate: "5/13/2025",
        reason: "Эрүүл мэндийн оношлогоо",
        status: "Зөвшөөрсөн",
        phoneNumber: "99347472",
        name: "Дорж"
    },
    {
        id: 46,
        createdAt: "5/10/2025 4:46 PM",
        durationType: "Хоног",
        duration: 4,
        startDate: "5/13/2025",
        reason: "Эрүүл мэндийн оношлогоо",
        status: "Татгалзсан",
        phoneNumber: "99347472",
        name: "Сараа"
    },
    {
        id: 48,
        createdAt: "8/1/2025 3:52 PM",
        durationType: "Хоног",
        duration: 5,
        startDate: "8/1/2025",
        reason: "Эрүүл мэндийн оношлогоо",
        status: "Зөвшөөрсөн",
        phoneNumber: "51321212",
        name: "Бат"
    }
];

const causes = [
    "Ар гэрийн гачигдал",
    "Эрүүл мэндийн оношилгоо",
    "Эцгийн чөлөө",
    "Бусад",
];
const statuses = ["Хүлээгдэж буй", "Зөвшөөрсөн", "Татгалзсан"];

export default function RequestList() {
    // Filter states
    const [filterName, setFilterName] = useState("");
    const [filterBeginningDate, setFilterBeginningDate] = useState("");
    const [filterDate, setFilterDate] = useState(""); // End date filter
    const [filterCause, setFilterCause] = useState("");
    const [filterStatus, setFilterStatus] = useState("");

    // Filtering logic
    const filteredRequests = requestsData.filter((req) => {
        // Name filter (case-insensitive, partial match)
        const nameMatch = filterName.trim() === "" || (req.name && req.name.toLowerCase().includes(filterName.trim().toLowerCase()));
        // Beginning date filter (exact match)
        const beginDateMatch = !filterBeginningDate || req.startDate === filterBeginningDate;
        // End date filter (calculate end date from startDate and duration)
        let endDateMatch = true;
        if (filterDate) {
            // Calculate end date
            const start = new Date(req.startDate);
            if (!isNaN(start.getTime()) && typeof req.duration === "number") {
                const end = new Date(start);
                end.setDate(end.getDate() + req.duration - 1);
                const yyyy = end.getFullYear();
                const mm = String(end.getMonth() + 1).padStart(2, '0');
                const dd = String(end.getDate()).padStart(2, '0');
                const calculatedEndDate = `${yyyy}-${mm}-${dd}`;
                endDateMatch = filterDate === calculatedEndDate;
            } else {
                endDateMatch = false;
            }
        }
        // Cause filter (exact match)
        const causeMatch = !filterCause || req.reason === filterCause;
        // Status filter (exact match)
        const statusMatch = !filterStatus || req.status === filterStatus;
        return nameMatch && beginDateMatch && endDateMatch && causeMatch && statusMatch;
    });

    return (
        <div className="w-full bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col gap-6">
            {/* Filter Inputs */}
            <div className="flex gap-[60px] mt-4 w-full text-white">
                <div className="flex flex-col items-start gap-2">
                    <label className="text-sm">Нэрээр хайх:</label>
                    <input
                        type="text"
                        value={filterName}
                        onChange={(e) => setFilterName(e.target.value)}
                        className="px-3 py-2 rounded-lg border border-gray-300 text-white-900 w-48"
                    />
                </div>
                <div className="flex flex-col items-start gap-2">
                    <label className="text-sm">Эхлэх огноо:</label>
                    <input
                        type="date"
                        value={filterBeginningDate}
                        onChange={(e) => setFilterBeginningDate(e.target.value)}
                        className="px-3 py-2 rounded-lg border border-gray-300 text-white-900 w-48"
                    />
                </div>
                <div className="flex flex-col items-start gap-2">
                    <label className="text-sm">Дуусах огноо:</label>
                    <input
                        type="date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        className="px-3 py-2 rounded-lg border border-gray-300 text-white-900 w-48"
                    />
                </div>
                <div className="flex flex-col items-start gap-2">
                    <label className="text-sm">Шалтгаан:</label>
                    <select
                        value={filterCause}
                        onChange={(e) => setFilterCause(e.target.value)}
                        className="px-3 py-2 rounded-lg border border-gray-300 text-white-900 w-48 bg-gray-800"
                    >
                        <option value="">Бүгд</option>
                        {causes.map((cause) => (
                            <option key={cause} value={cause}>
                                {cause}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col items-start gap-2">
                    <label className="text-sm">Төлөв:</label>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-3 py-2 rounded-lg border border-gray-300 text-white-900 w-48 bg-gray-800"
                    >
                        <option value="">Бүгд</option>
                        {statuses.map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {/* Table */}
            <div className="overflow-x-auto w-full">
                <table className="min-w-full bg-gray-900 text-white rounded-lg">
                    <thead>
                        <tr className="text-xs text-gray-400 border-b border-gray-700">
                            <th className="px-3 py-2 text-left">ХҮСЭЛТИЙН ДУГААР</th>
                            <th className="px-3 py-2 text-left">НЭР</th>
                            <th className="px-3 py-2 text-left">ХҮСЭЛТ ГАРГАСАН ОГНОО</th>
                            <th className="px-3 py-2 text-left">ХУГАЦААНЫ ТӨРӨЛ</th>
                            <th className="px-3 py-2 text-left">ҮРГЭЛЖЛЭХ ХУГАЦАА</th>
                            <th className="px-3 py-2 text-left">ЭХЛЭХ ХУГАЦАА</th>
                            <th className="px-3 py-2 text-left">ШАЛТГААН</th>
                            <th className="px-3 py-2 text-left">ТӨЛӨВ</th>
                            <th className="px-3 py-2 text-left">УТАСНЫ ДУГААР</th>
                            <th className="px-3 py-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRequests.map((req) => (
                            <tr key={req.id} className="border-b border-gray-800 hover:bg-gray-800 transition">
                                <td className="px-3 py-2">{req.id}</td>
                                <td className="px-3 py-2">{req.name}</td>
                                <td className="px-3 py-2">{req.createdAt}</td>
                                <td className="px-3 py-2">{req.durationType}</td>
                                <td className="px-3 py-2">{req.duration}</td>
                                <td className="px-3 py-2">{req.startDate}</td>
                                <td className="px-3 py-2">{req.reason}</td>
                                <td
                                    className="px-3 py-2"
                                    style={{
                                        color:
                                            req.status === "Зөвшөөрсөн"
                                                ? "#4ade80"
                                                : req.status === "Татгалзсан"
                                                    ? "#f87171"
                                                    : "#facc15",
                                        fontWeight: 600,
                                    }}
                                >
                                    {req.status}
                                </td>
                                <td className="px-3 py-2">{req.phoneNumber}</td>
                                <td className="px-3 py-2">
                                    <svg
                                        width="16"
                                        height="16"
                                        fill="#aaa"
                                        viewBox="0 0 16 16"
                                        className="cursor-pointer hover:fill-blue-400 transition"
                                    >
                                        <path d="M12.146 3.354a.5.5 0 0 1 0-.708l.708-.708a.5.5 0 0 1 .708 0l.792.792a.5.5 0 0 1 0 .708l-.708.708-1.5-1.5zm-1.207 1.207l1.5 1.5-7.147 7.146a.5.5 0 0 1-.168.11l-3 1a.5.5 0 0 1-.637-.637l1-3a.5.5 0 0 1 .11-.168l7.146-7.147z" />
                                    </svg>
                                </td>
                            </tr>
                        ))}
                        {filteredRequests.length === 0 && (
                            <tr>
                                <td colSpan={10} className="text-center py-4 text-gray-400">
                                    Илэрц олдсонгүй
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}