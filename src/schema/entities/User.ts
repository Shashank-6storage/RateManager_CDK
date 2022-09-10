import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user_contract")
export class Users extends BaseEntity{

    @PrimaryGeneratedColumn("uuid")
    id!: number;

    @Column({
        type: "string"
    })
    clientId!: string

    @Column({
        type: "string"
    })
    tenantId! : string;

    @Column({
        type: "string"
    })
    contractNo! : string;

    @Column({
        length: 36,
        default: null,
        type: "string"
    })
    ruleId! : string;

}


@Entity("tenant")
export class Tenant extends BaseEntity{

    @PrimaryGeneratedColumn("uuid")
    id!: number

    @Column({
        type: "string"
    })
    userId!: string    

    @Column({
        type: "varchar",
        length: 50
    })
    clientId!: string

    @Column({
        type: "varchar",
        length: 50
    })
    ssn!: string

    @Column({
        type: "varchar",
        length: 30
    })
    firstName!: string

    @Column({
        type: "varchar",
        length: 30
    })
    lastName!: string

    @Column({
        type: "text"
    })
    photoPath!: string

    @Column({
        type: "varchar",
        length: 50
    })
    email!: string

    @Column({
        type: "varchar",
        length: 20
    })
    phoneNumber!: string

    @Column({
        type: "string"
    })
    addressLineTwo!: string

    @Column({
        type: "string"
    })
    addressLineOne!: string

    @Column({
        type: "varchar",
        length: 20
    })
    city!: string

    @Column({
        type: "varchar",
        length: 20
    })
    state!: string

    @Column({
        type: "varchar",
        length: 12
    })
    zipCode!: string

    @Column({
        type: "varchar",
        length: 20
    })
    country!: string

    @Column({
        type: "varchar",
        length: 10
    })
    businessUser!: string

    @Column({
        type: "varchar",
        length: 50
    })
    accessCode!: string
}
