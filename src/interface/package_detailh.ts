// package_detail.ts
export abstract class PackageDetails {
    abstract getId(): number;
    abstract setId(id: number): void;

    abstract getSenderName(): string;
    abstract setSenderName(name: string): void;

    abstract getSenderAddress(): string;
    abstract setSenderAddress(address: string): void;

    abstract getReceiverName(): string;
    abstract setReceiverName(name: string): void;

    abstract getReceiverAddress(): string;
    abstract setReceiverAddress(address: string): void;

    abstract getWeight(): number;
    abstract setWeight(weight: number): void;

    abstract getShippingMethod(): string;
    abstract setShippingMethod(method: string): void;

    abstract getCostPerUnit(): number;
    abstract setCostPerUnit(cpu: number): void;

    abstract getStatus(): string;
    abstract setStatus(status: string): void;

    abstract getTrackingNumber(): string;
    abstract setTrackingNumber(trackingNo: string): void;

    abstract updatePackageStatus(trackingNumber: string, newStatus: string): boolean;

    abstract calculateCost(): {};
}
