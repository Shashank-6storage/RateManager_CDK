import { text } from "express";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, getConnection, Double } from "typeorm";


@Entity("rules")
export class Rules extends BaseEntity{ 

    @PrimaryGeneratedColumn('uuid', {
        comment: "Rules unique Id"
    })
    id!: string

    @Column('uuid',{
        name: "client_id"
    })
    cliendId!: String    

    @Column({
        comment: "Mapping Rules Compound Id",
        length: 6,
        type: "varchar"
    })
    compound_id!: string

    @Column({
        type: "varchar",
        length: 20
    })
    name!: String

    @Column({
        type: "text",
        default: null
    })
    description!: String

    @CreateDateColumn()
    created_date!: Date

    @Column({
        default: true,
        comment: "To Keep the Rules Active or Inactive",
        type: "boolean"
    })
    flag!: boolean
}

@Entity("rules_evalution")
export class RulesEvalution extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column({
        comment: "Mapping Rules Name Id",
        length: 36,
        type: "varchar"
    })
    rule_id!: string

    @Column({
        comment: "Mapping Rules Accumulate Id",
        length: 6,
        type: "varchar"
    })
    accumulate_id!: string

    @Column({
        length: 50,
        type: "varchar"
    })
    price!: string

    @Column({
        length: 6,
        type: "varchar"
    })
    evaluate_days!: string

    @CreateDateColumn()
    created_date!: Date

    @Column({
        default: true,
        comment: "To Keep the rules_evalution Active or Inactive",
        type: "boolean"
    })
    flag!: boolean
    
}

@Entity("rules_compound")
export class RulesCompound extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column({
        type: "varchar",
        length: 20
    })
    rule_evaluate!: String

    @Column({
        default: true,
        comment: "To Keep the Rules Active or Inactive",
        type: "boolean"
    })
    flag!: boolean        
}

@Entity("rules_amplify")
export class RulesAmplify extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column({
        type: "varchar",
        length: 20
    })
    rule_evaluate!: String

    @Column({
        default: true,
        comment: "To Keep the Rules Active or Inactive",
        type: "boolean"
    })
    flag!: boolean        
}

