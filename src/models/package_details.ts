// Package.ts

import { PackageDetails } from "../interface/package_detailh";

export abstract class Package implements PackageDetails {
    protected id: number;
    protected senderName: string;
    protected senderAddress: string;
    protected receiverName: string;
    protected receiverAddress: string;
    protected weight: number;
    protected shippingMethod: string;
    protected costPerUnit: number;
    protected status: string;
    protected trackingNumber: string;

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
        trackingNo: string
    ) {
        this.id = pack_id;
        this.senderName = sender_name;
        this.senderAddress = sender_address;
        this.receiverName = receiver_name;;
        this.receiverAddress = receiver_address;
        this.weight = wght;
        this.shippingMethod = shipMethod;
        this.costPerUnit = costpu;
        this.status = status;
        this.trackingNumber = trackingNo;
    }

    getId(): number {
        return this.id;
    }
    setId(id: number): void {
        this.id = id;
    }

    getSenderName(): string {
        return this.senderName;
    }
    setSenderName(name: string): void {
        this.senderName = name;
    }

    getSenderAddress(): string {
        return this.senderAddress;
    }
    setSenderAddress(address: string): void {
        this.senderAddress = address;
    }

    getReceiverName(): string {
        return this.receiverName;
    }
    setReceiverName(name: string): void {
        this.receiverName = name;
    }

    getReceiverAddress(): string {
        return this.receiverAddress;
    }
    setReceiverAddress(address: string): void {
        this.receiverAddress = address;
    }

    getWeight(): number {
        return this.weight;
    }
    setWeight(weight: number): void {
        this.weight = weight;
    }

    getShippingMethod(): string {
        return this.shippingMethod;
    }
    setShippingMethod(method: string): void {
        this.shippingMethod = method;
    }

    getCostPerUnit(): number {
        return this.costPerUnit;
    }
    setCostPerUnit(cpu: number): void {
        this.costPerUnit = cpu;
    }

    getStatus(): string {
        return this.status;
    }
    setStatus(status: string): void {
        this.status = status;
    }

    getTrackingNumber(): string {
        return this.trackingNumber;
    }
    setTrackingNumber(trackingNo: string): void {
        this.trackingNumber = trackingNo;
    }

    updatePackageStatus(trackingNumber: string, newStatus: string): boolean {
        if (this.trackingNumber === trackingNumber) {
            this.status = newStatus;
            return true;
        }
        return false;
    }

    abstract calculateCost(): number;
}
