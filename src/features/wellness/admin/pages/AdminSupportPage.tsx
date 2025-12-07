import { useEffect, useState } from "react";
import { Inquiry, InquiryStatus } from "../types/support";
import { getInquiries, updateInquiryStatus } from "../api/support.api";

const STATUS_COLORS: Record<InquiryStatus, string> = {
    New: "bg-blue-100 text-blue-800",
    Read: "bg-gray-100 text-gray-800",
    Replied: "bg-green-100 text-green-800",
    Archived: "bg-yellow-100 text-yellow-800",
};

export default function AdminSupportPage() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<Inquiry | null>(null);

    useEffect(() => {
        load();
    }, []);

    function load() {
        setLoading(true);
        getInquiries()
            .then(setInquiries)
            .finally(() => setLoading(false));
    }

    async function handleStatusChange(id: string, status: InquiryStatus) {
        await updateInquiryStatus(id, status);
        setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
        if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null);
    }

    if (loading && !inquiries.length) return <div className="p-6">Loading inbox...</div>;

    return (
        <div className="h-[calc(100vh-4rem)] flex flex-col md:flex-row overflow-hidden bg-gray-50">
            {/* INBOX LIST */}
            <div className={`w-full md:w-1/3 lg:w-1/4 bg-white border-r flex flex-col ${selected ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-4 border-b">
                    <h1 className="text-xl font-bold text-gray-900">Inbox</h1>
                    <p className="text-sm text-gray-500">{inquiries.filter(i => i.status === 'New').length} new messages</p>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {inquiries.map(inquiry => (
                        <div
                            key={inquiry.id}
                            onClick={() => setSelected(inquiry)}
                            className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${selected?.id === inquiry.id ? 'bg-emerald-50 border-l-4 border-l-emerald-500' : 'border-l-4 border-l-transparent'}`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[inquiry.status]}`}>
                                    {inquiry.status}
                                </span>
                                <span className="text-xs text-gray-400">{new Date(inquiry.createdAt).toLocaleDateString()}</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 truncate">{inquiry.name}</h3>
                            <p className="text-sm text-gray-600 truncate">{inquiry.subject}</p>
                            <p className="text-xs text-gray-400 truncate mt-1">{inquiry.message}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* MESSAGE DETAIL */}
            <div className={`flex-1 flex flex-col bg-white ${!selected ? 'hidden md:flex' : 'flex'}`}>
                {selected ? (
                    <>
                        <div className="p-6 border-b flex justify-between items-start bg-gray-50">
                            <div>
                                <button onClick={() => setSelected(null)} className="md:hidden text-sm text-gray-500 mb-4">&larr; Back to Inbox</button>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selected.subject}</h2>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <span className="font-medium">{selected.name}</span>
                                    <span>&lt;{selected.email}&gt;</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <select
                                    value={selected.status}
                                    onChange={(e) => handleStatusChange(selected.id, e.target.value as InquiryStatus)}
                                    className="text-sm border-gray-300 rounded-md shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                >
                                    <option value="New">New</option>
                                    <option value="Read">Read</option>
                                    <option value="Replied">Replied</option>
                                    <option value="Archived">Archived</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex-1 p-8 overflow-y-auto">
                            <div className="prose max-w-none text-gray-800 whitespace-pre-wrap">
                                {selected.message}
                            </div>
                        </div>
                        <div className="p-4 border-t bg-gray-50">
                            <div className="flex gap-2">
                                <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium">
                                    Reply via Email
                                </button>
                                <button
                                    onClick={() => handleStatusChange(selected.id, "Archived")}
                                    className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                                >
                                    Archive
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-400 flex-col">
                        <span className="text-4xl mb-4">📩</span>
                        <p>Select a message to view details</p>
                    </div>
                )}
            </div>
        </div>
    );
}
