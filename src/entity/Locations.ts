import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'


@Entity('location')

export class Locations {
    @PrimaryGeneratedColumn()
    location_id: number

    @Column()
    city: string

    @Column()
    state: string

    @Column()
    country: string

    @Column()
    zip_code: string

    @Column()
    address: string
}