import React, { useState } from "react";
import { useReactToPrint } from "react-to-print";

const TransferCertificateForm = () => {
    const [formData, setFormData] = useState({
        admissionNo: "",
        name: "",
        fatherName: "",
        motherName: "",
        nationality: "",
        caste: "",
        firstAdmission: "",
        dobFigures: "",
        dobWords: "",
        lastClassFigures: "",
        lastClassWords: "",
        examResult: "",
        whetherFailed: "",
        subjects: Array(7).fill(""),
        promotion: "",
        nextClassFigures: "",
        nextClassWords: "",
        schoolDues: "",
        totalWorkingDays: "",
        totalPresentDays: "",
        conduct: "",
        applicationDate: "",
        issuanceDate: "",
        reasonLeaving: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubjectChange = (index, value) => {
        const updatedSubjects = [...formData.subjects];
        updatedSubjects[index] = value;
        setFormData({ ...formData, subjects: updatedSubjects });
    };



    const certificateRef = React.useRef();
    const handlePrint = useReactToPrint({
        contentRef: certificateRef,
        documentTitle: "TRANSFER CERTIFICATE",
        nonce: "NOPE",
        ignoreGlobalStyles: false,
        about: "NO"
    });

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Transfer Certificate Form</h1>
            <div className="grid grid-cols-2 gap-4">
                {Object.keys(formData).map((key, index) => {
                    if (key === "subjects") {
                        return (
                            <div key={index} className="col-span-2">
                                <label className="block font-semibold">Subjects Studied:</label>
                                <div className="grid grid-cols-3 gap-2 mt-2">
                                    {formData.subjects.map((subject, idx) => (
                                        <input key={idx} type="text" value={subject}
                                            onChange={(e) => handleSubjectChange(idx, e.target.value)}
                                            className="border p-2 rounded w-full"
                                            placeholder={`Subject ${idx + 1}`} />
                                    ))}
                                </div>
                            </div>
                        );
                    } else if (key.toLowerCase().includes("date") || key === "dobFigures") {
                        return (
                            <div key={index}>
                                <label className="block font-semibold">{key.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}:</label>
                                <input type="date" name={key} value={formData[key]}
                                    onChange={handleChange}
                                    className="border p-2 rounded w-full" />
                            </div>
                        );
                    } else if (["admissionNo", "totalWorkingDays", "totalPresentDays"].includes(key)) {
                        return (
                            <div key={index}>
                                <label className="block font-semibold">{key.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}:</label>
                                <input type="number" name={key} value={formData[key]}
                                    onChange={handleChange}
                                    className="border p-2 rounded w-full" />
                            </div>
                        );
                    } else if (key === "caste") {
                        return (
                            <div key={index}>
                                <label className="block font-semibold">CATEGORY:</label>
                                <select name={key} value={formData[key]} onChange={handleChange} className="border p-2 rounded w-full">
                                    <option value="General">General</option>
                                    <option value="SC">SC</option>
                                    <option value="ST">ST</option>
                                    <option value="OBC">OBC</option>
                                </select>
                            </div>
                        );
                    } else if (key === "reasonLeaving") {
                        return (
                            <div key={index}>
                                <label className="block font-semibold">REASON FOR LEAVING:</label>
                                <textarea name={key} value={formData[key]} onChange={handleChange} className="border p-2 rounded w-full h-24" />
                            </div>
                        );
                    } else {
                        return (
                            <div key={index}>
                                <label className="block font-semibold">{key.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}:</label>
                                <input type="text" name={key} value={formData[key]}
                                    onChange={handleChange}
                                    className="border p-2 rounded w-full" />
                            </div>
                        );
                    }
                })}

            </div>
            <button onClick={() => handlePrint()} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Generate Certificate</button>

            {/* Printable Certificate */}
            <div ref={certificateRef} className="relative w-full max-w-a4">
                {/* Watermark Image */}
                <img
                    src="https://cdn.messant.in/vidyalay/ss_logo.jpeg"
                    className="absolute top-1/2 left-1/2 w-1/2 opacity-10 transform -translate-x-1/2 -translate-y-1/2"
                    alt="watermark"
                />

                {/* Certificate Content */}
                <img src="/school.png" className="w-full" alt="logo" />
                <h2 className="text-center text-xl font-bold mt-4 mb-4">TRANSFER CERTIFICATE</h2>
                <div className="pl-16">
                    <p>Admission No.: {formData.admissionNo}</p>
                    <p>1. <strong>Name of the Student:</strong> {formData.name}</p>
                    <p>2. <strong>Father's/Guardian's Name:</strong> {formData.fatherName} | <strong>Mother's Name:</strong> {formData.motherName}</p>
                    <p>3. <strong>Nationality:</strong> {formData.nationality}</p>
                    <p>4. <strong>Caste:</strong> {formData.caste}</p>
                    <p>5. <strong>Date of First Admission in the School with class:</strong> {formData.firstAdmission}</p>
                    <p>6. <strong>Date of Birth according to Admission Register:</strong> (In figures) {formData.dobFigures} | (In words) ({formData.dobWords})</p>
                    <p>7. <strong>Class in which the student last studied:</strong> {formData.lastClassFigures} ({formData.lastClassWords})</p>
                    <p>8. <strong>School/Board Annual Examination last taken with result:</strong> {formData.examResult}</p>
                    <p>9. <strong>Whether failed, if so once/twice in the same class:</strong> {formData.whetherFailed}</p>
                    <p>10. <strong>Subjects Studied:</strong> {formData.subjects.join(", ")}</p>
                    <p>11. <strong>Whether qualified for promotion to the higher class:</strong> {formData.promotion}, <strong>if yes, to which class:</strong> {formData.nextClassFigures} ({formData.nextClassWords})</p>
                    <p>12. <strong>Months up to which the student has paid school dues:</strong> {formData.schoolDues}</p>
                    <p>13. <strong>Total Working Days:</strong> {formData.totalWorkingDays} | <strong>Days Present:</strong> {formData.totalPresentDays}</p>
                    <p>14. <strong>General Conduct:</strong> {formData.conduct}</p>
                    <p>15. <strong>Date of Application for Transfer Certificate:</strong> {formData.applicationDate}</p>
                    <p>16. <strong>Date of Issuance of Transfer Certificate:</strong> {formData.issuanceDate}</p>
                    <p>17. <strong>Reason for leaving the School:</strong> {formData.reasonLeaving}</p>
                </div>

                <p className="mt-32 grid grid-cols-3 text-center">
                    <span>Signature of class teacher</span>
                    <span>Checked By<br />( State full name and designation )</span>
                    <span>Principal seal</span>
                </p>
            </div>
        </div>
    );
};

export default TransferCertificateForm;
