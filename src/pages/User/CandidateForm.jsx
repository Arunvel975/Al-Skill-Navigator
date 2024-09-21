import React, { useState } from 'react';
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig"; 
import { useNavigate } from 'react-router-dom';

const CandidateForm = () => {
  const [candidate, setCandidate] = useState({
    name: '',
    email: '',
    degree: '',
    specialization: '',
    phoneNumber: '',
    certifications: '',
    internshipDetails: '',
    coursesCompleted: '',
    linkedInProfile: '',
    gitHubProfile: '',
    programmingLanguages: '',
    eCertificates: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCandidate({ ...candidate, [name]: value });
  };

  const handleFileChange = (e) => {
    setCandidate({ ...candidate, eCertificates: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, 'users', user.uid), { 
        ...candidate,
        isFormFilled: true
      }, { merge: true });

      // Enroll the user in the appropriate course
      enrollUserInCourse(candidate.certifications);

      navigate('/user');
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form: " + error.message);
    }
  };

  const enrollUserInCourse = (certifications) => {
    // Implement the logic to enroll the user in the appropriate course
    // based on their certifications and create a new course if needed
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={candidate.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email ID</label>
        <input
          type="email"
          name="email"
          value={candidate.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Degree</label>
        <input
          type="text"
          name="degree"
          value={candidate.degree}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Specialization</label>
        <input
          type="text"
          name="specialization"
          value={candidate.specialization}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={candidate.phoneNumber}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Certifications</label>
        <input
          type="text"
          name="certifications"
          value={candidate.certifications}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Internship Details</label>
        <input
          type="text"
          name="internshipDetails"
          value={candidate.internshipDetails}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Courses Completed</label>
        <input
          type="text"
          name="coursesCompleted"
          value={candidate.coursesCompleted}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">LinkedIn Profile Link</label>
        <input
          type="text"
          name="linkedInProfile"
          value={candidate.linkedInProfile}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">GitHub Profile Link</label>
        <input
          type="text"
          name="gitHubProfile"
          value={candidate.gitHubProfile}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Programming Languages Known</label>
        <input
          type="text"
          name="programmingLanguages"
          value={candidate.programmingLanguages}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Upload eCertificates</label>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Submit
      </button>
    </form>
  );
};

export default CandidateForm;