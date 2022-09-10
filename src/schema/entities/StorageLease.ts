import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Unit } from "./StorageUnit";


@Entity("storage_lease")
export class Lease extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id!:string

    @Column({
        name: "lease_Id",
        type: "string"
    })
    leaseId!: string

    @Column()
    contractNo!: string

    @CreateDateColumn({
        default: null,
        nullable: true
    })
    moveInDate!: Date | null

    @CreateDateColumn({
        default: null,
        nullable: true
    })
    moveOutDate!: Date | null

    @Column({
        type: "string"
    })
    nextBillingDate!: string

    @Column({
        type: "string"
    })
    paidThrough!: string

    @Column({
        type: "string"
    })
    leaseStatus!: string

    @Column({
        length: 36,
        type: "string"
    })
    invoicePeriodId!: string

    @Column({
        length: 20,
        type: "string"
    })
    invoicePeriod!: string
    
    @Column({
        length: 36,
        type: "string"
    })
    invoiceRecurringTypeId!: string
    
    @Column({
        length: 20,
        type: "string"
    })
    invoiceRecurringType!: string

    @CreateDateColumn()
    insertedDate!: Date
} 