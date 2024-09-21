import React from 'react';
import { useAccount } from 'wagmi';
import {
    IDKitWidget,
    ISuccessResult,
    VerificationLevel,
} from "@worldcoin/idkit"
import { Button } from '../ui/button';
import { decodeAbiParameters } from 'viem';
const WorldcoinVerification = ({ title, onSuccess }: { title: string, onSuccess: (data: any) => void }) => {
    const { address } = useAccount()

    const handleSuccess = (data: any) => {
        console.log("Verification successful:", data)
        onSuccess(data);
    }
    return (
        <IDKitWidget
            // @ts-ignore
            app_id={'app_a985a117782271b77d7ffd6a60c119ab'}
            action={'verify'}
            signal={address}
            verification_level={VerificationLevel.Orb}
            onSuccess={handleSuccess}
        >
            {({ open }) => (
                <Button onClick={open} variant="outline">
                    {title}
                </Button>
            )}
        </IDKitWidget>
    );
};

export default WorldcoinVerification;