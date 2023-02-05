import {
    Entity,
    Column,
    PrimaryColumn,
    CreateDateColumn,
    OneToMany,
  } from "typeorm";
  import { Exclude } from "class-transformer";
  import { Contact } from "./contacts.entity";
  import { Phone } from "./phones.entity";
  import { v4 as uuid } from "uuid"
  
  @Entity("users")
  export class User {
    @PrimaryColumn("uuid")
    readonly id: string;
  
    @Column()
    name: string;
  
    @Column({ unique: true })
    email: string;
  
    @Column()
    @Exclude()
    password: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @OneToMany((type) => Phone, (phones) => phones.user, { eager: true })
    phones: Phone[];
  
    @OneToMany((type) => Contact, (contacts) => contacts.user, { eager: true })
    contacts: Contact[];

    constructor(){
      if (!this.id){
          this.id = uuid();
      }
    }
  }