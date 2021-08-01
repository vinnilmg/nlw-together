import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { v1 as uuid } from 'uuid';
import { Exclude } from 'class-transformer';

@Entity("users")
class User {
    
    @PrimaryColumn()
    readonly id: string;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    admin: boolean;

    @Exclude()
    @Column()
    senha: string;

    @CreateDateColumn()
    dt_criacao: Date;

    @UpdateDateColumn()
    dt_alteracao: Date;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }

}

export { User };