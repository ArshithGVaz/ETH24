// components/UploadForm.tsx
"use client";
import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Contract } from 'ethers';

interface UploadFormProps {
    contract: Contract;
}

const UploadForm: React.FC<UploadFormProps> = ({ contract }) => {
    const [isPublic, setIsPublic] = useState<boolean>(true);
    const [price, setPrice] = useState<number>(0);

    const handleUpload = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            // Call the smart contract function to upload content visibility settings
            const tx = await contract.uploadContent(isPublic, ethers.utils.parseEther(price.toString()));
            await tx.wait();
            alert('Content visibility settings uploaded successfully!');
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    return (
        <form onSubmit={handleUpload}>
            <div>
                <label>
                    <input
                        type="radio"
                        value="public"
                        checked={isPublic}
                        onChange={() => setIsPublic(true)}
                    />
                    Public
                </label>
                <label>
                    <input
                        type="radio"
                        value="private"
                        checked={!isPublic}
                        onChange={() => setIsPublic(false)}
                    />
                    Private
                </label>
                {!isPublic && (
                    <div>
                        <label>
                            Price (in ETH):
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                required
                            />
                        </label>
                    </div>
                )}
            </div>
            <button type="submit">Upload</button>
        </form>
    );
};

export default UploadForm;
