import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("storage_unit")
export class Unit extends BaseEntity{

    @PrimaryGeneratedColumn("uuid")
    id!:number

    @Column({
        name: "storage_unit_id",
        type: "varchar"
    })
    storage_unit_id!: string

    @Column({
        type: "varchar"
    })
    contractNo!: string

    @Column({
        type: "varchar"
    })
    unitNumber!: string

    @Column({
        type: "text"
    })
    Description!: string

    @Column({
        type: "varchar",
        length: 50
    })
    unitMeasurement!: string

    @Column({
        type: "varchar",
        length: 50
    })
    measurementType!: string

    @Column({
        type: "varchar",
        length: 50
    })
    measurementFormat!: string

    @Column({
        type: "double"
    })
    unitPrice!: number

    @Column({
        type: "double"
    })
    taxPercentage!: number

    @Column({
        type: "double"
    })
    taxAmount!: number

    @Column({
        type: "double"
    })
    netAmount!: number

    @Column({
        type: "double"
    })
    grossAmount!: number

    @Column({
        type: "varchar"
    })
    isMovable!: string    

    @Column({
        type: "varchar"
    })
    unitVisibility!: string    
}


@Entity("storage_identity")
export class storageIdentity extends BaseEntity{

    @PrimaryGeneratedColumn("uuid")
    id!: number    

    @Column({
        type: "varchar"
    })
    contractNo!: string

    @Column({
        length: 36,
        type: "varchar"
    })
    storageTypeId!: string
    
    @Column({
        length: 50,
        type: "varchar"
    })
    storageType!: string

    @Column({
        length: 36,
        type: "varchar"
    })
    locationId!: string

    @Column({
        length: 50,
        type: "varchar"
    })
    location!: string

    @Column({
        length: 36,
        type: "varchar"
    })
    buildingId!: string

    @Column({
        length: 50,
        type: "varchar"
    })
    building!: string

    @Column({
        length: 36,
        type: "varchar"
    })
    unitTypeId!: string

    @Column({
        length: 50,
        type: "varchar"
    })
    unitType!: string

    @Column({
        length: 36,
        type: "varchar"
    })
    UnitStatusId!: string

    @Column({
        length: 20,
        type: "varchar"
    })
    UnitStatus!: string

    @Column({
        length: 20,
        type: "varchar"
    })
    unitAvailablity!: string
}