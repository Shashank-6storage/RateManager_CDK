import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("storage_unit")
export class Unit extends BaseEntity{

    @PrimaryGeneratedColumn("uuid")
    id!:number

    @Column({
        name: "storage_unit_id"
    })
    storage_unit_id!: string

    @Column()
    contractNo!: string

    @Column()
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

    @Column()
    isMovable!: string    

    @Column()
    unitVisibility!: string    
}


@Entity("storage_identity")
export class storageIdentity extends BaseEntity{

    @PrimaryGeneratedColumn("uuid")
    id!: number    

    @Column()
    contractNo!: string

    @Column({
        length: 36
    })
    storageTypeId!: string
    
    @Column({
        length: 50
    })
    storageType!: string

    @Column({
        length: 36
    })
    locationId!: string

    @Column({
        length: 50
    })
    location!: string

    @Column({
        length: 36
    })
    buildingId!: string

    @Column({
        length: 50
    })
    building!: string

    @Column({
        length: 36
    })
    unitTypeId!: string

    @Column({
        length: 50
    })
    unitType!: string

    @Column({
        length: 36
    })
    UnitStatusId!: string

    @Column({
        length: 20
    })
    UnitStatus!: string

    @Column({
        length: 20
    })
    unitAvailablity!: string
}