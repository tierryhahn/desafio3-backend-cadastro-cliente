import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm";
import { Contact } from "./contacts.entity";
import { User } from "./users.entity";
import { v4 as uuid } from "uuid"

@Entity("phones")
export class Phone {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  phone: string;

  @ManyToOne((type) => User, (user) => user.phones, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne((type) => Contact, (contact) => contact.phones, {
    onDelete: "CASCADE",
  })
  contacts: Contact;

  constructor(){
    if (!this.id){
        this.id = uuid();
    }
  }
}