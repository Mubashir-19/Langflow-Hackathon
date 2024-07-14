import React from 'react'
import "./Questionare.css"
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
const optionsCareerField = [
    { value: 'software_engineering', label: 'Software Engineering' },
    { value: 'medicine', label: 'Medicine' },
    { value: 'education', label: 'Education' },
    { value: 'business', label: 'Business' },
    { value: 'other', label: 'Other (Please specify)' },
];
const optionsDegrees = [
    { value: 'bachelor', label: 'Bachelor’s Degree' },
    { value: 'associate', label: 'Associate’s Degree' },
    { value: 'certificate', label: 'Certificate Program' },
    { value: 'other', label: 'Other (Please specify)' },
];

const optionsLearningStyle = [
    { value: 'visual', label: 'Visual' },
    { value: 'auditory', label: 'Auditory' },
    { value: 'kinesthetic', label: 'Kinesthetic' },
    { value: 'reading_writing', label: 'Reading/Writing' },
];
const optionsSkills = [
    { value: 'programming', label: 'Programming' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'communication', label: 'Communication' },
    { value: 'other', label: 'Other (Please specify)' },
];

const Questionare = () => {
    const navigate = useNavigate();
    const [selectedCareerFields, setSelectedCareerFields] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [showOtherCareerFieldInput, setShowOtherCareerFieldInput] = useState(false);
    const [showOtherSkillsInput, setShowOtherSkillsInput] = useState(false);
    const [selectedDegrees, setSelectedDegrees] = useState([]);
    const [selectedLearningStyles, setSelectedLearningStyles] = useState([]);
    const [showOtherDegreeInput, setShowOtherDegreeInput] = useState(false);

    const handleDegreeChange = (selectedOptions) => {
        setSelectedDegrees(selectedOptions);
        setShowOtherDegreeInput(selectedOptions.some(option => option.value === 'other'));
    };
    const handleCareerFieldChange = (selectedOptions) => {
        setSelectedCareerFields(selectedOptions);
        setShowOtherCareerFieldInput(selectedOptions.some(option => option.value === 'other'));
    };

    const handleSkillsChange = (selectedOptions) => {
        setSelectedSkills(selectedOptions);
        setShowOtherSkillsInput(selectedOptions.some(option => option.value === 'other'));
    };


    const [education, setEducation] = useState('');
    const [showOtherInput, setShowOtherInput] = useState(false);

    const handleEducationChange = (event) => {
        const selectedValue = event.target.value;
        setEducation(selectedValue);
        setShowOtherInput(selectedValue === 'other');
    };

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            name: formData.get('user_name'),
            age: formData.get('user_age'),
            gender: formData.get('user_gender'),
            education: education === 'other' ? formData.get('other_education') : education,
            bio: formData.get('user_bio'),
            job: formData.get('user_job'),
            careerFields: selectedCareerFields.map(field => field.value === 'other' ? formData.get('other_career_field') : field.value),
            skills: selectedSkills.map(skill => skill.value === 'other' ? formData.get('other_skills') : skill.value),
            degrees: selectedDegrees.map(degree => degree.value === 'other' ? formData.get('other_degree') : degree.value),
            learningStyles: selectedLearningStyles.map(style => style.value),
        };

        try {
            const response = await axios.post('https://backend-omega-nine-30.vercel.app/userinfo', data);
            console.log('Response:', response.data);
            
            navigate(`/user/${`id-${Date.now()}-${Math.floor(Math.random() * 1000)}`}`, { state: {data: data, response: response.data} });
          } catch (error) {
            console.error('Error submitting user info:', error);
          }
        
        console.log(data)
    }

    return (
        <div className="row">
            <div className="col-md-12">
                <form onSubmit={handleSubmit}>
                    <h1> Questionare </h1>

                    <fieldset>
                        <legend><span className="number">1</span> Your Basic Info</legend>
                        <div style={{ height: "20px" }} ></div>

                        <label htmlFor="name">Name:</label>
                        <input required type="text" id="name" name="user_name" />

                        {/* <label htmlFor="email">Email:</label>
          <input required type="email" id="mail" name="user_email" />

          <label htmlFor="password">Password:</label>
          <input required type="password" id="password" name="user_password" /> */}

                        <label>Age:</label>
                        <input required type="radio" id="under_13" value="under_13" name="user_age" />
                        <label htmlFor="under_13" className="light">Under 13</label><br />
                        <input required type="radio" id="over_13" value="over_13" name="user_age" />
                        <label htmlFor="over_13" className="light">Over 13</label>

                        <div style={{ height: "20px" }} ></div>

                        <label htmlFor="gender">Gender:</label>
                        <select id="gender" name="user_gender">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="non_binary">Non-binary</option>
                            <option value="prefer_not_to_say">Prefer not to say</option>
                        </select>

                        <label htmlFor="education">Education:</label>
                        <select id="education" name="user_education" value={education} onChange={handleEducationChange}>                            <option value="high_school">High School</option>
                            <option value="associate_degree">Associate Degree</option>
                            <option value="bachelor_degree">Bachelor's Degree</option>
                            <option value="master_degree">Master's Degree</option>
                            <option value="phd">PhD</option>
                            <option value="other">Other</option>
                        </select>
                        {showOtherInput && (
                            <div>
                                <label htmlFor="other_education">Please specify:</label>
                                <input required type="text" id="other_education" name="other_education" />
                            </div>
                        )}
                        {/* <label>Education:</label>
          <input required type="radio" id="under_13" value="under_13" name="user_age" />
          <label htmlFor="under_13" className="light">High School Diploma</label><br />
          <input required type="radio" id="over_13" value="over_13" name="user_age" />
          <label htmlFor="over_13" className="light">Some College</label>
          <input required type="radio" id="over_13" value="over_13" name="user_age" />
          <label htmlFor="over_13" className="light">Associate’s Degree</label>
          <input required type="radio" id="over_13" value="over_13" name="user_age" />
          <label htmlFor="over_13" className="light">Bachelor’s Degree</label>
          <input required type="radio" id="over_13" value="over_13" name="user_age" />
          <label htmlFor="over_13" className="light">Master’s Degree</label> */}
                    </fieldset>

                    <fieldset>
                        <legend><span className="number">2</span> Your Profile</legend>
                        <div style={{ height: "20px" }} ></div>

                        <label htmlFor="bio">Bio:</label>
                        <textarea id="bio" name="user_bio"></textarea>

                        <label htmlFor="job">Job Role:</label>
                        <select id="job" name="user_job">
                            <optgroup label="Web">
                                <option value="frontend_developer">Front-End Developer</option>
                                <option value="php_developer">PHP Developer</option>
                                <option value="python_developer">Python Developer</option>
                                <option value="rails_developer">Rails Developer</option>
                                <option value="web_designer">Web Designer</option>
                                <option value="wordpress_developer">Wordpress Developer</option>
                            </optgroup>
                            <optgroup label="Mobile">
                                <option value="android_developer">Android Developer</option>
                                <option value="ios_developer">IOS Developer</option>
                                <option value="mobile_designer">Mobile Designer</option>
                            </optgroup>
                            <optgroup label="Business">
                                <option value="business_owner">Business Owner</option>
                                <option value="freelancer">Freelancer</option>
                            </optgroup>
                        </select>

                        <div>
                            
                            <div>
                                <label htmlFor="skills">Relevant Skills:</label>
                                <Select
                                    isMulti
                                    name="skills"
                                    options={optionsSkills}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    onChange={handleSkillsChange}
                                    value={selectedSkills}
                                />
                                <div style={{ height: "20px" }} ></div>

                                {showOtherSkillsInput && (
                                    <div>
                                        <label htmlFor="other_skills">Please specify:</label>
                                        <input required type="text" id="other_skills" name="other_skills" />
                                    </div>
                                )}
                            </div>

                        </div>

                    </fieldset>
                    <fieldset>
                        <legend><span className="number">3</span> Academic and Professional Development</legend>
                        <div style={{ height: "20px" }} ></div>

                        <div>
                            <div>
                                <label htmlFor="degrees">Degrees/Certifications Intended to Pursue:</label>
                                <Select
                                    isMulti
                                    name="degrees"
                                    options={optionsDegrees}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    onChange={handleDegreeChange}
                                    value={selectedDegrees}
                                />
                                <div style={{ height: "20px" }} ></div>

                                {showOtherDegreeInput && (
                                    <div>
                                        <label htmlFor="other_degree">Please specify:</label>
                                        <input required type="text" id="other_degree" name="other_degree" />
                                    </div>
                                )}
                            </div>
                            {/* <div style={{ height: "20px" }} ></div> */}
                            <div>
                                <label htmlFor="career-field">Preferred Career Field:</label>
                                <Select
                                    isMulti
                                    name="career_field"
                                    options={optionsCareerField}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    onChange={handleCareerFieldChange}
                                    value={selectedCareerFields}
                                />
                                <div style={{ height: "20px" }} ></div>

                                {showOtherCareerFieldInput && (
                                    <div>
                                        <label htmlFor="other_career_field">Please specify:</label>
                                        <input required type="text" id="other_career_field" name="other_career_field" />
                                    </div>
                                )}
                            </div>

                            <div>
                                <label htmlFor="learning-style">Preferred Learning Style:</label>
                                <Select
                                    isMulti
                                    name="learning_style"
                                    options={optionsLearningStyle}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    onChange={(selectedOptions) => setSelectedLearningStyles(selectedOptions)}
                                    value={selectedLearningStyles}
                                />
                            </div>
                        </div>
                    </fieldset>

                    <button type="submit" style={{cursor: "pointer"}}>Continue</button>
                </form>
            </div>
        </div >
    )
}

export default Questionare