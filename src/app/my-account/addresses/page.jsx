"use client";
import { getToken } from "@/utils/auth";
import { useState, useEffect } from "react";
import { IoChevronDownOutline, IoLocationOutline, IoTrashOutline } from "react-icons/io5";

export default function AddressPage() {
    const [open, setOpen] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [city, setCity] = useState("");
    const [addressInput, setAddressInput] = useState(""); // مقدار فرم
    const [pelak, setPelak] = useState("");
    const [vahed, setVahed] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [showProvinceDropdown, setShowProvinceDropdown] = useState(false);
    const [errors, setErrors] = useState({});
    const [activeAddress, setActiveAddress] = useState(null);

    const token = getToken();

    const iranProvinces = [
        "آذربایجان شرقی", "آذربایجان غربی", "اردبیل", "اصفهان", "البرز", "ایلام",
        "بوشهر", "تهران", "چهارمحال و بختیاری", "خراسان جنوبی", "خراسان رضوی",
        "خراسان شمالی", "خوزستان", "زنجان", "سمنان", "سیستان و بلوچستان", "فارس",
        "قزوین", "قم", "کردستان", "کرمان", "کرمانشاه", "کهگیلویه و بویراحمد",
        "گلستان", "گیلان", "لرستان", "مازندران", "مرکزی", "هرمزگان", "همدان", "یزد"
    ];

    const fetchAddresses = async () => {
        try {
            const res = await fetch("https://api.iranifarsh.neofy.ir/users/info", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await res.json();

            const addressesWithId = ((data.result && data.result.address) || []).map((addr, index) => ({
                id: addr.id || index,
                ...addr
            }));

            setAddresses(addressesWithId);

        } catch (error) {
            console.log("get addresses error:", error);
        }
    };



    useEffect(() => {
        fetchAddresses();
    }, []);

    const handleSubmit = async () => {
        let newErrors = {};
        if (!selectedProvince) newErrors.province = "استان را انتخاب کنید";
        if (!city.trim()) newErrors.city = "شهر را وارد کنید";
        if (!addressInput.trim()) newErrors.address = "آدرس لازم است";
        if (!pelak.trim()) newErrors.pelak = "پلاک ضروری است";
        if (!postalCode.trim()) newErrors.postalCode = "کدپستی نباید خالی باشد";

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        const newAddress = {
            id: Date.now(),
            province: selectedProvince,
            city,
            address: addressInput,
            pelak,
            vahed,
            postalCode
        };

        try {
            const updated = [...addresses, newAddress];
            await fetch("https://api.iranifarsh.neofy.ir/users", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ address: updated }) 
            });
            await fetchAddresses();
            setOpen(false);
        } catch (error) {
            console.log("Error update:", error);
        }

        // پاک کردن فرم
        setSelectedProvince("");
        setCity("");
        setAddressInput("");
        setPelak("");
        setVahed("");
        setPostalCode("");
    };

    const handleDelete = async (id) => {
        try {
            const filtered = addresses.filter(addr => addr.id !== id);
            await fetch("https://api.iranifarsh.neofy.ir/users", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ address: filtered })
            });
            await fetchAddresses();
            if (activeAddress === id) setActiveAddress(null);
        } catch (error) {
            console.log("Delete error:", error);
        }
    };

    return (
        <div className="p-8 max-w-3xl mx-auto">
            <div className="flex justify-between items-center">
                <div className="text-2xl border-b-3 border-red-500">
                    <span>آدرس ها</span>
                </div>
                <button
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                    <span>افزودن آدرس جدید</span> +
                </button>
            </div>

            <div className="space-y-4 pt-10">
                {addresses.length === 0 && (
                    <p className="text-gray-500 text-center mt-4">هیچ آدرسی وجود ندارد.</p>
                )}
                {addresses.map(addr => (
                    <div
                        key={addr.id}
                        className={`border rounded-lg p-4 flex justify-between items-start cursor-pointer
              ${activeAddress === addr.id ? "border-red-500" : "border-gray-300"}`}
                        onClick={() => setActiveAddress(addr.id)}
                    >
                        <div className="text-right">
                            <div className="flex mb-2">
                                <IoLocationOutline className="text-black ml-2 text-xl" />
                                <span className="text-sm text-red-500">
                                    {activeAddress === addr.id ? "آدرس انتخاب شده" : ""}
                                </span>
                            </div>
                            <p className="text-gray-800">{addr.province}، {addr.city}، {addr.address}</p>
                            <p className="text-gray-600 text-sm mt-1">کد پستی: {addr.postalCode}</p>
                            <p className="text-gray-600 text-sm mt-1">پلاک: {addr.pelak} | واحد: {addr.vahed || "-"}</p>
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); handleDelete(addr.id); }}>
                            <IoTrashOutline className="text-gray-400 hover:text-red-500 text-xl" />
                        </button>
                    </div>
                ))}
            </div>

            {/* بک‌گراند مودال */}
            {open && <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={() => setOpen(false)} />}

            {/* مودال */}
            {open && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl animate-zoom p-6 relative max-h-[85vh] overflow-y-auto">
                        <button onClick={() => setOpen(false)} className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 text-2xl">×</button>
                        <h2 className="text-xl font-bold text-gray-800 text-right mb-6">افزودن آدرس جدید</h2>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="text-right relative">
                                <label className="text-sm font-medium text-gray-700">استان <span className="text-red-500">*</span></label>
                                <div
                                    onClick={() => setShowProvinceDropdown(!showProvinceDropdown)}
                                    className="w-full border rounded-lg p-3 flex justify-between items-center mt-1 cursor-pointer"
                                >
                                    <span className={selectedProvince ? "text-gray-800" : "text-gray-500"}>
                                        {selectedProvince || "انتخاب کنید"}
                                    </span>
                                    <IoChevronDownOutline className="text-gray-700" />
                                </div>
                                {errors.province && <p className="text-red-500 text-xs mt-1">{errors.province}</p>}
                                {showProvinceDropdown && (
                                    <div className="absolute z-50 bg-white border rounded-lg mt-1 w-full max-h-56 overflow-y-auto shadow-lg">
                                        {iranProvinces.map((prov, i) => (
                                            <div
                                                key={i}
                                                onClick={() => { setSelectedProvince(prov); setShowProvinceDropdown(false); }}
                                                className="p-3 hover:bg-gray-100 cursor-pointer text-right"
                                            >
                                                {prov}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="text-right">
                                <label className="text-sm font-medium text-gray-700">شهر <span className="text-red-500">*</span></label>
                                <input
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="w-full border rounded-lg p-3 mt-1"
                                />
                                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                            </div>
                        </div>

                        <div className="text-right mb-1">
                            <label className="text-sm font-medium text-gray-700">آدرس <span className="text-red-500">*</span></label>
                        </div>
                        <input
                            value={addressInput}
                            onChange={(e) => setAddressInput(e.target.value)}
                            className="w-full border rounded-lg p-3 mb-2"
                            placeholder="خیابان، کوچه و جزئیات آدرس"
                        />
                        {errors.address && <p className="text-red-500 text-xs mb-4">{errors.address}</p>}

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="text-right">
                                <label className="text-sm font-medium text-gray-700">پلاک <span className="text-red-500">*</span></label>
                                <input value={pelak} onChange={(e) => setPelak(e.target.value)} className="w-full border rounded-lg p-3 mt-1" />
                                {errors.pelak && <p className="text-red-500 text-xs mt-1">{errors.pelak}</p>}
                            </div>
                            <div className="text-right">
                                <label className="text-sm font-medium text-gray-700">واحد</label>
                                <input value={vahed} onChange={(e) => setVahed(e.target.value)} className="w-full border rounded-lg p-3 mt-1" />
                            </div>
                        </div>

                        <div className="mb-20">
                            <label className="text-sm font-medium text-gray-700">کدپستی <span className="text-red-500">*</span></label>
                            <input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="w-full border rounded-lg p-3 mt-1" />
                            {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>}
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t">
                            <button onClick={handleSubmit} className="w-full bg-red-500 text-white py-3 text-lg rounded-xl cursor-pointer">
                                تایید و ادامه
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .animate-zoom {
                  animation: zoomIn 0.25s ease-out;
                }
                @keyframes zoomIn {
                  from { opacity: 0; transform: scale(0.92); }
                  to { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    );
}
