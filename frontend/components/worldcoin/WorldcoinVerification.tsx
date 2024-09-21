import React from 'react';
import { useAccount } from 'wagmi';
import {
    IDKitWidget,
    ISuccessResult,
    VerificationLevel,
} from "@worldcoin/idkit"
import { Button } from '../ui/button';
import { decodeAbiParameters } from 'viem';
import { ThumbsUp } from 'lucide-react';
const WorldcoinVerification = ({ title, onSuccess }: { title: string, onSuccess: (data: any) => void }) => {
    const { address } = useAccount()

    const handleSuccess = (data: any) => {
        console.log("Verification successful:", data)
        onSuccess(data);
    }
    return (
        <IDKitWidget
            // @ts-ignore
            app_id={'app_staging_7461b9bbd3e873b76c098c984ab139ba'}
            action={'verify'}
            signal={address}
            verification_level={VerificationLevel.Orb}
            onSuccess={handleSuccess}
        >
            {({ open }) => (
                <Button onClick={open} variant="outline">
                    <ThumbsUp size={18} className='mr-2' />{title}
                </Button>
            )}
        </IDKitWidget>
    );
};

export default WorldcoinVerification;