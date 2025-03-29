import React, { useState } from "react";
import { useReactToPrint } from "react-to-print";

const TransferCertificateForm = () => {
    const [formData, setFormData] = useState({
        bookNo: "",
        srNo: "",
        admissionNo: "",
        name: "",
        fatherName: "",
        motherName: "",
        nationality: "",
        scSt: "",
        firstAdmission: "",
        dobFigures: "",
        dobWords: "",
        lastClassFigures: "",
        lastClassWords: "",
        examResult: "",
        failed: "",
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
                {Object.keys(formData).map((key, index) => (
                    key === "subjects" ? (
                        <div key={index} className="col-span-2">
                            <label className="block font-semibold">Subjects Studied:</label>
                            <div className="grid grid-cols-3 gap-2 mt-2">
                                {formData.subjects.map((subject, idx) => (
                                    <input key={idx} type="text" value={subject} onChange={(e) => handleSubjectChange(idx, e.target.value)} className="border p-2 rounded w-full" placeholder={`Subject ${idx + 1}`} />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div key={index}>
                            <label className="block font-semibold">{key.replace(/([A-Z])/g, ' $1').trim()}:</label>
                            <input type="text" name={key} value={formData[key]} onChange={handleChange} className="border p-2 rounded w-full" />
                        </div>
                    )
                ))}
            </div>
            <button onClick={() => handlePrint()} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Generate Certificate</button>

            {/* Printable Certificate */}
            <div ref={certificateRef} className="absolute w-full max-w-a4">
                <img src="/school.png" className="w-full" />
                <h2 className="text-center text-xl font-bold mt-4 mb-4">TRANSFER CERTIFICATE</h2>
                <p>Book No.: <u>{formData.bookNo}</u> | Sr. No.: {formData.srNo} | Admission No.: {formData.admissionNo}</p>
                <p>1. <strong>Name of Pupil:</strong> {formData.name}</p>
                <p>2. <strong>Father's/Guardian's Name:</strong> {formData.fatherName} | <strong>Mother's Name:</strong> {formData.motherName}</p>
                <p>3. <strong>Nationality:</strong> {formData.nationality}</p>
                <p>4. <strong>Whether the candidate belongs to SC/ST:</strong> {formData.scSt}</p>
                <p>5. <strong>Date of First Admission in the School with class:</strong> {formData.firstAdmission}</p>
                <p>6. <strong>Date of Birth according to Admission Register:</strong> (In figures) {formData.dobFigures} | (In words) ({formData.dobWords})</p>
                <p>7. <strong>Class in which the pupil last studied:</strong> {formData.lastClassFigures} ({formData.lastClassWords})</p>
                <p>8. <strong>School/Board Annual Examination last taken with result:</strong> {formData.examResult}</p>
                <p>9. <strong>Whether failed, if so once/twice in the same class:</strong> {formData.failed}</p>
                <p>10. <strong>Subjects Studied:</strong> {formData.subjects.join(", ")}</p>
                <p>11. <strong>Whether qualified for promotion to the higher class:</strong> {formData.promotion}, <strong>if yes, to which class:</strong> {formData.nextClassFigures} ({formData.nextClassWords})</p>
                <p>12. <strong>Months up to which the pupil has paid school dues:</strong> {formData.schoolDues}</p>
                <p>13. <strong>Total Working Days:</strong> {formData.totalWorkingDays} | <strong>Days Present:</strong> {formData.totalPresentDays}</p>
                <p>14. <strong>General Conduct:</strong> {formData.conduct}</p>
                <p>15. <strong>Date of Application for Transfer Certificate:</strong> {formData.applicationDate}</p>
                <p>16. <strong>Date of Issuance of Transfer Certificate:</strong> {formData.issuanceDate}</p>
                <p>17. <strong>Reason for leaving the School:</strong> {formData.reasonLeaving}</p>
                <p className="mt-6 grid grid-cols-3 text-center mt-16">
                    <span>Signature of class teacher</span>
                    <span>Checked By<br />( State full name and designation )</span>
                    <span>Principal seal</span>
                </p>

            </div>
        </div>
    );
};

export default TransferCertificateForm;
