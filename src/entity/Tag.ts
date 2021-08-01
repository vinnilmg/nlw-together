import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { v1 as uuid } from 'uuid';
import { Expose } from 'class-transformer';

@Entity("tags")
class Tag {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    nome: string;

    @CreateDateColumn()
    dt_criacao: Date;

    @UpdateDateColumn()
    dt_alteracao: Date;

    @Expose({ name: "nameCustom" })
    nameCustom(): string  {
        return `#${this.nome}`;
    }


    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }

}

export { Tag };