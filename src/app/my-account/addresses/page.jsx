"use client"
import Input from "@/app/(main)/singup/input";
import { useState } from "react";
import { requiredValidator, minValidator, maxValidator, } from '@/validators/rules'


export default function AddressPage() {
    const [addresses, setAddresses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [formData, setFormData] = useState({
        fullname: "",
        phone: "",
        province: "",
        city: "",
        postalCode: "",
        address: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setAddresses([...addresses, formData]);
        setFormData({ fullname: "", phone: "", province: "", city: "", postalCode: "", address: "" });
        setShowModal(false);
    };

    return (
        <div className="min-h-scree p-6 flex flex-col lg:mt-14 sm:mt-10">
            <h2 className="text-2xl font-bold mb-6">آدرس‌های شما</h2>

            <div className="w-full max-w-2xl space-y-4 mb-6">
                {addresses.length === 0 ? (
                    <p className="text-gray-500">هنوز آدرسی ثبت نکردید</p>
                ) : (
                    addresses.map((addr, i) => (
                        <label
                            key={i}
                            className={`flex items-start gap-3 p-4 rounded-xl shadow cursor-pointer border ${selectedIndex === i ? "border-blue-600" : "border-gray-200"
                                }`}
                        >
                            <input
                                type="radio"
                                name="selectedAddress"
                                checked={selectedIndex === i}
                                onChange={() => setSelectedIndex(i)}
                                className="mt-1"
                            />
                            <div>
                                <p className="font-bold">{addr.fullname}</p>
                                <p className="text-sm text-gray-600">📞 {addr.phone}</p>
                                <p className="text-sm text-gray-600">{addr.province} - {addr.city}</p>
                                <p className="text-sm text-gray-600">کدپستی: {addr.postalCode}</p>
                                <p className="text-sm text-gray-700 mt-2">{addr.address}</p>
                            </div>
                        </label>
                    ))
                )}
            </div>
            <button
                onClick={() => setShowModal(true)}
                className="bg-primary text-white w-50 px-6 py-3 rounded-xl shadow cursor-pointer"
            >
                افزودن آدرس جدید
            </button>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-black"
                        >
                            ✕
                        </button>
                        <h3 className="text-xl font-bold mb-4 text-center">افزودن آدرس جدید</h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                name="fullname"
                                className="loginInput"
                                type="text"
                                placeholder="نام و نام خانوادگی"
                                value={formData.fullname}
                                onChange={handleChange}
                                element="input"
                                validations={[
                                    requiredValidator(),
                                    minValidator(2),
                                    maxValidator(30),
                                ]}
                            />

                            <Input
                                className="loginInput"
                                name="phone"
                                type="tel"
                                placeholder="شماره موبایل"
                                value={formData.phone}
                                onChange={handleChange}
                                element="input"
                                validations={[
                                    requiredValidator(),
                                    minValidator(11),
                                    maxValidator(11)
                                ]}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    className="loginInput"
                                    name="province"
                                    type="text"
                                    placeholder="استان"
                                    value={formData.province}
                                    onChange={handleChange}
                                    element="input"
                                    validations={[
                                        requiredValidator(),
                                        minValidator(2),
                                        maxValidator(30)
                                    ]}
                                />
                                <Input
                                    className="loginInput"
                                    name="city"
                                    type="text"
                                    placeholder="شهر"
                                    value={formData.city}
                                    onChange={handleChange}
                                    element="input"
                                    validations={[
                                        requiredValidator(),
                                        minValidator(2),
                                        maxValidator(30)
                                    ]}
                                />
                            </div>

                            <Input
                                className="loginInput"
                                name="postalCode"
                                type="number"
                                placeholder="کد پستی"
                                value={formData.postalCode}
                                onChange={handleChange}
                                element="input"
                                validations={[
                                    requiredValidator(),
                                    minValidator(10),
                                    maxValidator(10)
                                ]}
                            />

                            <textarea
                                name="address"
                                placeholder="آدرس کامل"
                                value={formData.address}
                                onChange={handleChange}
                                rows="3"
                                className="w-full p-3 border rounded-xl"
                                required
                            ></textarea>

                            <button
                                type="submit"
                                className="w-full bg-primary text-white py-3 rounded-xl cursor-pointer"
                            >
                                ذخیره آدرس
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}