import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

Modal.setAppElement("#root");

const App = () => {
    const [formData, setFormData] = useState({
        age: "",
        sex: "",
        cp: 0,
        trestbps: "",
        chol: "",
        fbs: "",
        restecg: "",
        thalach: "",
        exang: "",
        oldpeak: "",
        slope: "",
        ca: "",
        thal: "",
    });
    const [prediction, setPrediction] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSliderChange = (value) => {
        setFormData({
            ...formData,
            cp: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/predict", {
                age: parseInt(formData.age),
                sex: parseInt(formData.sex),
                cp: formData.cp,
                trestbps: parseFloat(formData.trestbps),
                chol: parseFloat(formData.chol),
                fbs: parseInt(formData.fbs),
                restecg: parseInt(formData.restecg),
                thalach: parseFloat(formData.thalach),
                exang: parseInt(formData.exang),
                oldpeak: parseFloat(formData.oldpeak),
                slope: parseInt(formData.slope),
                ca: parseInt(formData.ca),
                thal: parseInt(formData.thal),
            });
            setPrediction(response.data.prediction);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error making prediction:", error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setPrediction(null);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md max-w-4xl w-full"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">
                    Heart Disease Prediction
                </h2>

                <div className="grid grid-cols-2 gap-6">
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Age (years)
                        </label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="e.g., 45"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Sex</label>
                        <select
                            name="sex"
                            value={formData.sex}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            required
                        >
                            <option value="">Select</option>
                            <option value="1">Male</option>
                            <option value="0">Female</option>
                        </select>
                    </div>

                    <div className="mb-4 col-span-2 flex flex-col">
                        <label className="block text-gray-700 my-3">
                            Chest Pain Type
                        </label>
                        <Slider
                            min={0}
                            max={3}
                            value={formData.cp}
                            onChange={handleSliderChange}
                            marks={{
                                0: "Typical angina",
                                1: "Atypical angina",
                                2: "Non-anginal pain",
                                3: "Asymptomatic",
                            }}
                            className="max-w-2xl justify-center mx-auto"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Resting Blood Pressure (mm Hg)
                        </label>
                        <input
                            type="number"
                            name="trestbps"
                            value={formData.trestbps}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="e.g., 120"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Serum Cholesterol (mg/dL)
                        </label>
                        <input
                            type="number"
                            name="chol"
                            value={formData.chol}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="e.g., 200"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Fasting Blood Sugar
                        </label>
                        <select
                            name="fbs"
                            value={formData.fbs}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            required
                        >
                            <option value="">Select</option>
                            <option value="1">True (≥120 mg/dL)</option>
                            <option value="0">False (&lt;120 mg/dL)</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Resting Electrocardiographic Results
                        </label>
                        <select
                            name="restecg"
                            value={formData.restecg}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            required
                        >
                            <option value="">Select</option>
                            <option value="0">Normal</option>
                            <option value="1">ST-T wave abnormality</option>
                            <option value="2">
                                Left ventricular hypertrophy
                            </option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Maximum Heart Rate Achieved
                        </label>
                        <input
                            type="number"
                            name="thalach"
                            value={formData.thalach}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="e.g., 150"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Exercise Induced Angina
                        </label>
                        <select
                            name="exang"
                            value={formData.exang}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            required
                        >
                            <option value="">Select</option>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">
                            ST Depression
                        </label>
                        <input
                            type="number"
                            name="oldpeak"
                            value={formData.oldpeak}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="e.g., 1.4"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Slope of ST Segment
                        </label>
                        <select
                            name="slope"
                            value={formData.slope}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            required
                        >
                            <option value="">Select</option>
                            <option value="0">Upsloping</option>
                            <option value="1">Flat</option>
                            <option value="2">Downsloping</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Number of Major Vessels (0-3)
                        </label>
                        <input
                            type="number"
                            name="ca"
                            value={formData.ca}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="e.g., 2"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Thalassemia
                        </label>
                        <select
                            name="thal"
                            value={formData.thal}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            required
                        >
                            <option value="">Select</option>
                            <option value="3">Normal</option>
                            <option value="6">Fixed Defect</option>
                            <option value="7">Reversable Defect</option>
                        </select>
                    </div>

                    <div className="col-span-2 flex justify-center mt-6">
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                            Predict
                        </button>
                    </div>
                </div>
            </form>

            {/* Modal */}
            {/* Modal */}
<Modal
    isOpen={isModalOpen}
    onRequestClose={closeModal}
    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    overlayClassName="modal-overlay"
>
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Prediction Result</h2>
        <p className="text-lg mb-6">
            {prediction ? "High chance of heart disease" : "Low chance of heart disease"}
        </p>
        <button
            onClick={closeModal}
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
            Close
        </button>
    </div>
</Modal>

        </div>
    );
};

export default App;
