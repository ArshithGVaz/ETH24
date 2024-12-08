// components/ViewContent.tsx
import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Contract } from 'ethers';

interface ViewContentProps {
    contract: Contract;
}

const ViewContent: React.FC<ViewContentProps> = ({ contract }) => {
    const [contentId, setContentId] = useState<number | string>('');
    const [isPublic, setIsPublic] = useState<boolean | null>(null);
    const [paymentAmount, setPaymentAmount] = useState<number>(0);

    const handleViewContent = async () => {
        try {
            const publicStatus = await contract.viewContent(contentId);
            setIsPublic(publicStatus);
        } catch (error) {
            console.error('Error fetching content:', error);
        }
    };

    const handlePayForContent = async () => {
        try {
            const tx = await contract.viewContent(contentId, { value: ethers.utils.parseEther(paymentAmount.toString()) });
            await tx.wait();
            alert('Payment successful! Content is now accessible.');
        } catch (error) {
            console.error('Payment failed:', error);
        }
    };

    return (
        <div>
            <h2>View Content</h2>
            <input
                type="number"
                placeholder="Content ID"
                value={contentId}
                onChange={(e) => setContentId(e.target.value)}
            />
            <button onClick={handleViewContent}>View</button>

            {isPublic !== null && (
                <div>
                    <h3>Content Status</h3>
                    <p>{isPublic ? 'This content is public.' : 'This content is private.'}</p>
                    {!isPublic && (
                        <div>
                            <p>To view this content, please pay:</p>
                            <input
                                type="number"
                                placeholder="Amount to Pay (ETH)"
                                value={paymentAmount}
                                onChange={(e) => setPaymentAmount(Number(e.target.value))}
                            />
                            <button onClick={handlePayForContent}>Pay to View</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ViewContent;
