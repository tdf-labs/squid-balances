import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {SubstrateNetwork} from "./_substrateNetwork"
import {SubstrateBalanceAccount} from "./substrateBalanceAccount.model"
import {SubstrateBalanceChangeEventType} from "./_substrateBalanceChangeEventType"

@Entity_()
export class SubstrateBalanceChangeEvent {
  constructor(props?: Partial<SubstrateBalanceChangeEvent>) {
    Object.assign(this, props)
  }

  /**
   * network:block:index
   */
  @PrimaryColumn_()
  id!: string

  @Column_("varchar", {length: 8, nullable: false})
  network!: SubstrateNetwork

  @Index_()
  @ManyToOne_(() => SubstrateBalanceAccount, {nullable: true})
  account!: SubstrateBalanceAccount

  @Index_()
  @Column_("varchar", {length: 18, nullable: false})
  type!: SubstrateBalanceChangeEventType

  @Column_("text", {nullable: false})
  symbol!: string

  @Column_("int4", {nullable: false})
  decimals!: number

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  amount!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  blockNumber!: bigint

  @Column_("timestamp with time zone", {nullable: false})
  date!: Date
}
