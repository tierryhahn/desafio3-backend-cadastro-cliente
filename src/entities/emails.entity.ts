import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm";
import { Contact } from "./contacts.entity";
import { v4 as uuid } from "uuid"

@Entity("emails")
export class Email {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  email: string;

  @ManyToOne((type) => Contact, (contact) => contact.emails, {
    onDelete: "CASCADE",
  })
  contacts: Contact;

  constructor(){
    if (!this.id){
        this.id = uuid();
    }
  }
}