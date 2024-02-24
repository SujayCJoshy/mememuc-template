import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TemplateButtons = ({onTemplateSelect}) => {
    const [templates, setTemplates] = useState([]);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const response = await axios.get('http://localhost:3000/templates');
                setTemplates(response.data);
            } catch (error) {
                console.error('Failed to fetch templates:', error);
            }
        };

        fetchTemplates();
    }, []);

    const handleTemplateClick = (templateId) => {
        // Find the template by ID from the templates state
        const selectedTemplate = templates.find(template => template._id === templateId);
        console.log("Selected template:", selectedTemplate);
        // Here you can implement further logic to use the selectedTemplate object
        onTemplateSelect(selectedTemplate);
    };

    return (
        <div style={{ display: 'flex', overflowX: 'scroll', marginLeft: '30px', marginTop: '20px', gap: '30px' }}>
            {templates.map((template) => (
                <button key={template._id} onClick={() => handleTemplateClick(template._id)} style={{ flex: "0 0 auto" }}>
                    {template.name || `Template ${template._id}`}
                </button>
            ))}
        </div>
    );
};

export default TemplateButtons;
