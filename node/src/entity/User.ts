import { timeStamp } from "console";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4();

    @Column({ type: 'varchar', name: 'username' })
    username: string = '';

    @Column({ type: 'varchar', name: 'password' })
    password: string = '';

    @CreateDateColumn()
    createTime: Date = new Date();

    @UpdateDateColumn()
    updateTime: Date = new Date();

    @Column({ type: 'varchar', name: 'token', nullable: true, default: '' })
    token: string = ''
}