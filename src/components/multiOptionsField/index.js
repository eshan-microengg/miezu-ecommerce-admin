// FeatureInput.jsx
import React, { useState } from 'react';
import Label from '../label';
import Input from '../input';
import Button1 from '../button';
import './style.scss';
import Icons from '../icons';
import { faAdd, faEdit, faRemove, faTrash } from '@fortawesome/free-solid-svg-icons';

const FeatureInput = ({ features, setFeatures, isInvalid, placeholder }) => {
    const [featureInput, setFeatureInput] = useState('');
    const [editingIndex, setEditingIndex] = useState(-1);
    const [error, setError] = useState('');

    const handleAddFeature = () => {
        if (featureInput.trim()) {
            if (editingIndex >= 0) {
                const updatedFeatures = features.map((feature, index) =>
                    index === editingIndex ? featureInput : feature
                );
                setFeatures(updatedFeatures);
                setEditingIndex(-1);
            } else {
                setFeatures([...features, featureInput]);
            }
            setFeatureInput('');
            setError('');
        }
        else {
            setError('Please enter Key Feature...');
        }
    };

    const handleEditFeature = (index) => {
        setFeatureInput(features[index]);
        setEditingIndex(index);
        setError('');
    };

    const handleRemoveFeature = (index) => {
        const updatedFeatures = features.filter((_, i) => i !== index);
        setFeatures(updatedFeatures);
        if (editingIndex === index) {
            setEditingIndex(-1);
            setFeatureInput('');
        }
        setError('');
    };

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: "start" }}>
                <div style={{ display: 'flex', alignItems: 'start', flexDirection: "column", }}>
                    <Input
                        isInvalid={isInvalid}
                        // isInvalid={!!error}
                        style={{ width: "500px", borderColor: error ? 'red' : '' }}
                        type="text"
                        placeholder={placeholder}
                        value={featureInput}
                        onChange={(e) => { setFeatureInput(e.target.value); setError(''); }}
                    />
                </div>
                <button className="add-feature-button " type="button" onClick={handleAddFeature}>
                    <Icons iconName={faAdd} />
                </button>
            </div>
            {error && (
                <div style={{ color: 'red', marginTop: '-10px', fontSize: '13px', }}>
                    {error}
                </div>
            )}

            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {features.map((feature, index) => (
                    <li key={index} style={{
                        display: 'block',
                        padding: '10px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '5px',
                        marginTop: '5px',
                        backgroundColor: '#f9f9f9',
                        position: 'relative',
                        paddingBottom: 20
                    }}>
                        {feature}
                        <button
                            type="button"
                            className="edit-feature-button"
                            onClick={() => handleEditFeature(index)}
                            style={{
                                position: '', marginLeft: "10px",
                                // right: '60px', color: 'blue', top: "3.5px"
                            }}
                        >
                            <Icons iconName={faEdit} />
                        </button>
                        <button
                            type="button"
                            className="remove-feature-button"
                            onClick={() => handleRemoveFeature(index)}
                            style={{
                                color: 'rgb(221, 53, 68)',
                                //  position: '', right: '10px', top: "3.5px"
                            }}
                        >
                            <Icons iconName={faTrash} />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FeatureInput;