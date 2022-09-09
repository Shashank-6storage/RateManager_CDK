import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Unit } from "./StorageUnit";


@Entity("storage_lease")
export class Lease extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id!:string

    @Column({
        name: "lease_Id",
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

    @Column()
    nextBillingDate!: string

    @Column()
    paidThrough!: string

    @Column()
    leaseStatus!: string

    @Column({
        length: 36
    })
    invoicePeriodId!: string

    @Column({
        length: 20
    })
    invoicePeriod!: string
    
    @Column({
        length: 36
    })
    invoiceRecurringTypeId!: string
    
    @Column({
        length: 20
    })
    invoiceRecurringType!: string

    @CreateDateColumn()
    insertedDate!: Date
} 