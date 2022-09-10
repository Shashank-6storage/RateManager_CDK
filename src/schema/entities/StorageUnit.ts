import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("storage_unit")
export class Unit extends BaseEntity{

    @PrimaryGeneratedColumn("uuid")
    id!:number

    @Column({
        name: "storage_unit_id",
        type: "string"
    })
    storage_unit_id!: string

    @Column({
        type: "string"
    })
    contractNo!: string

    @Column({
        type: "string"
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
        type: "string"
    })
    isMovable!: string    

    @Column({
        type: "string"
    })
    unitVisibility!: string    
}


@Entity("storage_identity")
export class storageIdentity extends BaseEntity{

    @PrimaryGeneratedColumn("uuid")
    id!: number    

    @Column({
        type: "string"
    })
    contractNo!: string

    @Column({
        length: 36,
        type: "string"
    })
    storageTypeId!: string
    
    @Column({
        length: 50,
        type: "string"
    })
    storageType!: string

    @Column({
        length: 36,
        type: "string"
    })
    locationId!: string

    @Column({
        length: 50,
        type: "string"
    })
    location!: string

    @Column({
        length: 36,
        type: "string"
    })
    buildingId!: string

    @Column({
        length: 50,
        type: "string"
    })
    building!: string

    @Column({
        length: 36,
        type: "string"
    })
    unitTypeId!: string

    @Column({
        length: 50,
        type: "string"
    })
    unitType!: string

    @Column({
        length: 36,
        type: "string"
    })
    UnitStatusId!: string

    @Column({
        length: 20,
        type: "string"
    })
    UnitStatus!: string

    @Column({
        length: 20,
        type: "string"
    })
    unitAvailablity!: string
}