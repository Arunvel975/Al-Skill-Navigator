import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { firestore, storage } from '../firebase';
import { useHistory } from 'react-router-dom';

const ProfileSetup = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [profile, setProfile] = useState({
    name: '',
    degree: '',
    specialization: '',
    phone: '',
    certifications: '',
    internships: '',
    courses: '',
    linkedin: '',
    github: '',
    languages: '',
    profileIcon: null
  });
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProfile((prevProfile) => ({ ...prevProfile, profileIcon: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const profileIconRef = storage.ref().child(`profileIcons/${currentUser.uid}`);
      await profileIconRef.put(profile.profileIcon);
      const profileIconUrl = await profileIconRef.getDownloadURL();

      await firestore.collection('users').doc(currentUser.uid).update({
        profile: {
          ...profile,
          profileIcon: profileIconUrl
        }
      });

      history.push('/home');
    } catch (error) {
      console.error("Error updating profile: ", error);
    }
  };

  return (
    <div>
      <h1>Profile Setup</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={profile.name} onChange={handleChange} placeholder="Name" required />
        <input type="email" name="email" value={currentUser.email} readOnly />
        <input type="text" name="degree" value={profile.degree} onChange={handleChange} placeholder="Degree" required />
        <input type="text" name="specialization" value={profile.specialization} onChange={handleChange} placeholder="Specialization" required />
        <input type="text" name="phone" value={profile.phone} onChange={handleChange} placeholder="Phone Number" required />
        <input type="text" name="certifications" value={profile.certifications} onChange={handleChange} placeholder="Certifications" required />
        <input type="text" name="internships" value={profile.internships} onChange={handleChange} placeholder="Internship Details" required />
        <input type="text" name="courses" value={profile.courses} onChange={handleChange} placeholder="Courses Completed" required />
        <input type="url" name="linkedin" value={profile.linkedin} onChange={handleChange} placeholder="LinkedIn Profile Link" required />
        <input type="url" name="github" value={profile.github} onChange={handleChange} placeholder="GitHub Profile Link" required />
        <input type="text" name="languages" value={profile.languages} onChange={handleChange} placeholder="Programming Languages Known" required />
        <input type="file" name="profileIcon" onChange={handleFileChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProfileSetup;