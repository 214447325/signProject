import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";
import {v4 as uuidv4} from "uuid";

@Entity()
export class Contract extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4();

    @Column({type: 'varchar', name: 'oldName', nullable: true, default: ''})
    oldName: string = ''

    @Column({type: 'varchar', name: 'newName', nullable: true, default: ''})
    newName: string = ''

    @CreateDateColumn()
    createTime: Date = new Date();

    @Column('text')
    text: string = '';

    @Column({type: 'varchar', name: 'path', nullable: true, default: ''})
    path: string = '';

    @Column('text')
    html_text:string = '';
}