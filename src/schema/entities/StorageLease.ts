import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Unit } from "./StorageUnit";


@Entity("storage_lease")
export class Lease extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id!:string

    @Column({
        name: "lease_Id",
        type: "varchar"
    })
    leaseId!: string

    @Column({
        type: "varchar"
    })
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
        type: "varchar"
    })
    nextBillingDate!: string

    @Column({
        type: "varchar"
    })
    paidThrough!: string

    @Column({
        type: "varchar"
    })
    leaseStatus!: string

    @Column({
        length: 36,
        type: "varchar"
    })
    invoicePeriodId!: string

    @Column({
        length: 20,
        type: "varchar"
    })
    invoicePeriod!: string
    
    @Column({
        length: 36,
        type: "varchar"
    })
    invoiceRecurringTypeId!: string
    
    @Column({
        length: 20,
        type: "varchar"
    })
    invoiceRecurringType!: string

    @CreateDateColumn()
    insertedDate!: Date
} 