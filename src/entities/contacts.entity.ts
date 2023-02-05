import { Exclude } from "class-transformer";
import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Email } from "./emails.entity";
import { Phone } from "./phones.entity";
import { User } from "./users.entity";
import { v4 as uuid } from "uuid"

@Entity("contacts")
export class Contact {
  
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  name: string

  @OneToMany((type) => Phone, (phones) => phones.contacts, { eager: true })
  phones: Phone[];

  @OneToMany((type) => Email, (emails) => emails.contacts, { eager: true })
  emails: Email[];

  @ManyToOne((type) => User, (user) => user.contacts, { onDelete: "CASCADE" })
  @Exclude()
  user: User;

  constructor(){
    if (!this.id){
        this.id = uuid();
    }
  }
}