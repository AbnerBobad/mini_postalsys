import { Package } from "./package_details";
import { PackageDetails } from "../interface/package_detailh";

export class OneDay extends Package implements PackageDetails {
    private flatFee: number;

    constructor(
        pack_id: number,
        sender_name: string,
        sender_address: string,
        receiver_name: string,
        receiver_address: string,
        wght: number,
        shipMethod: string,
        costpu: number,
        status: string,
        trackingNo: string,
        flatFee: number
    ) {
        super(pack_id, sender_name, sender_address, receiver_name, receiver_address, wght, shipMethod, costpu, status, trackingNo);
        this.flatFee = flatFee;
    }

    calculateCost(): number {
        return this.flatFee + (this.weight * this.costPerUnit);
    }

    printLabel(): void{
        console.log(`Sender: ${this.senderName}, Address: ${this.senderAddress}`);
        console.log(`Receiver: ${this.receiverName}, Address: ${this.receiverAddress}`);
        console.log(`Weight: ${this.weight} kg`);
        console.log(`Shipping Method: one days`);
        console.log(`Cost: $${this.calculateCost()}`);
        console.log(`Status: ${this.status}`);
        console.log(`Tracking Number: ${this.trackingNumber}`);
    }
}